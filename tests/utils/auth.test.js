import { auth, authWithUser } from '../../src/utils/auth';

describe('authWithTeacher', () => {
  test('with teacher', () => {
    const fn = jest.fn();
    const teacherId = '12345';
    const ctx = { session: { teacherId } };

    const authFunc = authWithUser(fn);
    authFunc(ctx, 'hey');
    expect(fn).toHaveBeenCalledWith(teacherId, 'hey');
  });

  test('without teacher', () => {
    const fn = jest.fn();
    const ctx = { session: {} };
    expect(() => {
      const authFunc = authWithUser(fn);
      authFunc(ctx, authFunc);
    }).toThrow(Error);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('auth', () => {
  test('with teacher', () => {
    const fn = jest.fn();
    const teacherId = '12345';
    const ctx = { session: { teacherId } };

    const authFunc = auth(fn);
    authFunc(ctx, 'hey');
    expect(fn).toHaveBeenCalledWith('hey');
  });

  test('without teacher', () => {
    const fn = jest.fn();
    const ctx = { session: {} };

    expect(() => {
      const authFunc = auth(fn);
      authFunc(ctx, authFunc);
    }).toThrow(Error);
    expect(fn).not.toHaveBeenCalled();
  });
});
