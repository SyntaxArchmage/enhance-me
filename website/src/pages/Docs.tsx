import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import { CodeBlock } from '../components/CodeBlock'
import { fadeUp, pageEnter } from '../lib/animations'

function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={0}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-6">
        <span className="text-gradient">{title}</span>
      </h2>
      {children}
    </motion.section>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
      {children}
    </div>
  )
}

export default function Docs() {
  return (
    <PageLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -10 }}
        variants={pageEnter}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-gradient">Documentation</span>
        </h1>
        <p className="text-[var(--color-muted)] mb-12 text-lg">
          How to install and use{' '}
          <code className="text-[var(--color-accent-light)] font-[var(--font-mono)]">/enhance-me</code>.
        </p>

        <Section title="What It Does">
          <Card>
            <p className="text-gray-300 leading-relaxed mb-4">
              Type <code className="text-[var(--color-accent-light)]">/enhance-me &lt;your task&gt;</code> in
              any Cursor chat. The skill enforces a mandatory 3-step protocol:
            </p>
            <ol className="space-y-3 text-gray-300 list-decimal list-inside">
              <li>
                <strong className="text-white">Launch subagent</strong> — Delegates to a Task subagent with
                the appropriate model-specific enhancement skill
              </li>
              <li>
                <strong className="text-white">Display enhanced prompt</strong> — The full enhanced prompt
                is shown in a code fence so you can review it
              </li>
              <li>
                <strong className="text-white">Execute</strong> — The enhanced prompt is executed as
                working instructions
              </li>
            </ol>
            <p className="text-[var(--color-muted)] text-sm mt-4">
              The router skill treats skipping any step as a protocol violation, ensuring consistent
              behavior.
            </p>
          </Card>
        </Section>

        <Section title="Skills">
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className="text-left p-3 text-[var(--color-muted)]">Skill</th>
                  <th className="text-left p-3 text-[var(--color-muted)]">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">enhance-me</td>
                  <td className="p-3">
                    Action-forcing router — detects /enhance-me, routes to the correct model skill, enforces
                    the 3-step protocol
                  </td>
                </tr>
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">
                    enhance-claude
                  </td>
                  <td className="p-3">
                    Claude optimizer — XML structuring, recency-placed instructions, few-shot patterns, calm
                    tone
                  </td>
                </tr>
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">enhance-gpt</td>
                  <td className="p-3">
                    GPT/Codex optimizer — primacy-placed instructions, markdown delimiters, zero-shot-first,
                    pragmatic values
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Usage">
          <CodeBlock title="Examples">{`/enhance-me refactor the auth module to use JWT tokens
/enhance-me gpt add input validation to the login form
/enhance-me claude design a caching layer for the API`}</CodeBlock>
        </Section>

        <Section title="Routing Rules">
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className="text-left p-3 text-[var(--color-muted)]">Input</th>
                  <th className="text-left p-3 text-[var(--color-muted)]">Target</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">
                    /enhance-me &lt;task&gt;
                  </td>
                  <td className="p-3">Claude (default)</td>
                </tr>
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">
                    /enhance-me claude &lt;task&gt;
                  </td>
                  <td className="p-3">Claude</td>
                </tr>
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">
                    /enhance-me gpt &lt;task&gt;
                  </td>
                  <td className="p-3">GPT/Codex</td>
                </tr>
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">
                    &lt;task&gt; /enhance-me
                  </td>
                  <td className="p-3">Claude (default)</td>
                </tr>
                <tr className="border-t border-[var(--color-border)]">
                  <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent-light)]">
                    &lt;task&gt; /enhance-me gpt
                  </td>
                  <td className="p-3">GPT/Codex</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Enhancement Techniques">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-accent-light)]">
                Claude (enhance-claude)
              </h3>
              <ul className="space-y-2 text-[var(--color-muted)] text-sm">
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent-light)]">•</span>
                  XML tag structure (&lt;context&gt;, &lt;task&gt;, &lt;instructions&gt;, etc.)
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent-light)]">•</span>
                  Critical instructions placed at the END (recency bias)
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent-light)]">•</span>
                  Calm, direct tone (aggressive language hurts Claude 4.x)
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent-light)]">•</span>
                  Role + reason framing
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent-light)]">•</span>
                  Few-shot examples in &lt;example&gt; tags
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent-light)]">•</span>
                  Explicit success criteria
                </li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-blue-light)]">
                GPT/Codex (enhance-gpt)
              </h3>
              <ul className="space-y-2 text-[var(--color-muted)] text-sm">
                <li className="flex gap-2">
                  <span className="text-[var(--color-blue-light)]">•</span>
                  Critical instructions placed at the START (primacy bias)
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-blue-light)]">•</span>
                  Markdown headers as section delimiters
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-blue-light)]">•</span>
                  Conversational, direct tone
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-blue-light)]">•</span>
                  Zero-shot first (add examples only when needed)
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-blue-light)]">•</span>
                  Codex-specific patterns (testing, validation, no fluff)
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-blue-light)]">•</span>
                  Pragmatic values (clarity, pragmatism, rigor)
                </li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section title="Installation" id="install">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Global install (available in all workspaces)</h3>
          <CodeBlock title="Global install">{`SRC=/path/to/enhance-me/.cursor/skills

mkdir -p ~/.cursor/skills/enhance-me ~/.cursor/skills/enhance-claude ~/.cursor/skills/enhance-gpt
cp "$SRC/enhance-me/SKILL.md"     ~/.cursor/skills/enhance-me/SKILL.md
cp "$SRC/enhance-claude/SKILL.md" ~/.cursor/skills/enhance-claude/SKILL.md
cp "$SRC/enhance-gpt/SKILL.md"    ~/.cursor/skills/enhance-gpt/SKILL.md`}</CodeBlock>

          <h3 className="text-lg font-semibold mb-4 mt-8 text-gray-300">Per-project install</h3>
          <Card>
            <p className="text-gray-300 leading-relaxed">
              Clone or copy the <code className="text-[var(--color-accent-light)]">.cursor/skills/</code>{' '}
              directory into your project root. Cursor discovers skills automatically at conversation
              start.
            </p>
          </Card>

          <h3 className="text-lg font-semibold mb-4 mt-8 text-gray-300">After installing</h3>
          <Card>
            <p className="text-gray-300 leading-relaxed">
              Start a <strong className="text-white">new conversation</strong> for the skills to be
              discovered. Skills are loaded at conversation start, not mid-conversation.
            </p>
          </Card>
        </Section>
      </motion.div>
    </PageLayout>
  )
}
