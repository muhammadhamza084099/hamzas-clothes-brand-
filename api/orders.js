const { sql } = require('@vercel/postgres');

const catalog = {
  1: { name: 'The Essential Tee', price: 2400 },
  2: { name: 'Relaxed Linen Shirt', price: 5800 },
  3: { name: 'Everyday Pleat Trouser', price: 6900 },
  4: { name: 'Sunday Overshirt', price: 7200 },
  5: { name: 'The Daily Cap', price: 1800 },
  6: { name: 'Studio Hoodie', price: 4900 },
  7: { name: 'Utility Short', price: 3900 },
  8: { name: 'Canvas Carryall', price: 3200 },
  9: { name: 'Mini Studio Hoodie', price: 3200 },
  10: { name: 'Everyday Kids Jogger', price: 2800 },
  11: { name: 'The Daily Kids Cap', price: 1800 },
  12: { name: 'Playday Overshirt', price: 3600 }
};

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').send(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const { name, phone, address, payment, items } = req.body || {};
  if (!name || !phone || !address || !Array.isArray(items) || !items.length) {
    return send(res, 400, { error: 'Name, phone, address, and at least one item are required.' });
  }
  const trustedItems = items.map(item => catalog[Number(item.id)]).filter(Boolean);
  if (trustedItems.length !== items.length) return send(res, 400, { error: 'One or more products are unavailable.' });
  const total = trustedItems.reduce((sum, item) => sum + item.price, 0);
  const reference = `HZ-${Date.now().toString().slice(-8)}`;
  try {
    const result = await sql`INSERT INTO orders (reference, customer_name, phone, address, payment_method, total, status) VALUES (${reference}, ${name.trim()}, ${phone.trim()}, ${address.trim()}, ${payment || 'Cash on delivery'}, ${total}, 'PENDING') RETURNING reference`;
    const orderId = result.rows[0].reference;
    for (const item of trustedItems) await sql`INSERT INTO order_items (order_reference, product_name, unit_price) VALUES (${orderId}, ${item.name}, ${item.price})`;
    return send(res, 201, { reference: orderId, total, status: 'PENDING' });
  } catch (error) {
    console.error('order_creation_failed', error.message);
    return send(res, 500, { error: 'We could not place your order right now. Please try again.' });
  }
};