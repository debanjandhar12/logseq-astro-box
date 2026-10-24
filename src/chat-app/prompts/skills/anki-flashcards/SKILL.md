---
name: anki-flashcards
description: Use when creating or improving flashcards in Logseq for the Logseq Anki Sync plugin, including cloze, highlight-mask, Swift Arrow, and question-and-answer cards.
disable-model-invocation: true
built-in-skill: true
built-in-skill-user-controllable: true
---

# Anki Flashcards

Create flashcards inside Logseq. The user uses Logseq Anki Sync plugin to sync flashcards to anki.

Good flashcards help the learner remember important content and understand it. Use clear retrieval prompts, supported syntax, and useful post-answer feedback.

## Card-Making Principles

- **Understand before memorizing.** Provide enough context for the learner to understand what they are recalling.
- **Keep the retrieval target focused.** Follow the minimum-information principle: test one coherent idea at a time. Split unrelated facts or independently testable steps.
- **Make questions unambiguous.** Include necessary conditions, scope, or versions on the front. The learner should know what counts as a correct answer without consulting surrounding notes.
- **Avoid answer leakage.** Hints should clarify the question, not reveal the answer.
- **Separate recall from explanation.** The answer is what the learner must retrieve. Extra provides feedback after the attempt; it is not additional material they must recite.
- **Address confusion explicitly.** When concepts are easy to confuse, explain their distinguishing features in the extra.
- **Do not force reverse recall.** Create cards in both directions only when both directions are useful and reasonably unambiguous.

These practices draw on retrieval practice, SuperMemo’s minimum-information principle, elaboration, and discriminative comparison. They do not imply that every card needs a long explanation or every extra section.

## Choosing the Card Type

### Cloze

Use cloze for facts or relationships embedded in ordinary prose.

Choose it when the surrounding sentence provides meaningful context and the missing text is a clear retrieval target.

Avoid:
- Hiding so much text that the learner must reconstruct an arbitrary sentence.
- Deleting trivial words.
- Leaving clues that make the answer obvious without knowing the content.

Use short inline extras. Prefer highlight masks when individual deletions need multiline explanations.

### Highlight Note

Use highlight masks for:
- Text inside code blocks or math.
- Source text that should remain unchanged.
- Ordinary prose whose individual deletions benefit from multiline explanations, near misses, or worked examples.

Choose the text to hide as carefully as a cloze deletion. Do not mask a large passage when only one part is worth testing.

### Swift Arrow

Use Swift Arrow for concise definitions or term-to-meaning relationships.

Choose it when “term → definition” expresses the learning target naturally.

Use an explicit question instead when the term has several meanings or the intended answer requires additional conditions.

### Normal Flashcard

Use a normal parent/child flashcard for:
- Explicit questions.
- Applying a concept to a scenario.
- Commands or code answers.
- Focused comparisons.
- Short, bounded procedures.

Keep the expected answer manageable. Split long lists or unrelated questions rather than making one oversized card.

## Logseq Properties and Tags

When writing actual Logseq DB blocks, use structural properties and tags—not merely text that resembles them. Follow the `logseq-properties-and-tags` skill when needed.

Relevant identifiers:
- Highlight mask: `:plugin.property.logseq-anki-sync/highlight_mask`
- Block-level extra: `:plugin.property.logseq-anki-sync/extra`
- Flashcard tag/class: `:plugin.class.logseq-anki-sync/flashcard`

In the examples, `#flashcard` represents the actual flashcard tag/class. Cloze, highlight, and Swift Arrow cards do not require this additional tag.

## Cloze Card Syntax

Replace the text to hide with:

```text
{{c1 text::hint/question::extra}}
```

The hint and extra are optional:

```text
{{c1 text}}
{{c1 text::hint/question}}
{{c1 text::::extra}}
```

Use the space after the cloze ID. This differs from Anki’s native `{{c1::text}}` syntax.

Use IDs 1–9:
- Different IDs create separate cards.
- Repeated IDs hide those targets together. Use this deliberately, not simply to group unrelated facts.

### Example

```text
The capital of {{c1 Japan::Which country?::Japan is also called Nihon or Nippon in Japanese.}} is {{c2 Tokyo::Which city?::Near miss: Kyoto was a former imperial capital of Japan; Tokyo is the current capital.}}.
```

Keep inline extras single-line. Use highlight masks for substantial multiline feedback attached to individual deletions.

