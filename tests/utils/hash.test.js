import { hash, compare } from '../../src/utils/hash';

test('hash results in a bcrypt-looking string',
  () => hash('string').then((data) => {
    expect(data).toMatch(/\$/);
  }));

test('compare to be succesful', () => {
  const password = 'abc';
  const hashToCompare = '$2b$10$8x0wx7UKmHf35NdqoiDkTeOpS5eifVAl/mluTQFPi8yekhylmuBGu';
  return compare(password, hashToCompare).then((data) => expect(data).toBe(true));
});

test('compare to fail', () => {
  const password = 'abcd';
  const hashToCompare = '$2b$10$8x0wx7UKmHf35NdqoiDkTeOpS5eifVAl/mluTQFPi8yekhylmuBGu';
  return compare(password, hashToCompare).catch((data) => expect(data).toBe(false));
});
