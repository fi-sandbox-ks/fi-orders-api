const VOLUME_DISCOUNT_THRESHOLD = 10;
const VOLUME_DISCOUNT_RATE = 0.1;

function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

function calculateTotal(items) {
  const subtotal = calculateSubtotal(items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const discount = totalQuantity >= VOLUME_DISCOUNT_THRESHOLD ? subtotal * VOLUME_DISCOUNT_RATE : 0;
  return {
    subtotal: round2(subtotal),
    discount: round2(discount),
    total: round2(subtotal - discount),
  };
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

module.exports = { calculateSubtotal, calculateTotal };
