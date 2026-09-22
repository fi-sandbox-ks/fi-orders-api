const { nextOrderId, resetForTests } = require('../src/utils/idGenerator');

describe('idGenerator', () => {
  beforeEach(() => resetForTests());

  test('generates ids with an increasing counter', () => {
    const first = nextOrderId();
    const second = nextOrderId();
    expect(first).not.toEqual(second);
    expect(first).toMatch(/^ORD-\d+-1$/);
    expect(second).toMatch(/^ORD-\d+-2$/);
  });
});
