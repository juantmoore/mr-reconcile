import type { ReconciliationAgentUIMessage } from "@/agents/reconciliation-agent";
import type { InvestigationStep } from "@/components/InvestigationTrace";

export function mapInvestigationSteps(
  message?: ReconciliationAgentUIMessage,
): InvestigationStep[] {
  if (!message) {
    return [];
  }

  const steps: InvestigationStep[] = [];

  for (const part of message.parts) {
    switch (part.type) {
      case "tool-get-payment-details": {
        if (part.state !== "output-available") {
          steps.push({
            type: "payment",
            label: "Payment lookup",
            detail: "Checking payment record",
            reference: part.input?.paymentId ?? "—",
            amount: "—",
            status: "checking",
          });

          break;
        }

        const payment = part.output;

        steps.push({
          type: "payment",
          label: "Payment lookup",
          detail: "Payment record retrieved",
          reference: payment.paymentId,
          amount: "—",
          status:
            payment.paymentStatus === "COMPLETED"
              ? "completed"
              : "pending",
        });

        break;
      }

      case "tool-get-transaction-details": {
        if (part.state !== "output-available") {
          steps.push({
            type: "transaction",
            label: "Blockchain verification",
            detail: "Checking blockchain transaction",
            reference: part.input?.transactionHash
              ? shortenHash(part.input.transactionHash)
              : "—",
            amount: "—",
            status: "checking",
          });

          break;
        }

        const transaction = part.output;

        steps.push({
          type: "transaction",
          label: "Blockchain verification",
          detail: `${transaction.confirmations} of ${transaction.requiredConfirmations} confirmations`,
          reference: shortenHash(transaction.transactionHash),
          amount: `${transaction.assetAmount} ${transaction.asset}`,
          status:
            transaction.confirmationStatus === "CONFIRMED"
              ? "confirmed"
              : "pending",
        });

        break;
      }

      case "tool-get-settlement-details": {
        if (part.state !== "output-available") {
          steps.push({
            type: "settlement",
            label: "Settlement lookup",
            detail: "Checking merchant settlement",
            reference: part.input?.paymentId ?? "—",
            amount: "—",
            status: "checking",
          });

          break;
        }

        const settlement = part.output;

        steps.push({
          type: "settlement",
          label: "Settlement lookup",
          detail:
            settlement.settlementStatus === "COMPLETED"
              ? "Merchant settlement completed"
              : "Merchant settlement has not completed",
          reference: settlement.settlementId,
          amount:
            settlement.netUsd === null
              ? "—"
              : `$${settlement.netUsd.toFixed(2)}`,
          status:
            settlement.settlementStatus === "COMPLETED"
              ? "completed"
              : "pending",
        });

        break;
      }
    }
  }

  return steps;
}

function shortenHash(hash: string) {
  if (hash.length <= 14) {
    return hash;
  }

  return `${hash.slice(0, 6)}…${hash.slice(-5)}`;
}