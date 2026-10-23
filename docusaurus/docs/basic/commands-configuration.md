---
title: Commands
---

Commands are reusable prompts stored inside the graph, one file per command. You can
run one from a block or page context menu, the Logseq command center, or a block
slash command, and edit them in the built-in Command Editor.

## Basic Directory Structure

Each command is a file in `commands/`, named after the command:

```text
commands/
├── Add to Chat.md
└── Translate to English.md
```

The file name matches the `name` in the frontmatter. A command file is YAML
frontmatter followed by the prompt itself. Built-in commands ship with the plugin and
live in the same folder.

## Editing using Command Editor

1. Open Logseq plugin settings.
2. Select **Open Command Editor**.

<img src={require("@site/static/img/commands-editor.png").default} alt="Command Editor" />

Use **+** to add a command and the trash icon to delete one; built-in commands cannot
be deleted. The **Enabled** checkbox adds or removes the command from every entry
point, and the invoke-location picker chooses where it appears. The editor completes
frontmatter keys, boolean values, and template variables as you type.

## Special Frontmatter fields

- `invoke-location` (required) lists where the command appears. Use the block
  context menu entries `Block Context Menu/Image`, `Block Context Menu/Pdf`,
  `Block Context Menu/Video`, `Block Context Menu/Flashcard`, `Block Context
  Menu/Math`, and `Block Context Menu/Other Blocks`; the page context menu entries
  `Page Context Menu/Tag`, `Page Context Menu/Property`, `Page Context Menu/Journal`,
  and `Page Context Menu/Other Pages`; or the standalone entries `Logseq Command
  Center` and `Block Slash Command`.
- `user-invocable` (boolean, defaults to `true`) is the **Enabled** checkbox.
- `command-invoke-in-new-thread` (boolean) starts a new thread instead of reusing the
  current one.
- `command-auto-send` (boolean, defaults to `false`) sends the prepared prompt
  immediately; when it is off, the prompt waits in the composer for review.
- `command-appear-separately-in-context-menu` (boolean) adds a dedicated context menu
  entry instead of going through the shared command picker.
- `built-in-command` and `built-in-command-user-controllable` mark and unlock bundled
  commands, the same way the skill fields do.

## Template Variables

Commands support the same template variables as skills. See
[Skills](./skills-configuration.md#template-variables) for the list.
