import $ from './jquery-css';

describe('jQuery.css', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button style="color: blue">Click me</button>';
  });

  test('get existing style', () => {
    expect($('button').css('color')).toBe('blue');
  });

  test('set style', () => {
    $('button').css('color', 'red');
    $('button').css('backgroundColor', 'tomato');
    $('button').css('fontSize', '12px');

    expect(document.querySelector('button')!.style.color).toBe('red');
  });

  test('get non-existent style', () => {
    expect($('button').css('fontSize')).toBe(undefined);
  });
});
