# /enhance-me — Prompt Enhancer for AI Coding Agents

A set of Cursor skills that automatically enhance your prompts with model-specific best practices before execution.

## What It Does

Type `/enhance-me <your task>` in any Cursor chat. The skill:

1. Detects which model you're targeting (Claude by default, or GPT/Codex)
2. Delegates to a subagent that restructures your prompt using research-backed techniques
3. Surfaces the enhanced prompt in chat so you can review it
4. Executes the enhanced prompt

## Skills

| Skill | Description |
|-------|-------------|
| `enhance-me` | Router — detects `/enhance-me` in messages, determines target model, delegates |
| `enhance-claude` | Claude optimizer — XML structuring, recency-placed instructions, few-shot patterns |
| `enhance-gpt` | GPT/Codex optimizer — primacy-placed instructions, markdown delimiters, zero-shot-first |

## Usage

```
/enhance-me refactor the auth module to use JWT tokens
/enhance-me gpt add input validation to the login form
/enhance-me claude design a caching layer for the API
```

- Default target: Claude
- Add `gpt` to target GPT/Codex models

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
