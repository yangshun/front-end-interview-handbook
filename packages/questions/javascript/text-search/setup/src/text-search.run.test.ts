import textSearch from './text-search';

describe('textSearch', () => {
  test('empty string', () => {
    expect(textSearch('', '')).toBe('');
    expect(textSearch('', 'xyz')).toBe('');
  });

  test('empty query', () => {
    expect(textSearch('', '')).toBe('');
    expect(textSearch('The quick brown fox jumps over the lazy dog', '')).toBe(
      'The quick brown fox jumps over the lazy dog',
    );
  });

  test('no matches', () => {
    expect(textSearch('The quick brown fox jumps over the lazy dog', '')).toBe(
      'The quick brown fox jumps over the lazy dog',
    );
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'aaa'),
    ).toBe('The quick brown fox jumps over the lazy dog');
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'abc'),
    ).toBe('The quick brown fox jumps over the lazy dog');
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'dogo'),
    ).toBe('The quick brown fox jumps over the lazy dog');
  });

  describe('matches', () => {
    test('exact match', () => {
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'quick'),
      ).toBe('The <b>quick</b> brown fox jumps over the lazy dog');
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'jumps'),
      ).toBe('The quick brown fox <b>jumps</b> over the lazy dog');
    });

    test('case-insensitive match', () => {
      expect(
        textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', 'fox'),
      ).toBe('The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog');
      expect(
        textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', 'QUICK'),
      ).toBe('The <b>Quick</b> Brown Fox Jumps Over The Lazy Dog');
    });

    test('partial match', () => {
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'jump'),
      ).toBe('The quick brown fox <b>jump</b>s over the lazy dog');
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'he'),
      ).toBe('T<b>he</b> quick brown fox jumps over t<b>he</b> lazy dog');
    });

    test('characters do not match the same word more than once', () => {
      expect(textSearch('aaabbcc', 'aa')).toBe('<b>aa</b>abbcc');
    });

    test('consecutive matches have combined tags', () => {
      expect(textSearch('aabbcc', 'a')).toBe('<b>aa</b>bbcc');
      expect(textSearch('aabbbbcc', 'bb')).toBe('aa<b>bbbb</b>cc');
    });
  });
});
