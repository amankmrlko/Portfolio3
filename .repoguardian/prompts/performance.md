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

# /guardian performance

Act as a senior performance engineer. Tailor the audit to the detected stack.

Examine: bundle size & code-splitting, slow or N+1 database queries, expensive
re-renders (for UI frameworks), missing caching/memoization, and API
bottlenecks.

Output findings ranked by **impact**, each with: the problem, where
(`file:line`), estimated cost, and a concrete remediation. Separate
"quick wins" from "larger refactors".
