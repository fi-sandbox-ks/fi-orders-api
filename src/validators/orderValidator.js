const ALLOWED_CURRENCIES = ['USD', 'EUR', 'GBP'];

function validateOrder(payload) {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['payload must be an object'] };
  }
  if (!payload.customerId || typeof payload.customerId !== 'string') {
    errors.push('customerId is required');
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    errors.push('items must be a non-empty array');
  } else {
    payload.items.forEach((item, index) => {
      if (!item.sku || typeof item.sku !== 'string') {
        errors.push(`items[${index}].sku is required`);
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`items[${index}].quantity must be a positive number`);
      }
      if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
        errors.push(`items[${index}].unitPrice must be a non-negative number`);
      }
    });
  }
  if (payload.currency && !ALLOWED_CURRENCIES.includes(payload.currency)) {
    errors.push(`currency must be one of ${ALLOWED_CURRENCIES.join(', ')}`);
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateOrder, ALLOWED_CURRENCIES };
