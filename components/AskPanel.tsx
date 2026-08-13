// Presentational only. The input is uncontrolled and the CTA has no handler —
// wire submission to your agent separately (this will likely become a client
// component with a form onSubmit at that point).
export function AskPanel({
  label = "Ask a question",
  placeholder = "Where are my funds for pay_2007?",
  ctaLabel = "Investigate",
  children,
}: {
  label?: string;
  placeholder?: string;
  ctaLabel?: string;
  children?: React.ReactNode; // e.g. <ExamplePromptChips />
}) {
  return (
    <section className="ask-section">
      <div className="ask-panel">
        <div className="overline">{label}</div>
        <div className="ask-row">
          <input type="text" className="ask-input" placeholder={placeholder} />
          <button type="button" className="ask-cta">
            {ctaLabel}
          </button>
        </div>
        {children}
      </div>
    </section>
  );
}
