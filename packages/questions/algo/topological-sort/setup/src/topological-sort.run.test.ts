import topologicalSort from './topological-sort';

describe('topologicalSort', () => {
  test('empty graph', () => {
    expect(topologicalSort({})).toEqual([]);
  });

  test('graphs with one node', () => {
    expect(topologicalSort({ A: [] })).toEqual(['A']);
  });

  test('graphs with two nodes', () => {
    expect(topologicalSort({ A: ['B'], B: [] })).toEqual(['A', 'B']);
    expect(topologicalSort({ A: [], B: ['A'] })).toEqual(['B', 'A']);
  });
});
