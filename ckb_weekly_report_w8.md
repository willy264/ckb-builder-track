# Builder Track Weekly Report - Week 8

**Name:** Williams Akinwamide.  
**Week Ending:** 02-03-2026

## Courses Completed

- Continued the L1 Developer Training Course Transactions/Data Management path:
- Working with Cell Collection  
  Source: `https://nervos.gitbook.io/developer-training-course/transactions/working-with-cell-collection`
- Lab: Implement Automated Cell Collection  
  Source: `https://nervos.gitbook.io/developer-training-course/transactions/lab-implement-automated-cell-collection`
- Storing Data in a Cell  
  Source: `https://nervos.gitbook.io/developer-training-course/data-management/storing-data-in-a-cell`
- Lab: Store a File in a Cell  
  Source: `https://nervos.gitbook.io/developer-training-course/data-management/lab-store-a-file-in-a-cell`
- Updating Data in a Cell  
  Source: `https://nervos.gitbook.io/developer-training-course/data-management/updating-data-in-a-cell`
- Lab: Updating Data in a Cell  
  Source: `https://nervos.gitbook.io/developer-training-course/data-management/lab-updating-data-in-a-cell`

## Key Learnings

### 1. Cell Collection

- Moved from manual outpoint selection to automated input discovery using Lumos.
- Used `CellCollector`/`collectCapacity` patterns to gather enough live cells for outputs, fee, and change.
- Applied standard capacity requirement pattern:
  - `required = outputCapacity + minChange(61 CKBytes) + txFee`
- Reinforced why this is required for real dApps: manual outpoints are not scalable or reliable.

### 2. Storing Data in Cells

- Practiced converting file content to hex and storing it directly in output cell `data`.
- Applied cell capacity sizing for data cells:
  - `cellCapacity = 61 CKBytes + dataSize(bytes)`
- Used file-size-to-hex-size conversion to avoid underfunded outputs.
- Validated output structures with `type: null` and correct lock scripts for ownership.

### 3. Updating Data in Cells

- Reinforced CKB immutability model:
  - existing cell is consumed
  - new cell is created with updated data
- Used filtered collection/query logic to target cells containing specific existing data.
- Implemented extra capacity collection when new data output was larger than old input capacity.

## Practical Progress

### A. Lumos Lab Implementation

- Completed and ran:
  - `Lab-Implement-Automated-Cell-Collection-Exercise/index.js`
  - `Lab-Store-a-File-in-a-Cell-Exercise/index.js`
  - `Lab-Updating-Data-in-a-Cell-Exercise/index.js`
- Confirmed successful flow: initialize -> compose tx -> sign -> send -> wait for commit.
- Validated all labs against OffCKB local devnet setup.

### B. CCC App Upgrade (Main Work Addition)

- Upgraded `my-ccc-app` into a practical multi-network transfer demo.
- Switched redesign implementation to Tailwind utilities (instead of raw component CSS styling).
- Added a dedicated network selector component:
  - `my-ccc-app/src/components/NetworkSelector.tsx`
- Updated provider/client handling for stable network switching:
  - `my-ccc-app/src/layoutProvider.tsx`
  - uses `ClientPublicTestnet` and `ClientPublicMainnet`
- Updated transfer logic to be network-aware:
  - `my-ccc-app/src/components/TransferCkb.tsx`
  - validates address prefix against selected network (`ckt1` / `ckb1`)
  - routes explorer links to testnet or mainnet explorer accordingly
  - shows active network state in transfer panel
- Updated wallet panel to display network context with address:
  - `my-ccc-app/src/components/ConnectWallet.tsx`
- Wired selector into main app UI:
  - `my-ccc-app/src/App.tsx`

## Issues Faced and Fixes

- **Issue:** UI redesign initially depended on raw custom CSS classes.  
  **Fix:** Refactored to Tailwind utility-based classes.
- **Issue:** Risk of cross-network transfer mistakes.  
  **Fix:** Added network selector + prefix checks + wallet disconnect on network switch.
- **Issue:** Build/ESLint environment conflicts on local machine.  
  **Fix:** Confirmed functional correctness with TypeScript checks and successful production compile; warnings were external plugin/source-map environment issues.

## Environment and Verification

- **Local chain for labs:** OffCKB devnet RPC `http://127.0.0.1:28114`
- **Node runtime:** `v20.18.3`
- **Type validation (CCC app):** `tsc --noEmit` passed
- **Build validation:** app compiled successfully (with non-blocking dependency/environment warnings)

## Images of Progress

![CKB Progress 51](./images/ckb51.PNG)
![CKB Progress 52](./images/ckb52.PNG)
![CKB Progress 53](./images/ckb53.PNG)
