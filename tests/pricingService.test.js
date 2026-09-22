const { calculateSubtotal, calculateTotal } = require('../src/services/pricingService');

describe('pricingService', () => {
  test('calculates the subtotal', () => {
    const subtotal = calculateSubtotal([
      { unitPrice: 10, quantity: 2 },
      { unitPrice: 5, quantity: 1 },
    ]);
    expect(subtotal).toBe(25);
  });

  test('applies no discount below the volume threshold', () => {
    const result = calculateTotal([{ unitPrice: 10, quantity: 2 }]);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(20);
  });

  test('applies the volume discount at the threshold', () => {
    const result = calculateTotal([{ unitPrice: 10, quantity: 10 }]);
    expect(result.discount).toBe(10);
    expect(result.total).toBe(90);
  });
});
