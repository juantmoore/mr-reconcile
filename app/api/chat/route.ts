import { createAgentUIStreamResponse } from "ai";
import { reconciliationAgent } from "@/agents/reconciliation-agent";

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent: reconciliationAgent,
    uiMessages: messages,
  });
}