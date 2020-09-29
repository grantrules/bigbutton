import { auth, authWithUser } from '../../src/utils/auth';

describe('authWithTeacher', () => {
  test('with teacher', () => {
    const fn = jest.fn();
    const teacher = { name: 'grant' };
    const ctx = { session: { teacher } };

    const authFunc = authWithUser(fn);
    authFunc(ctx, 'hey');
    expect(fn).toHaveBeenCalledWith(teacher, 'hey');
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
    const teacher = { name: 'grant' };
    const ctx = { session: { teacher } };

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
