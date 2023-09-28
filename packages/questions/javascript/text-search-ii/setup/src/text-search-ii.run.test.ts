import textSearch from './text-search-ii';

describe('textSearch', () => {
  test('empty string', () => {
    expect(textSearch('', [])).toBe('');
  });

  test('no matching queries', () => {
    expect(textSearch('The quick brown fox jumps over the lazy dog', [])).toBe(
      'The quick brown fox jumps over the lazy dog',
    );
  });

  test('single query match', () => {
    expect(
      textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', ['fox']),
    ).toBe('The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog');
  });

  test('consecutive matches have combined tags', () => {
    expect(textSearch('aabbcc', ['a'])).toBe('<b>aa</b>bbcc');
  });
});
