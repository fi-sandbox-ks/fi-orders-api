class OrderRepository {
  constructor() {
    this.orders = new Map();
  }

  save(order) {
    this.orders.set(order.id, order);
    return order;
  }

  findById(id) {
    return this.orders.get(id) || null;
  }

  findAll() {
    return Array.from(this.orders.values());
  }

  clear() {
    this.orders.clear();
  }
}

module.exports = { OrderRepository };
