const express = require('express');
const { createOrdersRouter } = require('./routes/orders');
const { OrderService } = require('./services/orderService');
const { OrderRepository } = require('./repositories/orderRepository');
const { errorHandler } = require('./middleware/errorHandler');

function createApp(repository = new OrderRepository()) {
  const app = express();
  app.use(express.json());

  const orderService = new OrderService(repository);
  app.use('/orders', createOrdersRouter(orderService));

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
