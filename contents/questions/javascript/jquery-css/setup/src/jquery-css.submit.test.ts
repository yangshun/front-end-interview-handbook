import $ from './jquery-css';

describe('jQuery.css', () => {
  describe('get property', () => {
    beforeEach(() => {
      document.body.innerHTML = '<button style="color: blue">Click me</button>';
    });

    test('get existing style', () => {
      expect($('button').css('color')).toBe('blue');
    });

    test('get non-existent style', () => {
      expect($('button').css('fontSize')).toBe(undefined);
    });

    test('non-existent element', () => {
      expect($('no-such-thing').css('fontSize')).toBe(undefined);
    });
  });

  describe('set property', () => {
    beforeEach(() => {
      document.body.innerHTML = '<button>Click me</button>';
    });

    test('no elements match the selector', () => {
      expect(() => {
        // @ts-ignore
        $('no-such-thing').css('color', 'red').css('fontSize', '12px');
      }).not.toThrow();
    });

    test('set css', () => {
      $('button').css('color', 'red');
      $('button').css('backgroundColor', 'tomato');
      $('button').css('fontSize', '12px');

      expect(document.querySelector('button')!.style.color).toBe('red');
      expect(document.querySelector('button')!.style.backgroundColor).toBe(
        'tomato',
      );
      expect(document.querySelector('button')!.style.fontSize).toBe('12px');

      $('button').css('color', 'orange');
      expect(document.querySelector('button')!.style.color).toBe('orange');
    });

    test('chain calls', () => {
      // @ts-ignore
      $('button')
        .css('color', 'red')
        // @ts-ignore
        .css('backgroundColor', 'tomato')
        .css('fontSize', '12px');

      expect(document.querySelector('button')!.style.color).toBe('red');
      expect(document.querySelector('button')!.style.backgroundColor).toBe(
        'tomato',
      );
      expect(document.querySelector('button')!.style.fontSize).toBe('12px');
    });

    test('overwrites previous styles', () => {
      // @ts-ignore
      $('button')
        .css('color', 'red')
        // @ts-ignore
        .css('backgroundColor', 'tomato')
        .css('fontSize', '12px')
        .css('color', 'orange');

      expect(document.querySelector('button')!.style.color).toBe('orange');
      expect(document.querySelector('button')!.style.backgroundColor).toBe(
        'tomato',
      );
      expect(document.querySelector('button')!.style.fontSize).toBe('12px');
    });
  });
});
