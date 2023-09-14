import breadthFirstSearch from './breadth-first-search';

describe('breadthFirstSearch', () => {
  test('single node graph', () => {
    expect(breadthFirstSearch({ A: [] }, 'A')).toEqual(['A']);
  });

  test('two node graph', () => {
    expect(breadthFirstSearch({ A: ['B'], B: [] }, 'A')).toEqual(['A', 'B']);
  });

  test('multiple node graph', () => {
    const graph = {
      A: ['B', 'C'],
      B: ['D', 'E'],
      C: ['F', 'G'],
      D: [],
      E: [],
      F: [],
      G: [],
    };
    expect(breadthFirstSearch(graph, 'A')).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
    ]);
  });
});
