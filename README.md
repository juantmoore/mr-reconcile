# Dude, Where's My Funds?

An AI-assisted payment reconciliation proof of concept built for the Vercel Solutions Architect take-home assessment.

## Problem Statement

Can we move common payment-reconciliation investigations from synchronous Solutions Engineering escalations to secure, AI-assisted self-service while preserving the existing payment system as the source of truth?

## Scenario

This project models two fictional businesses:

### AcmeCommerce

AcmeCommerce provides a crypto payment product that merchants can integrate into their e-commerce applications.

Its Solutions Engineers help merchants troubleshoot integrations and investigate payment discrepancies.

### ShopCo

ShopCo sells GPUs, local inference hardware, and prebuilt Linux-based AI systems.

ShopCo has integrated AcmeCommerce into its checkout experience and occasionally needs help reconciling crypto payments against its internal order and accounting records.

## The Problem

Most payments reconcile normally. Occasionally, ShopCo's accounting or engineering team sees a discrepancy.

For example:

> “Our order says the customer paid $1,200, but our records show $1,183.30. Where did the difference come from?”

Possible explanations include:

* cryptocurrency price movement
* network or settlement fees
* platform fees
* transaction-to-order mapping issues
* payments that are still pending or failed

A seemingly simple question can trigger a manual investigation involving both companies:

```text
Merchant identifies discrepancy
        ↓
Contact AcmeCommerce
        ↓
Collect transaction/payment information
        ↓
Solutions Engineer investigates internal systems
        ↓
Correlate payment, transaction, and settlement records
        ↓
Back-and-forth with customer
        ↓
Potential live troubleshooting call
        ↓
Explain reconciliation
```

At scale, this creates unnecessary operational cost and a slow customer experience.

**Technical pain:** Payment information must be correlated across systems before a discrepancy can be explained.

**Business pain:** Routine reconciliation questions consume expensive Solutions Engineering time and increase customer time-to-resolution.

## Customer Constraints

The proposed solution must preserve several important boundaries:

* AcmeCommerce's existing payment and transaction systems remain the source of truth.
* Existing payment infrastructure does not need to migrate to Vercel.
* The LLM must not invent payment, fee, settlement, or transaction data.
* The agent receives payment information only through narrowly scoped tools.
* Only the minimum information required to investigate a reconciliation issue should be exposed to the AI layer.
* Production connectivity to private customer systems must be controlled and authenticated.
* The demo uses synthetic data only and contains no real merchant, customer, Coinbase, or transaction data.

## Proposed Solution

Augment the existing payment platform with an AI-assisted reconciliation experience.

A merchant can provide a payment, order, or transaction identifier and ask a question such as:

> “Why doesn't this payment reconcile?”

The reconciliation agent can then use narrowly scoped tools to retrieve authoritative information from the existing payment system, such as:

* payment details
* blockchain transaction details
* settlement details
* fees
* payment status

The agent uses that deterministic information to explain the discrepancy in clear language.

The AI assists with **investigation and explanation**. Existing payment systems remain responsible for establishing financial truth.

## Target Outcomes

The proof of concept is designed around two measurable outcomes:

* Reduce time-to-reconciliation for common payment questions.
* Reduce the number of routine reconciliation issues requiring a Solutions Engineer.

Additional production metrics could include self-service resolution rate and escalation rate.

## Architecture

### Application Stack

* Next.js
* TypeScript
* Deployed on Vercel

### Vercel Primitives

* **AI SDK** — agent orchestration, tool calling, and streaming
* **AI Gateway** — model access, routing, observability, and provider flexibility
* **Secure Compute** — production connectivity between the Vercel application and private customer infrastructure

For the proof of concept, the customer's existing payment environment will be represented by a realistic external mock API. Secure Compute represents the intended production connectivity model rather than something required for the initial demo.

## Data

All payment, merchant, transaction, pricing, and settlement information used by this project is synthetic.

The scenario is informed by real-world payment reconciliation workflows but does not reproduce confidential customer or company data.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` when wiring AI Gateway and the mock payments API.

Never commit real credentials or secrets.
