import { StatusBadge, type BadgeTone } from "./StatusBadge";

export type StepStatus =
  | "checking"
  | "completed"
  | "confirmed"
  | "pending";

export interface InvestigationStep {
  type: "payment" | "transaction" | "settlement";
  label: string;
  detail?: string;
  reference: string;
  amount: string;
  status: StepStatus;
}

const STATUS_DISPLAY: Record<StepStatus, { text: string; tone: BadgeTone }> = {
  checking: { text: "Checking…", tone: "neutral" },
  completed: { text: "Completed", tone: "neutral" },
  confirmed: { text: "Confirmed", tone: "neutral" },
  pending: { text: "Pending", tone: "pending" },
};

export function InvestigationTrace({
  steps,
  quote,
}: {
  steps: InvestigationStep[];
  quote?: string;
}) {
  const done = steps.filter(
    (step) => step.status === "completed" || step.status === "confirmed",
  ).length;

  return (
    <section className="ruled-section investigation-section" id="investigation">
      <div className="ruled-section__head">
        <div className="overline">Investigation</div>
        <div className="ruled-section__meta">
          {steps.length} steps · {done} of {steps.length} complete
        </div>
      </div>
      <div className="trace">
        <div className="trace__head" aria-hidden="true">
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
                {row.detail && (
                  <div className="trace__detail">{row.detail}</div>
                )}
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
      {quote && (
        <p className="trace-quote">
          “{quote}” — Mr. Reconcile
        </p>
      )}
    </section>
  );
}
