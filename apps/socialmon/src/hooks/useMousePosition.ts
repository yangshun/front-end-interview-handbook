import { useEffect, useState } from 'react';

export type MousePosition = {
  x: number;
  y: number;
};

export default function useMousePosition(enabled = true): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    if (enabled) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (enabled) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [enabled]);

  return mousePosition;
}
