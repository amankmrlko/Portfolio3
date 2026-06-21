# 🛡️ RepoGuardian

This repository is indexed by **RepoGuardian** — a local, free, repository-aware
context layer for AI coding assistants. Nothing here leaves your machine.

**Detected stack:** Frameworks: React · Language: JavaScript · Auth: Firebase Auth · Hosting: Vercel.

## How to use (any assistant)

Pick a task below and either **@-mention** or **paste** its prompt file into your
AI assistant, then follow it. Each prompt instructs the assistant to read this
repo's local index (`.repoguardian/`) and act as a senior specialist.

| Task | Purpose | Prompt file |
|---|---|---|
| `guardian architecture` | Map how this repository works — structure, data flow, risks | `.repoguardian/prompts/architecture.md` |
| `guardian security` | Senior security review — auth, secrets, unsafe patterns | `.repoguardian/prompts/security.md` |
| `guardian tests` | Find testing gaps and propose/generate tests | `.repoguardian/prompts/tests.md` |
| `guardian dependencies` | Dependency intelligence — unused, phantom, duplicate, risky | `.repoguardian/prompts/dependencies.md` |
| `guardian cleanup` | Find unused deps, dead files, orphaned folders & dead code | `.repoguardian/prompts/cleanup.md` |
| `guardian performance` | Performance audit — bundles, queries, renders, caching | `.repoguardian/prompts/performance.md` |
| `guardian documentation` | Generate & maintain README, architecture, API, onboarding docs | `.repoguardian/prompts/documentation.md` |
| `guardian refine` | Expand a thin request into a repository-aware prompt | `.repoguardian/prompts/refine.md` |
| `guardian implement` | Plan and build a feature against your repo's conventions | `.repoguardian/prompts/implement.md` |
| `guardian migrate` | Plan a migration — affected files, changes, risks, rollback | `.repoguardian/prompts/migrate.md` |
| `guardian review` | Combined senior + architect + security + QA review | `.repoguardian/prompts/review.md` |

### Examples
- Cline / Continue / Aider: `@.repoguardian/prompts/architecture.md` → "follow this".
- Zed / JetBrains AI: open `.repoguardian/prompts/security.md`, copy, paste into chat.
- For **refine**: open `.repoguardian/prompts/refine.md`, paste it, then add your
  one-line request (e.g. "add payment support"). Run the expanded prompt it returns.

If your assistant has native RepoGuardian commands (Claude Code, Cursor, Windsurf,
Copilot, Antigravity), use those instead — they were generated too.

> Index: `.repoguardian/index.json` · `graph.json` · `findings.json` · `architecture.md` · `conventions.md`
> Refresh after big changes: `npx repoguardian update`

---
RepoGuardian · https://github.com/amankmrlko/repoguardian · [Usage](https://github.com/amankmrlko/repoguardian/blob/main/docs/USAGE.md) · [Commands](https://github.com/amankmrlko/repoguardian/blob/main/docs/COMMANDS.md)
