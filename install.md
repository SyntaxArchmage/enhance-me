# enhance-me — Installation Guide

This guide is designed to be read and executed by an LLM agent.

## What You're Installing

Three Cursor/agent skills that form a prompt enhancement pipeline:

1. **enhance-me** — Action-forcing router that detects `/enhance-me` in user messages, routes to the correct model skill, and enforces the 3-step protocol (launch subagent → display prompt → execute)
2. **enhance-claude** — Claude prompt optimizer (XML structuring, recency-placed instructions, few-shot patterns)
3. **enhance-gpt** — GPT/Codex prompt optimizer (primacy-placed instructions, markdown delimiters, zero-shot-first)

## Step 1: Clone the Repository

```bash
git clone git@github.com:SyntaxArchmage/enhance-me.git /tmp/enhance-me-repo
```

## Step 2: Install Skills to Agent Skill Directories

Copy all skill files into the relevant directories for every platform the user has. Create directories if they don't exist.

| Platform | Project path | Personal path |
|----------|-------------|---------------|
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| GitHub Copilot | `.github/copilot/skills/` | `~/.github/copilot/skills/` |
| OpenAI Codex | `.codex/skills/` | `~/.codex/skills/` |
| Google Gemini CLI | `.gemini/skills/` | `~/.gemini/skills/` |
| Windsurf | `.windsurf/skills/` | `~/.windsurf/skills/` |

For **Cursor, Claude Code, and GitHub Copilot** (personal), run:

```bash
SRC=/tmp/enhance-me-repo/.cursor/skills

for PLATFORM_DIR in ~/.cursor/skills ~/.claude/skills ~/.github/copilot/skills; do
  for SKILL in enhance-me enhance-claude enhance-gpt; do
    mkdir -p "$PLATFORM_DIR/$SKILL"
    cp "$SRC/$SKILL/SKILL.md" "$PLATFORM_DIR/$SKILL/SKILL.md"
  done
done
```

For **other platforms** (SKILL.md is sufficient — no shell scripts needed):

```bash
SRC=/tmp/enhance-me-repo/.cursor/skills
DEST=<platform-skills-directory>

for SKILL in enhance-me enhance-claude enhance-gpt; do
  mkdir -p "$DEST/$SKILL"
  cp "$SRC/$SKILL/SKILL.md" "$DEST/$SKILL/SKILL.md"
done
```

## Step 3: Verify Installation

```bash
for SKILL in enhance-me enhance-claude enhance-gpt; do
  ls ~/.cursor/skills/$SKILL/SKILL.md 2>/dev/null \
    && echo "$SKILL: installed" \
    || echo "$SKILL: NOT FOUND"
done
```

## Step 4: Restart Your Agent Session

Start a **new conversation** for the skills to be discovered. Skills are loaded at conversation start, not mid-conversation.

Usage: type `/enhance-me <your task>` in any agent chat.

## Cleanup

```bash
rm -rf /tmp/enhance-me-repo
```

## Uninstall

```bash
for SKILL in enhance-me enhance-claude enhance-gpt; do
  rm -rf ~/.cursor/skills/$SKILL
  rm -rf ~/.claude/skills/$SKILL
  rm -rf ~/.github/copilot/skills/$SKILL
done
```
