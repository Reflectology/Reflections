# Reflectology Minimal System — `reflectology.org`

This project implements the minimal Reflectology runtime stack, written entirely in C, serving as the **core symbolic engine** behind:

- 🌐 `reflectology.org` – Axioms, proofs, WFF visualizations, runtime metrics

And orchestrating the following ecosystem domains:

- 🏛 `tripleafh.com`
- 🔤 `madlad.dev`
- 📜 `docunation.org`
- 💱 `fintechtionary.org`
- 🪙 `cbux.me` / `fbux.me`
- 🗣 `thebkspeaker.com`, `spkr.ink`, `spkr.one`
- 🛒 `tdhc.store`
- 🌱 `lemuria.my`
- 🧠 `nathan.ac`

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
- Custom matrix engine (`matrices.c`)
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

- Custom Symbolic GUI Renderer
- Embedded Web Server (Custom)
- Token-protected API endpoints (Custom)
- Audit logging (`audit.c`) + secure startup (token + TLS enforcement)
- Email, REPL, WebSocket support for MADLAD clients

---

## 🛡 Security & Identity

- Secure memory bounds (`secure.c`)
- Token verification and runtime guards
- Signed actions, audit chain to PostgreSQL
- Identity resolution via NLP routes in `spkr.ink` + `spkr.one`

---

## 🚀 Deployment Notes

- Requires only a C compiler and minimal runtime (Alpine, LinuxKit, TinyCore)
- Binaries boot from `/init`, no containers, no scripting, no external servers
- Fully self-contained agent with symbolic memory and database orchestration

---

## 🔗 License

Reflectology Software License (RSL-1.0)
