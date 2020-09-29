import generateId from '../../src/utils/generateId';

describe('generateId', () => {
  test('id to be 4-letter uppercase string', () => {
    expect(generateId()).toMatch(/^[A-Z]{4}$/);
  });
});
