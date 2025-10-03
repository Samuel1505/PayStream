// ===========================
// TOKEN REGISTRY CONTRACT
// ===========================
// File: src/token_registry.cairo

use starknet::ContractAddress;

#[starknet::interface]
trait ITokenRegistryTrait<TContractState> {
    fn add_token(ref self: TContractState, token_address: ContractAddress);
    fn remove_token(ref self: TContractState, token_address: ContractAddress);
    fn is_supported(self: @TContractState, token_address: ContractAddress) -> bool;
    fn get_owner(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
mod TokenRegistry {
    use super::ITokenRegistryTrait;
    use starknet::{ContractAddress, get_caller_address};
    use starknet::storage::{Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        owner: ContractAddress,
        supported_tokens: Map<ContractAddress, bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TokenAdded: TokenAdded,
        TokenRemoved: TokenRemoved,
    }

    #[derive(Drop, starknet::Event)]
    struct TokenAdded {
        token_address: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct TokenRemoved {
        token_address: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
    }

    #[abi(embed_v0)]
    impl TokenRegistryImpl of ITokenRegistryTrait<ContractState> {
        fn add_token(ref self: ContractState, token_address: ContractAddress) {
            self._only_owner();
            self.supported_tokens.entry(token_address).write(true);
            self.emit(TokenAdded { token_address });
        }

        fn remove_token(ref self: ContractState, token_address: ContractAddress) {
            self._only_owner();
            self.supported_tokens.entry(token_address).write(false);
            self.emit(TokenRemoved { token_address });
        }

        fn is_supported(self: @ContractState, token_address: ContractAddress) -> bool {
            self.supported_tokens.entry(token_address).read()
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