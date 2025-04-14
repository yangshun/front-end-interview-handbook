import { useState, useLayoutEffect } from 'react';

interface WindowSize {
  height: number;
  width: number;
}

export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const resize = () =>
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return windowSize;
}
