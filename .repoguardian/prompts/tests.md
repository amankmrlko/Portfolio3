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

# /guardian tests

Act as a senior engineer responsible for test quality. Start from the `tests`
section of `.repoguardian/findings.json` — it lists `uncovered` source files (no
matching test found), the `ratio` of test-to-source files, and `testFiles`. Treat
`uncovered` as leads to verify against the real source, not gospel.

Produce:
1. **Missing tests** — important source files/paths with no coverage (cross-check
   the `uncovered` list; ignore trivial files like barrels/types).
2. **Coverage weaknesses** — areas with shallow or brittle tests.
3. **Suggested test cases** — concrete scenarios (happy path, edge, failure).
4. **Generated tests** — write real tests for the highest-value gaps, matching
   the repo's existing test framework and conventions (see conventions.md).

Do not invent APIs — read the code first and test what actually exists.
