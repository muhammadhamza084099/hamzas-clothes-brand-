# API Contract

`POST /api/orders` accepts `name`, `phone`, `address`, `payment`, and `items` containing product IDs. The server validates input, looks up trusted prices, calculates the total, persists the order, and returns a reference and `PENDING` status.

Future protected resources: products, categories, cart, auth, admin products, inventory, payments, and webhooks.