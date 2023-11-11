import BackboneModel from './backbone-model';

describe('BackboneModel', () => {
  test('constructor', () => {
    const person = new BackboneModel();
    expect(person).toBeInstanceOf(BackboneModel);
  });

  test('get', () => {
    const person = new BackboneModel({ name: 'John', age: 30 });
    expect(person.get('name')).toBe('John');
    expect(person.get('age')).toBe(30);
  });

  test('set', () => {
    const person = new BackboneModel();
    person.set('name', 'Carol');

    expect(person.get('name')).toBe('Carol');
  });

  test('has', () => {
    const person = new BackboneModel({ name: 'John' });
    expect(person.has('name')).toBe(true);
  });

  test('unset', () => {
    const person = new BackboneModel({ name: 'John', age: 30 });
    expect(person.has('name')).toBe(true);
    person.unset('name');

    expect(person.has('name')).toBe(false);
  });

  describe('on', () => {
    test('change', () => {
      let fired = false;
      const person = new BackboneModel({ name: 'John' });
      person.on('change', 'name', () => {
        fired = true;
      });
      person.set('name', 'Johnny');

      expect(person.get('name')).toBe('Johnny');
      expect(fired).toBe(true);
    });

    test('unset', () => {
      let fired = false;
      const person = new BackboneModel({ name: 'John' });
      person.on('unset', 'name', () => {
        fired = true;
      });
      person.unset('name');

      expect(fired).toBe(true);
      expect(person.get('name')).toBeUndefined();
    });
  });

  test('off', () => {
    let times = 0;
    function callback() {
      times++;
    }

    const person = new BackboneModel({ name: 'John' });
    person.on('change', 'name', callback);

    person.set('name', 'Johnny');
    expect(person.get('name')).toBe('Johnny');
    expect(times).toEqual(1);

    person.set('name', 'Carol');
    expect(person.get('name')).toBe('Carol');
    expect(times).toEqual(2);

    person.off('change', 'name', callback);
    person.set('name', 'Caroline');
    expect(person.get('name')).toBe('Caroline');
    expect(times).toEqual(2);
  });
});
