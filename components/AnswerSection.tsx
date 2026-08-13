export interface AnswerMetadata {
  label: string;
  value: string;
}

export function AnswerSection({
  question,
  badge,
  metadata,
  children,
}: {
  question: React.ReactNode;
  badge?: React.ReactNode;
  metadata?: AnswerMetadata[];
  children: React.ReactNode;
}) {
  return (
    <section className="ruled-section" id="answer">
      <div className="ruled-section__head">
        <div className="overline">Answer</div>
        {badge}
      </div>
      <h2 className="answer-title">{question}</h2>
      <div className="answer-body">{children}</div>
      {metadata && metadata.length > 0 && (
        <div className="meta-chips">
          {metadata.map((item) => (
            <span key={item.label} className="meta-chip">
              {item.label}&nbsp;·&nbsp;{item.value}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
