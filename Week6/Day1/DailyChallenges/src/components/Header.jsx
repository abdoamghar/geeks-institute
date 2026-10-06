function Header() {
  return (
    <header className="bg-blue-600 p-6 text-white">
      <nav className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default Header
