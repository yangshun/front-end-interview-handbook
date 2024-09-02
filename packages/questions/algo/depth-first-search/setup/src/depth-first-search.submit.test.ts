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
    expect(depthFirstSearch({ A: ['A', 'B'], B: [] }, 'A')).toEqual(['A', 'B']);
    expect(depthFirstSearch({ A: ['A', 'B'], B: [] }, 'B')).toEqual(['B']);
    expect(depthFirstSearch({ A: ['A', 'B'], B: ['A'] }, 'B')).toEqual([
      'B',
      'A',
    ]);
  });

  test('graphs with multiple nodes', () => {
    expect(depthFirstSearch({ A: ['B'], B: ['C'], C: [] }, 'A')).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(depthFirstSearch({ A: ['B', 'C'], B: [], C: [] }, 'A')).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(
      depthFirstSearch(
        { A: ['B', 'C'], B: [], C: [], D: ['B'], E: ['C'] },
        'A',
      ),
    ).toEqual(['A', 'B', 'C']);
    expect(
      depthFirstSearch(
        { A: ['D', 'E'], B: [], C: [], D: ['B'], E: ['C'] },
        'A',
      ),
    ).toEqual(['A', 'D', 'B', 'E', 'C']);
    expect(
      depthFirstSearch(
        {
          A: ['D', 'E'],
          B: ['A', 'B', 'C', 'D', 'E'],
          C: [],
          D: ['B'],
          E: ['C'],
        },
        'A',
      ),
    ).toEqual(['A', 'D', 'B', 'C', 'E']);
    expect(
      depthFirstSearch(
        {
          A: ['A', 'B', 'C', 'D', 'E'],
          B: [],
          C: [],
          D: ['B'],
          E: ['C'],
        },
        'A',
      ),
    ).toEqual(['A', 'B', 'C', 'D', 'E']);
    // Graph taken from https://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/
    const graph = {
      A: ['B', 'C'],
      B: ['A', 'D', 'E'],
      C: ['A', 'E'],
      D: ['B', 'E', 'F'],
      E: ['B', 'C', 'D', 'F'],
      F: ['D', 'E'],
    };
    expect(depthFirstSearch(graph, 'A')).toEqual([
      'A',
      'B',
      'D',
      'E',
      'C',
      'F',
    ]);
    expect(depthFirstSearch(graph, 'B')).toEqual([
      'B',
      'A',
      'C',
      'E',
      'D',
      'F',
    ]);
    expect(depthFirstSearch(graph, 'C')).toEqual([
      'C',
      'A',
      'B',
      'D',
      'E',
      'F',
    ]);
    expect(depthFirstSearch(graph, 'D')).toEqual([
      'D',
      'B',
      'A',
      'C',
      'E',
      'F',
    ]);
    expect(depthFirstSearch(graph, 'E')).toEqual([
      'E',
      'B',
      'A',
      'C',
      'D',
      'F',
    ]);
    expect(depthFirstSearch(graph, 'F')).toEqual([
      'F',
      'D',
      'B',
      'A',
      'C',
      'E',
    ]);
  });

  test('disjoint graphs', () => {
    expect(depthFirstSearch({ A: ['B'], B: [], C: [], D: ['C'] }, 'A')).toEqual(
      ['A', 'B'],
    );
    expect(depthFirstSearch({ A: ['B'], B: [], C: [], D: ['C'] }, 'C')).toEqual(
      ['C'],
    );
    expect(depthFirstSearch({ A: ['B'], B: [], C: [], D: ['C'] }, 'D')).toEqual(
      ['D', 'C'],
    );
  });

  test('cyclic graphs', () => {
    expect(depthFirstSearch({ A: ['A'] }, 'A')).toEqual(['A']);
    expect(
      depthFirstSearch(
        {
          A: ['B', 'C', 'D'],
          B: ['E', 'F'],
          C: ['G', 'H'],
          D: ['I', 'J'],
          E: ['D'],
          F: [],
          G: [],
          H: [],
          I: [],
          J: [],
        },
        'A',
      ),
    ).toEqual(['A', 'B', 'E', 'D', 'I', 'J', 'F', 'C', 'G', 'H']);
    expect(
      depthFirstSearch(
        {
          A: ['B', 'C', 'D'],
          B: ['E', 'F'],
          C: ['G', 'H'],
          D: ['I', 'J'],
          E: ['D'],
          F: [],
          G: [],
          H: [],
          I: [],
          J: [],
        },
        'B',
      ),
    ).toEqual(['B', 'E', 'D', 'I', 'J', 'F']);
    expect(
      depthFirstSearch(
        {
          A: ['B', 'C'],
          B: ['D', 'E'],
          C: ['F', 'G'],
          D: [],
          E: [],
          F: [],
          G: [],
        },
        'A',
      ),
    ).toEqual(['A', 'B', 'D', 'E', 'C', 'F', 'G']);
    expect(
      depthFirstSearch(
        {
          A: ['B', 'C'],
          B: ['D', 'E'],
          C: ['F', 'G'],
          D: [],
          E: [],
          F: [],
          G: [],
        },
        'E',
      ),
    ).toEqual(['E']);
  });
});
