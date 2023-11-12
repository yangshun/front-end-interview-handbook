import Singleton from './singleton';
import Singleton2 from './singleton';

describe('singleton', () => {
  test('returns an object with the required method', () => {
    expect(Singleton).toBeInstanceOf(Object);
    expect(Singleton.getInstance).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    test('getInstance returns a Map', () => {
      expect(Singleton.getInstance()).toBeInstanceOf(Map);
    });

    test('Map methods work', () => {
      const globalMap = Singleton.getInstance();
      globalMap.set('count', 42);
      expect(globalMap.get('count')).toBe(42);
    });

    test('separate modules use the same instance', () => {
      const globalMap = Singleton.getInstance();
      globalMap.set('count', 42);

      const globalMap2 = Singleton2.getInstance();
      expect(globalMap2.get('count')).toBe(42);
    });
  });
});
