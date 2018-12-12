const { findFnWith } = require('./index');

describe('findFnWith', () => {
  test('returns a function with an invoke method', () => {
    const fn = findFnWith();

    expect(fn).toHaveProperty('invoke');
  });
});
