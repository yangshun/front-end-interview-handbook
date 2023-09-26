import serializeHTML from './html-serializer';

describe('HTML serializer', () => {
  test('single children', () => {
    expect(
      serializeHTML({
        tag: 'div',
        children: ['foo'],
      }),
    ).toEqual('<div>\n\tfoo\n</div>');
  });

  test('single tag two children', () => {
    expect(serializeHTML({ children: ['bar1', 'bar2'], tag: 'span' })).toEqual(
      '<span>\n\tbar1\n\tbar2\n</span>',
    );
  });
});
