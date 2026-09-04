# Decision Log

## 2026-09-04 — Modular monolith
Decision: Use a Vercel frontend/serverless API with PostgreSQL.
Reason: Appropriate operational complexity for a small-to-medium clothing business.
Alternatives considered: Microservices, native apps, GraphQL.
Risks: External database and provider setup remain required.
Mitigations: Keep module boundaries and document API/schema.
Owner: Architecture