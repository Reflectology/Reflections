# Reflectology Minimal System — `reflectology.org`

This project implements the minimal Reflectology runtime stack, written entirely in C, serving as the **core symbolic engine** behind:

- 🌐 `reflectology.org` – Axioms, proofs, WFF visualizations, runtime metrics

And orchestrating the following ecosystem domains:

- 🏛 `tripleafh.com` – Corporate governance, B2B coordination, symbolic contracts
- 🔤 `madlad.dev` – Symbolic language core, operator grammar REPL
- 📜 `docunation.org` – Semantic document engine with nested AST + logic
- 💱 `fintechtionary.org` – A gamified homonym dictionary of finance and technology terms
- 🪙 `cbux.me` / `fbux.me` – Blockchain token systems with incentive validation
- 🗣 `thebkspeaker.com`, `spkr.ink`, `spkr.one` – Digital spaces to lift community voices locally and globally
- 🛒 `tdhc.store` – Cannabis consumption tracker and health consultant
- 🌱 `lemuria.my` – Animated ecotales using matrix/memory-driven dynamics
- 🧠 MADLAD clients – Thin LSP/WebSocket symbolic interpreter endpoints

---

## 🧠 Core System Features

### Symbolic Engine (Reflectology Core)
- Ω (Configuration space): Embedded symbolic state via SQLite
- θ (Transformation logic): Executed by MADLAD interpreter
- C (Constraints): Enforced via PostgreSQL (pgvector, FK rules, normalization)
- G = θ(Ω) − C: Runtime goodness function for decision-making

### MADLAD Language
- Symbolic grammar mapped to arithmetic, logic, set theory, NLP, GUI
- Dynamic REPL for symbolic programs (`.mdld` files)
- Fully interpreted in C with REPL loop and AST routing

### Matrix / Memory / Ω Layer
- Generic N×M matrix engine (`generic_matrix.c`)
- Symbolic memory block allocation and transformation
- Inverts, multiplies, and stores symbolic state for GUI, blockchain, NLP

---

## 💾 Dual-Database Architecture

| Feature             | SQLite (Ω)                  | PostgreSQL (C)                  |
|---------------------|-----------------------------|---------------------------------|
| Embedded Graph Cache| Real-time `.mdld` exec logs | Canonical normalized outputs    |
| Vector Storage      | BLOB/C array                | pgvector + HNSW cosine search   |
| Constraint Enforce  | Soft, symbolic patterns     | FK constraints, normalized rules|

---

## 🖥 Services & Interfaces

- GTK-based Symbolic GUI Renderer
- Embedded Web Server (libmicrohttpd & CivetWeb)
- Token-protected API endpoints (via HAProxy or internal ACL)
- Audit logging (`audit.c`) + secure startup (token + TLS enforcement)
- Email, REPL, WebSocket support for MADLAD clients

---

## 🛡 Security & Identity

- Secure memory bounds (`secure.c`)
- Token verification and runtime guards
- Signed actions, audit chain to PostgreSQL
- Identity resolution via NLP routes in `spkr.ink` + `spkr.one`

---

## 📦 Structure

```
src/
├── engine/       → Core loop, dispatch, orchestration
├── nlp/          → MADLAD token grammar, REPL
├── axioms/       → WFF evaluators, group_pow, normalize
├── matrix/       → Memory & matrix logic
├── web/          → HTTP endpoints, routing logic
├── db/           → SQLite + PostgreSQL integration
├── etl/          → Symbolic ETL bridge
├── gui/          → GTK forms & reactive interface
├── security/     → Token guard, crypto, audit
├── tests/        → Test harness for all logic flows
```

---

## 🚀 Deployment Notes

- Requires only a C compiler and minimal runtime (Alpine, LinuxKit, TinyCore)
- Binaries boot from `/init`, no containers, no scripting, no external servers
- Fully self-contained agent with symbolic memory and database orchestration

---

## 🔗 License

MIT — Designed for Reflectological Systems Development
