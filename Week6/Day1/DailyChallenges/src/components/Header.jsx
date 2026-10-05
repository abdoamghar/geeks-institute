import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Morrow home" onClick={closeMenu}>morrow<span>.</span></a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Say hello <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  )
}

export default Header
