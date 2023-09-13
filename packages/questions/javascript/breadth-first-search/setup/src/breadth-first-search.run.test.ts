import breadthFirstSearch from './breadth-first-search';

describe('breadthFirstSearch', () => {
  test('empty graph', () => {
    expect(breadthFirstSearch({}, null)).toEqual([]);
  });

  test('graphs with one node', () => {
    expect(breadthFirstSearch({ A: [] }, 'A')).toEqual(['A']);
  });

  test('graphs with two nodes', () => {
    expect(breadthFirstSearch({ A: ['B'], B: [] }, 'A')).toEqual(['A', 'B']);
    expect(breadthFirstSearch({ A: ['A', 'B'], B: [] }, 'A')).toEqual([
      'A',
      'B',
    ]);
    expect(breadthFirstSearch({ A: ['A', 'B'], B: [] }, 'B')).toEqual(['B']);
    expect(breadthFirstSearch({ A: ['A', 'B'], B: ['A'] }, 'B')).toEqual([
      'B',
      'A',
    ]);
  });

  test('graphs with multiple nodes', () => {
    expect(breadthFirstSearch({ A: ['B'], B: ['C'], C: [] }, 'A')).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(breadthFirstSearch({ A: ['B', 'C'], B: [], C: [] }, 'A')).toEqual([
      'A',
      'B',
      'C',
    ]);
    expect(
      breadthFirstSearch(
        { A: ['B', 'C'], B: [], C: [], D: ['B'], E: ['C'] },
        'A',
      ),
    ).toEqual(['A', 'B', 'C']);
    expect(
      breadthFirstSearch(
        { A: ['D', 'E'], B: [], C: [], D: ['B'], E: ['C'] },
        'A',
      ),
    ).toEqual(['A', 'D', 'E', 'B', 'C']);
    expect(
      breadthFirstSearch(
        {
          A: ['D', 'E'],
          B: ['A', 'B', 'C', 'D', 'E'],
          C: [],
          D: ['B'],
          E: ['C'],
        },
        'A',
      ),
    ).toEqual(['A', 'D', 'E', 'B', 'C']);
    // Graph taken from https://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/
    const graph = {
      A: ['B', 'C'],
      B: ['A', 'D', 'E'],
      C: ['A', 'E'],
      D: ['B', 'E', 'F'],
      E: ['B', 'C', 'D', 'F'],
      F: ['D', 'E'],
    };
    expect(breadthFirstSearch(graph, 'A')).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ]);
    expect(breadthFirstSearch(graph, 'B')).toEqual([
      'B',
      'A',
      'D',
      'E',
      'C',
      'F',
    ]);
    expect(breadthFirstSearch(graph, 'C')).toEqual([
      'C',
      'A',
      'E',
      'B',
      'D',
      'F',
    ]);
    expect(breadthFirstSearch(graph, 'D')).toEqual([
      'D',
      'B',
      'E',
      'F',
      'A',
      'C',
    ]);
  });

  test('disjoint graphs', () => {
    const disjoinGraph = { A: ['B'], B: [], C: [], D: ['C'] };
    expect(breadthFirstSearch(disjoinGraph, 'A')).toEqual(['A', 'B']);
    expect(breadthFirstSearch(disjoinGraph, 'C')).toEqual(['C']);
    expect(breadthFirstSearch(disjoinGraph, 'D')).toEqual(['D', 'C']);
  });

  test('cyclic graphs', () => {
    expect(breadthFirstSearch({ A: ['A'] }, 'A')).toEqual(['A']);
    const cyclicGraphOne = {
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
    };
    const cyclicGraphTwo = {
      A: ['B', 'C'],
      B: ['D', 'E'],
      C: ['F', 'G'],
      D: [],
      E: [],
      F: [],
      G: [],
    };
    expect(breadthFirstSearch(cyclicGraphOne, 'A')).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
    ]);
    expect(breadthFirstSearch(cyclicGraphOne, 'B')).toEqual([
      'B',
      'E',
      'F',
      'D',
      'I',
      'J',
    ]);
    expect(breadthFirstSearch(cyclicGraphTwo, 'A')).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
    ]);
    expect(breadthFirstSearch(cyclicGraphTwo, 'E')).toEqual(['E']);
  });
});
