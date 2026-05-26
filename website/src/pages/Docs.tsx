import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import { CodeBlock } from '../components/CodeBlock'
import { pageEnter } from '../lib/animations'

export default function Docs() {
  return (
    <PageLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -10 }}
        variants={pageEnter}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold mb-10">
          <span className="text-gradient">Docs</span>
        </h1>

        {/* Routing */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Routing</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className="text-left p-3 text-[var(--color-muted)] font-medium">Input</th>
                  <th className="text-left p-3 text-[var(--color-muted)] font-medium">Target</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['/enhance-me <task>', 'Claude (default)'],
                  ['/enhance-me gpt <task>', 'GPT / Codex'],
                  ['/enhance-me claude <task>', 'Claude'],
                  ['<task> /enhance-me gpt', 'GPT / Codex'],
                ].map(([input, target]) => (
                  <tr key={input} className="border-t border-[var(--color-border)]">
                    <td className="p-3 font-[var(--font-mono)] text-[var(--color-accent)] text-xs">{input}</td>
                    <td className="p-3 text-[var(--color-muted)]">{target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Install */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Install</h2>
          <CodeBlock title="Global install">{`git clone https://github.com/SyntaxArchmage/enhance-me.git
SRC=enhance-me/.cursor/skills

mkdir -p ~/.cursor/skills/enhance-me \\
         ~/.cursor/skills/enhance-claude \\
         ~/.cursor/skills/enhance-gpt

cp "$SRC/enhance-me/SKILL.md"     ~/.cursor/skills/enhance-me/
cp "$SRC/enhance-claude/SKILL.md" ~/.cursor/skills/enhance-claude/
cp "$SRC/enhance-gpt/SKILL.md"    ~/.cursor/skills/enhance-gpt/`}</CodeBlock>
          <p className="text-[var(--color-muted)] text-sm mt-3">
            Start a new conversation after installing — skills load at conversation start.
          </p>
        </section>
      </motion.div>
    </PageLayout>
  )
}
