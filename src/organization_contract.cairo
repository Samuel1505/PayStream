// ===========================
// ORGANIZATION CONTRACT
// ===========================
// File: src/organization_contract.cairo

use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store, Copy)]
pub struct Recipient {
    pub id: u256,
    pub name: felt252,
    pub wallet: ContractAddress,
    pub salary: u256,
    pub advance_limit: u256,
    pub current_advance: u256,
    pub has_advance: bool,
}

#[derive(Drop, Serde, starknet::Store, Copy)]
pub struct Payment {
    pub id: u256,
    pub recipient_id: u256,
    pub recipient_wallet: ContractAddress,
    pub amount: u256,
    pub fee: u256,
    pub timestamp: u64,
    pub token: ContractAddress,
}

#[starknet::interface]
pub trait IOrganizationContract<TContractState> {
    fn create_recipient(
        ref self: TContractState,
        name: felt252,
        wallet: ContractAddress,
        salary: u256,
        advance_limit: u256,
    ) -> u256;
    fn update_recipient(
        ref self: TContractState,
        recipient_id: u256,
        name: felt252,
        wallet: ContractAddress,
    );
    fn update_salary(ref self: TContractState, recipient_id: u256, new_salary: u256);
    fn get_recipient(self: @TContractState, recipient_id: u256) -> Recipient;
    fn disburse_token(ref self: TContractState, recipient_id: u256, token: ContractAddress);
    fn batch_disburse_token(
        ref self: TContractState, recipient_ids: Array<u256>, token: ContractAddress
    );
    fn request_advance(ref self: TContractState, recipient_id: u256, amount: u256);
    fn approve_advance(
        ref self: TContractState, recipient_id: u256, amount: u256, token: ContractAddress
    );
    fn update_transaction_fee(ref self: TContractState, new_fee: u256);
    fn update_fee_collector(ref self: TContractState, new_collector: ContractAddress);
    fn get_owner(self: @TContractState) -> ContractAddress;
    fn get_transaction_fee(self: @TContractState) -> u256;
    fn get_payment(self: @TContractState, payment_id: u256) -> Payment;
}

