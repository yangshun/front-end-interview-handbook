import { useCallback, useState } from 'preact/hooks';

export function useHover() {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return {
    isHovering,
    onMouseEnter,
    onMouseLeave,
  };
}
