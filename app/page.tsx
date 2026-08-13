import { AnswerSection } from "@/components/AnswerSection";
import { AskPanel } from "@/components/AskPanel";
import { ExamplePromptChips } from "@/components/ExamplePromptChips";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  InvestigationTrace,
  type InvestigationStep,
} from "@/components/InvestigationTrace";
import { StatusBadge } from "@/components/StatusBadge";

const EXAMPLE_PROMPTS = [
  "Fee discrepancy",
  "BTC payment",
  "Missing funds",
  "Pending settlement",
];

const SAMPLE_STEPS: InvestigationStep[] = [
  {
    label: "Payment lookup",
    detail: "Payment found and completed",
    reference: "pay_2007",
    amount: "$890.00",
    status: "completed",
  },
  {
    label: "Blockchain verification",
    detail: "Transaction confirmed on-chain",
    reference: "db59…c2c1",
    amount: "0.01375 BTC",
    status: "confirmed",
  },
  {
    label: "Settlement lookup",
    detail: "Merchant payout not yet released",
    reference: "set_2007",
    amount: "—",
    status: "pending",
  },
];

const SAMPLE_METADATA = [
  { label: "payment", value: "pay_2007" },
  { label: "tx", value: "db59…c2c1" },
  { label: "settlement", value: "set_2007" },
];

export default function Home() {
  return (
    <div className="page">
      <Header initials="SE" />
      <main>
        <Hero />
        <AskPanel>
          <ExamplePromptChips prompts={EXAMPLE_PROMPTS} />
        </AskPanel>

        <AnswerSection
          question={
            <>
              Where are my funds for{" "}
              <code className="ref-inline">pay_2007</code>?
            </>
          }
          badge={
            <StatusBadge label="Settlement pending" tone="pending" pill />
          }
          metadata={SAMPLE_METADATA}
        >
          <p style={{ margin: 0 }}>
            The expected payment value of <strong>$890.00</strong> completed
            successfully, and the 0.01375 BTC transaction is confirmed
            on-chain. The merchant settlement is still pending, so an
            authoritative final payout is not yet available.
          </p>
        </AnswerSection>

        <InvestigationTrace
          steps={SAMPLE_STEPS}
          quote="The money isn't missing — it's simply not finished arriving."
        />
      </main>

      <footer className="site-footer">
        <div className="site-footer__org">
          AcmeCommerce · Financial Operations
        </div>
        <div className="site-footer__quip">
          Every satoshi accounted for.
        </div>
      </footer>
    </div>
  );
}
