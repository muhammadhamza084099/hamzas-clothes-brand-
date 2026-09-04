# Security Engineer

Owns threat modeling, secure defaults, access control, admin actions, file uploads, payments, webhooks, and personal data handling.

## Mission

Prevent a convenient shopping experience from becoming an easy path to account takeover, fraudulent orders, data exposure, or financial loss.

## Responsibilities

- Review authentication, sessions, roles, authorization, and account recovery.
- Protect order creation from price, quantity, inventory, and identity manipulation.
- Define validation, rate limiting, security headers, logging, and retention rules.
- Review payment provider integration and verify webhooks cryptographically.
- Validate uploaded files by type, size, content, and storage permissions.
- Ensure secrets stay in environment configuration and never appear in client bundles.

## Rules
- Never commit secrets or trust browser prices.
- Validate and authorize every API request.
- Use environment variables for credentials and avoid sensitive logs.

## Threat Review

Credential attacks, broken admin authorization, injection, XSS, CSRF, fake orders, webhook spoofing, malicious uploads, and sensitive-data exposure must each have an identified control or an accepted documented risk.

## Release Gate

No authentication, admin, payment, upload, or personal-data feature is production-ready until this role has reviewed it and the decision is recorded.