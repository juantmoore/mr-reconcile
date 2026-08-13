import assert from "node:assert/strict";
import { test } from "node:test";

import { reconciliationAgent } from "../agents/reconciliation-agent";
import evalCasesJson from "./eval-cases.json";

interface ProhibitedClaim {
  description: string;
  pattern: string;
}

interface EvalCase {
  id: string;
  prompt: string;
  requiredTools: string[];
  requiredFacts: string[][];
  prohibitedClaims: ProhibitedClaim[];
  maxSteps: number;
}

const evalCases = evalCasesJson as EvalCase[];

for (const evalCase of evalCases) {
  test(`reconciliationAgent eval: ${evalCase.id}`, async () => {
    const result = await reconciliationAgent.generate({
      prompt: evalCase.prompt,
    });
    const toolCalls = result.steps.flatMap((step) =>
      step.toolCalls.map((toolCall) => toolCall.toolName),
    );
    const response = result.text.toLowerCase();

    console.log(`\n[${evalCase.id}] Tools: ${toolCalls.join(" → ")}`);
    console.log(`[${evalCase.id}] Steps: ${result.steps.length}`);
    console.log(`[${evalCase.id}] Response:\n${result.text}\n`);

    for (const requiredTool of evalCase.requiredTools) {
      assert.ok(
        toolCalls.includes(requiredTool),
        `${evalCase.id}: expected tool ${requiredTool} to be called`,
      );
    }

    assert.ok(
      result.steps.length <= evalCase.maxSteps,
      `${evalCase.id}: expected at most ${evalCase.maxSteps} steps, received ${result.steps.length}`,
    );

    for (const requiredTerms of evalCase.requiredFacts) {
      assert.ok(
        requiredTerms.every((term) => response.includes(term.toLowerCase())),
        `${evalCase.id}: response must include ${requiredTerms.join(", ")}`,
      );
    }

    for (const prohibitedClaim of evalCase.prohibitedClaims) {
      assert.ok(
        !new RegExp(prohibitedClaim.pattern, "i").test(response),
        `${evalCase.id}: response must not claim ${prohibitedClaim.description}`,
      );
    }
  });
}