## Highlight Note Card Syntax

Set the block’s `:plugin.property.logseq-anki-sync/highlight_mask` property to JSON with this structure:

```json
{"config":{},"elements":[{"cId":1,"text":"","prefix":"","suffix":"","hint":"","extra":""}],"tags":[]}
```

Each element describes a deletion:
- `cId`: cloze ID.
- `text`: exact text to hide.
- `prefix`: literal text immediately before the target.
- `suffix`: literal text immediately after the target.
- `hint`: optional cue or question.
- `extra`: optional post-answer feedback.

### Matching and JSON Rules

- Match the actual block text, including spaces, punctuation, and relevant Markdown delimiters.
- Use enough adjacent context to distinguish repeated occurrences.
- Recompute selectors if the source text changes.
- Serialize JSON correctly: newlines inside strings become `\n`, and backslashes become `\\`.
- Do not put raw, unescaped line breaks inside JSON strings.
- Keep tags unique; an empty `tags` array is valid.

### Prose Example

Block text:

```text
The capital of Japan is Tokyo.
```

Highlight-mask property value:

```json
{
  "config": {},
  "elements": [
    {
      "cId": 1,
      "text": "Japan",
      "prefix": "The capital of ",
      "suffix": " is Tokyo.",
      "hint": "Which country?",
      "extra": "### Explanation\nTokyo is Japan’s capital and the seat of its national government. Japan is also called Nihon or Nippon in Japanese.\n\n### Near Misses\n- South Korea: Its capital is Seoul, not Tokyo. Both countries are in East Asia, but they are distinct countries with different capitals.\n\n### Broader Context\nTokyo was formerly called Edo. In 1868, it was renamed Tokyo, and the imperial residence moved there from Kyoto."
    },
    {
      "cId": 2,
      "text": "Tokyo",
      "prefix": "Japan is ",
      "suffix": ".",
      "hint": "Which city?",
      "extra": "### Near Misses\n- Kyoto: Kyoto served as Japan’s imperial capital until 1868, when the imperial seat moved to Tokyo."
    }
  ],
  "tags": []
}
```

### Math Example

Block text, using the actual `#Math` tag:

```text
(x + y)^2 = x^2 + 2xy + y^2
```

Highlight-mask property value:

```json
{
  "config": {},
  "elements": [
    {
      "cId": 1,
      "text": "x^2 + 2xy + y^2",
      "prefix": "(x + y)^2 = ",
      "suffix": "",
      "hint": "Expression after expanding?",
      "extra": "### Explanation\nThe square of a sum is found by multiplying the whole sum by itself:\n\n$$(x+y)^2 = (x+y)(x+y)$$\n\nDistribute each term in the first factor over the second:\n- $x \\times x = x^2$\n- $x \\times y = xy$\n- $y \\times x = xy$\n- $y \\times y = y^2$\n\nAdding these products gives:\n\n$$x^2 + xy + xy + y^2 = x^2 + 2xy + y^2$$\n\n### Near Misses\n- $x^2 + y^2$ omits the two cross-products. Squaring a sum means multiplying the entire sum by itself, not just squaring each term.\n\n### Broader Context\nThis identity follows from the distributive property. The middle term comes from the two ways to obtain an $xy$ product."
    }
  ],
  "tags": []
}
```

Do not also wrap the source in Markdown math delimiters when it already has the actual `#Math` tag.

## Swift Arrow Syntax

Use:

```text
Term :-> Definition
```

### Example

```text
Dockerfile :-> A text file containing instructions for building a Docker image.
```

Swift Arrow supports the block-level `:plugin.property.logseq-anki-sync/extra` property.

For example, set its value to the following Markdown. Do not include the surrounding code fence in the property value.

```markdown
### Explanation
A Dockerfile is a recipe for building a Docker image. Each instruction specifies part of the build or the resulting image’s configuration:

- `FROM` selects a base image.
- `RUN` executes a command during the build.
- `COPY` adds files from the build context.
- `ENV` sets environment variables.
- `CMD` or `ENTRYPOINT` specifies default startup behavior.

When you run `docker build`, Docker processes the Dockerfile to produce an image. This makes the build process explicit and repeatable, though reproducibility also depends on inputs such as dependency and base-image versions.

### Near Misses
- **Docker image:** The built artifact used to create containers. The Dockerfile is the recipe; the image is the resulting package.
- **Docker container:** An instance created from an image. It may be running or stopped. The Dockerfile builds the image; it is not the container itself.
```

