import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { CodeBlock } from '../components/CodeBlock'
import { fadeUp } from '../lib/animations'

function FeatureCard({
  icon,
  title,
  desc,
  index,
}: {
  icon: string
  title: string
  desc: string
  index: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-accent)]/50 transition-all hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[var(--color-muted)] text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

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
      <div className="glow-orb w-72 h-72 bg-[var(--color-blue)]/20 bottom-0 right-0" />
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-muted)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse" />
              Cursor skill · Claude & GPT optimized
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight font-[var(--font-mono)]">
              <span className="text-gradient">/enhance-me</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform vague prompts into structured, model-optimized instructions.
              One command. Two targets. Zero effort.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
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
                View Test Results
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
                <div className="text-xs uppercase tracking-wider text-red-400 mb-2 font-medium">
                  Before — vague input
                </div>
                <CodeBlock title="Your prompt">{`/enhance-me fix the auth stuff`}</CodeBlock>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-cyan)] mb-2 font-medium">
                  After — Claude-optimized
                </div>
                <CodeBlock title="Enhanced prompt">{`<context>
The auth module handles user login and session management.
</context>

<task>
Refactor the authentication module to use JWT tokens
instead of session cookies.
</task>

<instructions>
1. Replace session-based auth with JWT issuance and validation
2. Update login/logout endpoints to return/accept tokens
3. Add middleware for token verification on protected routes
4. Preserve existing user model and password hashing
</instructions>

<success_criteria>
- All existing auth tests pass
- JWT tokens expire after 24 hours
- No breaking changes to public API surface
</success_criteria>`}</CodeBlock>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Protocol */}
      <section className="py-16 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-gradient">Action-Forcing Protocol</span>
          </h2>
          <p className="text-center text-[var(--color-muted)] mb-12 max-w-2xl mx-auto">
            The skill enforces a mandatory 3-step pipeline. Skipping any step is a protocol violation.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Launch Subagent',
                desc: 'Delegates to a Task subagent with the appropriate model-specific enhancement skill.',
              },
              {
                step: '02',
                title: 'Display Enhanced Prompt',
                desc: 'The full enhanced prompt is shown in a code fence so you can review it before execution.',
              },
              {
                step: '03',
                title: 'Execute',
                desc: 'The enhanced prompt runs as working instructions. No shortcuts, no silent skips.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6"
              >
                <div className="text-4xl font-bold text-[var(--color-accent)]/30 mb-3 font-[var(--font-mono)]">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient">Core Features</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon="🔀"
              title="Automatic Model Routing"
              desc="Type /enhance-me and the skill detects your target model. Default Claude, add 'gpt' for GPT/Codex."
              index={0}
            />
            <FeatureCard
              icon="📐"
              title="Claude Optimization"
              desc="XML tag structuring, recency-placed instructions, few-shot examples, calm direct tone. Research-backed techniques from Liu et al. (2023)."
              index={1}
            />
            <FeatureCard
              icon="📝"
              title="GPT/Codex Optimization"
              desc="Markdown headers, primacy-placed instructions, zero-shot first, pragmatic values. Aligned with OpenAI's own Codex system prompt patterns."
              index={2}
            />
            <FeatureCard
              icon="⚡"
              title="Action-Forcing Protocol"
              desc="The skill enforces a mandatory 3-step protocol: launch subagent → display enhanced prompt → execute. No shortcuts."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="py-20 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient">Usage Examples</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <CodeBlock title="Default (Claude)">{`/enhance-me refactor the auth module to use JWT tokens`}</CodeBlock>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <CodeBlock title="Explicit GPT target">{`/enhance-me gpt add input validation to the login form`}</CodeBlock>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              <CodeBlock title="Explicit Claude target">{`/enhance-me claude design a caching layer for the API`}</CodeBlock>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={3}
            >
              <CodeBlock title="Suffix routing">{`debug the flaky test suite /enhance-me gpt`}</CodeBlock>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="bg-gradient-to-br from-[var(--color-card)] to-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-10"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to enhance your prompts?</h2>
            <p className="text-[var(--color-muted)] mb-6">
              Install the skills globally or per-project, then start a new conversation.
            </p>
            <Link
              to="/docs"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-blue)] text-white font-medium hover:opacity-90 transition-opacity"
            >
              Read the Docs
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-[var(--color-border)] relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-[var(--color-muted)]">
          <div className="font-[var(--font-mono)]">
            <span className="text-gradient">/enhance-me</span> — MIT License
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a
              href="https://github.com/SyntaxArchmage/enhance-me"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>Model-optimized prompt enhancement for Cursor</span>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
