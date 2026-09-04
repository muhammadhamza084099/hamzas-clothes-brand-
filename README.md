# Hamzas Brand Shop

A brand-first, mobile-first storefront for Hamzas Brand Shop. The current release is a zero-dependency frontend prototype that runs directly from `index.html`.

Business contact: Hamzas Brand Shop, Peshawar · muhammadhamza3758@gmail.com

## Run locally

Open [index.html](index.html) in a browser. Product images are loaded from Unsplash, so an internet connection is needed for the full visual experience. The file preview uses a demo order reference; deployed checkout submits to the Vercel order API.

## Deploy to Vercel

Import this folder as a Vercel project and use the default settings. Vercel will install the dependency for the serverless order API; no build command or output directory is required. Create a Vercel Postgres database, run [database.sql](database.sql), and link it to the project so the `POSTGRES_*` variables are available. After deployment, replace `your-domain.vercel.app` in `robots.txt` and `sitemap.xml` with the real domain.

## Google Search Console

The verification file [google1c263acfdd0898e5.html](google1c263acfdd0898e5.html) is in the repository root, which is the correct location for Google file verification. The homepage also includes the matching verification meta tag, canonical URL, Open Graph/Twitter metadata, JSON-LD local business schema, robots directives, sitemap, and web app manifest. After the first Vercel deployment, replace every `your-domain.vercel.app` placeholder with the real production domain, redeploy, and then verify the domain in Search Console.

## Configuration

`.env.example` is the safe template for future local configuration. Copy it to `.env` when a backend is added, then replace the placeholder values. `.env` is ignored by Git and must never be committed.

The current static frontend does not read environment variables. A server-side API is required before enabling real payments, customer data, inventory, or order persistence.

## Included MVP experience

- Responsive homepage and collection browsing
- Search, category filters, and sorting
- Product details with size selection
- Persistent local shopping bag
- Checkout form and order confirmation demo
- Accessible labels, semantic sections, and SEO metadata

## Production work still required

1. Add a modular backend with PostgreSQL and server-side validation.
2. Persist products, variants, inventory, carts, customers, and orders.
3. Add authenticated admin screens with role-based authorization.
4. Connect a payment provider and verify webhooks server-side.
5. Add delivery, email/SMS notifications, policies, monitoring, and deployment.
6. Replace demo catalog data and remote images with approved brand content.

Do not treat the browser-only checkout as a live payment flow. Prices and inventory must be recalculated and checked by the backend before accepting an order.