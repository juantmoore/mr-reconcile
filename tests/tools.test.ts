import assert from "node:assert/strict";
import { test } from "node:test";

import { AcmeCommerceApiError } from "../lib/acmecommerce-api";
import {
  getPaymentDetails,
  getSettlementDetails,
  getTransactionDetails,
} from "../tools/get-payment-details";

const KNOWN_PAYMENT_ID = "pay_2007";
const KNOWN_TRANSACTION_HASH =
  "db5950566eb16cc1a4084be79c9873317aafe46980693f4f69ade9b0ce9ac2c1";
const TOOL_EXECUTION_OPTIONS = {
  toolCallId: "integration-test",
  messages: [],
  context: {},
};

test("getPaymentDetails returns the completed pay_2007 payment", async () => {
  const payment = await getPaymentDetails.execute(
    { paymentId: KNOWN_PAYMENT_ID },
    TOOL_EXECUTION_OPTIONS,
  );

  assert.ok(!(Symbol.asyncIterator in payment));
  assert.equal(payment.paymentStatus, "COMPLETED");
});

test("getTransactionDetails returns the confirmed pay_2007 transaction", async () => {
  const transaction = await getTransactionDetails.execute(
    { transactionHash: KNOWN_TRANSACTION_HASH },
    TOOL_EXECUTION_OPTIONS,
  );

  assert.ok(!(Symbol.asyncIterator in transaction));
  assert.equal(transaction.confirmationStatus, "CONFIRMED");
});

test("getSettlementDetails returns the pending pay_2007 settlement", async () => {
  const settlement = await getSettlementDetails.execute(
    { paymentId: KNOWN_PAYMENT_ID },
    TOOL_EXECUTION_OPTIONS,
  );

  assert.ok(!(Symbol.asyncIterator in settlement));
  assert.equal(settlement.settlementStatus, "PENDING");
});

test("getPaymentDetails propagates a 404 AcmeCommerceApiError", async () => {
  await assert.rejects(
    async () => {
      await getPaymentDetails.execute(
        { paymentId: "pay_9999" },
        TOOL_EXECUTION_OPTIONS,
      );
    },
    (error: unknown) => {
      assert.ok(error instanceof AcmeCommerceApiError);
      assert.equal(error.status, 404);
      return true;
    },
  );
});
