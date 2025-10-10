#[cfg(test)]
mod tests {
    use smartcontract::organization_contract::{
        IOrganizationContractDispatcher, IOrganizationContractDispatcherTrait
    };
    use starknet::ContractAddress;
    use starknet::testing::ContractClass;
    use starknet::testing::*;
    use starknet::contract_address_const;
    use starknet::class_hash_const;

    use starknet::class_hash::ClassHash;
 

    #[test]
    fn test_constructor_initialization() {
        use starknet::testing::contract_address_const;
        let factory = contract_address_const::<2>();
        let collector = contract_address_const::<3>();
        let transaction_fee: u256 = 100;

        // Deploy contract class
        let class_hash = class_hash_const::<1001>();
        let contract_address = deploy_syscall(class_hash);

        // Dispatcher for calling contract methods
        let contract = IOrganizationContractDispatcher { contract_address };

        // Verify initialization values
        assert(contract.get_owner() == owner, 'Owner mismatch');
        assert(contract.get_transaction_fee() == transaction_fee, 'Fee mismatch');
    }

    #[test]
    fn test_create_and_get_recipient() {
        use starknet::testing::contract_address_const;
        let factory = contract_address_const::<2>();
        let collector = contract_address_const::<3>();
        let transaction_fee: u256 = 100;

        let class_hash = class_hash_const::<1001>();
        let contract_address = deploy_syscall(class_hash);
        let contract = IOrganizationContractDispatcher { contract_address };

        let wallet = contract_address_const::<4>();
        let salary: u256 = 1000;
        let advance_limit: u256 = 500;
        let name: felt252 = 'Alice';

        let id = contract.create_recipient(name, wallet, salary, advance_limit);
        let recipient = contract.get_recipient(id);

        assert(recipient.name == name, 'Name mismatch');
        assert(recipient.wallet == wallet, 'Wallet mismatch');
        assert(recipient.salary == salary, 'Salary mismatch');
    }

    #[test]
    fn test_update_salary() {
        use starknet::testing::contract_address_const;
        let factory = contract_address_const::<2>();
        let collector = contract_address_const::<3>();
        let transaction_fee: u256 = 100;

        let class_hash = class_hash_const::<1001>();
        let contract_address = deploy_syscall(class_hash);
        let contract = IOrganizationContractDispatcher { contract_address };

        let wallet = contract_address_const::<4>();
        let salary: u256 = 1000;
        let advance_limit: u256 = 500;
        let name: felt252 = 'Bob';

        let id = contract.create_recipient(name, wallet, salary, advance_limit);
        contract.update_salary(id, 2000);

        let recipient = contract.get_recipient(id);
        assert(recipient.salary == 2000, 'Salary not updated');
    }

    #[test]
    fn test_request_and_approve_advance() {
        use starknet::testing::contract_address_const;
        let factory = contract_address_const::<2>();
        let collector = contract_address_const::<3>();
        let transaction_fee: u256 = 100;

        let class_hash = class_hash_const::<1001>();
        let contract_address = deploy_syscall(class_hash);
        let contract = IOrganizationContractDispatcher { contract_address };

        let wallet = contract_address_const::<4>();
        let salary: u256 = 1000;
        let advance_limit: u256 = 500;
        let name: felt252 = 'Carol';
        let id = contract.create_recipient(name, wallet, salary, advance_limit);

        let token = contract_address_const::<10>();
        contract.approve_advance(id, 400, token);

        let recipient = contract.get_recipient(id);
        assert(recipient.has_advance, 'Advance not marked');
        assert(recipient.current_advance == 400, 'Advance amount mismatch');
    }

    #[test]
    fn test_update_transaction_fee() {
        use starknet::testing::contract_address_const;
        let factory = contract_address_const::<2>();
        let collector = contract_address_const::<3>();
        let transaction_fee: u256 = 50;

        let class_hash = class_hash_const::<1001>();
        let contract_address = deploy_syscall(class_hash);
        let contract = IOrganizationContractDispatcher { contract_address };

        contract.update_transaction_fee(200);
        assert(contract.get_transaction_fee() == 200, 'Fee not updated');
    }
}
