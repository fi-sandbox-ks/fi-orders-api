const { OrderService } = require('../src/services/orderService');
const { OrderRepository } = require('../src/repositories/orderRepository');
const { resetForTests } = require('../src/utils/idGenerator');

describe('OrderService', () => {
  let service;

  beforeEach(() => {
    resetForTests();
    service = new OrderService(new OrderRepository());
  });

  test('creates a valid order', () => {
    const order = service.createOrder({
      customerId: 'c1',
      items: [{ sku: 'A', quantity: 1, unitPrice: 20 }],
    });
    expect(order.id).toBeDefined();
    expect(order.total).toBe(20);
  });

  test('throws on an invalid payload', () => {
    expect(() => service.createOrder({})).toThrow('Invalid order payload');
  });

  test('retrieves a created order', () => {
    const created = service.createOrder({
      customerId: 'c1',
      items: [{ sku: 'A', quantity: 1, unitPrice: 20 }],
    });
    expect(service.getOrder(created.id)).toEqual(created);
  });

  test('throws for an unknown order', () => {
    expect(() => service.getOrder('missing')).toThrow('Order missing not found');
  });

  test('lists orders', () => {
    service.createOrder({ customerId: 'c1', items: [{ sku: 'A', quantity: 1, unitPrice: 20 }] });
    expect(service.listOrders()).toHaveLength(1);
  });
});
