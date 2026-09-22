const request = require('supertest');
const { createApp } = require('../src/app');

describe('orders API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('POST /orders creates an order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ customerId: 'c1', items: [{ sku: 'A', quantity: 1, unitPrice: 20 }] });
    expect(res.status).toBe(201);
    expect(res.body.total).toBe(20);
  });

  test('POST /orders rejects an invalid payload', async () => {
    const res = await request(app).post('/orders').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid order payload');
  });

  test('GET /orders lists created orders', async () => {
    await request(app)
      .post('/orders')
      .send({ customerId: 'c1', items: [{ sku: 'A', quantity: 1, unitPrice: 20 }] });
    const res = await request(app).get('/orders');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('GET /orders/:id returns 404 for an unknown order', async () => {
    const res = await request(app).get('/orders/does-not-exist');
    expect(res.status).toBe(404);
  });

  test('GET /orders/:id returns the created order', async () => {
    const created = await request(app)
      .post('/orders')
      .send({ customerId: 'c1', items: [{ sku: 'A', quantity: 1, unitPrice: 20 }] });
    const res = await request(app).get(`/orders/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });
});
