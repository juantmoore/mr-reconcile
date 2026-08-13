import Link from "next/link";

const NAV_ITEMS = [
  { label: "Ask", href: "/" },
  { label: "Examples", href: "/examples" },
  { label: "Architecture", href: "/architecture" },
];

export function Header({
  initials = "SE",
  activePath = "/",
}: {
  initials?: string;
  activePath?: string;
}) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Mr. Reconcile home">
        Mr. Reconcile<span className="brand__dot">.</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`site-nav__link${activePath === item.href ? " site-nav__link--active" : ""}`}
            aria-current={activePath === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <div className="avatar" aria-label={`Signed in as ${initials}`}>
          {initials}
        </div>
      </nav>
    </header>
  );
}
