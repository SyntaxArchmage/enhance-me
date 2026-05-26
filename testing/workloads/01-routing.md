# Workload 01: Model Routing

## Prompt

```
/enhance-me add a health check endpoint to the API
```

## Expected Behavior

1. Agent detects `/enhance-me` trigger
2. No model specifier → routes to Claude (default)
3. Launches Task subagent with `/enhance-claude add a health check endpoint to the API`
4. Displays enhanced prompt in code fence
5. Executes the enhanced prompt

## Variants

Test these routing patterns in separate runs:

- `/enhance-me gpt add a health check endpoint` → routes to GPT
- `/enhance-me claude add a health check endpoint` → routes to Claude
- `add a health check endpoint /enhance-me` → routes to Claude (default)
- `add a health check endpoint /enhance-me gpt` → routes to GPT

## Features Tested

- E1: Task subagent launched
- E2: Correct model routing

## Verification Patterns

```python
patterns = [
    r'Task\s*\(.*enhance',  # E1
    r'/enhance-claude|/enhance-gpt',  # E2
]
```
