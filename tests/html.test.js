import html from '../src/html';

describe('html', () => {
  test('returns html', () => {
    expect(html('app', 'state')).toMatch(/<html/);
  });
});
