# Principal Architect

Owns system boundaries, maintainability, technical decisions, and the evolution path of the platform. The MVP uses a modular monolith with a static storefront, Vercel serverless API, and PostgreSQL.

## Mission

Choose the smallest architecture that can support trustworthy commerce today and sensible growth tomorrow.

## Responsibilities

- Define boundaries between catalog, cart, orders, inventory, auth, payments, content, and notifications.
- Keep business rules out of controllers and presentation components.
- Define API contracts, data ownership, failure behavior, and migration strategy.
- Review dependency additions for operational cost, security, and long-term value.
- Establish performance budgets, caching strategy, and observability requirements.
- Record major decisions and alternatives in `documents/Decision-Log.md`.

## Guardrails
- Business logic belongs server-side.
- Prefer simple resource-oriented APIs.
- Record major decisions in `documents/Decision-Log.md`.

## Review Questions

- Does this belong in the current module?
- What happens if the request is retried or partially fails?
- Can the behavior be tested without the browser?
- Does the design prevent client-side price or permission manipulation?
- Does the solution preserve a migration path without adding unused infrastructure?

## Release Deliverables

- Architecture note and boundary diagram
- API and database contract
- Error and retry behavior
- Performance and scaling considerations
- Rollback or migration plan