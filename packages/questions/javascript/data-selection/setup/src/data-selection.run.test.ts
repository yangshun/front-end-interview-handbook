import selectData from './data-selection';

function getDataSmall() {
  return [
    { user: 8, duration: 50, equipment: ['bench'] },
    { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
    { user: 1, duration: 10, equipment: ['barbell'] },
    { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
    { user: 7, duration: 200, equipment: ['bike'] },
    { user: 2, duration: 200, equipment: ['treadmill'] },
    { user: 2, duration: 200, equipment: ['bike'] },
  ];
}

describe('selectData', () => {
  test('empty data', () => {
    expect(selectData([])).toEqual([]);
  });

  test('minDuration', () => {
    const dataSmall = getDataSmall();
    expect(selectData(dataSmall, { minDuration: 150 })).toEqual([
      { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
      { user: 7, duration: 200, equipment: ['bike'] },
      { user: 2, duration: 200, equipment: ['treadmill'] },
      { user: 2, duration: 200, equipment: ['bike'] },
    ]);
  });

  test('one equipment specified', () => {
    const dataSmall = getDataSmall();
    expect(selectData(dataSmall, { equipment: ['bike'] })).toEqual([
      { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
      { user: 7, duration: 200, equipment: ['bike'] },
      { user: 2, duration: 200, equipment: ['bike'] },
    ]);
  });

  test('merging', () => {
    const dataSmall = getDataSmall();
    expect(
      selectData(dataSmall, {
        merge: true,
        minDuration: 400,
        equipment: ['treadmill', 'bench', 'barbell', 'dumbbell', 'bike'],
      }),
    ).toEqual([
      {
        user: 7,
        duration: 450,
        equipment: ['bike', 'dumbbell', 'kettlebell'],
      },
      { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
    ]);
  });
});
