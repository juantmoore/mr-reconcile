import assert from "node:assert/strict";
import test from "node:test";

import { handler } from "../src/handler.mjs";

const paymentRequest = (paymentId) => ({
  routeKey: "GET /payments/{paymentId}",
  requestContext: {
    http: {
      method: "GET",
    },
  },
  pathParameters: {
    paymentId,
  },
});

const transactionRequest = (transactionHash) => ({
  routeKey: "GET /transactions/{transactionHash}",
  requestContext: {
    http: {
      method: "GET",
    },
  },
  pathParameters: {
    transactionHash,
  },
});

const settlementRequest = (paymentId) => ({
  routeKey: "GET /settlements/{paymentId}",
  requestContext: {
    http: {
      method: "GET",
    },
  },
  pathParameters: {
    paymentId,
  },
});

test("returns payment pay_2007", async () => {
  const response = await handler(paymentRequest("pay_2007"));
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.paymentId, "pay_2007");
  assert.equal(body.merchantOrderId, "ORDER-2007");
  assert.equal(body.expectedUsd, 890);
  assert.equal(body.currency, undefined);
});

test("returns 404 for an unknown payment", async () => {
  const response = await handler(paymentRequest("pay_missing"));

  assert.equal(response.statusCode, 404);
  assert.deepEqual(JSON.parse(response.body), {
    error: "Payment not found",
  });
});

test("returns the transaction for pay_2007", async () => {
  const transactionHash =
    "db5950566eb16cc1a4084be79c9873317aafe46980693f4f69ade9b0ce9ac2c1";
  const response = await handler(transactionRequest(transactionHash));
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.transactionHash, transactionHash);
  assert.equal(body.paymentId, "pay_2007");
  assert.equal(body.confirmationStatus, "CONFIRMED");
});

test("returns 404 for an unknown transaction", async () => {
  const response = await handler(transactionRequest("0xmissing"));

  assert.equal(response.statusCode, 404);
  assert.deepEqual(JSON.parse(response.body), {
    error: "Transaction not found",
  });
});

test("returns the settlement for pay_2007", async () => {
  const response = await handler(settlementRequest("pay_2007"));
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.paymentId, "pay_2007");
  assert.equal(body.settlementId, "set_2007");
  assert.equal(body.settlementStatus, "PENDING");
});

test("returns 404 for an unknown settlement", async () => {
  const response = await handler(settlementRequest("pay_missing"));

  assert.equal(response.statusCode, 404);
  assert.deepEqual(JSON.parse(response.body), {
    error: "Settlement not found",
  });
});
