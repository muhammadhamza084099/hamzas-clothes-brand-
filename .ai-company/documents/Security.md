# Security Decisions

- Secrets are stored in Vercel environment variables, never frontend source.
- Order totals are recalculated by `api/orders.js` from the server catalog.
- The API rejects missing customer data and unknown product IDs.
- Vercel security headers are configured in `vercel.json`.

Before launch: add authenticated admin authorization, rate limiting, CSRF strategy, webhook verification, upload validation, and dependency scanning.