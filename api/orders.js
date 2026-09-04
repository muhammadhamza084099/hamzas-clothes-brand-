const { sql } = require('@vercel/postgres');

const catalog = {
  1: { name: 'Oxford Linen Shirt', price: 5800 },
  2: { name: 'Everyday Pleat Trouser', price: 6900 },
  3: { name: 'Relaxed Utility Short', price: 3900 },
  4: { name: 'Heavyweight Polo', price: 4200 },
  5: { name: 'The Essential Tee', price: 2400 },
  6: { name: 'Satin Slip Dress', price: 7600 },
  7: { name: 'Wide Leg Trouser', price: 6400 },
  8: { name: 'Canvas Carryall', price: 3200 },
  9: { name: 'Mini Studio Hoodie', price: 3200 },
  10: { name: 'Everyday Kids Jogger', price: 2800 },
  11: { name: 'The Daily Kids Cap', price: 1800 },
  12: { name: 'Playday Overshirt', price: 3600 },
  13: { name: 'Everyday Cotton Shirt', price: 4600 },
  14: { name: 'Relaxed Poplin Blouse', price: 5200 },
  15: { name: 'Kids Camp Shirt', price: 2900 },
  16: { name: 'Striped Resort Shirt', price: 5400 }
};

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').send(JSON.stringify(body));
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const { name, phone, email, address, city, payment, items, idempotencyKey } = req.body || {};
  const customerName = clean(name, 120);
  const customerPhone = clean(phone, 32);
  const customerEmail = clean(email, 160);
  const deliveryAddress = clean(address, 500);
  const deliveryCity = clean(city, 80);
  if (!customerName || !customerPhone || !deliveryAddress || !deliveryCity || !Array.isArray(items) || !items.length || items.length > 50) {
    return send(res, 400, { error: 'Name, phone, address, and at least one item are required.' });
  }
  if (!/^03\d{9}$/.test(customerPhone.replace(/[\s-]/g, ''))) return send(res, 400, { error: 'Enter a valid Pakistani phone number.' });
  if (customerEmail && !/^\S+@\S+\.\S+$/.test(customerEmail)) return send(res, 400, { error: 'Enter a valid email address.' });
  const trustedItems = items.map(item => ({ product: catalog[Number(item.id)], quantity: Math.max(1, Math.min(10, Number(item.quantity) || 1)), size: clean(item.size, 12), color: clean(item.color, 40) }));
  if (trustedItems.some(item => !item.product)) return send(res, 400, { error: 'One or more products are unavailable.' });
  const total = trustedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const reference = `HZ-${new Date().getFullYear()}-${Date.now().toString().slice(-8)}`;
  try {
    if (idempotencyKey) {
      const existing = await sql`SELECT reference, total, status FROM orders WHERE idempotency_key = ${clean(idempotencyKey, 100)} LIMIT 1`;
      if (existing.rows[0]) return send(res, 200, existing.rows[0]);
    }
    const result = await sql`INSERT INTO orders (reference, customer_name, phone, email, address, city, payment_method, total, status, idempotency_key) VALUES (${reference}, ${customerName}, ${customerPhone}, ${customerEmail || null}, ${deliveryAddress}, ${deliveryCity}, ${payment || 'Cash on delivery'}, ${total}, 'PENDING', ${clean(idempotencyKey, 100) || null}) RETURNING reference, total, status`;
    const orderId = result.rows[0].reference;
    for (const item of trustedItems) await sql`INSERT INTO order_items (order_reference, product_name, unit_price, quantity, size, color) VALUES (${orderId}, ${item.product.name}, ${item.product.price}, ${item.quantity}, ${item.size || null}, ${item.color || null})`;
    return send(res, 201, result.rows[0]);
  } catch (error) {
    console.error('order_creation_failed', error.message);
    return send(res, 500, { error: 'We could not place your order right now. Please try again.' });
  }
};