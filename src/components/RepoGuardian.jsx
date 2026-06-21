import React from "react";
import CodeSnippet from "./CodeSnippet";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function RepoGuardian() {
  const analysisCode = `interface Analysis {
  scan:         ScanResult;          // files, languages, detected stack
  dependencies: DependencyFindings;  // unused / phantom / duplicate
  deadWeight:   DeadWeightFindings;  // dead files / orphaned folders
  secrets:      SecretFinding[];     // redacted - values never stored
  tests:        TestGapFindings;     // uncovered files + ratio
  architecture: ArchitectureFindings;
  conventions:  ConventionFindings;
  moduleGraph:  ModuleGraph;         // nodes + import edges
}
`;

  const gitignoreCode = `if (dirOnly) {
  return { negated, dirOnly,
    exact: new RegExp(base + \`$\`),     // the dir itself (requires isDir)
    under: new RegExp(base + \`/.*$\`),   // anything inside it
  };
}
// match: last matching rule wins; negation un-ignores
matched = (isDir && rule.exact.test(p)) || rule.under.test(p);
`;

  const importCode = `// the five JS/TS extraction patterns
import\\s+[^'"]*from\\s*['"]([^'"]+)['"]      // import x from 'y'
import\\s*['"]([^'"]+)['"]                  // import 'y'
import\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)       // import('y')
require\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)      // require('y')
export\\s+[^'"]*from\\s*['"]([^'"]+)['"]      // export … from 'y'
`;

  const deadFileCode = `deadFiles.push({ path: file, confidence: "review-needed",
  reason: "no local file imports this module (could still be an " +
          "entry point or dynamically loaded)" });
`;

  const secretCode = `interface SecretFinding {
  file: string;
  line: number;
  type: string;
  redacted: string; // first 4 chars + bullets - raw value never stored
}
`;

  const indexCode = `.repoguardian/
├── meta.json       # version, generatedAt, sourceHash, network flags
├── index.json      # stack, frameworks, db, orm, entry points, stats
├── graph.json      # module nodes + import edges + dependency names
├── findings.json   # evidence: tests, secrets, deps, dead-weight (reasons+confidence)
├── architecture.md # inferred architecture map
├── conventions.md  # detected conventions
└── prompts/        # the 11 compiled personas
`;

  const initOutput = `$ npx repoguardian init

🛡️  RepoGuardian v0.3.0
› Scanning ./my-app …
✓ Scanned 412 files · 38150 LOC · 47 test files
  stack: Next.js, React · PostgreSQL · Prisma · NextAuth · Vitest · Vercel
  findings: 3 unused deps · 2 dead files · 1 orphaned folder · 0 secret flags · 12 untested files
✓ Wrote 17 index files to .repoguardian/

Assistants wired
  • Claude Code (detected, 11 files)
  • Universal (any assistant) (universal, 1 files)

Learn more
  Repo (star it ⭐): https://github.com/amankmrlko/repoguardian
  Per-IDE usage:    …/docs/USAGE.md
  All commands:     …/docs/COMMANDS.md
`;

  const statusOutput = `$ npx repoguardian status

Available commands
  /guardian architecture - Map how this repository works
  /guardian cleanup - Find unused deps, dead files, orphaned folders
  /guardian implement - Plan & build a feature   ✎ modifies code (asks first)
  /guardian migrate - Plan a migration           ✎ modifies code (asks first)
  … 7 more …
`;

  const testOutput = `$ npm test

 ✓ test/units.test.ts (7 tests)
 ✓ test/analysis.test.ts (8 tests)
 ✓ test/product.test.ts (10 tests)
 Test Files  3 passed (3)
      Tests  25 passed (25)
`;

  const publishCode = `"prepublishOnly": "npm run build && npm test"
`;

  const installCode = `npx repoguardian init
npx repoguardian init --all
npx repoguardian init --assistants claude-code,cursor
npx repoguardian status
`;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="🛡️ RepoGuardian: A Low-Level Engineering Analysis"
        subtitle="An exhaustive technical dissection of a free, local-first, zero-dependency context layer that gives AI coding assistants the architecture knowledge, conventions, and senior-engineer judgement they normally lack - module by module, algorithm by algorithm."
      />

      <div className="blog-content">
        <div className="rg-stats">
          <div>
            <b>v0.3.0</b>
            <span>release</span>
          </div>
          <div>
            <b>34</b>
            <span>source files</span>
          </div>
          <div>
            <b>2.8k</b>
            <span>lines of code</span>
          </div>
          <div>
            <b>11</b>
            <span>commands</span>
          </div>
          <div>
            <b>6</b>
            <span>adapters</span>
          </div>
          <div>
            <b>25</b>
            <span>tests</span>
          </div>
          <div>
            <b>0</b>
            <span>runtime deps</span>
          </div>
        </div>
        <p className="gray-text">
          by <b>amankmrlko</b> &nbsp;·&nbsp; github.com/amankmrlko/repoguardian
          &nbsp;·&nbsp; npmjs.com/package/repoguardian &nbsp;·&nbsp; TypeScript ·
          MIT
        </p>
        <br />
        <br />

        <h2 className="white-text">Abstract</h2>
        <p className="gray-text">
          AI coding assistants are fluent but context-blind: they do not know
          the architecture, conventions, dependency graph, or accumulated
          decisions of the repository they edit. The result is{" "}
          <i>good code that is wrong for this codebase.</i> RepoGuardian closes
          that gap without training or calling a model. It scans a repository
          with deterministic static analysis, distils it into a local knowledge
          index (<b>.repoguardian/</b>), and compiles eleven senior-engineer
          "personas" into the native command formats of six AI assistants plus a
          universal fallback. This paper is a low-level account: the data model,
          the hand-written <b>.gitignore</b> engine, the regex import-graph and
          the reachability analysis behind dead-code detection, the redacting
          secret scanner, the dual <b>graph.json</b> / <b>findings.json</b>{" "}
          index, the persona-and-adapter compilation model, the security trust
          boundary, the packaging path to a published <b>npx</b> tool, three bugs
          found by testing, and the full development journey from concept to
          v0.3.0 - all in a package with <b>zero runtime dependencies</b>.
        </p>
        <br />
        <br />

        {/* 1 */}
        <h2 className="white-text">1. The Context Gap</h2>
        <p className="gray-text">
          A developer types <b>Build authentication</b>. The model obliges, the
          code compiles, and it is still wrong - not syntactically, but
          contextually.
        </p>
        <p className="gray-text">
          Assistants excel at generic, idiomatic code; they fail at code that
          fits <b>a particular repository</b>. By default they do not know the
          existing architecture, the security patterns already in place, folder
          conventions, the database schema, which dependencies are risky or
          already present, the testing strategy, or decisions the team made
          months ago and never wrote down. The failure reduces to one
          inequality:
        </p>
        <p className="white-text">
          <b>Good code &ne; Good code for THIS repository.</b>
        </p>
        <p className="gray-text">
          RepoGuardian's premise: most of that missing context is{" "}
          <i>recoverable deterministically</i> from the repository, and can be
          injected automatically into whatever assistant the developer already
          uses.
        </p>
        <br />
        <br />

        {/* 2 */}
        <h2 className="white-text">2. Thesis &amp; Positioning</h2>
        <p className="gray-text">
          The decision everything follows from: RepoGuardian is a <b>layer</b>,
          not an assistant. It does not replace the model; it sits in front of
          it and feeds it context.
        </p>
        <p className="gray-text">
          <b>Developer &rarr; RepoGuardian</b> (context + judgement){" "}
          <b>&rarr; AI Assistant &rarr; Code.</b> Reasoning is delegated to the
          assistant the developer already runs.
        </p>
        <table>
          <tbody>
            <tr>
              <th>Typical AI tools answer</th>
              <th>RepoGuardian answers</th>
            </tr>
            <tr>
              <td>
                <i>"What should I code?"</i>
              </td>
              <td>
                <i>
                  "How should <b>this</b> repository evolve, safely?"
                </i>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          Because the model is the developer's own, RepoGuardian needs none of
          its own. That single fact makes it simultaneously <b>free</b> (no
          inference bill) and <b>private</b> (no code to upload) - the two
          properties the rest of the system is built to protect.
        </p>
        <br />
        <br />

        {/* 3 */}
        <h2 className="white-text">3. Design Principles &amp; Constraints</h2>
        <p className="gray-text">
          Five constraints were fixed before any code. Each rules out an entire
          class of designs.
        </p>
        <table>
          <tbody>
            <tr>
              <th>Principle</th>
              <th>Consequence</th>
            </tr>
            <tr>
              <td>
                <b>No own LLM, no API key</b>
              </td>
              <td>
                "Agents" are prompt personas run by the host assistant. No cost;
                nothing sent anywhere.
              </td>
            </tr>
            <tr>
              <td>
                <b>Deterministic local analysis</b>
              </td>
              <td>
                Detection, dependency mapping, secret scanning, dead-code
                detection are static analysis on-device.
              </td>
            </tr>
            <tr>
              <td>
                <b>One source of truth</b>
              </td>
              <td>
                Everything distils into the local <code>.repoguardian/</code>{" "}
                index.
              </td>
            </tr>
            <tr>
              <td>
                <b>Adapters, not lock-in</b>
              </td>
              <td>
                Native files per assistant + a universal fallback, so no IDE is
                excluded.
              </td>
            </tr>
            <tr>
              <td>
                <b>Offline by default</b>
              </td>
              <td>
                No network egress unless explicitly opted in. Security becomes
                structural.
              </td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          The zero-runtime-dependency rule is load-bearing: for a tool whose
          pitch is trust and locality, a thin, auditable supply chain is part of
          the threat model (§14). Every utility a heavier project would import -
          a <code>.gitignore</code> matcher, import parsing, glob walking - is
          hand-written here.
        </p>
        <br />
        <br />

        {/* 4 */}
        <h2 className="white-text">4. System Architecture &amp; Module Map</h2>
        <p className="gray-text">
          RepoGuardian is a pipeline: a repository enters, native context-rich
          commands for the assistant emerge. No stage calls the network; no
          stage executes repository code.
        </p>
        <p className="white-text">
          <b>
            Repository &rarr; Scanner &rarr; Analyzers (7) &rarr; Knowledge
            Index (.repoguardian/) &rarr; Adapters (6) &rarr; AI Assistant
          </b>
        </p>
        <h3 className="white-text">Module layering</h3>
        <p className="gray-text">
          The 34 source files form clean layers with one-directional
          dependencies (lower layers never import upper):
        </p>
        <table>
          <tbody>
            <tr>
              <th>Layer</th>
              <th>Modules</th>
              <th>Responsibility</th>
            </tr>
            <tr>
              <td>
                <b>core/</b>
              </td>
              <td>types, fsutil, gitignore, imports, log, artifacts, links</td>
              <td>Types + dependency-free primitives</td>
            </tr>
            <tr>
              <td>
                <b>scanner/</b>
              </td>
              <td>index, detect, languages</td>
              <td>
                Walk the repo &rarr; <code>ScanResult</code>
              </td>
            </tr>
            <tr>
              <td>
                <b>analyzers/</b>
              </td>
              <td>
                importgraph, dependencies, deadweight, secrets, tests,
                architecture, conventions, vulnerabilities
              </td>
              <td>Static analysis &rarr; findings</td>
            </tr>
            <tr>
              <td>
                <b>pipeline.ts</b>
              </td>
              <td>-</td>
              <td>
                Orchestrates scan + analyzers &rarr; <code>Analysis</code>
              </td>
            </tr>
            <tr>
              <td>
                <b>index-builder/</b>
              </td>
              <td>index</td>
              <td>
                Serialise <code>Analysis</code> &rarr; <code>.repoguardian/</code>
              </td>
            </tr>
            <tr>
              <td>
                <b>templates/</b>
              </td>
              <td>personas</td>
              <td>The 11 persona prompts (single source)</td>
            </tr>
            <tr>
              <td>
                <b>adapters/</b>
              </td>
              <td>
                claude-code, cursor, windsurf, copilot, antigravity, fallback,
                index, types
              </td>
              <td>Compile personas &rarr; native formats</td>
            </tr>
            <tr>
              <td>
                <b>commands/ + cli.ts</b>
              </td>
              <td>init, update, status</td>
              <td>Argument parsing + orchestration + output</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />

        {/* 5 */}
        <h2 className="white-text">5. The Data Model (core/types.ts)</h2>
        <p className="gray-text">
          Every fact RepoGuardian learns flows through a small set of
          strongly-typed structures, ending in the on-disk index. The central
          aggregate is <code>Analysis</code>, the output of the pipeline:
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={analysisCode} language="typescript" />
        </div>
        <p className="gray-text">
          Two design choices in the types are worth noting. First, a{" "}
          <code>Confidence</code> union
          (<b>"safe" | "likely" | "review-needed"</b>) is threaded through every
          finding that involves a heuristic - honesty is encoded in the type
          system, not bolted on in the UI. Second, <code>SecretFinding</code> has
          no <code>value</code> field <i>by construction</i>: only{" "}
          <b>{`{ file, line, type, redacted }`}</b>. The data model itself makes
          leaking a secret impossible.
        </p>
        <br />
        <br />

        {/* 6 */}
        <h2 className="white-text">6. The Scanner &amp; the .gitignore Engine</h2>
        <p className="gray-text">
          The scanner does an iterative (stack-based, not recursive) depth-first
          walk, capped at 50,000 files, and its single most important job is to{" "}
          <b>respect .gitignore</b> - a security boundary, not an optimisation.
          Ignored files (.env, keys, build output) must never enter the index.
        </p>
        <h3 className="white-text">Compiling ignore rules</h3>
        <p className="gray-text">
          Each rule compiles to a regular expression. Comments and blanks are
          dropped; a leading <code>!</code> marks negation; a trailing{" "}
          <code>/</code> marks directory-only; globs <code>*</code>,{" "}
          <code>**</code>, <code>?</code> translate to <code>[^/]*</code>,{" "}
          <code>.*</code>, <code>[^/]</code>. The subtle case is directory-only
          semantics - <code>node_modules/</code> must match the directory{" "}
          <i>and</i> everything beneath it. A dir-only rule therefore compiles to{" "}
          <b>two</b> regexes:
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={gitignoreCode} language="javascript" />
        </div>
        <p className="gray-text">
          A default ignore set (<code>node_modules/</code>, <code>.git/</code>,{" "}
          <code>.repoguardian/</code>, build dirs, logs) ships built-in, so the
          scanner is correct even with no <code>.gitignore</code>. For every
          surviving file it records a POSIX path, extension, byte size, and line
          count, skipping binaries by extension and capping reads at 1 MB.
        </p>
        <p className="gray-text">
          <b>node_modules</b> (dir) &rarr; matches <code>exact</code> ✓ ignored.{" "}
          <b>node_modules/x.js</b> (file) &rarr; matches <code>under</code> ✓
          ignored. A file literally named "node_modules" &rarr; not ignored. The
          two-regex split fixes a real bug (§16.1).
        </p>
        <br />
        <br />

        {/* 7 */}
        <h2 className="white-text">7. Stack &amp; Framework Detection</h2>
        <p className="gray-text">
          Detection (<code>scanner/detect.ts</code>) reads signals, never
          guesses. The merged <code>dependencies</code>+
          <code>devDependencies</code> set is matched against curated lookup
          tables; manifest presence identifies non-JS ecosystems; signature
          files confirm frameworks a dependency alone cannot prove.
        </p>
        <table>
          <tbody>
            <tr>
              <th>Signal</th>
              <th>Examples &rarr; result</th>
            </tr>
            <tr>
              <td>Dependency tables</td>
              <td>
                <code>next</code>&rarr;Next.js, <code>@prisma/client</code>
                &rarr;Prisma, <code>pg</code>&rarr;PostgreSQL,{" "}
                <code>next-auth</code>&rarr;NextAuth, <code>vitest</code>
                &rarr;Vitest, <code>razorpay</code>&rarr;Razorpay
              </td>
            </tr>
            <tr>
              <td>Manifest presence</td>
              <td>
                <code>go.mod</code>&rarr;Go, <code>Cargo.toml</code>&rarr;Rust,{" "}
                <code>requirements.txt</code>&rarr;pip, <code>Gemfile</code>
                &rarr;bundler
              </td>
            </tr>
            <tr>
              <td>Signature files</td>
              <td>
                <code>next.config.js</code>&rarr;Next.js, <code>manage.py</code>
                &rarr;Django, <code>config/routes.rb</code>&rarr;Rails
              </td>
            </tr>
            <tr>
              <td>Lockfiles</td>
              <td>
                <code>pnpm-lock.yaml</code>&rarr;pnpm, <code>bun.lockb</code>
                &rarr;bun, <code>yarn.lock</code>&rarr;yarn
              </td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          Languages are tallied by extension and weighted by lines of code;
          percentages are computed over total LOC. Inferred values are labelled
          as inferences, and packages used implicitly (compilers, config-only)
          are not flagged as unused.
        </p>
        <br />
        <br />

        {/* 8 */}
        <h2 className="white-text">8. The Import Graph</h2>
        <p className="gray-text">
          Two of the highest-value analyses - unused-dependency and dead-file
          detection - share one structure built in{" "}
          <code>analyzers/importgraph.ts</code>. Rather than a full AST (heavy,
          language-specific), imports are extracted with targeted regexes
          covering ES imports, dynamic <code>import()</code>, CommonJS{" "}
          <code>require</code>, re-exports, and basic Python.
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={importCode} language="javascript" />
        </div>
        <p className="gray-text">
          Each specifier is classified <i>relative</i> (resolved against the
          real file set, trying extensions and <code>index.*</code> directory
          resolution) or <i>package</i> (reduced to install name, scopes
          preserved, Node built-ins filtered). The result is four indices:{" "}
          <code>localEdges</code>, <code>packageEdges</code>,{" "}
          <code>usedPackages</code>, and <code>hasInbound</code> - the last being
          the key to reachability. Reachable from entry points &rarr; kept.
          Unreachable + non-entry + non-test &rarr; flagged.
        </p>
        <br />
        <br />

        {/* 9 */}
        <h2 className="white-text">9. Analyzers, In Depth</h2>

        <h3 className="white-text">9.1 Dependencies</h3>
        <p className="gray-text">
          A declared package absent from <code>usedPackages</code> is{" "}
          <b>unused</b>; a used package absent from the manifest is{" "}
          <b>phantom</b>; a package in both <code>dependencies</code> and{" "}
          <code>devDependencies</code> is a <b>duplicate</b>. An allow-list
          (<code>typescript</code>, <code>vitest</code>, <code>eslint</code>,
          bundlers, <code>@types/*</code>…) suppresses false positives for tools
          used implicitly - flagging those would destroy trust. Outdated/
          vulnerable are deferred to the network-gated path (§14).
        </p>

        <h3 className="white-text">9.2 Dead weight (the cleanup engine)</h3>
        <p className="gray-text">
          A source file with no inbound local import, not a test, and not a
          plausible entry point (basenames like{" "}
          <code>index/main/app/page/route</code>, config files, or anything
          under <code>app/</code>/<code>pages/</code>) is dead weight. A folder
          whose every file is dead is orphaned. Crucially, the output carries a{" "}
          <b>confidence</b>, never a command:
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={deadFileCode} language="javascript" />
        </div>
        <p className="gray-text">
          <b>Why "review-needed".</b> Dynamic imports, reflection, and framework
          routing keep files alive in ways static analysis cannot see.
          RepoGuardian proposes removals with evidence and asks for
          confirmation; it never deletes on its own.
        </p>

        <h3 className="white-text">9.3 Secrets</h3>
        <p className="gray-text">
          Nine pattern families (AWS keys, Google API keys,
          GitHub/Slack/Stripe tokens, private-key headers, JWTs, and generic
          high-entropy assignments) scan non-ignored, non-lock, sub-500 KB
          files. A match yields <b>{`{ file, line, type, redacted }`}</b> -{" "}
          <code>redacted</code> shows the first four characters then bullets.{" "}
          <b>Raw values are never stored anywhere.</b> A 500-finding cap prevents
          pathological files from stalling a scan.
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={secretCode} language="typescript" />
        </div>

        <h3 className="white-text">9.4 Tests</h3>
        <p className="gray-text">
          Test files are detected by convention (<code>*.test.*</code>,{" "}
          <code>*.spec.*</code>, <code>__tests__/</code>, <code>test_*.py</code>,{" "}
          <code>*_test.go</code>); their base names form a "tested" set; source
          files whose base name is absent (excluding barrels/types/config) are{" "}
          <code>uncovered</code>. A test-to-source <code>ratio</code> is also
          computed.
        </p>

        <h3 className="white-text">9.5 Architecture &amp; conventions</h3>
        <p className="gray-text">
          Architecture inference maps directory names to layers
          (controllers/services/models/repositories/components…) and derives
          patterns (Repository Pattern, layered MVC, component-based UI, Next.js
          App Router). Convention inference samples up to 60 source files for
          indentation (tabs vs 2-space), quote style, semicolon usage, and
          file-naming case (kebab/snake/Pascal/camel). Both emit human-readable
          Markdown the personas read directly.
        </p>

        <h3 className="white-text">9.6 Resilience</h3>
        <p className="gray-text">
          The pipeline wraps every analyzer in a <code>safe()</code> combinator:
          a thrown analyzer logs a warning and returns an empty result rather
          than aborting <code>init</code>. One brittle file can never break a
          scan.
        </p>
        <br />
        <br />

        {/* 10 */}
        <h2 className="white-text">10. The Knowledge Index</h2>
        <p className="gray-text">
          The index is the contract between analysis and prompts: gitignore-able,
          secret-free, human-readable.
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={indexCode} language="bash" />
        </div>
        <h3 className="white-text">
          The graph.json / findings.json split
        </h3>
        <p className="gray-text">
          A deliberate separation: <code>graph.json</code> is the{" "}
          <i>structure</i> (module/dependency nodes, import edges, names only)
          for programmatic use; <code>findings.json</code> is the <i>evidence</i>{" "}
          (reasons + confidence) the personas reason over. This split was the
          central fix of v0.3.0 - previously the test and secret findings were
          computed but never persisted, so the personas that referenced them had
          nothing to read. <b>graph.json</b> says <i>what</i>;{" "}
          <b>findings.json</b> says <i>why</i> and <i>how sure</i>.
        </p>
        <p className="gray-text">
          A second subtlety: <code>meta.json.sourceHash</code> is a hash of the
          repository's <i>source</i> signature with RepoGuardian's own generated
          artifacts deliberately excluded - otherwise writing adapter files
          during <code>init</code> would make the index report itself stale on
          the next <code>status</code> (§16.2).
        </p>
        <br />
        <br />

        {/* 11 */}
        <h2 className="white-text">11. The Persona Model</h2>
        <p className="gray-text">
          The eleven "agents" are not processes and not model calls. Each is a
          Markdown persona that instructs the host assistant to read the relevant
          index slices and source, then respond as a senior specialist. All
          share a preamble that grounds the assistant before it acts.
        </p>
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Command</th>
              <th>Kind</th>
            </tr>
            <tr>
              <td>1–8</td>
              <td>
                architecture, security, tests, dependencies, cleanup,
                performance, documentation, review
              </td>
              <td>read-only review</td>
            </tr>
            <tr>
              <td>9</td>
              <td>refine</td>
              <td>prompt pre-processor</td>
            </tr>
            <tr>
              <td>10–11</td>
              <td>implement ✎, migrate ✎</td>
              <td>
                code-modifying - <b>plan first, ask before editing</b>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          The <code>gated</code> flag (true for{" "}
          <code>implement</code>/<code>migrate</code>) drives the "✎ modifies
          code (asks first)" marker in <code>status</code> and the
          plan-then-confirm safety language in the persona body. The{" "}
          <code>refine</code> persona is the differentiator: it turns a thin
          request ("add payment support") into a repository-aware prompt -
          entirely local context engineering, no model call - that the assistant
          then executes. (Thin request &rarr; assemble context: index facts +
          ripgrep &rarr; expanded, repo-aware prompt: framework · ORM · SDK ·
          conventions.)
        </p>
        <br />
        <br />

        {/* 12 */}
        <h2 className="white-text">12. Adapters &amp; the Universal Fallback</h2>
        <p className="gray-text">
          A single persona source compiles to each assistant's native format via
          adapters implementing two methods: <code>detect(ctx)</code> (does this
          repo use the assistant?) and <code>generate(ctx)</code> (emit files).
          Detection drives auto-wiring; the universal fallback is always written.
        </p>
        <table>
          <tbody>
            <tr>
              <th>Adapter</th>
              <th>Detection signal</th>
              <th>Output</th>
            </tr>
            <tr>
              <td>Claude Code</td>
              <td>
                <code>.claude/</code> or <code>CLAUDE.md</code>
              </td>
              <td>
                <code>.claude/commands/guardian/*.md</code>
              </td>
            </tr>
            <tr>
              <td>Cursor</td>
              <td>
                <code>.cursor/</code> or <code>.cursorrules</code>
              </td>
              <td>
                <code>.cursor/rules/guardian-*.mdc</code>
              </td>
            </tr>
            <tr>
              <td>Windsurf</td>
              <td>
                <code>.windsurf/</code>
              </td>
              <td>
                <code>.windsurf/workflows/guardian-*.md</code>
              </td>
            </tr>
            <tr>
              <td>Copilot / VS Code</td>
              <td>
                <code>.github/</code> or <code>.vscode/</code>
              </td>
              <td>
                <code>copilot-instructions.md</code> + prompt files
              </td>
            </tr>
            <tr>
              <td>Antigravity</td>
              <td>
                <code>.antigravity/</code> or <code>AGENTS.md</code>
              </td>
              <td>
                rules + <code>AGENTS.md</code>
              </td>
            </tr>
            <tr>
              <td>
                <b>Universal</b>
              </td>
              <td>
                <b>always</b>
              </td>
              <td>
                <code>GUARDIAN.md</code> + <code>.repoguardian/prompts/</code>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          Because the intelligence is plain Markdown plus a local index, the
          worst case for an unsupported tool is "read this file" - something any
          assistant can do. Native adapters are ergonomic sugar over a universal
          base. The fallback guarantees coverage even for assistants that don't
          exist yet.
        </p>
        <br />
        <br />

        {/* 13 */}
        <h2 className="white-text">13. The CLI</h2>
        <p className="gray-text">
          Three commands - <code>init</code>, <code>update</code>,{" "}
          <code>status</code> - over a hand-written argument parser (no
          dependency). Flags: <code>--path</code>, <code>--assistants</code>,{" "}
          <code>--all</code>, <code>--dry-run</code>, <code>--vuln</code>,{" "}
          <code>--offline</code>, <code>--quiet</code>. Here is the actual output
          a user sees:
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={initOutput} language="bash" />
        </div>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={statusOutput} language="bash" />
        </div>
        <p className="gray-text">
          A "Learn more" block (repo + usage + commands + security links) is
          printed after <code>init</code>, in <code>help</code>, in{" "}
          <code>status</code>, and embedded in the generated{" "}
          <code>GUARDIAN.md</code> - links point to GitHub, since the{" "}
          <code>docs/</code> folder is not shipped in the npm package.
        </p>
        <br />
        <br />

        {/* 14 */}
        <h2 className="white-text">14. Security &amp; Threat Model</h2>
        <p className="gray-text">
          "Completely secure to use" had to be true by construction. The
          pipeline lives entirely on-device; the only egress is an explicit,
          opt-in vulnerability lookup that sends package names only. Each
          property maps to a design decision.
        </p>
        <table>
          <tbody>
            <tr>
              <th>Property</th>
              <th>How it is guaranteed</th>
            </tr>
            <tr>
              <td>No code exfiltration</td>
              <td>No network calls by default - nothing to exfiltrate to.</td>
            </tr>
            <tr>
              <td>No secret leakage</td>
              <td>
                <code>.gitignore</code> respected; <code>SecretFinding</code> has
                no value field; only redacted previews persist.
              </td>
            </tr>
            <tr>
              <td>Malicious-repo safety</td>
              <td>
                Read-only static parsing; repository code is never executed.
              </td>
            </tr>
            <tr>
              <td>Supply-chain integrity</td>
              <td>
                Zero runtime deps; no <code>postinstall</code>; MIT and
                auditable.
              </td>
            </tr>
            <tr>
              <td>No telemetry</td>
              <td>None exists - verifiable in source.</td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          The <code>vulnerabilities</code> analyzer is the proof of intent: even
          with <code>--vuln</code>, the current build performs <b>no network
          request</b> and says so plainly, rather than silently reaching out.
          Offline is not a mode; it is the default reality.
        </p>
        <br />
        <br />

        {/* 15 */}
        <h2 className="white-text">15. Engineering Decisions &amp; Trade-offs</h2>
        <table>
          <tbody>
            <tr>
              <th>Decision</th>
              <th>Why</th>
              <th>Trade-off accepted</th>
            </tr>
            <tr>
              <td>Zero runtime dependencies</td>
              <td>Auditability, trust, thin supply chain</td>
              <td>Hand-wrote gitignore + import parsing</td>
            </tr>
            <tr>
              <td>Regex import parsing, not an AST</td>
              <td>Fast, offline, language-agnostic</td>
              <td>Misses exotic syntax; mitigated by confidence</td>
            </tr>
            <tr>
              <td>Heuristics with confidence, not certainty</td>
              <td>Honesty preserves trust</td>
              <td>"review-needed" instead of "delete"</td>
            </tr>
            <tr>
              <td>Personas over a bundled model</td>
              <td>Free, private, any IDE</td>
              <td>Output quality depends on the user's assistant</td>
            </tr>
            <tr>
              <td>Structured facts + ripgrep, not embeddings</td>
              <td>No key, fully offline</td>
              <td>Semantic search deferred to opt-in</td>
            </tr>
            <tr>
              <td>Dynamic version from package.json</td>
              <td>
                <code>npm version</code> stays in sync
              </td>
              <td>
                Tiny runtime <code>require</code> of the manifest
              </td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          The through-line: every trade-off was resolved toward <b>trust and
          locality</b>. Where a richer result needed a network call, an API key,
          or a heavy dependency, the project chose the smaller, more honest
          option and documented the limitation rather than hiding it.
        </p>
        <br />
        <br />

        {/* 16 */}
        <h2 className="white-text">16. Three Bugs Found by Testing</h2>
        <h3 className="white-text">16.1 Directory-only ignore rules</h3>
        <p className="gray-text">
          The first matcher skipped a dir-only rule whenever the queried path was
          a file, so a file <i>inside</i> an ignored directory (queried
          standalone) was reported as not ignored. Masked in live scans (the
          walker skips the directory first), but wrong in isolation. Fixed by the{" "}
          <code>exact</code>/<code>under</code> two-regex split (§6).
        </p>
        <h3 className="white-text">16.2 The self-staling index</h3>
        <p className="gray-text">
          <code>init</code> writes adapter files into the repo; those new files
          changed the scanned set, so the source hash recomputed by{" "}
          <code>status</code> never matched - the index reported itself{" "}
          <b>stale the instant it was created.</b> Fixed by a shared{" "}
          <code>sourceSignature()</code> that excludes RepoGuardian's own
          generated artifacts from the hash.
        </p>
        <h3 className="white-text">16.3 Version desync</h3>
        <p className="gray-text">
          A hardcoded <code>VERSION</code> constant would silently diverge from{" "}
          <code>package.json</code> on the next <code>npm version</code> bump
          (indeed, a manual pre-set caused a <code>0.2.0 → 0.3.0</code>{" "}
          double-bump). Fixed by reading the version from{" "}
          <code>package.json</code> at runtime.
        </p>
        <p className="gray-text">
          <b>The lesson.</b> All three lived in the gap between "works in the
          happy path" and "is actually correct." A 25-test suite and an
          adversarial fixture - a repo seeded with an unused dep, a phantom
          import, and a dead file - is what surfaced them.
        </p>
        <br />
        <br />

        {/* 17 */}
        <h2 className="white-text">17. Testing &amp; Verification</h2>
        <p className="gray-text">
          Verification is layered across 25 tests in three files:
        </p>
        <table>
          <tbody>
            <tr>
              <th>Suite</th>
              <th>Covers</th>
            </tr>
            <tr>
              <td>
                <code>units.test.ts</code> (7)
              </td>
              <td>
                gitignore matcher (incl. negation + the dir-only fix), import
                parsing, generated-artifact detection
              </td>
            </tr>
            <tr>
              <td>
                <code>analysis.test.ts</code> (8)
              </td>
              <td>
                full pipeline on the fixture: stack, unused/phantom deps, dead
                file, orphaned folder, test gaps
              </td>
            </tr>
            <tr>
              <td>
                <code>product.test.ts</code> (10)
              </td>
              <td>
                module graph, <code>findings.json</code> persistence,
                secret-redaction safety, the 11-persona/gated contract
              </td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          Beyond unit/integration tests, the tool was dogfooded on its own
          2,800-line codebase, and the published tarball was installed and
          executed via <code>npx</code> exactly as an end user would run it -
          confirming the dynamic version read resolves in the published layout.
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={testOutput} language="bash" />
        </div>
        <br />

        {/* 18 */}
        <h2 className="white-text">18. Packaging &amp; Distribution</h2>
        <p className="gray-text">
          Shipping as <code>npx repoguardian</code> required several details to
          be exactly right: a <code>bin</code> entry pointing at the compiled
          CLI; a preserved <code>#!/usr/bin/env node</code> shebang; a{" "}
          <code>files</code> allow-list so only <code>dist/</code> (plus README +
          licence) is published - never source, tests, or{" "}
          <code>node_modules</code>; and a publish safety net:
        </p>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={publishCode} language="javascript" />
        </div>
        <p className="gray-text">
          This makes it impossible to publish a version that fails to build or
          test. Releases follow semantic versioning -{" "}
          <code>npm version patch|minor|major</code> then{" "}
          <code>npm publish</code> - since npm forbids overwriting a published
          version. The tarball was verified through <code>npx</code> before each
          release.
        </p>
        <br />
        <br />

        {/* 19 */}
        <h2 className="white-text">19. Performance &amp; Complexity</h2>
        <table>
          <tbody>
            <tr>
              <th>Stage</th>
              <th>Complexity</th>
              <th>Notes</th>
            </tr>
            <tr>
              <td>Scan / walk</td>
              <td>O(files)</td>
              <td>Capped at 50k files; binaries skipped; 1 MB read cap</td>
            </tr>
            <tr>
              <td>Import graph</td>
              <td>O(files × imports/file)</td>
              <td>Single pass; regex per file</td>
            </tr>
            <tr>
              <td>Dead-file reachability</td>
              <td>O(files + edges)</td>
              <td>
                <code>hasInbound</code> set lookup is O(1)
              </td>
            </tr>
            <tr>
              <td>Secret scan</td>
              <td>O(lines × patterns)</td>
              <td>9 patterns; 500-finding cap; sub-500 KB files</td>
            </tr>
            <tr>
              <td>Conventions</td>
              <td>O(1) in repo size</td>
              <td>Samples ≤60 files × ≤200 lines</td>
            </tr>
            <tr>
              <td>Graph/findings size</td>
              <td>bounded</td>
              <td>Edges capped at 5,000; module nodes at 4,000</td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          The whole pipeline is single-threaded, synchronous, and typically
          completes in well under a second on a mid-size repository - the
          fixture scans in single-digit milliseconds. There is no caching layer
          yet; <code>update</code> re-scans from scratch (incremental scanning
          keyed on <code>sourceHash</code> is future work).
        </p>
        <br />
        <br />

        {/* 20 */}
        <h2 className="white-text">20. Development Journey</h2>
        <p className="gray-text">
          RepoGuardian was built iteratively, each phase ending in a verifiable
          artifact. The decision log:
        </p>
        <table>
          <tbody>
            <tr>
              <th>Phase</th>
              <th>What happened</th>
              <th>Key decision</th>
            </tr>
            <tr>
              <td>
                <b>Concept</b>
              </td>
              <td>
                Framed the problem as <i>context</i>, not capability - "good code
                ≠ good code for this repo."
              </td>
              <td>Build a layer, not an assistant.</td>
            </tr>
            <tr>
              <td>
                <b>Documentation</b>
              </td>
              <td>
                Wrote the full doc set (vision, architecture, security, commands)
                before code.
              </td>
              <td>Local context-layer; no API key.</td>
            </tr>
            <tr>
              <td>
                <b>MVP build</b>
              </td>
              <td>
                34-file TypeScript CLI, zero runtime deps: scanner, 7 analyzers,
                index, 6 adapters, 8 personas.
              </td>
              <td>Hand-write everything to stay dependency-free.</td>
            </tr>
            <tr>
              <td>
                <b>"Everything free"</b>
              </td>
              <td>
                Stripped the Free/Pro/Team model entirely; added the{" "}
                <code>cleanup</code> command.
              </td>
              <td>100% free, forever; no telemetry.</td>
            </tr>
            <tr>
              <td>
                <b>Publish</b>
              </td>
              <td>
                Shipped to npm as <code>npx repoguardian</code>; hardened{" "}
                <code>package.json</code>, verified via tarball.
              </td>
              <td>
                <code>prepublishOnly</code> gate; <code>files</code> allow-list.
              </td>
            </tr>
            <tr>
              <td>
                <b>Gap found</b>
              </td>
              <td>
                Discovered the <code>tests</code> and <code>secrets</code>{" "}
                analyzers were computed but never persisted - personas referenced
                data that wasn't there.
              </td>
              <td>
                Introduce <code>findings.json</code>.
              </td>
            </tr>
            <tr>
              <td>
                <b>Hardening (v0.3.0)</b>
              </td>
              <td>
                Persisted findings; populated the real module graph; added{" "}
                <code>implement</code>/<code>migrate</code>/<code>review</code> (→
                11 commands); added discovery links; 15→25 tests.
              </td>
              <td>Structure vs evidence split; gated write commands.</td>
            </tr>
          </tbody>
        </table>
        <p className="gray-text">
          The most consequential moment was the gap discovery: a user question -
          "how does <code>/guardian tests</code> actually know the gaps?" -
          exposed that the analyzer output was orphaned. Tracing it honestly,
          rather than explaining the <i>intended</i> behaviour, turned a
          documentation answer into a real fix.
        </p>
        <br />
        <br />

        {/* 21 */}
        <h2 className="white-text">21. Limitations &amp; Future Work</h2>
        <h3 className="white-text">Limitations</h3>
        <p className="gray-text">
          &bull; <b>Heuristic analysis.</b> Regex parsing + reachability cannot
          see dynamic loading; findings are confidence-rated, not authoritative.
        </p>
        <p className="gray-text">
          &bull; <b>No semantic retrieval yet.</b> Retrieval is structured-facts
          + ripgrep; embeddings deferred to stay key-free and offline.
        </p>
        <p className="gray-text">
          &bull; <b>Output quality is delegated</b> to the host assistant - by
          design.
        </p>
        <p className="gray-text">
          &bull; <b>Vulnerability data is offline-only</b> in this build; online
          OSV is specified but gated and not yet implemented.
        </p>
        <h3 className="white-text">Future work</h3>
        <p className="gray-text">
          &bull; Opt-in OSV lookups behind <code>--vuln</code> (package names
          only, first-run consent).
        </p>
        <p className="gray-text">
          &bull; <code>unusedExports</code> dead-code detection (schema field
          reserved).
        </p>
        <p className="gray-text">
          &bull; Optional on-device embeddings for semantic retrieval (never
          cloud).
        </p>
        <p className="gray-text">
          &bull; Incremental scans keyed on <code>sourceHash</code>; more
          adapters as new IDEs emerge.
        </p>
        <br />
        <br />

        {/* 22 */}
        <h2 className="white-text">22. Reflections</h2>
        <p className="gray-text">
          RepoGuardian began from a stubborn observation: the bottleneck in
          AI-assisted development is rarely the model's ability - it is the
          model's <i>ignorance of context.</i> Treating that as a <b>data
          problem</b> rather than a modelling problem is the whole move. Once
          context can be extracted deterministically, serialised locally, and
          injected through plain prompts, the need for an API key, a cloud, or a
          bundled model evaporates - and with it, the cost and the privacy
          concerns.
        </p>
        <p className="gray-text">
          What carries forward: constraints clarify design. "No LLM, no network,
          no dependencies" sounds limiting, but it forced a simpler, more honest,
          more trustworthy architecture than a permissive brief would have. The
          most valuable engineering decision in the project was choosing what{" "}
          <i>not</i> to build.
        </p>
        <p className="white-text">
          <b>In one sentence:</b> RepoGuardian gives the AI coding assistant you
          already use the context, conventions, and senior-engineer judgement it
          normally lacks - for free, in any IDE, without a single byte of your
          code ever leaving your machine.
        </p>
        <br />
        <br />

        {/* Appendix A */}
        <h2 className="white-text">A. Appendix: Module Reference</h2>
        <table>
          <tbody>
            <tr>
              <th>Module</th>
              <th>Role</th>
            </tr>
            <tr>
              <td>
                <code>core/types.ts</code>
              </td>
              <td>
                All shared types; the <code>Analysis</code> aggregate and
                persisted schemas
              </td>
            </tr>
            <tr>
              <td>
                <code>core/gitignore.ts</code>
              </td>
              <td>
                Dependency-free <code>.gitignore</code> matcher (two-regex dir
                rules)
              </td>
            </tr>
            <tr>
              <td>
                <code>core/imports.ts</code>
              </td>
              <td>
                Import extraction + relative resolution + package-name derivation
              </td>
            </tr>
            <tr>
              <td>
                <code>core/fsutil.ts</code>
              </td>
              <td>Walk-safe file IO, line counting, hashing, binary detection</td>
            </tr>
            <tr>
              <td>
                <code>core/artifacts.ts</code>
              </td>
              <td>
                Generated-artifact detection; stable{" "}
                <code>sourceSignature()</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>core/links.ts</code>
              </td>
              <td>Canonical repo/doc URLs shown to users</td>
            </tr>
            <tr>
              <td>
                <code>core/log.ts</code>
              </td>
              <td>Zero-dependency styled console output</td>
            </tr>
            <tr>
              <td>
                <code>scanner/index.ts</code>
              </td>
              <td>
                The walk; produces <code>ScanResult</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>scanner/detect.ts</code>
              </td>
              <td>Framework / DB / ORM / auth / hosting detection tables</td>
            </tr>
            <tr>
              <td>
                <code>scanner/languages.ts</code>
              </td>
              <td>Extension → language map; source-extension set</td>
            </tr>
            <tr>
              <td>
                <code>analyzers/importgraph.ts</code>
              </td>
              <td>
                Shared import graph (localEdges, usedPackages, hasInbound)
              </td>
            </tr>
            <tr>
              <td>
                <code>analyzers/dependencies.ts</code>
              </td>
              <td>Unused / phantom / duplicate + implicit-use allow-list</td>
            </tr>
            <tr>
              <td>
                <code>analyzers/deadweight.ts</code>
              </td>
              <td>Dead files + orphaned folders + stale assets</td>
            </tr>
            <tr>
              <td>
                <code>analyzers/secrets.ts</code>
              </td>
              <td>Redacting secret scanner (9 pattern families)</td>
            </tr>
            <tr>
              <td>
                <code>analyzers/tests.ts</code>
              </td>
              <td>Test-gap detection + coverage ratio</td>
            </tr>
            <tr>
              <td>
                <code>analyzers/architecture.ts</code>
              </td>
              <td>Layer + pattern inference</td>
            </tr>
            <tr>
              <td>
                <code>analyzers/conventions.ts</code>
              </td>
              <td>Indent / quotes / semicolons / naming inference</td>
            </tr>
            <tr>
              <td>
                <code>analyzers/vulnerabilities.ts</code>
              </td>
              <td>Offline-by-default vuln stub (opt-in gated)</td>
            </tr>
            <tr>
              <td>
                <code>pipeline.ts</code>
              </td>
              <td>
                Orchestrates scan + analyzers via <code>safe()</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>index-builder/index.ts</code>
              </td>
              <td>
                Serialises <code>Analysis</code> → all{" "}
                <code>.repoguardian/</code> artifacts
              </td>
            </tr>
            <tr>
              <td>
                <code>templates/personas.ts</code>
              </td>
              <td>
                The 11 persona prompts + shared preamble + <code>gated</code>{" "}
                flag
              </td>
            </tr>
            <tr>
              <td>
                <code>adapters/*.ts</code>
              </td>
              <td>Six adapters + selection/detection logic</td>
            </tr>
            <tr>
              <td>
                <code>commands/*.ts</code> + <code>cli.ts</code>
              </td>
              <td>init / update / status + arg parsing + help</td>
            </tr>
          </tbody>
        </table>
        <br />

        {/* Appendix B */}
        <h2 className="white-text">B. Appendix: Command Reference</h2>
        <table>
          <tbody>
            <tr>
              <th>Command</th>
              <th>Purpose</th>
            </tr>
            <tr>
              <td>
                <code>/guardian architecture</code>
              </td>
              <td>Map structure, data flow, risks</td>
            </tr>
            <tr>
              <td>
                <code>/guardian security</code>
              </td>
              <td>Senior security review (reads redacted secret flags)</td>
            </tr>
            <tr>
              <td>
                <code>/guardian tests</code>
              </td>
              <td>
                Test gaps + generated tests (reads <code>findings.json</code>)
              </td>
            </tr>
            <tr>
              <td>
                <code>/guardian dependencies</code>
              </td>
              <td>Unused / phantom / duplicate / risky</td>
            </tr>
            <tr>
              <td>
                <code>/guardian cleanup</code> 🧹
              </td>
              <td>Unused deps, dead files, orphaned folders, dead code</td>
            </tr>
            <tr>
              <td>
                <code>/guardian performance</code>
              </td>
              <td>Bundles, queries, renders, caching</td>
            </tr>
            <tr>
              <td>
                <code>/guardian documentation</code>
              </td>
              <td>README, architecture, API, onboarding docs</td>
            </tr>
            <tr>
              <td>
                <code>/guardian refine</code> ⭐
              </td>
              <td>Expand a thin request into a repo-aware prompt</td>
            </tr>
            <tr>
              <td>
                <code>/guardian implement</code> ✎
              </td>
              <td>Plan &amp; build a feature - asks before editing</td>
            </tr>
            <tr>
              <td>
                <code>/guardian migrate</code> ✎
              </td>
              <td>Migration plan, affected files, risks, rollback</td>
            </tr>
            <tr>
              <td>
                <code>/guardian review</code>
              </td>
              <td>Senior + architect + security + QA panel</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />

        <h2 className="white-text">Try It Yourself</h2>
        <div style={{ padding: "24px" }}>
          <CodeSnippet code={installCode} language="bash" />
        </div>
        <p className="white-text">
          <b>GitHub Repository:</b>&nbsp;
          <a
            style={{ textDecoration: "underline" }}
            href="https://github.com/amankmrlko/repoguardian"
            target="_blank"
            rel="noopener noreferrer"
            className="link-text"
          >
            Repo Link
          </a>
        </p>
        <p className="white-text">
          <b>npm Package:</b>&nbsp;
          <a
            style={{ textDecoration: "underline" }}
            href="https://www.npmjs.com/package/repoguardian"
            target="_blank"
            rel="noopener noreferrer"
            className="link-text"
          >
            npmjs.com/package/repoguardian
          </a>
        </p>
        <br />
        <br />
        <p className="gray-text">
          |{" "}
          <i>
            RepoGuardian · v0.3.0 · TypeScript · zero runtime dependencies · MIT.
            A low-level engineering analysis.
          </i>
        </p>

        <div className="flex extra-margin">
          <Link to="/thoughts">
            <p className="cta1 hover1">Got something to say?</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default RepoGuardian;
