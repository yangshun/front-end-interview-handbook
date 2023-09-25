import mergeData from './data-merging';

describe('mergeData', () => {
  test('empty data', () => {
    expect(mergeData([])).toEqual([]);
  });

  test('merge for one user', () => {
    expect(
      mergeData([
        { user: 1, duration: 10, equipment: ['barbell'] },
        { user: 1, duration: 30, equipment: [] },
      ]),
    ).toEqual([{ user: 1, duration: 40, equipment: ['barbell'] }]);
  });

  test('merge for two users', () => {
    expect(
      mergeData([
        { user: 8, duration: 50, equipment: ['bench'] },
        { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
        { user: 8, duration: 50, equipment: ['bench'] },
        { user: 7, duration: 150, equipment: ['bench', 'kettlebell'] },
      ]),
    ).toEqual([
      { user: 8, duration: 100, equipment: ['bench'] },
      {
        user: 7,
        duration: 300,
        equipment: ['bench', 'dumbbell', 'kettlebell'],
      },
    ]);
  });
});
