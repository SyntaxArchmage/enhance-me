import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { CodeBlock } from '../components/CodeBlock'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-grid relative overflow-hidden"
    >
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-accent)]/25 -top-64 left-1/2 -translate-x-1/2" />
      <Nav />

      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight font-[var(--font-mono)]">
              <span className="text-gradient">/enhance-me</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform vague prompts into structured, model-optimized instructions.
              <br />
              One command. Two targets. Zero effort.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link
                to="/docs"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-blue)] text-white font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
              <Link
                to="/results"
                className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-gray-300 hover:border-[var(--color-accent-light)] hover:text-white transition-colors"
              >
                Test Results
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-xs uppercase tracking-wider text-red-400 mb-2 font-medium">
                  Before
                </div>
                <CodeBlock title="Your prompt">{`/enhance-me fix the auth stuff`}</CodeBlock>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-cyan)] mb-2 font-medium">
                  After — Claude-optimized
                </div>
                <CodeBlock title="Enhanced prompt">{`<context>
The auth module handles user login
and session management.
</context>

<task>
Refactor the authentication module
to use JWT tokens instead of
session cookies.
</task>

<instructions>
1. Replace session-based auth with
   JWT issuance and validation
2. Update login/logout endpoints
3. Add middleware for token
   verification on protected routes
</instructions>`}</CodeBlock>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-[var(--color-muted)]">
          <div className="font-[var(--font-mono)]">
            <span className="text-gradient">/enhance-me</span> — MIT License
          </div>
          <a
            href="https://github.com/SyntaxArchmage/enhance-me"
            className="hover:text-white transition-colors mt-2 md:mt-0"
          >
            GitHub
          </a>
        </div>
      </footer>
    </motion.div>
  )
}
