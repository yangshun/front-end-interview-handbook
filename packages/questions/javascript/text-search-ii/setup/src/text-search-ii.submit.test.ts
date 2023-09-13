import textSearch from './text-search-ii';

describe('textSearch', () => {
  test('empty string', () => {
    expect(textSearch('', [])).toBe('');
    expect(textSearch('', [''])).toBe('');
    expect(textSearch('', ['xyz'])).toBe('');
    expect(textSearch('', ['xyz', '456'])).toBe('');
  });

  test('empty queries', () => {
    expect(textSearch('', [])).toBe('');
    expect(textSearch('The quick brown fox jumps over the lazy dog', [])).toBe(
      'The quick brown fox jumps over the lazy dog',
    );
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', ['']),
    ).toBe('The quick brown fox jumps over the lazy dog');
  });

  test('no matching queries', () => {
    expect(textSearch('The quick brown fox jumps over the lazy dog', [])).toBe(
      'The quick brown fox jumps over the lazy dog',
    );
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', ['aaa']),
    ).toBe('The quick brown fox jumps over the lazy dog');
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', ['abc']),
    ).toBe('The quick brown fox jumps over the lazy dog');
  });

  describe('matching queries', () => {
    test('case-insensitive match', () => {
      expect(
        textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', ['fox']),
      ).toBe('The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog');
      expect(
        textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', [
          'fox',
          'quick',
        ]),
      ).toBe('The <b>Quick</b> Brown <b>Fox</b> Jumps Over The Lazy Dog');
      expect(
        textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', ['QUICK']),
      ).toBe('The <b>Quick</b> Brown Fox Jumps Over The Lazy Dog');
    });

    test('single whole queries', () => {
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', ['quick']),
      ).toBe('The <b>quick</b> brown fox jumps over the lazy dog');
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', [
          'jumps',
          'quick',
        ]),
      ).toBe('The <b>quick</b> brown fox <b>jumps</b> over the lazy dog');
    });

    test('single partial queries', () => {
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', ['jump']),
      ).toBe('The quick brown fox <b>jump</b>s over the lazy dog');
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', [
          'jump',
          'he',
          'own',
        ]),
      ).toBe(
        'T<b>he</b> quick br<b>own</b> fox <b>jump</b>s over t<b>he</b> lazy dog',
      );
    });

    test('consecutive matches have combined tags', () => {
      expect(textSearch('aabbcc', ['a'])).toBe('<b>aa</b>bbcc');
      expect(textSearch('aabbbbcc', ['bb'])).toBe('aa<b>bbbb</b>cc');
      expect(textSearch('aabbcc', ['aa', 'bb'])).toBe('<b>aabb</b>cc');
      expect(textSearch('This is Uncopyrightable!', ['copy', 'right'])).toBe(
        'This is Un<b>copyright</b>able!',
      );
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', [
          'jumps ',
          ' over',
        ]),
      ).toBe('The quick brown fox <b>jumps over</b> the lazy dog');
    });

    describe('complex queries', () => {
      test('characters do not match the same word more than once', () => {
        expect(textSearch('aaabbcc', ['aa'])).toBe('<b>aa</b>abbcc');
      });

      test('overlapping queries', () => {
        expect(textSearch('aaabbcc', ['aaa', 'aab'])).toBe('<b>aaab</b>bcc');
        expect(textSearch('aaabbcc', ['aa', 'ab'])).toBe('<b>aaab</b>bcc');
        expect(textSearch('I am a rexpert', ['rex', 'expert'])).toBe(
          'I am a <b>rexpert</b>',
        );
      });

      test('query within another query', () => {
        expect(textSearch('This lock is Unlockable', ['lock', 'unlock'])).toBe(
          'This <b>lock</b> is <b>Unlock</b>able',
        );
      });
    });

    test('integration', () => {
      expect(
        textSearch('This is Uncopyrightable!', ['COPY', 'right', 'tAbLe']),
      ).toBe('This is Un<b>copyrightable</b>!');
    });
  });
});
