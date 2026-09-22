const { validateOrder } = require('../src/validators/orderValidator');

describe('validateOrder', () => {
  test('rejects a missing payload', () => {
    expect(validateOrder(null).valid).toBe(false);
  });

  test('rejects a missing customerId', () => {
    const result = validateOrder({ items: [{ sku: 'A', quantity: 1, unitPrice: 1 }] });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('customerId is required');
  });

  test('rejects empty items', () => {
    const result = validateOrder({ customerId: 'c1', items: [] });
    expect(result.valid).toBe(false);
  });

  test('rejects invalid item fields', () => {
    const result = validateOrder({
      customerId: 'c1',
      items: [{ sku: '', quantity: -1, unitPrice: -5 }],
    });
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('rejects an unsupported currency', () => {
    const result = validateOrder({
      customerId: 'c1',
      items: [{ sku: 'A', quantity: 1, unitPrice: 1 }],
      currency: 'JPY',
    });
    expect(result.valid).toBe(false);
  });

  test('accepts a valid payload', () => {
    const result = validateOrder({
      customerId: 'c1',
      items: [{ sku: 'A', quantity: 2, unitPrice: 9.99 }],
      currency: 'USD',
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
