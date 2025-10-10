#[cfg(test)]
mod tests {
    use smartcontract::organization_factory::{
        IOrganizationFactoryDispatcher, IOrganizationFactoryDispatcherTrait
    };
    use starknet::ContractAddress;
    use starknet::testing::deploy_syscall;
    use starknet::class_hash::ClassHash;

    #[test]
    fn test_factory_constructor() {
        use starknet::testing::contract_address_const;
        let token_registry = contract_address_const::<2>();
        let org_class = ClassHash::from_u128(1234);
        let fee_collector = contract_address_const::<3>();
        let default_fee: u256 = 100;

        let class_hash = ClassHash::from_u128(2001);
        let contract_address = deploy_syscall(class_hash);
        let factory = IOrganizationFactoryDispatcher { contract_address };

        assert(factory.get_owner() == owner, 'Owner mismatch');
        assert(factory.get_token_registry() == token_registry, 'Registry mismatch');
    }

    #[test]
    fn test_create_organization() {
        use starknet::testing::contract_address_const;
        let token_registry = contract_address_const::<2>();
        let org_class = ClassHash::from_u128(555);
        let collector = contract_address_const::<3>();
        let default_fee: u256 = 100;

        let class_hash = ClassHash::from_u128(2001);
        let contract_address = deploy_syscall(class_hash);
        let factory = IOrganizationFactoryDispatcher { contract_address };

        let name: felt252 = 'PayCorp';
        let description: felt252 = 'Salary system';
        let org_address = factory.create_organization(name, description);

        let org_details = factory.get_org_details(owner);
        assert(org_details.name == name, 'Org name mismatch');
        assert(org_details.description == description, 'Org description mismatch');
        assert(org_details.owner == owner, 'Org owner mismatch');
    }
}
