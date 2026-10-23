---
title: Sandboxed Environment
---

Agents run completely in a sandboxed environment inside the browser.

## Bash

Agents get a shell emulated by just-bash. It is read-only: commands can read files,
inspect the environment, and run searches, but they cannot write anything or start a
Node.js process.

## Pyodide

The Bash environment exposes Pyodide through the `python`, `python3`, and `py`
commands. Agents can also import a special library called `logseq_lib`, which lets
them reach Logseq and record every change in the transaction tracker. In other words,
`logseq_lib` allows agents to modify assets, pages, and other blocks while keeping
version control intact, so their work shows up in Review & Commit like any other edit
and can be reverted.
