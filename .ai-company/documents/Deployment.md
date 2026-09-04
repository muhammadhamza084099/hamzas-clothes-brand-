# Deployment

Development -> staging -> production.

For Vercel: import the repository, use no build command, connect Vercel Postgres, run `database.sql`, configure environment variables, update sitemap domain, then test the order API before launch.