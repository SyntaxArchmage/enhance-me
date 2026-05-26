export const overallScores = {
  claude: 4.96,
  gpt: 4.9,
  maxScore: 5.0,
}

export const metricScores = [
  { name: 'Structure', claude: 5.0, gpt: 5.0 },
  { name: 'Clarity', claude: 5.0, gpt: 5.0 },
  { name: 'Completeness', claude: 4.9, gpt: 4.6 },
  { name: 'Model-fit', claude: 5.0, gpt: 5.0 },
  { name: 'Actionability', claude: 4.9, gpt: 4.9 },
]

export const testCategories = [
  'vague-coding',
  'specific-unstructured',
  'debugging',
  'refactoring',
  'feature-with-context',
  'error-investigation',
  'documentation',
  'code-review',
  'architecture-decision',
  'multi-step',
]
