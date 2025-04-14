import { useEffect } from 'react';

export default function useClickAnywhere(handler: (event: MouseEvent) => void) {
  useEffect(() => {
    window.addEventListener('click', handler);

    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);
}
