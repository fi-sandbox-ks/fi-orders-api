const { OrderRepository } = require('../src/repositories/orderRepository');

describe('OrderRepository', () => {
  test('saves and finds by id', () => {
    const repo = new OrderRepository();
    repo.save({ id: '1', total: 10 });
    expect(repo.findById('1')).toEqual({ id: '1', total: 10 });
  });

  test('returns null for an unknown id', () => {
    const repo = new OrderRepository();
    expect(repo.findById('missing')).toBeNull();
  });

  test('lists all orders', () => {
    const repo = new OrderRepository();
    repo.save({ id: '1' });
    repo.save({ id: '2' });
    expect(repo.findAll()).toHaveLength(2);
  });

  test('clears all orders', () => {
    const repo = new OrderRepository();
    repo.save({ id: '1' });
    repo.clear();
    expect(repo.findAll()).toHaveLength(0);
  });
});
