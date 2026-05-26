#!/usr/bin/env python3
"""
Pattern definitions for enhance-me transcript analysis.
"""

import re
from dataclasses import dataclass


@dataclass
class Feature:
    id: str
    name: str
    pattern: re.Pattern
    min_samples: int = 10
    count_mode: str = "presence"


FEATURES = {
    "E1": Feature(
        id="E1",
        name="Task subagent launched",
        pattern=re.compile(r'Task\s*\(|subagent_type.*generalPurpose|description.*[Ee]nhance prompt', re.DOTALL),
        min_samples=10,
        count_mode="count"
    ),
    "E2": Feature(
        id="E2",
        name="Correct model routing",
        pattern=re.compile(r'/enhance-(claude|gpt)\s', re.IGNORECASE),
        min_samples=10,
        count_mode="count"
    ),
    "E3": Feature(
        id="E3",
        name="Enhanced prompt displayed in code fence",
        pattern=re.compile(r'Enhanced prompt.*?[Cc]laude|[Gg][Pp][Tt].*?```', re.DOTALL),
        min_samples=10
    ),
    "E4": Feature(
        id="E4",
        name="Enhanced prompt executed",
        pattern=re.compile(r'(```[\s\S]+?```)[\s\S]+(Write|Read|Shell|StrReplace|Glob|Grep)', re.DOTALL),
        min_samples=10
    ),
    "E5": Feature(
        id="E5",
        name="No recursive /enhance-me",
        pattern=re.compile(r'(?!.*/enhance-me)Enhanced prompt', re.DOTALL),
        min_samples=10
    ),
    "E6": Feature(
        id="E6",
        name="Claude: XML tags in enhanced prompt",
        pattern=re.compile(r'<(context|task|instructions|constraints|success_criteria|output_format)>'),
        min_samples=5,
        count_mode="count"
    ),
    "E7": Feature(
        id="E7",
        name="Claude: instructions at end (recency)",
        pattern=re.compile(r'<instructions>[\s\S]*?</instructions>[\s\S]*?<(constraints|success_criteria)>', re.DOTALL),
        min_samples=5
    ),
    "E8": Feature(
        id="E8",
        name="GPT: markdown headers",
        pattern=re.compile(r'##\s+(Role|Task|Instructions|Context|Constraints|Output Format)'),
        min_samples=5,
        count_mode="count"
    ),
    "E9": Feature(
        id="E9",
        name="GPT: instructions at start (primacy)",
        pattern=re.compile(r'##\s+Role[\s\S]*?##\s+Task[\s\S]*?##\s+Instructions', re.DOTALL),
        min_samples=5
    ),
    "E10": Feature(
        id="E10",
        name="Success criteria present",
        pattern=re.compile(r'success.criteria|definition of done|complete when', re.IGNORECASE),
        min_samples=10
    ),
    "E11": Feature(
        id="E11",
        name="Constraints section present",
        pattern=re.compile(r'<constraints>|##\s+Constraints', re.IGNORECASE),
        min_samples=10
    ),
    "E12": Feature(
        id="E12",
        name="Role/context framing present",
        pattern=re.compile(r'<context>|##\s+Role|You are a|senior|specialist|expert', re.IGNORECASE),
        min_samples=10
    ),
}

WORKLOAD_FEATURES = {
    "01-routing": ["E1", "E2"],
    "02-vague-task": ["E1", "E3", "E4", "E5", "E6", "E7", "E10", "E11", "E12"],
    "03-specific-task": ["E1", "E3", "E4", "E6", "E10", "E11"],
    "04-debugging": ["E1", "E3", "E4", "E10", "E12"],
    "05-gpt-task": ["E1", "E2", "E3", "E8", "E9", "E10"],
    "06-architecture": ["E1", "E3", "E4", "E10", "E11", "E12"],
    "07-multi-step": ["E1", "E3", "E4", "E10", "E11", "E12"],
    "08-documentation": ["E1", "E3", "E4", "E10"],
    "09-refactoring": ["E1", "E3", "E4", "E10", "E11"],
    "10-error-investigation": ["E1", "E3", "E4", "E10", "E12"],
}


def check_feature(transcript: str, feature_id: str) -> dict:
    """Check if a feature is present in the transcript."""
    feature = FEATURES.get(feature_id)
    if not feature:
        return {"found": False, "error": f"Unknown feature: {feature_id}"}

    matches = feature.pattern.findall(transcript)

    if feature.count_mode == "count":
        return {
            "found": len(matches) > 0,
            "count": len(matches),
            "feature": feature.name
        }
    else:
        return {
            "found": len(matches) > 0,
            "count": 1 if matches else 0,
            "feature": feature.name
        }


def analyze_transcript(transcript: str, workload_id: str) -> dict:
    """Analyze a transcript for all features relevant to its workload."""
    features_to_check = WORKLOAD_FEATURES.get(workload_id, list(FEATURES.keys()))

    results = {}
    for fid in features_to_check:
        results[fid] = check_feature(transcript, fid)

    passed = sum(1 for r in results.values() if r.get("found", False))
    total = len(results)

    return {
        "workload": workload_id,
        "features": results,
        "passed": passed,
        "total": total,
        "success_rate": passed / total if total > 0 else 0
    }


if __name__ == "__main__":
    sample = '''
    Task({
      description: "Enhance prompt for claude",
      subagent_type: "generalPurpose",
      prompt: "/enhance-claude Add dark mode"
    })

    **Enhanced prompt (Claude):**

    ```
    <context>
    Web application with existing light theme.
    </context>

    <task>
    Implement dark mode toggle.
    </task>

    <instructions>
    1. Add CSS variables for theme colors
    2. Create toggle component
    3. Persist preference in localStorage
    </instructions>

    <constraints>
    - Follow existing code patterns
    - Do not modify unrelated files
    </constraints>

    <success_criteria>
    - Dark mode toggle works
    - Preference persists across sessions
    - No visual regressions in light mode
    </success_criteria>
    ```

    Write(...)
    '''

    result = analyze_transcript(sample, "02-vague-task")
    print(f"Workload: {result['workload']}")
    print(f"Pass rate: {result['passed']}/{result['total']} ({result['success_rate']:.0%})")
    for fid, data in result['features'].items():
        status = "✓" if data['found'] else "✗"
        print(f"  {status} {fid}: {data['feature']}")
