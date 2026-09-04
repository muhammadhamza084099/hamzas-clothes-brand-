# Architecture

The MVP is a modular monolith: static frontend on Vercel, serverless order API in `api/`, and PostgreSQL persistence. Catalog, orders, auth/admin, inventory, payments, and notifications remain distinct modules.

See `database.sql`, `api/orders.js`, and `vercel.json` for the current implementation.