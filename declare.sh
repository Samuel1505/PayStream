#!/bin/bash

# 🔧 Configuration
ACCOUNT=~/.starkli-wallets/argentx/account.json
KEYSTORE=~/.starkli-wallets/argentx/keystore.json
NETWORK=sepolia

echo "🚀 Starting batch declaration on $NETWORK"
echo "=========================================="

# Loop through all compiled contract class files
for file in target/dev/*.contract_class.json; do
  echo "📦 Declaring: $file ..."
  
  starkli declare "$file" \
    --account "$ACCOUNT" \
    --keystore "$KEYSTORE" \
    --network "$NETWORK"

  echo "✅ Finished declaring: $file"
  echo "------------------------------------------"
done

echo "🎉 All contracts declared successfully!"
