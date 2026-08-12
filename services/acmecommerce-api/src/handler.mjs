import payments from "../data/payments.json" with { type: "json" };
import settlements from "../data/settlements.json" with { type: "json" };
import transactions from "../data/transactions.json" with { type: "json" };

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(body),
});

export async function handler(event) {
  try {
    const method = event.requestContext?.http?.method;

    console.info("Request received", {
      method,
      routeKey: event.routeKey,
      pathParameters: event.pathParameters,
    });

    if (method !== "GET") {
      return jsonResponse(405, { error: "Method not allowed" });
    }

    if (event.routeKey === "GET /payments/{paymentId}") {
      const paymentId = event.pathParameters?.paymentId;
      const payment = payments.find(
        (record) => record.paymentId === paymentId,
      );

      if (!payment) {
        return jsonResponse(404, { error: "Payment not found" });
      }

      return jsonResponse(200, payment);
    }

    if (event.routeKey === "GET /transactions/{transactionHash}") {
      const transactionHash = event.pathParameters?.transactionHash;
      const transaction = transactions.find(
        (record) => record.transactionHash === transactionHash,
      );

      if (!transaction) {
        return jsonResponse(404, { error: "Transaction not found" });
      }

      return jsonResponse(200, transaction);
    }

    if (event.routeKey === "GET /settlements/{paymentId}") {
      const paymentId = event.pathParameters?.paymentId;
      const settlement = settlements.find(
        (record) => record.paymentId === paymentId,
      );

      if (!settlement) {
        return jsonResponse(404, { error: "Settlement not found" });
      }

      return jsonResponse(200, settlement);
    }

    return jsonResponse(404, { error: "Route not found" });
  } catch (error) {
    console.error("Unexpected request failure", error);
    return jsonResponse(500, { error: "Internal server error" });
  }
}
