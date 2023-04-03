import selectData from './data-selection';

const dataSmall = [
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
];

/* eslint-disable no-undef */
describe('selectData', () => {
  test('empty data', () => {
    expect(selectData([])).toEqual([]);
    expect(selectData([], { user: 2 })).toEqual([]);
    expect(selectData([], { merge: true })).toEqual([]);
  });

  test('does not mutate data', () => {
    selectData(dataSmall, { user: 1 });
    selectData(dataSmall, { minDuration: 150 });
    selectData(dataSmall, {
      merge: true,
      equipment: ['treadmill', 'bench', 'barbell', 'dumbbell', 'bike'],
    });
    expect(dataSmall).toEqual(dataSmall);
  });

  test('no options', () => {
    expect(selectData(dataSmall)).toEqual(dataSmall);
  });

  describe('user option', () => {
    test('user with single session', () => {
      expect(selectData(dataSmall, { user: 1 })).toEqual([
        { user: 1, duration: 10, equipment: ['barbell'] },
      ]);
    });

    test('user with multiple sessions', () => {
      expect(selectData(dataSmall, { user: 2 })).toEqual([
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
    });

    test('non-existing user', () => {
      expect(selectData(dataSmall, { user: 99 })).toEqual([]);
    });
  });

  describe('minDuration option', () => {
    test('low minDuration', () => {
      expect(selectData(dataSmall, { minDuration: 150 })).toEqual([
        { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
      expect(selectData(dataSmall, { minDuration: 151 })).toEqual([
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
      expect(selectData(dataSmall, { minDuration: 200 })).toEqual([
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['treadmill'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
    });

    test('high minDuration', () => {
      expect(selectData(dataSmall, { minDuration: 400 })).toEqual([]);
    });
  });

  describe('equipment option', () => {
    test('no matching equipment', () => {
      expect(selectData(dataSmall, { equipment: ['nah'] })).toEqual([]);
    });

    test('one equipment specified', () => {
      expect(selectData(dataSmall, { equipment: ['bike'] })).toEqual([
        { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
    });

    test('multiple equipments specified', () => {
      expect(
        selectData(dataSmall, { equipment: ['bike', 'dumbbell'] }),
      ).toEqual([
        { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
        { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
        { user: 7, duration: 200, equipment: ['bike'] },
        { user: 2, duration: 200, equipment: ['bike'] },
      ]);
      expect(
        selectData(dataSmall, {
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
      expect(selectData(dataSmall, { merge: true, user: 1 })).toEqual([
        { user: 1, duration: 10, equipment: ['barbell'] },
      ]);
      expect(selectData(dataSmall, { merge: true, user: 2 })).toEqual([
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);
      expect(selectData(dataSmall, { merge: true, user: 7 })).toEqual([
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
      ]);
    });

    test('with minDuration', () => {
      expect(selectData(dataSmall, { merge: true, minDuration: 1000 })).toEqual(
        [],
      );
      expect(selectData(dataSmall, { merge: true, minDuration: 400 })).toEqual([
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);
    });

    test('with equipment', () => {
      expect(
        selectData(dataSmall, { merge: true, equipment: ['bike'] }),
      ).toEqual([
        {
          user: 7,
          duration: 450,
          equipment: ['bike', 'dumbbell', 'kettlebell'],
        },
        { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
      ]);
      expect(
        selectData(dataSmall, { merge: true, equipment: ['treadmill'] }),
      ).toEqual([{ user: 2, duration: 400, equipment: ['bike', 'treadmill'] }]);
      expect(
        selectData(dataSmall, {
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
      expect(
        selectData(dataSmall, {
          merge: true,
          minDuration: 400,
          equipment: ['treadmill'],
        }),
      ).toEqual([{ user: 2, duration: 400, equipment: ['bike', 'treadmill'] }]);
    });
  });
});
