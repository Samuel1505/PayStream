# PayStream

**A streamlined salary disbursement platform on StarkNet**

PayStream enables companies to pay employees via direct wallet-to-wallet transfers with low fees, real-time tracking, and no custodial holdings. Built using Cairo on the StarkNet ecosystem, PayStream focuses on secure, auditable on-chain payroll flows while keeping the UX developer- and finance-friendly.

---

## Table of Contents

* [Inspiration](#inspiration)
* [What it does](#what-it-does)
* [How we built it](#how-we-built-it)

  * [Architecture Overview](#architecture-overview)
  * [Smart Contracts (Cairo / StarkNet)](#smart-contracts-cairo--starknet)
  * [Backend & APIs](#backend--apis)
  * [Frontend / UX](#frontend--ux)
  * [Integrations](#integrations)
* [Getting started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Local development](#local-development)
  * [Testing](#testing)
  * [Deployment](#deployment)
* [Challenges we ran into](#challenges-we-ran-into)
* [Accomplishments that we're proud of](#accomplishments-that-were-proud-of)
* [What we learned](#what-we-learned)
* [What's next for PayStream](#whats-next-for-paystream)
* [Security considerations](#security-considerations)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Inspiration

Traditional payroll systems are slow, opaque, and expensive when crossing borders. Crypto-native companies and remote teams need a way to reliably and transparently disburse salaries that:

* Avoids holding users' funds in a custodial account.
* Keeps fees low by leveraging L2 throughput and native token rails.
* Provides auditable, verifiable records for compliance and accounting.

We built PayStream to serve on-chain payroll flows for teams that want the benefits of blockchain settlement without sacrificing compliance, traceability, or usability.

---

## What it does

PayStream provides:

* **Batch salary scheduling**: Create payroll batches (recurring or one-off) which atomically settle via wallet-to-wallet transfers.
* **Non-custodial flow**: The platform never custody funds — the payer signs and funds transactions from their wallet; PayStream coordinates and verifies settlement.
* **Real-time tracking**: Live status for each payment (queued, signed, broadcast, confirmed, failed) with block-level references and hashes.
* **Low-cost settlement**: Cost-optimized transactions on StarkNet (bundled where possible to reduce per-payment fee overhead).
* **Payroll primitives**: On-chain payroll objects (payroll batch, recipient line items, scheduled windows, and payment receipts) stored in Cairo contracts for auditability.
* **Compliance hooks**: Exportable CSV/JSON receipts, optional off-chain KYC/AML integration points, and webhooks for accounting/ERP systems.

---

## How we built it

### Architecture Overview

1. **Frontend**: React + TypeScript web app for payroll managers to create and manage payrolls.
2. **Backend**: Node.js (or Rust/Go as preferred) service handling orchestration, integrations (KYC, email, accounting), and signing flows.
3. **StarkNet Layer**: Cairo smart contracts that represent payroll primitives and event emission for audit logs.
4. **Wallet interactions**: Connect via Argent, Braavos, or any StarkNet-compatible wallet for signing transactions. Optionally support sponsored transactions / pay-for-gas relayers.
5. **Event indexing**: A lightweight indexer (e.g., using The Graph or a custom off-chain indexer) to surface payment statuses and receipts in the app.

Diagram (conceptual):

`Payroll Manager (UI)` ⇄ `Backend Orchestrator` ⇄ `Wallet / Signer` ⇄ `StarkNet (Cairo Contracts)`

### Smart Contracts (Cairo / StarkNet)

Key contracts and responsibilities:

* `PayrollFactory` — deploys `PayrollBatch` instances or registers scheduled payrolls.
* `PayrollBatch` — a per-payroll contract that contains line items, metadata, recurrence, and emits events when payments are settled.
* `PaymentEscrow` (optional) — a minimal escrow pattern only when a payer explicitly deposits funds for a payroll run (REMEMBER: PayStream’s default mode is non-custodial; escrow is optional and must be opt-in and auditable).
* `FeeManager` — optional contract to manage platform fee logic and fee recipients.
* `Receipt` events — every payment emits a `PaymentRecorded` event with recipient, amount, payer, timestamp, tx hash, and reference ID.

Design notes:

* Keep contracts small and composable. Prefer multiple focused contracts to minimize upgrade surface.
* Emit rich events for every meaningful state change so off-chain components can index reliably.
* Avoid holding funds in platform-owned addresses unless the customer explicitly opts into escrow (and clearly reveals custodian status in UI and legal terms).

### Backend & APIs

Responsibilities:

* Orchestration: Accept payroll creation requests, format line items, and prepare signed transactions for the payer.
* Wallet helpers: Facilitate PayStream's signing UX (e.g., batch signed messages) and fallback relayer signing for pay-for-gas flows.
* Indexer & notifications: Subscribe to StarkNet events and update payment statuses, then notify users with webhooks/emails.
* Accounting exports: Generate CSV/JSON of payroll runs and receipts for accounting.

API example endpoints (REST):

* `POST /api/payrolls` — create a new payroll batch
* `GET /api/payrolls/:id` — fetch payroll metadata and status
* `POST /api/payrolls/:id/prepare` — prepare transactions and return signing payloads
* `POST /api/payrolls/:id/submit` — submit signed txs (or instruct relayer)
* `GET /api/payrolls/:id/receipts` — fetch receipts

### Frontend / UX

* Payroll creation wizard: spreadsheet-like UI for adding recipients, amounts, and metadata.
* Wallet integration: Connect & sign flows. Offer manual signature for each user or an aggregated batch signature flow.
* Activity feed: Real-time status updates and links to StarkNet block/tx explorers.
* Exports & webhooks: Download payroll receipts and set webhook URLs for ERP syncing.

### Integrations

* Wallets: Argent, Braavos, Braavos-Connector, Argent X (if available for StarkNet), and universal WalletConnect-style adapters.
* Accounting tools: QuickBooks, Xero, local accounting CSV exports.
* KYC/AML: Optional integration points for customer verification providers.
* Relayer services: For sponsored/sticky gas payment flows if the payer or company chooses to sponsor.

---

## Getting started

### Prerequisites

* Node.js (>=18), npm/yarn
* Rust and Cairo toolchain installed for building Cairo contracts (scarb/snforge/whatever the current recommended toolchain is)
* StarkNet devnet (e.g., OpenZeppelin Starknet-devnet or alpha/starknet-devnet) or testnet account
* A StarkNet wallet for signing (testnet/devnet supported wallets)

### Local development

1. Clone the repo:

```bash
git clone https://github.com/your-org/paystream.git
cd paystream
```

2. Install packages for frontend and backend:

```bash
cd app && npm install
cd ../backend && npm install
```

3. Start StarkNet devnet and deploy contracts (example commands — adapt to your toolchain):

```bash
# Start local devnet (example):
starknet-devnet --seed 0

# Deploy contracts using snforge/scarb or your favorite tool:
scarb build
snforge deploy --network dev
```

4. Configure local environment variables `.env` for backend (RPC URL, signer keys, webhook URLs, etc.)

5. Start services:

```bash
# in root
cd backend && npm run dev
cd ../app && npm run dev
```

### Testing

* Unit tests for Cairo contracts (use snforge/test or the Cairo test runner). Aim for high coverage on payment flows and receipts.
* Integration tests: Simulate an end-to-end payroll run on a devnet with test wallets.
* Property tests: Validate invariants such as "total payroll amount equals sum of line items" and "no double-payments for a single recipient in the same payroll run."

### Deployment

* Deploy contracts to StarkNet testnet/mainnet using your chosen deployment tool.
* Deploy backend to a cloud provider (VPS, DigitalOcean, AWS, Render, etc.).
* Configure your relayer and webhook endpoints.
* Make sure to rotate/revoke private keys and use KMS or Vault for key storage.

---

## Challenges we ran into

* **Wallet UX differences**: Multiple StarkNet wallets behave differently across devnet/testnet/mainnet which made building a unified signing UX challenging.
* **Gas UX and sponsorship**: Ensuring payers could reliably authorize gas sponsorship without exposing private keys required careful relayer design and replay protection.
* **On-chain indexing**: Relying on quick, reliable event indexing required building a robust off-chain indexer to supplement block explorers.
* **Regulatory clarity**: Non-custodial flows are simpler, but some customers asked for escrow. Supporting both models while maintaining clear legal/UX distinctions required additional product and security work.
* **Cairo toolchain friction**: Tooling for building/testing varied across versions; build scripts and CI needed to be resilient to toolchain changes.

---

## Accomplishments that we're proud of

* **Non-custodial payroll primitives**: Designed payroll contracts that keep the platform out of the custody path by default while still providing verifiable receipts.
* **Batch signing flow**: Implemented a batch signing UX that reduces friction for payroll managers while preserving per-payment auditability.
* **Low-fee settlement**: Optimized transaction bundling and gas usage to keep per-employee fees competitive with or below legacy cross-border options.
* **Comprehensive test coverage**: Unit and integration tests that simulate edge cases (retries, partial failures, duplicate recipients).
* **Exportable, auditable receipts**: Built export formats and webhook hooks that made it easy to plug payroll runs into accounting workflows.

---

## What we learned

* Developer tooling for Cairo and StarkNet evolves fast — pin versions and automate environment setup for contributors.
* UX matters: Wallet inconsistencies are a major source of friction; give users explicit, clear steps and meaningful error messages.
* Non-custodial flow simplifies legal exposure but changes the mental model for payroll managers used to "funding the platform" — education and clear UI copy are essential.
* Event-first contract design (emit rich events) makes indexing and reconciliation significantly easier.

---

## What's next for PayStream

Planned improvements and roadmap items:

* **Relayer marketplace**: Allow companies to choose a relayer or sponsor model for gas payments.
* **Multi-asset payrolls**: Support paying in multiple tokens with an on-chain exchange or payment routing option.
* **Payroll scheduling & retries**: More robust retries and partial-fail handling with automatic fallback strategies.
* **Native fiat on/off ramps**: Integrate compliant fiat rails for companies that want on-chain + fiat hybrid flows.
* **Advanced compliance features**: Native support for country-specific payroll rules, tax withholding hooks, and standardized receipts for audits.
* **Improved monitoring & alerting**: SLA dashboards and on-call alerting for failed payroll runs.

---

## Security considerations

* **Key management**: Never store raw private keys in plaintext. Use KMS/HashiCorp Vault or cloud KMS for signer keys.
* **Replay protection**: Implement nonce and chain-specific replay protection for signed payloads.
* **Minimal on-chain trust**: Avoid long-term custody of funds. If escrow is used, make the escrow contract minimal, auditable, and optionally multi-sig.
* **Audits**: Conduct regular smart contract audits and bug-bounty programs for core contracts.

---

## Contributing

We welcome contributors. Please read `CONTRIBUTING.md` for guidelines on code standards, testing, and the pull request process.

High-level suggestions:

* Run Cairo contract tests locally and in CI with pinned toolchain versions.
* Run frontend and backend linters and unit tests before submitting PRs.

---

## License

This project is released under the MIT License. See `LICENSE` for details.

---

## Contact

If you have questions, feedback, or want to work with us, email: `team@paystream.example` or open an issue in this repository.

---

*Last updated: Oct 16, 2025*
