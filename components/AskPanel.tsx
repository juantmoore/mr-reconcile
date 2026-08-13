export function AskPanel({
  label = "Ask a question",
  placeholder = "Where are my funds for pay_2007?",
  ctaLabel = "Investigate",
  value,
  onValueChange,
  onSubmit,
  disabled = false,
  children,
}: {
  label?: string;
  placeholder?: string;
  ctaLabel?: string;
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="ask-section" id="ask">
      <div className="ask-panel">
        <label className="overline" htmlFor="reconciliation-question">
          {label}
        </label>

        <form
          className="ask-row"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <input
            id="reconciliation-question"
            type="text"
            className="ask-input"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            disabled={disabled}
          />

          <button
            type="submit"
            className="ask-cta"
            disabled={disabled}
          >
            {disabled ? "Investigating…" : ctaLabel}
          </button>
        </form>

        {children}
      </div>
    </section>
  );
}