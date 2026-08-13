import "server-only";

const BASE_URL =
  process.env.ACMECOMMERCE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("ACMECOMMERCE_API_BASE_URL is not configured");
}

export interface Payment {
  paymentId: string;
  merchantOrderId: string;
  transactionHash: string;
  expectedUsd: number;
  network: string;
  paymentStatus: "COMPLETED" | "PENDING";
  createdAt: string;
}

export interface Transaction {
  transactionHash: string;
  paymentId: string;
  network: string;
  asset: string;
  assetAmount: number;
  quotePriceUsd: number;
  executionPriceUsd: number;
  grossUsd: number;
  networkFeeUsd: number;
  confirmationStatus: "CONFIRMED" | "PENDING";
  confirmations: number;
  requiredConfirmations: number;
  submittedAt: string;
  confirmedAt: string | null;
}

export interface Settlement {
  settlementId: string;
  paymentId: string;
  grossUsd: number;
  adjustments: { quoteProtectionUsd: number };
  fees: { networkUsd: number; platformUsd: number };
  netUsd: number | null;
  settlementStatus: "COMPLETED" | "PENDING";
  settledAt: string | null;
}

export class AcmeCommerceApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AcmeCommerceApiError";
  }
}

async function throwApiError(
  response: Response,
  resource: string,
): Promise<never> {
  let apiMessage: string | undefined;

  try {
    const body = (await response.json()) as { error?: string };
    apiMessage = body.error;
  } catch {

  }

  const detail = apiMessage || response.statusText || "Unknown provider error";

  throw new AcmeCommerceApiError(
    response.status,
    `${resource} request failed (${response.status}): ${detail}`,
  );
}

export async function getPayment(paymentId: string): Promise<Payment> {
  const response = await fetch(
    `${BASE_URL}/payments/${encodeURIComponent(paymentId)}`,
  );

  if (!response.ok) {
    await throwApiError(response, "Payment");
  }

  return (await response.json()) as Payment;
}

export async function getTransaction(
  transactionHash: string,
): Promise<Transaction> {
  const response = await fetch(
    `${BASE_URL}/transactions/${encodeURIComponent(transactionHash)}`,
  );

  if (!response.ok) {
    await throwApiError(response, "Transaction");
  }

  return (await response.json()) as Transaction;
}

export async function getSettlement(paymentId: string): Promise<Settlement> {
  const response = await fetch(
    `${BASE_URL}/settlements/${encodeURIComponent(paymentId)}`,
  );

  if (!response.ok) {
    await throwApiError(response, "Settlement");
  }

  return (await response.json()) as Settlement;
}