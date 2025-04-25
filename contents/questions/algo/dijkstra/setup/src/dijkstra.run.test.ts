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
  });
});
