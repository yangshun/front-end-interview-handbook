import { useCallback, useEffect, useState } from 'react';
import { useEventCallback, useEventListener } from 'usehooks-ts';

import GreatStorage from '~/greatstorage/GreatStorage';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

const greatStorage = new GreatStorage({ namespace: 'gfe' });

const IS_SERVER = typeof window === 'undefined';

type SetItemOptions = Parameters<typeof greatStorage.setItem>[2];

const defaultOptions: SetItemOptions = {};

type SetValue<T> = (value: T | ((prev: T) => T), opts?: SetItemOptions) => void;

export function useGreatStorageLocal<T>(
  key: string,
  initialValue: T | (() => T),
  keyLevelOpts: SetItemOptions = defaultOptions,
): [T, SetValue<T>, () => void] {
  const readValue = useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;

    // Prevent build error "window is undefined" but keep working
    if (IS_SERVER) {
      return initialValueToUse;
    }

    try {
      const raw = greatStorage.getItem(key);

      return (raw ?? initialValueToUse) as T;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);

      return initialValueToUse;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(() => readValue());

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback((value, opts) => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(readValue()) : value;

      greatStorage.setItem(key, newValue, { ...keyLevelOpts, ...opts });

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every similar useLocalStorage hook is notified
      window.dispatchEvent(
        new StorageEvent('local-storage', {
          key: greatStorage.getNamespacedKey(key),
        }),
      );
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  const removeValue = useEventCallback(() => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      console.warn(
        `Tried removing localStorage key “${key}” even though environment is not a client`,
      );
    }

    const defaultValue =
      initialValue instanceof Function ? initialValue() : initialValue;

    greatStorage.removeItem(key);

    // Save state with default value
    setStoredValue(defaultValue);

    // We dispatch a custom event so every similar useLocalStorage hook is notified
    window.dispatchEvent(new StorageEvent('local-storage', { key }));
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const handleStorageChange = useCallback(
    (event: CustomEvent | StorageEvent) => {
      if (
        (event as StorageEvent).key &&
        (event as StorageEvent).key !== greatStorage.getNamespacedKey(key)
      ) {
        return;
      }

      setStoredValue(readValue());
    },
    [key, readValue],
  );

  // This only works for other documents, not the current one
  useEventListener('storage', handleStorageChange);

  // This is a custom event
  useEventListener('local-storage', handleStorageChange);

  return [storedValue, setValue, removeValue];
}
