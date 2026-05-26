# enhance-me Testing Framework

End-to-end testing for the /enhance-me prompt enhancement pipeline via subagent sessions with pattern matching on transcripts.

## Design Principles

1. **One workload per session** — each subagent runs one workload/prompt
2. **Dual-model testing** — every test case is enhanced for both Claude and GPT
3. **Pattern matching on transcripts** — verify protocol compliance in session text
4. **Quality scoring** — enhanced prompts are scored on structure, clarity, completeness, model-fit, and actionability

## Directory Structure

```
testing/
├── README.md           # This file
├── workloads/          # Workload definitions (prompts + expected behaviors)
│   ├── 01-routing.md
│   ├── 02-vague-task.md
│   └── ...
├── scripts/            # Test harness and analysis scripts
│   ├── run-all.sh
│   ├── run-workload.sh
│   ├── analyze.py
│   ├── patterns.py
│   └── test-enhance.py
└── results/            # Session transcripts and analysis
    ├── run-YYYY-MM-DD/
    └── .gitkeep
```

## Features to Verify

| Feature | Description | Min Samples |
|---------|-------------|-------------|
| E1 | Task subagent launched (Task tool called) | 10 |
| E2 | Correct model routing (claude default, gpt when specified) | 10 |
| E3 | Enhanced prompt displayed in code fence | 10 |
| E4 | Enhanced prompt executed after display | 10 |
| E5 | No recursive /enhance-me in enhanced prompt | 10 |
| E6 | Claude: XML tags present in enhanced prompt | 5 |
| E7 | Claude: instructions placed at end (recency) | 5 |
| E8 | GPT: markdown headers used for structure | 5 |
| E9 | GPT: instructions placed at start (primacy) | 5 |
| E10 | Quality: success criteria present | 10 |
| E11 | Quality: constraints section present | 10 |
| E12 | Quality: role/context framing present | 10 |

## Workload Design

| # | Workload | Features |
|---|----------|----------|
| 1 | Model routing (default, claude, gpt) | E1, E2 |
| 2 | Vague coding request | E1, E3, E4, E5, E6, E7, E10, E11, E12 |
| 3 | Specific technical task | E1, E3, E4, E6, E10, E11 |
| 4 | Debugging request | E1, E3, E4, E10, E12 |
| 5 | GPT-targeted task | E1, E2, E3, E8, E9, E10 |
| 6 | Architecture decision | E1, E3, E4, E10, E11, E12 |
| 7 | Multi-step implementation | E1, E3, E4, E10, E11, E12 |
| 8 | Documentation request | E1, E3, E4, E10 |
| 9 | Refactoring request | E1, E3, E4, E10, E11 |
| 10 | Error investigation | E1, E3, E4, E10, E12 |

## Running Tests

```bash
# Run all workloads
./testing/scripts/run-all.sh

# Run single workload
./testing/scripts/run-workload.sh testing/workloads/02-vague-task.md

# Analyze results
python testing/scripts/analyze.py testing/results/run-YYYY-MM-DD/

# Run enhance quality scoring
python testing/scripts/test-enhance.py
```

## Quality Scoring

Each enhanced prompt is scored on 5 dimensions (1-5 scale):

| Metric | Description |
|--------|-------------|
| Structure | Model-appropriate formatting (XML for Claude, Markdown for GPT) |
| Clarity | Task is unambiguous and specific |
| Completeness | Success criteria, constraints, and edge cases covered |
| Model-fit | Model-specific techniques applied (recency/primacy, XML/Markdown, tone) |
| Actionability | An agent can execute the enhanced prompt without clarification |