#[starknet::interface]
trait IERC20<TContractState> {
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transfer_from(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
}

#[starknet::contract]
mod OrganizationContract {
    use super::{Recipient, Payment, IOrganizationContract, IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{
        ContractAddress, get_caller_address, get_contract_address, get_block_timestamp
    };
    use starknet::storage::{Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess};
    use core::num::traits::Zero;
    use core::array::ArrayTrait;

    #[storage]
    struct Storage {
        #[allow(starknet::invalid_storage_member_types)]
        owner: ContractAddress,
        #[allow(starknet::invalid_storage_member_types)]
        factory: ContractAddress,
        #[allow(starknet::invalid_storage_member_types)]
        fee_collector: ContractAddress,
        #[allow(starknet::invalid_storage_member_types)]
        transaction_fee: u256,
        #[allow(starknet::invalid_storage_member_types)]
        next_recipient_id: u256,
        #[allow(starknet::invalid_storage_member_types)]
        next_payment_id: u256,
        #[allow(starknet::invalid_storage_member_types)]
        recipients: Map<u256, Recipient>,
        #[allow(starknet::invalid_storage_member_types)]
        payment_history: Map<u256, Payment>,
        #[allow(starknet::invalid_storage_member_types)]
        recipient_exists: Map<u256, bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        RecipientCreated: RecipientCreated,
        RecipientUpdated: RecipientUpdated,
        SalaryUpdated: SalaryUpdated,
        PaymentDisbursed: PaymentDisbursed,
        AdvanceRequested: AdvanceRequested,
        AdvanceApproved: AdvanceApproved,
        FeeUpdated: FeeUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct RecipientCreated {
        recipient_id: u256,
        name: felt252,
        wallet: ContractAddress,
        salary: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct RecipientUpdated {
        recipient_id: u256,
        name: felt252,
        wallet: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct SalaryUpdated {
        recipient_id: u256,
        old_salary: u256,
        new_salary: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct PaymentDisbursed {
        payment_id: u256,
        recipient_id: u256,
        recipient_wallet: ContractAddress,
        amount: u256,
        fee: u256,
        token: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct AdvanceRequested {
        recipient_id: u256,
        amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct AdvanceApproved {
        recipient_id: u256,
        amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct FeeUpdated {
        old_fee: u256,
        new_fee: u256,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        factory: ContractAddress,
        fee_collector: ContractAddress,
        transaction_fee: u256,
    ) {
        self.owner.write(owner);
        self.factory.write(factory);
        self.fee_collector.write(fee_collector);
        self.transaction_fee.write(transaction_fee);
        self.next_recipient_id.write(1);
        self.next_payment_id.write(1);
    }

    #[abi(embed_v0)]
    impl OrganizationContractImpl of IOrganizationContract<ContractState> {
        fn create_recipient(
            ref self: ContractState,
            name: felt252,
            wallet: ContractAddress,
            salary: u256,
            advance_limit: u256,
        ) -> u256 {
            self._only_owner();
            assert(!wallet.is_zero(), 'Invalid wallet address');
            assert(salary > Zero::zero(), 'Salary must be positive');

            let recipient_id = self.next_recipient_id.read();

            let recipient = Recipient {
                id: recipient_id,
                name,
                wallet,
                salary,
                advance_limit,
                current_advance: Zero::zero(),
                has_advance: false,
            };

            self.recipients.entry(recipient_id).write(recipient);
            self.recipient_exists.entry(recipient_id).write(true);
            self.next_recipient_id.write(recipient_id + 1);

            self.emit(RecipientCreated { recipient_id, name, wallet, salary });
            recipient_id
        }

        fn update_recipient(
            ref self: ContractState, recipient_id: u256, name: felt252, wallet: ContractAddress,
        ) {
            self._only_owner();
            assert(self.recipient_exists.entry(recipient_id).read(), 'Recipient does not exist');
            assert(!wallet.is_zero(), 'Invalid wallet address');

            let old_recipient = self.recipients.entry(recipient_id).read();
            let updated_recipient = Recipient {
                id: old_recipient.id,
                name,
                wallet,
                salary: old_recipient.salary,
                advance_limit: old_recipient.advance_limit,
                current_advance: old_recipient.current_advance,
                has_advance: old_recipient.has_advance,
            };
            self.recipients.entry(recipient_id).write(updated_recipient);

            self.emit(RecipientUpdated { recipient_id, name, wallet });
        }

        fn update_salary(ref self: ContractState, recipient_id: u256, new_salary: u256) {
            self._only_owner();
            assert(self.recipient_exists.entry(recipient_id).read(), 'Recipient does not exist');
            assert(new_salary > Zero::zero(), 'Salary must be positive');

            let old_recipient = self.recipients.entry(recipient_id).read();
            let old_salary = old_recipient.salary;
            let updated_recipient = Recipient {
                id: old_recipient.id,
                name: old_recipient.name,
                wallet: old_recipient.wallet,
                salary: new_salary,
                advance_limit: old_recipient.advance_limit,
                current_advance: old_recipient.current_advance,
                has_advance: old_recipient.has_advance,
            };
            self.recipients.entry(recipient_id).write(updated_recipient);

            self.emit(SalaryUpdated { recipient_id, old_salary, new_salary });
        }

        fn get_recipient(self: @ContractState, recipient_id: u256) -> Recipient {
            assert(self.recipient_exists.entry(recipient_id).read(), 'Recipient does not exist');
            self.recipients.entry(recipient_id).read()
        }

        fn disburse_token(ref self: ContractState, recipient_id: u256, token: ContractAddress) {
            self._only_owner();
            assert(self.recipient_exists.entry(recipient_id).read(), 'Recipient does not exist');

            let recipient = self.recipients.entry(recipient_id).read();
            let gross_amount = recipient.salary;

            let mut net_amount = gross_amount;
            let mut updated_recipient = recipient;
            if recipient.has_advance {
                assert(gross_amount >= recipient.current_advance, 'Advance exceeds salary');
                net_amount = gross_amount - recipient.current_advance;
                updated_recipient.current_advance = Zero::zero();
                updated_recipient.has_advance = false;
                self.recipients.entry(recipient_id).write(updated_recipient);
            }

            let fee = (net_amount * self.transaction_fee.read()) / 10000;
            let final_amount = net_amount - fee;

            let success = self._transfer_token(token, recipient.wallet, final_amount);
            assert(success, 'Transfer to recipient failed');

            if fee > Zero::zero() {
                let fee_success = self._transfer_token(token, self.fee_collector.read(), fee);
                assert(fee_success, 'Fee transfer failed');
            }

            let payment_id = self.next_payment_id.read();
            let payment = Payment {
                id: payment_id,
                recipient_id,
                recipient_wallet: recipient.wallet,
                amount: final_amount,
                fee,
                timestamp: get_block_timestamp(),
                token,
            };
            self.payment_history.entry(payment_id).write(payment);
            self.next_payment_id.write(payment_id + 1);

            self
                .emit(
                    PaymentDisbursed {
                        payment_id,
                        recipient_id,
                        recipient_wallet: recipient.wallet,
                        amount: final_amount,
                        fee,
                        token,
                    }
                );
        }

        fn batch_disburse_token(
            ref self: ContractState, recipient_ids: Array<u256>, token: ContractAddress
        ) {
            self._only_owner();
            let len = recipient_ids.len();
            let mut index = 0_u32;
            loop {
                if index == len {
                    break;
                }
                let recipient_id: u256 = *recipient_ids[index];
                self.disburse_token(recipient_id, token);
                index += 1;
            }
        }

        fn request_advance(ref self: ContractState, recipient_id: u256, amount: u256) {
            assert(self.recipient_exists.entry(recipient_id).read(), 'Recipient does not exist');
            let recipient = self.recipients.entry(recipient_id).read();

            let caller = get_caller_address();
            assert(caller == recipient.wallet, 'Only recipient can request');
            assert(!recipient.has_advance, 'Advance already exists');
            assert(amount > Zero::zero(), 'Amount must be positive');
            assert(amount <= recipient.advance_limit, 'Exceeds advance limit');
            assert(amount <= recipient.salary, 'Exceeds salary');

            self.emit(AdvanceRequested { recipient_id, amount });
        }

        fn approve_advance(
            ref self: ContractState, recipient_id: u256, amount: u256, token: ContractAddress
        ) {
            self._only_owner();
            assert(self.recipient_exists.entry(recipient_id).read(), 'Recipient does not exist');

            let old_recipient = self.recipients.entry(recipient_id).read();
            assert(!old_recipient.has_advance, 'Advance already exists');
            assert(amount > Zero::zero(), 'Amount must be positive');
            assert(amount <= old_recipient.advance_limit, 'Exceeds advance limit');
            assert(amount <= old_recipient.salary, 'Exceeds salary');

            let success = self._transfer_token(token, old_recipient.wallet, amount);
            assert(success, 'Advance transfer failed');

            let updated_recipient = Recipient {
                id: old_recipient.id,
                name: old_recipient.name,
                wallet: old_recipient.wallet,
                salary: old_recipient.salary,
                advance_limit: old_recipient.advance_limit,
                current_advance: amount,
                has_advance: true,
            };
            self.recipients.entry(recipient_id).write(updated_recipient);

            self.emit(AdvanceApproved { recipient_id, amount });
        }

        fn update_transaction_fee(ref self: ContractState, new_fee: u256) {
            self._only_factory();
            assert(new_fee <= 1000, 'Fee too high');
            let old_fee = self.transaction_fee.read();
            self.transaction_fee.write(new_fee);
            self.emit(FeeUpdated { old_fee, new_fee });
        }

        fn update_fee_collector(ref self: ContractState, new_collector: ContractAddress) {
            self._only_factory();
            assert(!new_collector.is_zero(), 'Invalid collector');
            self.fee_collector.write(new_collector);
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }

        fn get_transaction_fee(self: @ContractState) -> u256 {
            self.transaction_fee.read()
        }

        fn get_payment(self: @ContractState, payment_id: u256) -> Payment {
            self.payment_history.entry(payment_id).read()
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _only_owner(self: @ContractState) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'Only owner can call');
        }

        fn _only_factory(self: @ContractState) {
            let caller = get_caller_address();
            assert(caller == self.factory.read(), 'Only factory can call');
        }

        fn _transfer_token(
            self: @ContractState, token: ContractAddress, to: ContractAddress, amount: u256,
        ) -> bool {
            let erc20 = IERC20Dispatcher { contract_address: token };
            let from = get_contract_address();
            erc20.transfer_from(from, to, amount)
        }
    }
}