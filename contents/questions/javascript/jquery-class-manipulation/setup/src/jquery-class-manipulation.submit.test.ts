import $ from './jquery-class-manipulation';

describe('jQuery', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="foo bar baz">Click me</button>';
  });

  describe('toggleClass', () => {
    describe('one class name', () => {
      test('add', () => {
        $('button').toggleClass('qux');
        expect(document.querySelector('button')!.className).toBe(
          'foo bar baz qux',
        );
      });

      test('remove', () => {
        $('button').toggleClass('foo');
        expect(document.querySelector('button')!.className).toBe('bar baz');
      });
    });

    describe('multiple class names', () => {
      test('add', () => {
        $('button').toggleClass('qux quux');
        expect(document.querySelector('button')!.className).toBe(
          'foo bar baz qux quux',
        );
      });

      test('remove', () => {
        $('button').toggleClass('foo baz');
        expect(document.querySelector('button')!.className).toBe('bar');
      });

      test('add and remove', () => {
        $('button').toggleClass('qux foo');
        expect(document.querySelector('button')!.className).toBe('bar baz qux');
      });
    });
  });

  describe('explicit add', () => {
    test('one class name', () => {
      $('button').toggleClass('qux', true);
      expect(document.querySelector('button')!.className).toBe(
        'foo bar baz qux',
      );
    });

    test('multiple class names', () => {
      $('button').toggleClass('qux quux', true);
      expect(document.querySelector('button')!.className).toBe(
        'foo bar baz qux quux',
      );
    });

    test('classes already exist', () => {
      $('button').toggleClass('foo bar', true);
      expect(document.querySelector('button')!.className).toBe('foo bar baz');
    });
  });

  describe('explicit remove', () => {
    test('one class name', () => {
      $('button').toggleClass('bar', false);
      expect(document.querySelector('button')!.className).toBe('foo baz');
    });

    test('multiple class names', () => {
      $('button').toggleClass('bar foo', false);
      expect(document.querySelector('button')!.className).toBe('baz');
    });

    test("classes don't exist", () => {
      $('button').toggleClass('qux quux', false);
      expect(document.querySelector('button')!.className).toBe('foo bar baz');
    });
  });

  describe('addClass', () => {
    test('one class name', () => {
      $('button').addClass('qux');
      expect(document.querySelector('button')!.className).toBe(
        'foo bar baz qux',
      );
    });

    test('multiple class names', () => {
      $('button').addClass('qux quux');
      expect(document.querySelector('button')!.className).toBe(
        'foo bar baz qux quux',
      );
    });

    test('classes already exist', () => {
      $('button').addClass('foo bar');
      expect(document.querySelector('button')!.className).toBe('foo bar baz');
    });
  });

  describe('removeClass', () => {
    test('one class name', () => {
      $('button').removeClass('bar');
      expect(document.querySelector('button')!.className).toBe('foo baz');
    });

    test('multiple class names', () => {
      $('button').removeClass('bar foo');
      expect(document.querySelector('button')!.className).toBe('baz');
    });

    test("classes don't exist", () => {
      $('button').removeClass('qux quux');
      expect(document.querySelector('button')!.className).toBe('foo bar baz');
    });
  });

  describe('class names with spaces', () => {
    beforeEach(() => {
      document.body.innerHTML =
        '<button class=" foo   bar  baz    ">Click me</button>';
    });

    test('toggle', () => {
      $('button').toggleClass(' qux  ');
      expect(document.querySelector('button')!.className).toBe(
        'foo bar baz qux',
      );
    });

    test('toggle multiple', () => {
      $('button').toggleClass(' qux   foo');
      expect(document.querySelector('button')!.className).toBe('bar baz qux');
    });

    test('explicit add', () => {
      $('button').addClass('   quxx    qux   ');
      expect(document.querySelector('button')!.className).toBe(
        'foo bar baz quxx qux',
      );
    });

    test('explicit remove', () => {
      $('button').removeClass('   bar foo   ');
      expect(document.querySelector('button')!.className).toBe('baz');
    });
  });

  test('can be chained', () => {
    $('button')
      .toggleClass(' qux  ')
      .toggleClass(' baz  ')
      .addClass('corge')
      .removeClass('foo');
    expect(document.querySelector('button')!.className).toBe('bar qux corge');
  });
});
