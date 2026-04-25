const navItems = [
  { href: '#routes', label: 'Routes', active: true },
  { href: '#projects', label: 'Projects', active: false },
  { href: '#contact', label: 'Contact', active: false },
]

export function Header() {
  return (
    <header className="headerWrap">
      <div className="container headerInner">
        <a href="#home" className="brand type-body-lg">
          jakpakoun.com
        </a>

        <div className="headerRight">
          <nav aria-label="Primary">
            <ul className="navList">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={`navLink ${item.active ? 'active' : ''}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span className="statusBadge" aria-label="Current status">
            Hub
          </span>
        </div>
      </div>
    </header>
  )
}
