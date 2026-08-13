const NAV_ITEMS = [
  { label: "Ask", href: "/", active: true },
  { label: "Example Cases", href: "/examples", active: false },
  { label: "Architecture", href: "/architecture", active: false },
];

export function Header({ initials = "SE" }: { initials?: string }) {
  return (
    <header className="site-header">
      <a href="/" className="brand">
        Mr. Reconcile<span className="brand__dot">.</span>
      </a>
      <nav className="site-nav">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`site-nav__link${item.active ? " site-nav__link--active" : ""}`}
          >
            {item.label}
          </a>
        ))}
        <div className="avatar">{initials}</div>
      </nav>
    </header>
  );
}
