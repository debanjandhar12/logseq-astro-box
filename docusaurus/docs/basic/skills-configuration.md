---
title: Skills
---

Skills let the model discover reusable instructions while it works on a task. They
are loaded on demand through the native `skill` tool. Skills are stored inside the
graph as `skills/<name>/SKILL.md`, and can be edited from **Storage Info** or from
the built-in Skill Editor.

## Basic Directory Structure

A skill is a folder whose name matches the `name` in its frontmatter:

```text
skills/my-skill/
├── SKILL.md
├── examples/
├── references/
└── scripts/
```

`SKILL.md` holds the frontmatter and the instructions. `examples/`, `references/`,
and `scripts/` are optional and can be split into nested folders; the model reads
them only when it needs them. The whole folder is mounted read-only in the sandbox,
so paths inside a skill resolve relative to its base directory.

## Editing using Skill Editor

1. Open Logseq plugin settings.
2. Select **Open Skill Editor**.

<img src={require("@site/static/img/skills-editor.png").default} alt="Skill Editor" />

Use **+** to add a skill, the **Enabled** checkbox to control whether the model can
see it, and the trash icon to delete it. Only `SKILL.md` is edited here; the other
files in the folder are left alone, and renaming `name` renames the folder. Built-in
skills cannot be renamed, deleted, or edited.

## Special Frontmatter fields

- `disable-model-invocation` (boolean) hides the skill from the model's list while
  still allowing it to be loaded by name. The editor presents this as **Enabled**,
  which is the inverse.
- `built-in-skill` (boolean) marks a bundled skill.
- `built-in-skill-user-controllable` (boolean) lets you toggle **Enabled** for a
  bundled skill when it opts in.

Fields that are not listed here are preserved as written.

## Template Variables

Skill instructions are Mustache templates with `<% %>` delimiters, and variable
names are case-insensitive.

| Variable | Value |
| --- | --- |
| `globalAgentInstruction` | Your global agent instruction setting |
| `currentPage` | UUID of the current page, or "No current page" |
| `currentEditingBlock` | UUID of the block being edited, or "No current editing block" |
| `modelInvokableSkillList` | Bulleted list of skills the model can see |
| `chatAppAgentToolResultMaxChar` | Character limit for tool results |
| `virEnvUserPath` | Sandbox home path, `/home/user` |
| `time` | Current time as `HH:mm` |
| `today`, `tomorrow`, `yesterday` | Dates in your preferred format |
| `userTimeZone` | Your time zone |
| `last monday` … `last sunday` | Date of the most recent matching weekday |

:::tip
You can ask the model to write its own skill.
:::
