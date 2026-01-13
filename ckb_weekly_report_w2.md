# Builder Track Weekly Report — Week 2
**Name:** Engr. Williams
**Week Ending:** 01-13-2026

## Courses Completed

*   Completed the remaining modules of the CKB Academy course on **CKB Theoretical Knowledge**. (Progress documented in `images/ckb13.PNG`).
*   Studied the **code workflow** (`images/ckb9.PNG`) and **transaction structure** as detailed in [RFC 0022](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0022-transaction-structure/0022-transaction-structure.md) (`images/ckb10.PNG`).
*   Read about practical applications of CKB concepts in [RFC 0025: Simple UDT](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0025-simple-udt/0025-simple-udt.md).
*   Reviewed [RFC 0024: CKB Genesis Script List](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0024-ckb-genesis-script-list/0024-ckb-genesis-script-list.md) to understand genesis block scripts (`images/ckb11.PNG`).
*   Deepened understanding of how transactions work, and the distinction between **lock scripts** and **type scripts** (`images/ckb12.PNG`, `images/ckb14.PNG`).
*   Went through the [CKB Common Chain Connector (CCC) documentation](https://docs.ckbccc.com/docs/ccc-app) on signing and verifying messages, specifically studying the `Sign.tsx` example from the [CCC repository](https://github.com/ckb-devrel/ccc/blob/master/packages/demo/src/app/connected/(tools)/Sign/page.tsx) (`images/ckb18.PNG`).

## Key Learnings

*   **Cell Dependencies:** Learned that a `CellDep` allows a transaction to depend on another cell, using its `data` field to store executable code.
*   **Code Hash Interpretation:** Understood that the `code_hash` is interpreted differently based on the `hash_type`:
    *   `data` or `data1`: `code_hash` matches the `blake2b_ckbhash` of the dep cell's data.
    *   `type`: `code_hash` matches the `blake2b_ckbhash` of the dep cell's type script.
*   **Message Signing and Verification:** Gained insight into the process of signing and verifying messages within a CKB dApp using `ckb-ccc`, by analyzing the `Sign.tsx` component and its implementation.
*   **CKB Transfers:** Learned the process for transferring CKB on a development network as outlined in the [Nervos documentation](https://docs.nervos.org/docs/dapp/transfer-ckb).

## Practical Progress

*   Successfully set up a local CKB devnet (`images/ckb15.PNG`).
*   Resolved previous installation issues and successfully installed `@offckb/cli` (`images/ckb16.PNG`, `images/ckb17.PNG`).
*   Explored the functionality of the `ccc-app` and a live demo for message signing and verification(`images/ckb19.PNG`, `images/ckb20.PNG`).
*   Examined the codebase for `my-ccc-app/src/components/auth/Sign.tsx` to understand its practical implementation.

## Environment

*   CKB devnet is operational .
*   `@offckb/cli` is installed and functional.
*   Continuing to work with the `my-ccc-app` project created with `create-ccc-app`.
