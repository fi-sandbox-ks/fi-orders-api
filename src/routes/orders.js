const express = require('express');

function createOrdersRouter(orderService) {
  const router = express.Router();

  router.post('/', (req, res, next) => {
    try {
      const order = orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  });

  router.get('/', (req, res) => {
    res.json(orderService.listOrders());
  });

  router.get('/:id', (req, res, next) => {
    try {
      const order = orderService.getOrder(req.params.id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = { createOrdersRouter };
