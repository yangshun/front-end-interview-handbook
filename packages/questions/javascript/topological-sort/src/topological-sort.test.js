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

  test('graphs with multiple nodes', () => {
    expect(topologicalSort({ A: ['B', 'C'], B: ['C'], C: [] })).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(
      topologicalSort({
        A: ['B', 'C', 'E'],
        B: ['C'],
        C: [],
        D: ['B'],
        E: ['C', 'D'],
      }),
    ).toEqual(['A', 'E', 'D', 'B', 'C']);
    expect(
      topologicalSort({
        A: ['B', 'C'],
        B: ['C', 'D', 'E'],
        C: ['F'],
        D: [],
        E: ['F'],
        F: [],
      }),
    ).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    expect(
      topologicalSort({
        A: ['B', 'C'],
        B: ['C', 'D'],
        C: ['D'],
        D: ['E'],
        E: ['F'],
        F: [],
      }),
    ).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });

  test('linked list', () => {
    expect(topologicalSort({ A: ['B'], B: ['C'], C: [] })).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(
      topologicalSort({
        A: [],
        B: ['A'],
        C: ['B'],
        D: ['C'],
        E: ['D'],
        F: ['E'],
      }),
    ).toEqual(['F', 'E', 'D', 'C', 'B', 'A']);
  });

  test('graph with cycles', () => {
    expect(topologicalSort({ A: ['A'] })).toEqual([]);
    expect(topologicalSort({ A: ['A', 'B'], B: [] })).toEqual([]);
    expect(topologicalSort({ A: ['A', 'B'], B: ['A'] })).toEqual([]);
    expect(
      topologicalSort({
        A: ['D', 'E'],
        B: ['A', 'B', 'C', 'D', 'E'],
        C: [],
        D: ['B'],
        E: ['C'],
      }),
    ).toEqual([]);
  });
});
