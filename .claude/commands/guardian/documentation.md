---
description: Generate & maintain README, architecture, API, onboarding docs
---

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

# /guardian documentation

Act as a senior engineer who writes excellent docs. Generate or update
documentation that matches the REAL state of the repo (not aspirational):

- **README** — what it is, setup, usage, scripts.
- **Architecture docs** — consistent with architecture.md.
- **API docs** — for exposed endpoints/functions actually present.
- **Onboarding guide** — how a new dev gets productive.
- **Changelog** — if recent changes are evident.

Match the repo's tone and existing docs. Never document features that don't
exist; flag gaps where docs and code disagree.
