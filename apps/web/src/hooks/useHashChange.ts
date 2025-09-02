import { useEffect, useState } from 'react';

export default function useHashChange() {
  const [hash, setHash] = useState(
    typeof window === 'undefined' ? null : window.location.hash,
  );

  useEffect(() => {
    function handleHashChange() {
      setHash(window.location.hash);
    }

    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
}
