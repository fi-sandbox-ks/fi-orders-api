const { validateOrder } = require('../validators/orderValidator');
const { calculateTotal } = require('./pricingService');
const { nextOrderId } = require('../utils/idGenerator');

class OrderService {
  constructor(repository) {
    this.repository = repository;
  }

  createOrder(payload) {
    const { valid, errors } = validateOrder(payload);
    if (!valid) {
      const error = new Error('Invalid order payload');
      error.statusCode = 400;
      error.details = errors;
      throw error;
    }

    const pricing = calculateTotal(payload.items);
    const order = {
      id: nextOrderId(),
      customerId: payload.customerId,
      currency: payload.currency || 'USD',
      items: payload.items,
      ...pricing,
      createdAt: new Date().toISOString(),
    };

    return this.repository.save(order);
  }

  getOrder(id) {
    const order = this.repository.findById(id);
    if (!order) {
      const error = new Error(`Order ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    return order;
  }

  listOrders() {
    return this.repository.findAll();
  }
}

module.exports = { OrderService };
