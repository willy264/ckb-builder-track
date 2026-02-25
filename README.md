# ckb-builder-track

This repository tracks hands-on CKB Builder Track progress and contains two working codebases:

- `developer-training-course/` (Nervos L1 training examples/labs)
- `my-ccc-app/` (React + CCC app scaffold)

## Repository layout

- `ckb_weekly_report_w1.md` ... `ckb_weekly_report_w7.md`: weekly progress reports
- `images/`: screenshots used in reports
- `developer-training-course/`: lab exercises and examples from the Nervos training materials
- `my-ccc-app/`: CCC-based frontend project

## Prerequisites

- Git
- Node.js `20.18.3` (recommended)
- npm (comes with Node)
- `pnpm` (for `my-ccc-app`)
- `@offckb/cli` (for local CKB devnet)

### Recommended Node setup (Windows)

```powershell
nvm install 20.18.3
nvm use 20.18.3
node -v
```

If `nvm use` fails with:
`'C:\Users\Engr.' is not recognized ...`
set `nvm` root to the short path format once:

```powershell
nvm root C:\Users\<YOUR_SHORT_USER>\AppData\Local\nvm
nvm use 20.18.3
```

## Clone and setup

```powershell
git clone <YOUR_REPO_URL>
cd ckb-builder-track
```

Install global tools:

```powershell
npm i -g @offckb/cli pnpm
```

Install local dependencies:

```powershell
cd developer-training-course
npm i
cd ..\my-ccc-app
pnpm i
cd ..
```

## Start local CKB devnet

Run in a dedicated terminal:

```powershell
cd <repo-root>
offckb node
```

Expected healthy output includes:

- `Launching CKB devnet Node...`
- `CKB devnet RPC Proxy server running on http://127.0.0.1:28114`

## Verify RPC is working

```powershell
$body='{"id":1,"jsonrpc":"2.0","method":"get_tip_block_number","params":[]}'
Invoke-RestMethod -Uri http://127.0.0.1:28114 -Method Post -Body $body -ContentType 'application/json'
```

Note: opening `http://127.0.0.1:28114` in a browser uses `GET` and returns method-not-allowed by design.

## Run developer training course examples/labs

From repo root:

```powershell
node developer-training-course/Introduction-to-Lumos-Example/find_outpoint.js
node developer-training-course/Introduction-to-Lumos-Example/index.js
node developer-training-course/Lab-Calculating-Capacity-Requirements-Exercise/index.js
```

Alternative (inside each folder):

```powershell
cd developer-training-course\Introduction-to-Lumos-Example
node find_outpoint.js
node index.js
```

```powershell
cd developer-training-course\Lab-Calculating-Capacity-Requirements-Exercise
node index.js
```

## Run/build the CCC app

```powershell
cd my-ccc-app
pnpm start
```

Build:

```powershell
pnpm build
```

## Common troubleshooting

### 1) `EADDRINUSE` on port `28114`

Another process is already using the RPC proxy port.

```powershell
Get-NetTCPConnection -LocalPort 28114 -State Listen
Get-NetTCPConnection -LocalPort 28114 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Get-Process ckb -ErrorAction SilentlyContinue | Stop-Process -Force
```

Then restart:

```powershell
offckb node
```

### 2) CKB panic with lock file / database in use

This means stale `ckb` processes are still alive. Stop existing `ckb` + `offckb` listeners, then start node once.

### 3) `Live cell not found at out point`

The referenced input cell has already been spent. Use:

```powershell
node developer-training-course/Introduction-to-Lumos-Example/find_outpoint.js
```

or use dynamic cell collection (as implemented in `Lab-Calculating-Capacity-Requirements-Exercise/index.js`).

### 4) `ckb-cli` not found

`ckb-cli` is not bundled by default in this repository environment. For devnet account/transfer workflows, use `offckb accounts`, `offckb transfer`, and RPC checks unless `ckb-cli` is installed separately.

## Notes

- `developer-training-course/config.json` is currently configured for local devnet usage.
- Keep `offckb node` running while executing lab scripts that send transactions.

