import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import { pageEnter } from '../lib/animations'
import { overallScores, metricScores } from '../data/results'

function ScoreRing({
  score,
  maxScore,
  label,
  color,
}: {
  score: number
  maxScore: number
  label: string
  color: string
}) {
  const size = 120
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score / maxScore)

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{score.toFixed(2)}</span>
          <span className="text-xs text-[var(--color-muted)]">/ {maxScore.toFixed(1)}</span>
        </div>
      </div>
      <span className="mt-3 text-sm font-medium">{label}</span>
    </div>
  )
}

export default function Results() {
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
          <span className="text-gradient">Test Results</span>
        </h1>

        {/* Score rings */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-sm mx-auto mb-12">
          <div className="card p-8 flex justify-center">
            <ScoreRing
              score={overallScores.claude}
              maxScore={overallScores.maxScore}
              label="Claude"
              color="var(--color-accent)"
            />
          </div>
          <div className="card p-8 flex justify-center">
            <ScoreRing
              score={overallScores.gpt}
              maxScore={overallScores.maxScore}
              label="GPT / Codex"
              color="var(--color-blue)"
            />
          </div>
        </div>

        {/* Metric table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th className="text-left p-3 text-[var(--color-muted)] font-medium">Metric</th>
                <th className="text-right p-3 text-[var(--color-accent)] font-medium">Claude</th>
                <th className="text-right p-3 text-[var(--color-blue)] font-medium">GPT</th>
              </tr>
            </thead>
            <tbody>
              {metricScores.map(({ name, claude, gpt }) => (
                <tr key={name} className="border-t border-[var(--color-border)]">
                  <td className="p-3">{name}</td>
                  <td className="p-3 text-right font-[var(--font-mono)] text-[var(--color-muted)]">{claude.toFixed(1)}</td>
                  <td className="p-3 text-right font-[var(--font-mono)] text-[var(--color-muted)]">{gpt.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[var(--color-muted)] text-sm mt-4">
          Tested across 10 prompt categories: vague-coding, debugging, refactoring, documentation,
          code-review, and more.
        </p>
      </motion.div>
    </PageLayout>
  )
}
