import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/docs', label: 'Docs' },
  { to: '/results', label: 'Results' },
]

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg hover:text-white transition-colors font-[var(--font-mono)]">
          <span className="text-gradient">/enhance-me</span>
        </Link>
        <div className="flex gap-3 sm:gap-4 text-sm text-[var(--color-muted)]">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-white transition-colors ${
                pathname === to ? 'text-white font-medium' : ''
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/SyntaxArchmage/enhance-me"
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
