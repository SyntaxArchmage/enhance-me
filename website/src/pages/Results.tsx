import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import { fadeUp, pageEnter } from '../lib/animations'
import { overallScores, metricScores, testCategories } from '../data/results'

function ScoreRing({
  score,
  maxScore,
  label,
  color,
  size = 120,
}: {
  score: number
  maxScore: number
  label: string
  color: string
  size?: number
}) {
  const pct = score / maxScore
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct)

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
      <span className="mt-3 text-sm font-medium text-gray-300">{label}</span>
    </div>
  )
}

function MetricBar({
  name,
  claude,
  gpt,
  maxScore,
  index,
}: {
  name: string
  claude: number
  gpt: number
  maxScore: number
  index: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{name}</h3>
        <div className="flex gap-4 text-sm font-[var(--font-mono)]">
          <span className="text-[var(--color-accent-light)]">{claude.toFixed(1)}</span>
          <span className="text-[var(--color-muted)]">vs</span>
          <span className="text-[var(--color-blue-light)]">{gpt.toFixed(1)}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-[var(--color-muted)] mb-1">
            <span>Claude</span>
            <span>{((claude / maxScore) * 100).toFixed(0)}%</span>
          </div>
          <div className="score-bar">
            <motion.div
              className="score-bar-fill bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${(claude / maxScore) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-[var(--color-muted)] mb-1">
            <span>GPT</span>
            <span>{((gpt / maxScore) * 100).toFixed(0)}%</span>
          </div>
          <div className="score-bar">
            <motion.div
              className="score-bar-fill bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-blue-light)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${(gpt / maxScore) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
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
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-gradient">Test Results</span>
        </h1>
        <p className="text-[var(--color-muted)] mb-12 text-lg max-w-2xl">
          Quality scores from automated testing across 10 prompt categories. Evaluated on structure,
          clarity, completeness, model-fit, and actionability.
        </p>

        {/* Overall scores */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            <span className="text-gradient">Overall Averages</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-lg mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 flex justify-center"
            >
              <ScoreRing
                score={overallScores.claude}
                maxScore={overallScores.maxScore}
                label="Claude"
                color="var(--color-accent-light)"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 flex justify-center"
            >
              <ScoreRing
                score={overallScores.gpt}
                maxScore={overallScores.maxScore}
                label="GPT/Codex"
                color="var(--color-blue-light)"
              />
            </motion.div>
          </div>
        </section>

        {/* Per-metric breakdown */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-gradient">Per-Metric Breakdown</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {metricScores.map((metric, i) => (
              <MetricBar
                key={metric.name}
                name={metric.name}
                claude={metric.claude}
                gpt={metric.gpt}
                maxScore={overallScores.maxScore}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Test categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-gradient">Test Categories</span>
          </h2>
          <p className="text-[var(--color-muted)] mb-6">
            10 prompt categories tested across both model targets:
          </p>
          <div className="flex flex-wrap gap-3">
            {testCategories.map((category, i) => (
              <motion.span
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-sm font-[var(--font-mono)] text-gray-300 hover:border-[var(--color-accent)]/50 transition-colors"
              >
                {category}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Summary card */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="bg-gradient-to-br from-[var(--color-card)] to-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--color-muted)]">
            <div>
              <h3 className="text-[var(--color-accent-light)] font-semibold mb-2">Claude — 4.96/5.0</h3>
              <p className="leading-relaxed">
                Perfect scores on structure, clarity, and model-fit. Near-perfect on completeness (4.9)
                and actionability (4.9). XML structuring and recency-placed instructions produce
                consistently high-quality outputs.
              </p>
            </div>
            <div>
              <h3 className="text-[var(--color-blue-light)] font-semibold mb-2">GPT — 4.90/5.0</h3>
              <p className="leading-relaxed">
                Perfect scores on structure, clarity, and model-fit. Completeness at 4.6 is the main
                differentiator. Markdown headers and primacy-placed instructions align well with Codex
                patterns.
              </p>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </PageLayout>
  )
}
