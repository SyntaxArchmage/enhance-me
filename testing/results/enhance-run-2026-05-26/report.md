# enhance-me Quality Test Report — 2026-05-26

## Methodology

- **Test cases**: 10 raw prompts spanning 10 categories (vague coding, specific technical, debugging, refactoring, feature, error investigation, documentation, code review, architecture decision, multi-step)
- **Enhancement**: Each prompt was enhanced using subagents via the Task tool for both Claude and GPT models
- **Scoring**: 5-point scale across 5 metrics: Structure, Clarity, Completeness, Model-fit, Actionability

## Results Summary

| Metric | Claude Avg | GPT Avg |
|--------|-----------|---------|
| Structure | 5.00 | 5.00 |
| Clarity | 5.00 | 5.00 |
| Completeness | 4.90 | 4.60 |
| Model-fit | 5.00 | 5.00 |
| Actionability | 4.90 | 4.90 |
| **Overall** | **4.96** | **4.90** |

## Structural Compliance

| Feature | Claude (10/10) | GPT (10/10) |
|---------|---------------|-------------|
| XML tags / Markdown headers | 10/10 | 10/10 |
| Success criteria | 10/10 | 10/10 |
| Constraints | 10/10 | 10/10 |
| Role/context framing | 9/10 | 10/10 |
| Instructions placement (recency/primacy) | 10/10 | 10/10 |
| Examples included | 3/10 | 0/10 |

## Per-Test Breakdown

| Test | Category | Claude | GPT | Delta |
|------|----------|--------|-----|-------|
| T01 | vague-coding | 5.00 | 5.00 | +0.00 |
| T02 | specific-unstructured | 5.00 | 5.00 | +0.00 |
| T03 | debugging | 5.00 | 5.00 | +0.00 |
| T04 | refactoring | 4.60 | 4.60 | +0.00 |
| T05 | feature-with-context | 5.00 | 4.80 | +0.20 |
| T06 | error-investigation | 5.00 | 5.00 | +0.00 |
| T07 | documentation | 5.00 | 4.80 | +0.20 |
| T08 | code-review | 5.00 | 5.00 | +0.00 |
| T09 | architecture-decision | 5.00 | 4.80 | +0.20 |
| T10 | multi-step | 5.00 | 5.00 | +0.00 |

## Key Observations

1. **Both models produce high-quality structured output** — average scores above 4.8/5.0 across all metrics
2. **Claude outputs include examples** in ~30% of cases (T01, T02, T03 had `<example>` blocks); GPT outputs consistently skip examples (aligning with the zero-shot-first principle)
3. **Model-fit is 100%** — Claude outputs use XML tags with recency-placed instructions; GPT outputs use markdown headers with primacy-placed instructions
4. **T04 (refactoring)** scored lower on completeness for both models — vague "clean up" requests without specific files/tests produce less complete enhancement since there's less to expand on
5. **Claude slightly outperforms GPT on completeness** (4.90 vs 4.60) primarily due to the few-shot examples and more detailed constraints sections

## Verdict

Both enhancement skills produce production-quality prompts. The enhancement pipeline is working correctly for all 10 test categories across both target models.
