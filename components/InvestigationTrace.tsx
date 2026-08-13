import { StatusBadge, type BadgeTone } from "./StatusBadge";

// Customer-facing investigation steps. Never pass raw internal tool names
// (getPaymentDetails, getTransactionDetails, getSettlementDetails) as labels —
// map them to customer language ("Payment lookup", "Blockchain verification",
// "Settlement lookup") before rendering.
export type StepStatus = "completed" | "confirmed" | "pending";

export interface InvestigationStep {
  label: string;
  detail?: string;
  reference: string;
  amount: string; // pre-formatted display string; "—" when not applicable
  status: StepStatus;
}

const STATUS_DISPLAY: Record<StepStatus, { text: string; tone: BadgeTone }> = {
  completed: { text: "Completed", tone: "neutral" },
  confirmed: { text: "Confirmed", tone: "neutral" },
  pending: { text: "Pending", tone: "pending" },
};

export function InvestigationTrace({
  steps,
  quote,
}: {
  steps: InvestigationStep[];
  quote?: string; // optional closing line from the agent
}) {
  const done = steps.filter((s) => s.status !== "pending").length;
  return (
    <section className="ruled-section" style={{ paddingTop: 64 }}>
      <div className="ruled-section__head">
        <div className="overline">Investigation</div>
        <div className="ruled-section__meta">
          {steps.length} steps · {done} of {steps.length} complete
        </div>
      </div>
      <div className="trace">
        <div className="trace__head">
          <div>Step</div>
          <div>Reference</div>
          <div className="-right">Amount</div>
          <div className="-right">Status</div>
        </div>
        {steps.map((row) => {
          const status = STATUS_DISPLAY[row.status];
          return (
            <div key={row.label + row.reference} className="trace__row">
              <div className="trace__step-cell">
                <div className="trace__step">{row.label}</div>
                {row.detail && <div className="trace__detail">{row.detail}</div>}
              </div>
              <div className="trace__ref">{row.reference}</div>
              <div className="trace__amount">{row.amount}</div>
              <div className="trace__status">
                <StatusBadge label={status.text} tone={status.tone} />
              </div>
            </div>
          );
        })}
      </div>
      {quote && <p className="trace-quote">“{quote}” — Mr. Reconcile</p>}
    </section>
  );
}
