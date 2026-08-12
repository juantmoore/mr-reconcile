import assert from "node:assert/strict";
import { test } from "node:test";

import {
  AcmeCommerceApiError,
  getPayment,
  getSettlement,
  getTransaction,
} from "../lib/acmecommerce-api";

const KNOWN_PAYMENT_ID = "pay_2007";
const KNOWN_TRANSACTION_HASH =
  "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b";

test("getTransaction returns the known transaction", async () => {
  const transaction = await getTransaction(KNOWN_TRANSACTION_HASH);

  assert.equal(transaction.transactionHash, KNOWN_TRANSACTION_HASH);
  assert.equal(transaction.paymentId, KNOWN_PAYMENT_ID);
  assert.equal(transaction.confirmationStatus, "CONFIRMED");
});

test("getSettlement returns the pending pay_2007 settlement", async () => {
  const settlement = await getSettlement(KNOWN_PAYMENT_ID);

  assert.equal(settlement.paymentId, KNOWN_PAYMENT_ID);
  assert.equal(settlement.settlementStatus, "PENDING");
  assert.equal(settlement.netUsd, null);
  assert.equal(settlement.settledAt, null);
});

test("getPayment throws AcmeCommerceApiError for an unknown payment", async () => {
  await assert.rejects(
    getPayment("pay_9999"),
    (error: unknown) => {
      assert.ok(error instanceof AcmeCommerceApiError);
      assert.equal(error.name, "AcmeCommerceApiError");
      assert.equal(error.status, 404);
      assert.match(error.message, /Payment not found/);
      return true;
    },
  );
});
