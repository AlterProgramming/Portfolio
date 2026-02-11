export function Header() {
  return (
    <header className="headerWrap">
      <div className="container headerInner">
        <a href="#home" className="brand type-body-lg">
          Portfolio
        </a>
        <nav aria-label="Primary">
          <ul className="navList">
            <li>
              <a href="#projects" className="navLink">
                Projects
              </a>
            </li>
            <li>
              <a href="#about" className="navLink">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="navLink">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
