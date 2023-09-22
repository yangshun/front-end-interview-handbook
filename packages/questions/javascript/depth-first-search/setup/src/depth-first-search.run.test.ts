import depthFirstSearch from './depth-first-search';

describe('depthFirstSearch', () => {
  test('empty graph', () => {
    expect(depthFirstSearch({}, 'A')).toEqual([]);
  });

  test('graphs with one node', () => {
    expect(depthFirstSearch({ A: [] }, 'A')).toEqual(['A']);
  });

  test('graphs with two nodes', () => {
    expect(depthFirstSearch({ A: ['B'], B: [] }, 'A')).toEqual(['A', 'B']);
  });
});
