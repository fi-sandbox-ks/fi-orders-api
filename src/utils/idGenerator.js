let counter = 0;

function nextOrderId() {
  counter += 1;
  return `ORD-${Date.now()}-${counter}`;
}

function resetForTests() {
  counter = 0;
}

module.exports = { nextOrderId, resetForTests };
