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
    expect(selectData([], { user: 2 })).toEqual([]);
    expect(selectData([], { merge: true })).toEqual([]);
  });

  test('does not mutate data', () => {
    const dataSmall = getDataSmall();
    selectData(dataSmall, { user: 1 });
    selectData(dataSmall, { minDuration: 150 });
    selectData(dataSmall, {
      merge: true,
      equipment: ['treadmill', 'bench', 'barbell', 'dumbbell', 'bike'],
    });

    const originalDataSmall = getDataSmall();
    expect(dataSmall).toEqual(originalDataSmall);
  });

  test('no options', () => {
    const dataSmall = getDataSmall();
    const originalDataSmall = getDataSmall();
    expect(selectData(dataSmall)).toEqual(originalDataSmall);
  });

  describe('user option', () => {
    test('user with single session', () => {
      const dataSmall = getDataSmall();
      expect(selectData(dataSmall, { user: 1 })).toEqual([
        { user: 1, duration: 10, equipment: ['barbell'] },
      ]);
    });

    test('user with multiple sessions', () => {
      const dataSmall = getDataSmall();
      expect(selectData(dataSmall, { user: 2 })).toEqual([
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
    });

    test('non-existing user', () => {
      const dataSmall = getDataSmall();
      expect(selectData(dataSmall, { user: 99 })).toEqual([]);
    });
  });

  describe('minDuration option', () => {
    test('low minDuration', () => {
      const dataSmallTest1 = getDataSmall();
      expect(selectData(dataSmallTest1, { minDuration: 150 })).toEqual([
        { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);

      const dataSmallTest2 = getDataSmall();
      expect(selectData(dataSmallTest2, { minDuration: 151 })).toEqual([
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);

      const dataSmallTest3 = getDataSmall();
      expect(selectData(dataSmallTest3, { minDuration: 200 })).toEqual([
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
    });

    test('high minDuration', () => {
      const dataSmall = getDataSmall();
      expect(selectData(dataSmall, { minDuration: 400 })).toEqual([]);
    });
  });

  describe('equipment option', () => {
    test('no matching equipment', () => {
      const dataSmall = getDataSmall();
      expect(selectData(dataSmall, { equipment: ['nah'] })).toEqual([]);
    });

    test('one equipment specified', () => {
      const dataSmall = getDataSmall();
      expect(selectData(dataSmall, { equipment: ['bike'] })).toEqual([
        { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
    });

    test('multiple equipments specified', () => {
      const dataSmallTest1 = getDataSmall();
      expect(
        selectData(dataSmallTest1, { equipment: ['bike', 'dumbbell'] }),
      ).toEqual([
        { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
        { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);

      const dataSmallTest2 = getDataSmall();
      expect(
        selectData(dataSmallTest2, {
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        }),
      ).toEqual([
        { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
        { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
    });
  });

  describe('merge option', () => {
    test('without other options', () => {
      const dataSmall = getDataSmall();
      expect(selectData(dataSmall, { merge: true })).toEqual([
        { user: 8, duration: 50, equipment: ['bench'] },
        { user: 1, duration: 10, equipment: ['barbell'] },
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);
    });

    test('with user', () => {
      const dataSmallTest1 = getDataSmall();
      expect(selectData(dataSmallTest1, { merge: true, user: 1 })).toEqual([
        { user: 1, duration: 10, equipment: ['barbell'] },
      ]);

      const dataSmallTest2 = getDataSmall();
      expect(selectData(dataSmallTest2, { merge: true, user: 2 })).toEqual([
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);

      const dataSmallTest3 = getDataSmall();
      expect(selectData(dataSmallTest3, { merge: true, user: 7 })).toEqual([
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
      ]);
    });

    test('with minDuration', () => {
      const dataSmallTest1 = getDataSmall();
      expect(
        selectData(dataSmallTest1, { merge: true, minDuration: 1000 }),
      ).toEqual([]);

      const dataSmallTest2 = getDataSmall();
      expect(
        selectData(dataSmallTest2, { merge: true, minDuration: 400 }),
      ).toEqual([
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);
    });

    test('with equipment', () => {
      const dataSmallTest1 = getDataSmall();
      expect(
        selectData(dataSmallTest1, { merge: true, equipment: ['bike'] }),
      ).toEqual([
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);

      const dataSmallTest2 = getDataSmall();
      expect(
        selectData(dataSmallTest2, { merge: true, equipment: ['treadmill'] }),
      ).toEqual([{ user: 2, duration: 400, equipment: ['bike', 'treadmill'] }]);

      const dataSmallTest3 = getDataSmall();
      expect(
        selectData(dataSmallTest3, {
          merge: true,
          equipment: ['treadmill', 'bench', 'barbell', 'dumbbell', 'bike'],
        }),
      ).toEqual([
        { user: 8, duration: 50, equipment: ['bench'] },
        { user: 1, duration: 10, equipment: ['barbell'] },
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);
    });

    test('with multiple options', () => {
      const dataSmallTest1 = getDataSmall();
      expect(
        selectData(dataSmallTest1, {
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

      const dataSmallTest2 = getDataSmall();
      expect(
        selectData(dataSmallTest2, {
          merge: true,
          minDuration: 400,
          equipment: ['treadmill'],
        }),
      ).toEqual([{ user: 2, duration: 400, equipment: ['bike', 'treadmill'] }]);
    });
  });
});
