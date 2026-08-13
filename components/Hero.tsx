import { MrReconcileMascot } from "./MrReconcileMascot";

export function Hero({
  kicker = "Payment reconciliation, investigated",
  headline = "Where did the money\u00A0go?",
  subhead = "When a payment looks missing, short, or stuck, Mr.\u00A0Reconcile traces it across payment, chain, and settlement — and reports back in plain English.",
}: {
  kicker?: string;
  headline?: string;
  subhead?: string;
}) {
  return (
    <section className="hero">
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="kicker">{kicker}</div>
          <h1 className="headline">{headline}</h1>
          <p className="subhead">{subhead}</p>
        </div>
        <figure className="mascot-fig">
          <MrReconcileMascot />
        </figure>
      </div>
    </section>
  );
}
