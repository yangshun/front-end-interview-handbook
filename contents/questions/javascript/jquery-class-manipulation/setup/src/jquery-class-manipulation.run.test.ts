import $ from './jquery-class-manipulation';

describe('jQuery', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="foo bar baz">Click me</button>';
  });

  test('toggleClass', () => {
    $('button').toggleClass('qux');
    expect(document.querySelector('button')!.className).toBe('foo bar baz qux');
  });

  test('addClass', () => {
    $('button').addClass('qux');
    expect(document.querySelector('button')!.className).toBe('foo bar baz qux');
  });

  test('removeClass', () => {
    $('button').removeClass('bar');
    expect(document.querySelector('button')!.className).toBe('foo baz');
  });
});
