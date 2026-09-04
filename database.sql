CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  reference VARCHAR(24) UNIQUE NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  address TEXT NOT NULL,
  payment_method VARCHAR(40) NOT NULL DEFAULT 'Cash on delivery',
  total INTEGER NOT NULL CHECK (total >= 0),
  status VARCHAR(24) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_reference VARCHAR(24) NOT NULL REFERENCES orders(reference) ON DELETE CASCADE,
  product_name VARCHAR(160) NOT NULL,
  unit_price INTEGER NOT NULL CHECK (unit_price >= 0)
);

CREATE INDEX IF NOT EXISTS orders_status_created_idx ON orders(status, created_at DESC);