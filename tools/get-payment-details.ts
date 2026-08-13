import { tool } from "ai";
import { z } from "zod";
import {getPayment, getSettlement, getTransaction} from "@/lib/acmecommerce-api";

export const getPaymentDetails = tool({
    description:
    "Retrieve authoritative AcmeCommerce payment details for a given payment ID.",
    inputSchema: z.object({
        paymentId: z.string().describe("The AcmeCommerce payment ID, for example pay_2007"),
    }),

    execute: async ({paymentId}) => {
        return getPayment(paymentId)
    },
});


export const getTransactionDetails = tool({
    description:
    "Retrieve authoritative blockchain transaction details for an AcmeCommerce payment using its transaction hash.",
    inputSchema: z.object({
        transactionHash: z.string()
        .describe("The blockchain transaction hash. Bitcoin hashes are 64 hexadecimal characters; Ethereum and Base hashes typically begin with 0x."),
    }),

    execute: async ({transactionHash}) => {
        return getTransaction(transactionHash)
    }
})

export const getSettlementDetails = tool({
    description: "Retrieve authoritative merchant settlement details for an AcmeCommerce payment, including settlement status, fees, adjustments, and net amount.",
    inputSchema: z.object({
        paymentId: z.string()
        .describe("The AcmeCommerce payment ID, for example pay_2007")
    }),
    execute: async ({paymentId}) => {
        return getSettlement(paymentId)
    }

})