## Normal Flashcard Syntax

Apply the flashcard tag/class to the question block. Put the answer in its children.

### Example

```text
- Which `docker run` option bind-mounts `/home/username/mysql` on the host at MySQL’s `/var/lib/mysql` data directory? #flashcard
  - `-v /home/username/mysql:/var/lib/mysql`
```

Normal flashcards support the block-level `:plugin.property.logseq-anki-sync/extra` property.

For example:

```markdown
### Explanation
The option `-v /home/username/mysql:/var/lib/mysql` mounts the host directory at the container’s MySQL data directory.

A command using this mount is:

`docker run -d -p 3306:3306 -v /home/username/mysql:/var/lib/mysql mysql`

MySQL’s writes under `/var/lib/mysql` go to the mounted host directory. Removing the container does not itself delete that directory’s contents, so the data can persist across container recreation.

This command illustrates the mount; a real deployment also needs appropriate MySQL configuration and credentials.

### Near Misses
- **Named volume:** `-v mysql_data:/var/lib/mysql` uses Docker-managed storage instead of an explicit host directory. Both can persist data beyond a container’s lifetime.
- **Port mapping:** `-p 3306:3306` exposes the container’s MySQL port through the host. It does not persist database files.

### Broader Context
Use a bind mount when a specific host path matters. Named volumes are often convenient for Docker-managed application data. Neither approach replaces a backup strategy.
```

Keep explanations in extra unless recalling the explanation is itself the learning target.

## Guidelines for Writing Extra

Extras should help the learner understand the answer, distinguish it from plausible alternatives, and connect it to existing knowledge.

Provide substantive feedback where useful. Do not mechanically add every section to every card.

### Explanation

Explain **why or how**, rather than repeating the answer.

Useful forms include:
- A causal mechanism.
- A defining condition.
- A worked derivation.
- An explanation of a command’s relevant parts.
- A concrete example of an abstract idea.

For a mathematical identity, show the steps that produce the result. For a command, explain the option responsible for the behavior being tested. For an arbitrary fact, give meaningful context rather than inventing a causal explanation.

Elaboration and self-explanation motivate connecting answers to reasons. However, reading an explanation is not the same as independently generating one.

### Near Misses

Use near misses to distinguish concepts the learner could plausibly confuse.

Prefer alternatives that:
- Share important features with the answer.
- Have similar names or syntax.
- Appear in the source material.
- Represent a relevant conceptual or procedural error.

For each near miss:
1. Name the alternative.
2. Explain the decisive difference.
3. State when the alternative would be correct, if useful.

For example:

> A named volume and a bind mount can both persist container data. A bind mount specifies a host path; a named volume uses storage managed by Docker.

Do not merely say that an alternative is wrong. Explain the boundary between the concepts.

Comparing confusable examples supports discriminative learning: draw attention to the feature that separates them. Avoid unrelated distractors, invented user mistakes, and unsupported claims that an error is “common.”

### Broader Context

Add a relevant connection to:
- A larger process or framework.
- A practical application.
- A prerequisite concept.
- Historical development.
- A limitation or boundary condition.

Keep the connection useful to the learning target. Avoid unrelated trivia.

### Additional Sections

Add sections when they improve learning:
- **Worked Example:** Apply the idea step by step.
- **Boundary Conditions:** Explain when the statement applies or fails.
- **Memory Cue:** Give an accurate association without replacing understanding.
- **Source:** Preserve a relevant reference, date, or version.

If another fact needs independent recall, create a separate card rather than hiding it in extra.

### Depth and Presentation

- Use enough detail to make the explanation understandable; do not impose a fixed length.
- Use headings, bullets, code, and math where they improve readability.
- Omit sections that would add only repetition or filler.
- Keep extras focused on the card’s retrieval target.
- Do not turn useful context into additional unstated recall requirements.
- Keep answer-revealing explanations out of hints.

## Final Check

Before presenting or saving cards, verify:
- The retrieval target and expected answer are clear.
- Necessary conditions appear on the front.
- The card type fits the learning task.
- Independent ideas have been separated.
- Hints do not reveal the answer.
- Extras explain, distinguish, or connect rather than merely repeat.
- Near misses are plausible and accurately contrasted.
- Highlight selectors match the source text.
- JSON is valid and correctly escaped.
- Actual graph edits use structural properties and tags.