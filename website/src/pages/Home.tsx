import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { CodeBlock } from '../components/CodeBlock'
import { fadeUp } from '../lib/animations'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-grid relative overflow-hidden"
    >
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-accent)]/10 -top-64 left-1/2 -translate-x-1/2" />
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight font-[var(--font-mono)]">
              <span className="text-gradient">/enhance-me</span>
            </h1>
            <p className="text-lg text-[var(--color-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform vague prompts into structured, model-optimized instructions.
              <br />
              One command. Two targets. Zero effort.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-16">
              <Link
                to="/docs"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-blue)] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-[var(--color-accent)]/20"
              >
                Get Started
              </Link>
              <Link
                to="/results"
                className="px-6 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] text-sm font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
              >
                Test Results
              </Link>
            </div>
          </motion.div>

          {/* Before / After */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-xs uppercase tracking-wider text-red-500/70 mb-2 font-medium">
                  Before
                </div>
                <CodeBlock title="Your prompt">{`/enhance-me fix the auth stuff`}</CodeBlock>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-cyan-light)] mb-2 font-medium">
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

      {/* Why it's better */}
      <section className="py-16 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-2xl font-bold text-center mb-10"
          >
            <span className="text-gradient">Why enhanced prompts work better</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Structured context',
                desc: 'Vague prompts lack scope. Enhanced prompts define the codebase context, the exact task, and explicit success criteria — so the model knows what to do and when it\'s done.',
              },
              {
                title: 'Actionable steps',
                desc: 'Instead of "fix it", the enhanced prompt breaks work into numbered steps with clear boundaries. The model can execute sequentially without guessing.',
              },
              {
                title: 'Fewer iterations',
                desc: 'A well-structured prompt gets it right on the first try. Less back-and-forth, fewer "that\'s not what I meant" corrections, faster results.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="card p-5"
              >
                <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model-specific adaptation */}
      <section className="py-16 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-2xl font-bold text-center mb-3"
          >
            <span className="text-gradient">Model-specific adaptation</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center text-[var(--color-muted)] text-sm mb-10"
          >
            Different LLMs respond to different prompt structures. We optimize for each.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                <h3 className="text-sm font-semibold">Claude</h3>
              </div>
              <ul className="space-y-1.5 text-[var(--color-muted)] text-sm">
                <li>XML tags for clear section boundaries</li>
                <li>Critical instructions placed at the <strong className="text-[var(--color-text)]">end</strong> (recency bias)</li>
                <li>Calm, direct tone — aggressive phrasing hurts quality</li>
                <li>Few-shot examples in {'<example>'} tags</li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-blue)]" />
                <h3 className="text-sm font-semibold">GPT / Codex</h3>
              </div>
              <ul className="space-y-1.5 text-[var(--color-muted)] text-sm">
                <li>Markdown headers as section delimiters</li>
                <li>Critical instructions placed at the <strong className="text-[var(--color-text)]">start</strong> (primacy bias)</li>
                <li>Conversational, direct tone</li>
                <li>Zero-shot first, examples only when needed</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

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
    </motion.div>
  )
}
