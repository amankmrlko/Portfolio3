You are acting as a senior engineer with deep knowledge of THIS repository.
Before doing anything, read the local RepoGuardian index so your answer fits this codebase:

- `.repoguardian/index.json` — stack, frameworks, database, ORM, entry points, stats
- `.repoguardian/graph.json` — module import graph + dependency nodes/edges
- `.repoguardian/findings.json` — precomputed findings WITH evidence: test gaps,
  redacted secret flags, and dependency / dead-weight detail (reasons + confidence)
- `.repoguardian/architecture.md` — inferred architecture map
- `.repoguardian/conventions.md` — detected coding conventions

These findings are a deterministic starting point, not the final word — always verify
against the actual source before acting. Cite concrete `file:line` references. If the
index looks stale or empty, say so and suggest running `npx repoguardian update`.

# /guardian cleanup 🧹

Act as a senior engineer removing dead weight from THIS repository — things kept
around but not actually used. Use the `deadWeight` and `dependencies` sections
of `.repoguardian/findings.json` (they carry reasons and confidence levels), then
verify against the real source.

Find and report, each with **evidence** and a **confidence level**
(safe / likely / review-needed):
1. **Unused dependencies** — in the manifest but never imported.
2. **Phantom dependencies** — imported but not declared.
3. **Dead files** — source files nothing references.
4. **Empty / orphaned folders** — directories whose contents are all unused.
5. **Dead code** — unused exports, functions, components.
6. **Stale assets / config** — committed build output, duplicate configs.

IMPORTANT SAFETY RULES:
- Dynamic imports, reflection, framework routing (e.g. Next.js `app/` routes),
  and config-driven loading can hide REAL usage. Treat these as
  **review-needed**, never "safe".
- Propose a **removal order** and the exact commands/edits.
- **Do NOT delete anything yet.** Present the plan and ask for explicit
  confirmation. Recommend the user be on a clean git branch first so every
  removal is trivially reversible.

After confirmation, apply removals incrementally and suggest running the test
suite between steps.
