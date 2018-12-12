const { findFnWith } = require('./index');

describe('findFnWith', () => {
  test('returns a function', () => {
    const capabilities = {};
    const fn = findFnWith(capabilities);

    expect(typeof fn).toBe('function');
  });

  test('throws if capabilities are undefined', () => {
    try {
      findFnWith();
    } catch (err) {
      const { message } = err;
      expect(message).toEqual('no capabilities have been provided');
    }

    expect.assertions(1);
  });
});
