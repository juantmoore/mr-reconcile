export type BadgeTone = "neutral" | "pending";

export function StatusBadge({
  label,
  tone = "neutral",
  pill = false,
}: {
  label: string;
  tone?: BadgeTone;
  pill?: boolean;
}) {
  return (
    <span
      className={`status-badge status-badge--${tone}${pill ? " status-badge--pill" : ""}`}
    >
      <span className="status-badge__dot" aria-hidden="true" />
      <span className="status-badge__label">{label}</span>
    </span>
  );
}
