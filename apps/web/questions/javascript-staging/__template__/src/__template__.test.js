import templateChangeMe from './__template__';

/* eslint-disable no-undef */
describe('templateChangeMe', () => {
  test('numbers', () => {
    expect(templateChangeMe(1, 2)).toBe(3);
  });

  test('strings', () => {
    expect(templateChangeMe('1', '2')).toBe('12');
  });
});
