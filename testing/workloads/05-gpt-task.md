# Workload 05: GPT-Targeted Task

## Prompt

```
/enhance-me gpt add input validation to the login form
```

## Expected Behavior

1. `gpt` keyword detected → routes to `/enhance-gpt`
2. Enhanced prompt uses Markdown headers (not XML tags)
3. Instructions placed at start (primacy effect for GPT)
4. Conversational, direct tone

## Features Tested

- E1: Task subagent launched
- E2: Correct model routing (GPT)
- E3: Enhanced prompt displayed in code fence
- E8: GPT markdown headers
- E9: GPT instructions at start (primacy)
- E10: Success criteria present

## Verification Patterns

```python
patterns = [
    r'/enhance-gpt',  # E2 - routed to GPT
    r'##\s+Role',  # E8 - markdown headers
    r'##\s+Role.*##\s+Task.*##\s+Instructions',  # E9 - primacy order
]
```
