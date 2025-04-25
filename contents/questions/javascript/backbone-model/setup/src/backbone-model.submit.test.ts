import BackboneModel from './backbone-model';

describe('BackboneModel', () => {
  describe('constructor', () => {
    test('without default data', () => {
      const person = new BackboneModel();
      expect(person).toBeInstanceOf(BackboneModel);
    });

    test('with default data', () => {
      const person = new BackboneModel({ name: 'John', age: 30 });
      expect(person).toBeInstanceOf(BackboneModel);
    });
  });

  describe('get', () => {
    test('existing field', () => {
      const person = new BackboneModel({ name: 'John', age: 30 });
      expect(person.get('name')).toBe('John');
      expect(person.get('age')).toBe(30);
    });

    test('non-existing field', () => {
      const person = new BackboneModel();
      expect(person.get('name')).toBeUndefined();
    });
  });

  describe('set', () => {
    test('new field', () => {
      const person = new BackboneModel();
      person.set('name', 'Carol');

      expect(person.get('name')).toBe('Carol');
    });

    test('existing field', () => {
      const person = new BackboneModel({ name: 'John', age: 30 });
      expect(person.get('name')).toBe('John');

      person.set('name', 'Carol');
      expect(person.get('name')).toBe('Carol');
    });
  });

  describe('has', () => {
    test('existing field', () => {
      const person = new BackboneModel({ name: 'John' });
      expect(person.has('name')).toBe(true);
    });

    test('non-existing field', () => {
      const person = new BackboneModel({ name: 'John' });
      expect(person.has('age')).toBe(false);
    });
  });

  describe('unset', () => {
    test('existing field', () => {
      const person = new BackboneModel({ name: 'John', age: 30 });
      expect(person.has('name')).toBe(true);
      person.unset('name');

      expect(person.has('name')).toBe(false);
    });

    test('non-existing field', () => {
      const person = new BackboneModel({ name: 'John' });
      person.unset('age');

      expect(person.has('age')).toBe(false);
    });
  });

  describe('on', () => {
    describe('change event', () => {
      test('callback invoked when attribute changes', () => {
        let fired = false;
        const person = new BackboneModel({ name: 'John' });
        person.on('change', 'name', () => {
          fired = true;
        });
        person.set('name', 'Johnny');

        expect(person.get('name')).toBe('Johnny');
        expect(fired).toBe(true);
      });

      test('callback invoked with correct arguments', () => {
        let args: Array<any> = [];
        const person = new BackboneModel({ name: 'John' });
        person.on('change', 'name', (...args_: Array<any>) => {
          args = args_;
        });
        person.set('name', 'Johnny');

        expect(person.get('name')).toBe('Johnny');
        expect(args).toEqual(['name', 'Johnny', 'John']);
      });

      test('callback invoked with `this`', () => {
        let user = { name: 'Boo' };
        const person = new BackboneModel({ name: 'John' });
        person.on(
          'change',
          'name',
          function (
            this: any,
            attribute: string,
            newValue: any,
            _oldValue: any,
          ) {
            this[attribute] = newValue;
          },
          user,
        );
        expect(user.name).toBe('Boo');

        person.set('name', 'Johnny');
        expect(person.get('name')).toBe('Johnny');
        expect(user.name).toEqual('Johnny');
      });

      test('works for multiple changes', () => {
        let args: Array<any> = [];

        const person = new BackboneModel({ name: 'John' });
        person.on('change', 'name', (...args_: Array<any>) => {
          args = args_;
        });

        person.set('name', 'Johnny');
        expect(person.get('name')).toBe('Johnny');
        expect(args).toEqual(['name', 'Johnny', 'John']);

        person.set('name', 'Carol');
        expect(person.get('name')).toBe('Carol');
        expect(args).toEqual(['name', 'Carol', 'Johnny']);
      });

      test('does not fire when no change', () => {
        let times = 0;
        function callback() {
          times++;
        }

        const person = new BackboneModel({ name: 'John' });
        person.on('change', 'name', callback);

        person.set('name', 'Johnny');
        expect(person.get('name')).toBe('Johnny');
        expect(times).toEqual(1);

        person.set('name', 'Johnny');
        expect(person.get('name')).toBe('Johnny');
        expect(times).toEqual(1);
      });

      test('removed when unset', () => {
        let times = 0;

        const person = new BackboneModel({ name: 'John' });
        person.on('change', 'name', () => {
          times++;
        });

        person.set('name', 'Johnny');
        expect(person.get('name')).toBe('Johnny');
        expect(times).toBe(1);

        person.unset('name');
        person.set('name', 'Carol');
        person.set('name', 'Caroline');
        expect(times).toBe(1);
      });
    });

    describe('unset event', () => {
      test('callback invoked when attribute unset', () => {
        let fired = false;
        const person = new BackboneModel({ name: 'John' });
        person.on('unset', 'name', () => {
          fired = true;
        });
        person.unset('name');

        expect(fired).toBe(true);
        expect(person.get('name')).toBeUndefined();
      });

      test('callback invoked with correct arguments', () => {
        let args: Array<any> = [];
        const person = new BackboneModel({ name: 'John' });
        person.on('unset', 'name', (...args_: Array<any>) => {
          args = args_;
        });
        person.unset('name');

        expect(args).toEqual(['name']);
        expect(person.get('name')).toBeUndefined();
      });

      test('callback invoked with `this`', () => {
        let unsetAttribute = { name: null };
        const person = new BackboneModel({ name: 'John' });
        person.on(
          'unset',
          'name',
          function (this: any, attribute: string) {
            this.name = attribute;
          },
          unsetAttribute,
        );
        expect(unsetAttribute.name).toBeNull();
        person.unset('name');

        expect(person.get('name')).toBeUndefined();
        expect(unsetAttribute.name).toEqual('name');
      });
    });

    test('non-existing attribute does not error', () => {
      const person = new BackboneModel();
      expect(() => {
        person.on('change', 'boo', () => {});
      }).not.toThrow();
    });

    test('not called after the attribute is initially set', () => {
      let times = 0;
      function callback() {
        times++;
      }
      const person = new BackboneModel();
      person.on('change', 'name', callback);

      person.set('name', 'John');
      expect(times).toBe(0);
    });

    describe('multiple callbacks', () => {
      test('same callback can be added multiple times for the same attribute and event', () => {
        let times = 0;
        function callback() {
          times++;
        }
        const person = new BackboneModel({ name: 'John' });
        person.on('change', 'name', callback);
        person.on('change', 'name', callback);

        person.set('name', 'Johnny');
        expect(times).toBe(2);
      });

      test('different callbacks for the same attribute and event', () => {
        let foo = 0;
        let bar = 0;
        function fooIncrement() {
          foo++;
        }
        function barIncrement() {
          bar++;
        }

        const person = new BackboneModel({ name: 'John' });
        person.on('change', 'name', fooIncrement);
        person.on('change', 'name', barIncrement);

        person.set('name', 'Johnny');
        expect(foo).toBe(1);
        expect(bar).toBe(1);
      });
    });

    test('event callbacks are isolated within instances', () => {
      let times = 0;
      function callback() {
        times++;
      }

      const john = new BackboneModel({ name: 'John', age: 32 });
      const _carol = new BackboneModel({ name: 'Carol', age: 36 });

      john.on('change', 'age', callback);
      john.set('age', 33);
      expect(john.get('age')).toBe(33);
      expect(times).toEqual(1);
    });
  });

  describe('off', () => {
    test('works for `change`', () => {
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

    test('works for `unset`', () => {
      let times = 0;
      function callback() {
        times++;
      }

      const person = new BackboneModel({ name: 'John' });
      person.on('unset', 'name', callback);

      person.set('name', 'Johnny');
      expect(person.get('name')).toBe('Johnny');

      person.off('unset', 'name', callback);
      person.unset('name');
      expect(person.get('name')).toBeUndefined();
      expect(times).toEqual(0);
    });

    test('callbacks can be removed individually', () => {
      let foo = 0;
      let bar = 0;
      function fooIncrement() {
        foo++;
      }
      function barIncrement() {
        bar++;
      }

      const person = new BackboneModel({ name: 'John' });
      person.on('change', 'name', fooIncrement);
      person.on('change', 'name', barIncrement);

      person.set('name', 'Johnny');
      expect(foo).toBe(1);
      expect(bar).toBe(1);

      person.off('change', 'name', fooIncrement);

      person.set('name', 'Carol');
      expect(foo).toBe(1);
      expect(bar).toBe(2);
    });
  });

  test('integration', () => {
    let times = 0;
    function callback() {
      times++;
    }

    const person = new BackboneModel({ name: 'John', age: 32 });
    expect(person.has('name')).toBe(true);
    expect(person.has('age')).toBe(true);

    person.on('change', 'name', callback);
    person.on('change', 'age', callback);
    person.on('unset', 'name', callback);

    person.set('name', 'Johnny');
    expect(person.get('name')).toBe('Johnny');
    expect(times).toEqual(1);

    person.set('name', 'Johnny');
    expect(person.get('name')).toBe('Johnny');
    expect(times).toEqual(1);

    person.unset('name');
    expect(times).toEqual(2);
    expect(person.has('name')).toBe(false);

    person.set('age', 33);
    expect(person.get('age')).toBe(33);
    expect(times).toEqual(3);

    person.off('change', 'age', callback);
    expect(person.set('age', 34));
    expect(times).toEqual(3);
  });
});
