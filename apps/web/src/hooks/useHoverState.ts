import { useCallback, useState } from 'react';

export default function useHoverState(
  onMouseEnter?: ((event: React.MouseEvent) => void) | null,
  onMouseLeave?: ((event: React.MouseEvent) => void) | null | undefined,
): Readonly<{
  isHovered: boolean;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  setIsHovered: (value: boolean) => void;
}> {
  const [isHovered, setIsHovered] = useState(false);

  const _onMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      setIsHovered(true);
      onMouseEnter?.(event);
    },
    [setIsHovered, onMouseEnter],
  );

  const _onMouseLeave = useCallback(
    (event: React.MouseEvent) => {
      setIsHovered(false);
      onMouseLeave?.(event);
    },
    [setIsHovered, onMouseLeave],
  );

  return {
    isHovered,
    onMouseEnter: _onMouseEnter,
    onMouseLeave: _onMouseLeave,
    setIsHovered,
  };
}
