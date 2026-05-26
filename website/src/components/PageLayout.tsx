import Nav from './Nav'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-grid relative overflow-hidden">
      <div className="glow-orb w-96 h-96 bg-[var(--color-accent)]/8 -top-48 -left-48" />
      <div className="glow-orb w-80 h-80 bg-[var(--color-blue)]/6 top-1/3 -right-40" />
      <Nav />
      <main className="pt-24 pb-16 px-6 relative z-10">{children}</main>
      <footer className="py-8 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-[var(--color-muted)]">
          <div className="font-[var(--font-mono)]">
            <span className="text-gradient">/enhance-me</span> — MIT License
          </div>
          <a
            href="https://github.com/SyntaxArchmage/enhance-me"
            className="hover:text-[var(--color-text)] transition-colors mt-2 md:mt-0"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
