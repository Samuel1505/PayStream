// ===========================
// ORGANIZATION FACTORY CONTRACT
// ===========================
// File: src/organization_factory.cairo

use starknet::ContractAddress;
use crate::organization_contract::{IOrganizationContractDispatcher, IOrganizationContractDispatcherTrait};

#[derive(Drop, Serde, starknet::Store, Copy)]
pub struct OrgMetadata {
    pub name: felt252,
    pub description: felt252,
    pub owner: ContractAddress,
}

#[starknet::interface]
pub trait IOrganizationFactory<TContractState> {
    fn create_organization(
        ref self: TContractState, name: felt252, description: felt252
    ) -> ContractAddress;
    fn get_organization(self: @TContractState, owner: ContractAddress) -> ContractAddress;
    fn get_org_details(self: @TContractState, owner: ContractAddress) -> OrgMetadata;
    fn update_org_fee(ref self: TContractState, org_owner: ContractAddress, new_fee: u256);
    fn update_org_fee_collector(
        ref self: TContractState, org_owner: ContractAddress, new_collector: ContractAddress
    );
    fn get_token_registry(self: @TContractState) -> ContractAddress;
    fn get_owner(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
mod OrganizationFactory {
    use super::{OrgMetadata, IOrganizationFactory};
    use super::{IOrganizationContractDispatcher, IOrganizationContractDispatcherTrait};
    use starknet::{
        ContractAddress, get_caller_address, get_contract_address, ClassHash,
        syscalls::deploy_syscall
    };
    use starknet::storage::{Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess};
    use core::num::traits::Zero;
    use core::array::ArrayTrait;

    #[storage]
    struct Storage {
        #[allow(starknet::invalid_storage_member_types)]
        owner: ContractAddress,
        #[allow(starknet::invalid_storage_member_types)]
        token_registry: ContractAddress,
        #[allow(starknet::invalid_storage_member_types)]
        organization_class_hash: ClassHash,
        #[allow(starknet::invalid_storage_member_types)]
        organizations: Map<ContractAddress, ContractAddress>,
        #[allow(starknet::invalid_storage_member_types)]
        organization_metadata: Map<ContractAddress, OrgMetadata>,
        #[allow(starknet::invalid_storage_member_types)]
        org_exists: Map<ContractAddress, bool>,
        #[allow(starknet::invalid_storage_member_types)]
        default_fee_collector: ContractAddress,
        #[allow(starknet::invalid_storage_member_types)]
        default_transaction_fee: u256,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        OrganizationCreated: OrganizationCreated,
        FeeUpdated: FeeUpdated,
        FeeCollectorUpdated: FeeCollectorUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct OrganizationCreated {
        owner: ContractAddress,
        organization: ContractAddress,
        name: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct FeeUpdated {
        organization: ContractAddress,
        new_fee: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct FeeCollectorUpdated {
        organization: ContractAddress,
        new_collector: ContractAddress,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        token_registry: ContractAddress,
        organization_class_hash: ClassHash,
        default_fee_collector: ContractAddress,
        default_transaction_fee: u256,
    ) {
        self.owner.write(owner);
        self.token_registry.write(token_registry);
        self.organization_class_hash.write(organization_class_hash);
        self.default_fee_collector.write(default_fee_collector);
        self.default_transaction_fee.write(default_transaction_fee);
    }

    #[abi(embed_v0)]
    impl OrganizationFactoryImpl of IOrganizationFactory<ContractState> {
        fn create_organization(
            ref self: ContractState, name: felt252, description: felt252
        ) -> ContractAddress {
            let caller = get_caller_address();
            assert(!self.org_exists.entry(caller).read(), 'Organization already exists');

            let factory_address = get_contract_address();
            let mut constructor_calldata = array![];
            constructor_calldata.append(caller.into());
            constructor_calldata.append(factory_address.into());
            constructor_calldata.append(self.default_fee_collector.read().into());
            constructor_calldata.append(self.default_transaction_fee.read().low.into());
            constructor_calldata.append(self.default_transaction_fee.read().high.into());

            let (org_address, _) = deploy_syscall(
                self.organization_class_hash.read(), 0, constructor_calldata.span(), false,
            )
                .expect('Deployment failed');

            self.organizations.entry(caller).write(org_address);
            let metadata = OrgMetadata { name, description, owner: caller };
            self.organization_metadata.entry(caller).write(metadata);
            self.org_exists.entry(caller).write(true);

            self.emit(OrganizationCreated { owner: caller, organization: org_address, name });
            org_address
        }

        fn get_organization(self: @ContractState, owner: ContractAddress) -> ContractAddress {
            assert(self.org_exists.entry(owner).read(), 'Organization does not exist');
            self.organizations.entry(owner).read()
        }

        fn get_org_details(self: @ContractState, owner: ContractAddress) -> OrgMetadata {
            assert(self.org_exists.entry(owner).read(), 'Organization does not exist');
            self.organization_metadata.entry(owner).read()
        }

        fn update_org_fee(ref self: ContractState, org_owner: ContractAddress, new_fee: u256) {
            self._only_owner();
            assert(self.org_exists.entry(org_owner).read(), 'Organization does not exist');

            let org_address = self.organizations.entry(org_owner).read();
            let org = IOrganizationContractDispatcher { contract_address: org_address };
            org.update_transaction_fee(new_fee);

            self.emit(FeeUpdated { organization: org_address, new_fee });
        }

        fn update_org_fee_collector(
            ref self: ContractState, org_owner: ContractAddress, new_collector: ContractAddress,
        ) {
            self._only_owner();
            assert(self.org_exists.entry(org_owner).read(), 'Organization does not exist');
            assert(!new_collector.is_zero(), 'Invalid collector');

            let org_address = self.organizations.entry(org_owner).read();
            let org = IOrganizationContractDispatcher { contract_address: org_address };
            org.update_fee_collector(new_collector);

            self.emit(FeeCollectorUpdated { organization: org_address, new_collector });
        }

        fn get_token_registry(self: @ContractState) -> ContractAddress {
            self.token_registry.read()
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _only_owner(self: @ContractState) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'Only owner can call');
        }
    }
}