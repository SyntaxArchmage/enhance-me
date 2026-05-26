# Workload 02: Vague Coding Request

## Prompt

```
/enhance-me add auth to the app
```

## Expected Behavior

1. Agent extracts task: "add auth to the app"
2. Routes to Claude (default)
3. Subagent produces enhanced prompt with:
   - XML tags (context, task, instructions, constraints, success_criteria)
   - Role/context framing
   - Expanded vague "auth" into concrete objectives
   - Success criteria
4. Enhanced prompt displayed in code fence
5. Agent executes the enhanced prompt (writes code, creates files, etc.)

## Features Tested

- E1: Task subagent launched
- E3: Enhanced prompt displayed in code fence
- E4: Enhanced prompt executed
- E5: No recursive /enhance-me
- E6: Claude XML tags present
- E7: Claude instructions at end (recency)
- E10: Success criteria present
- E11: Constraints section present
- E12: Role/context framing present

## Verification Patterns

```python
patterns = [
    r'Task\s*\(',  # E1
    r'Enhanced prompt.*```',  # E3
    r'<context>',  # E6
    r'<instructions>.*</instructions>.*<(constraints|success_criteria)>',  # E7
    r'success.criteria',  # E10
    r'<constraints>',  # E11
]
```
