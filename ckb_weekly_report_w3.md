# Builder Track Weekly Report — Week 3
**Name:** Engr. Williams  
**Week Ending:** 01-19-2026

## Courses Completed
- Completed **Module 2** of the CKB Academy course on **CKB Basic Practical Operations**, which included:
  - **Connecting Wallet**: Learned how to connect a MetaMask wallet to CKB testnet for on-chain operations.
  - **What is Transaction?**: Studied the fundamental concepts of transactions in the CKB ecosystem.
  - **Send a Transaction**: Practiced creating and sending transactions on the CKB testnet.
- Successfully connected wallet to testnet and received **100 CKB capacity** assigned to my account for practical exercises 
- Explored the **CKB CCC live environment** at `https://live.ckbccc.com/` to examine real-world transaction implementation patterns.
- Studied the **transfer.ts example** from the CCC repository to understand the complete workflow of transferring native CKB tokens.

## Key Learnings
- **Wallet Integration**: Understood the importance of connecting a wallet before performing any on-chain operations, and how the course automatically assigns capacity upon successful connection.
- **Transaction Lifecycle**: Learned the complete process of transaction composition, including:
  - Defining transaction outputs with lock scripts and capacity
  - Completing inputs by capacity using `tx.completeInputsByCapacity(signer)`
  - Handling transaction fees with `tx.completeFeeBy(signer)`
  - Signing and sending transactions via `signer.sendTransaction(tx)`
- **Transaction Structure**: Deepened understanding of CKB transaction anatomy:
  - **Inputs**: Consumed cells (0 CKB in the example transaction)
  - **Outputs**: Created cells with specified capacity (100 + ? CKB in the example)
  - **Transaction Hash**: Unique identifier for tracking on-chain transactions
- **Practical Code Patterns**: Analyzed the transfer.ts implementation, which demonstrates:
```javascript
  await tx.completeInputsByCapacity(signer);
  await tx.completeFeeBy(signer);
  await render(tx);
```
  This pattern ensures all transaction components are properly assembled before broadcasting.

## Practical Progress
- Successfully connected MetaMask wallet to CKB testnet through the academy interface.
- Received and verified **100 CKB capacity** allocation to my testnet account.
- Executed a test transaction on CKB testnet with the following details:
  - **Transaction Hash**: `0x8bf9bf0828cfa15bed7901098b641097dfd117e1302f0df345cb56c4e88e132d`
  - **Inputs**: 0 CKB
  - **Outputs**: 100 + ? CKB (additional amount pending verification)
  - Successfully completed transaction fee payment and rendering
- Explored the **CKB CCC live playground** to observe real-time transaction construction and execution.
- Examined the **transfer.ts source code** from the CCC GitHub repository to understand best practices for transaction composing:
  - Studied the use of `ccc.Transaction.from()` for creating transactions
  - Learned about `fixedPointFrom()` for handling capacity values
  - Understood the async/await pattern for transaction completion steps

## Environment
- CKB testnet wallet successfully connected via MetaMask.
- Academy account credited with **100 CKB capacity** for practical exercises.
- Access to CKB CCC live environment for testing and visualization.
- Familiarity with the CCC codebase structure, specifically the examples directory.