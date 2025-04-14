import textSearch from './text-search';

describe('textSearch', () => {
  test('empty query', () => {
    expect(textSearch('', '')).toBe('');
  });

  test('no matches', () => {
    expect(textSearch('The quick brown fox jumps over the lazy dog', '')).toBe(
      'The quick brown fox jumps over the lazy dog',
    );
  });

  test('exact match', () => {
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'quick'),
    ).toBe('The <b>quick</b> brown fox jumps over the lazy dog');
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'jumps'),
    ).toBe('The quick brown fox <b>jumps</b> over the lazy dog');
  });

  test('partial match', () => {
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'jump'),
    ).toBe('The quick brown fox <b>jump</b>s over the lazy dog');
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'he'),
    ).toBe('T<b>he</b> quick brown fox jumps over t<b>he</b> lazy dog');
  });
});
