# /enhance-me — Prompt Enhancer for AI Coding Agents

A set of Cursor skills that automatically enhance your prompts with model-specific best practices before execution. Uses an action-forcing protocol to guarantee the enhancement pipeline runs correctly every time.

## What It Does

Type `/enhance-me <your task>` in any Cursor chat. The skill enforces a mandatory 3-step protocol:

1. **Launch subagent** — Delegates to a Task subagent with the appropriate model-specific enhancement skill
2. **Display enhanced prompt** — The full enhanced prompt is shown in a code fence so you can review it
3. **Execute** — The enhanced prompt is executed as working instructions

The router skill treats skipping any step as a protocol violation, ensuring consistent behavior.

## Skills

| Skill | Description |
|-------|-------------|
| `enhance-me` | Action-forcing router — detects `/enhance-me`, routes to the correct model skill, enforces the 3-step protocol |
| `enhance-claude` | Claude optimizer — XML structuring, recency-placed instructions, few-shot patterns, calm tone, literal completeness |
| `enhance-gpt` | GPT/Codex optimizer — primacy-placed instructions, markdown delimiters, zero-shot-first, pragmatic values |

## Usage

```
/enhance-me refactor the auth module to use JWT tokens
/enhance-me gpt add input validation to the login form
/enhance-me claude design a caching layer for the API
```

### Routing Rules

| Input | Target |
|-------|--------|
| `/enhance-me <task>` | Claude (default) |
| `/enhance-me claude <task>` | Claude |
| `/enhance-me gpt <task>` | GPT/Codex |
| `<task> /enhance-me` | Claude (default) |
| `<task> /enhance-me gpt` | GPT/Codex |

## Key Enhancement Techniques

### Claude (`enhance-claude`)
- XML tag structure (`<context>`, `<task>`, `<instructions>`, etc.)
- Critical instructions placed at the END (recency bias)
- Calm, direct tone (aggressive language hurts Claude 4.x)
- Role + reason framing
- Few-shot examples in `<example>` tags
- Explicit success criteria

### GPT/Codex (`enhance-gpt`)
- Critical instructions placed at the START (primacy bias)
- Markdown headers as section delimiters
- Conversational, direct tone
- Zero-shot first (add examples only when needed)
- Codex-specific patterns (testing, validation, no fluff)
- Pragmatic values (clarity, pragmatism, rigor)

## Installation

### Global install (available in all workspaces)

```bash
SRC=/path/to/enhance-me/.cursor/skills

mkdir -p ~/.cursor/skills/enhance-me ~/.cursor/skills/enhance-claude ~/.cursor/skills/enhance-gpt
cp "$SRC/enhance-me/SKILL.md"     ~/.cursor/skills/enhance-me/SKILL.md
cp "$SRC/enhance-claude/SKILL.md" ~/.cursor/skills/enhance-claude/SKILL.md
cp "$SRC/enhance-gpt/SKILL.md"    ~/.cursor/skills/enhance-gpt/SKILL.md
```

### Per-project install

Clone or copy the `.cursor/skills/` directory into your project root. Cursor discovers skills automatically at conversation start.

### After installing

Start a **new conversation** for the skills to be discovered. Skills are loaded at conversation start, not mid-conversation.

## License

MIT
