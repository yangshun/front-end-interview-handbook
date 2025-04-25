import dijkstra from './dijkstra';

describe('dijkstra', () => {
  test('empty graph', () => {
    expect(dijkstra({}, 'A')).toEqual({});
  });

  test('graph with one node', () => {
    expect(dijkstra({ A: {} }, 'A')).toEqual({ A: 0 });
  });

  test('graph with two nodes', () => {
    expect(dijkstra({ A: { B: 1 }, B: {} }, 'A')).toEqual({ A: 0, B: 1 });
    expect(dijkstra({ A: { B: 5 }, B: { A: 2 } }, 'A')).toEqual({ A: 0, B: 5 });
    expect(dijkstra({ A: { B: 5 }, B: { A: 2 } }, 'B')).toEqual({ A: 2, B: 0 });
  });

  test('graphs with multiple nodes', () => {
    expect(
      dijkstra({ A: { B: 1, C: 4 }, B: { D: 1 }, C: {}, D: {} }, 'A'),
    ).toEqual({
      A: 0,
      B: 1,
      C: 4,
      D: 2,
    });
    expect(
      dijkstra({ A: { B: 2, C: 5 }, B: { C: 3 }, C: { D: 1 }, D: {} }, 'A'),
    ).toEqual({
      A: 0,
      B: 2,
      C: 5,
      D: 6,
    });
    expect(
      dijkstra(
        { A: { B: 1, C: 2 }, B: { C: 1, D: 2 }, C: { D: 5 }, D: {} },
        'A',
      ),
    ).toEqual({
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    });
  });

  test('disjoint graphs', () => {
    expect(dijkstra({ A: { B: 3 }, B: {}, C: { D: 1 }, D: {} }, 'A')).toEqual({
      A: 0,
      B: 3,
      C: Infinity,
      D: Infinity,
    });
    expect(dijkstra({ A: { B: 3 }, B: {}, C: { D: 1 }, D: {} }, 'C')).toEqual({
      A: Infinity,
      B: Infinity,
      C: 0,
      D: 1,
    });
  });

  test('graph with cycles', () => {
    expect(
      dijkstra(
        { A: { B: 1, C: 2 }, B: { A: 2 }, C: { D: 3 }, D: { A: 1 } },
        'A',
      ),
    ).toEqual({
      A: 0,
      B: 1,
      C: 2,
      D: 5,
    });
    expect(
      dijkstra(
        { A: { B: 4, C: 1 }, B: { C: 2, D: 2 }, C: { D: 2 }, D: { A: 7 } },
        'A',
      ),
    ).toEqual({
      A: 0,
      B: 4,
      C: 1,
      D: 3,
    });
  });
});
