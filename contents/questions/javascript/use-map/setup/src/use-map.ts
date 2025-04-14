import { useCallback, useState } from 'react';

type MapOrEntries<K, V> = Map<K, V> | [K, V][];

interface UseMapReturn<K, V> {
  /** The map object. */
  map: Readonly<Map<K, V>>;
  /** Set a key-value pair in the map. */
  set: (key: K, value: V) => void;
  /** Set all key-value pairs in the map. */
  setAll: (entries: MapOrEntries<K, V>) => void;
  /** Remove a key-value pair from the map. */
  remove: (key: K) => void;
  /** Reset the map to an empty state. */
  reset: () => void;
}

export default function useMap<K, V>(
  initialState: MapOrEntries<K, V> = new Map(),
): UseMapReturn<K, V> {
  const [map, setMap] = useState(new Map(initialState));

  const set: UseMapReturn<K, V>['set'] = useCallback((key, value) => {
    setMap((prev) => {
      const copy = new Map(prev);
      copy.set(key, value);
      return copy;
    });
  }, []);

  const setAll: UseMapReturn<K, V>['setAll'] = useCallback((entries) => {
    setMap(() => new Map(entries));
  }, []);

  const remove: UseMapReturn<K, V>['remove'] = useCallback((key) => {
    setMap((prev) => {
      const copy = new Map(prev);
      copy.delete(key);
      return copy;
    });
  }, []);

  const reset: UseMapReturn<K, V>['reset'] = useCallback(() => {
    setMap(() => new Map());
  }, []);

  return { map, set, setAll, remove, reset };
}
