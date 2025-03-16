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
  throw 'Not implemented';
}
