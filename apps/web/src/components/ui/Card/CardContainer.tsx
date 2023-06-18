'use client';

import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { MousePosition } from '~/hooks/useMousePosition';
import useMousePosition from '~/hooks/useMousePosition';

type MousePositionContext = Readonly<{
  addCard: (card: HTMLElement) => void;
  containerRect: DOMRect | null;
  removeCard: (card: HTMLElement) => void;
}>;

export const MousePositionContext = React.createContext<MousePositionContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addCard: () => {},
  containerRect: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeCard: () => {},
});

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function CardContainer({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const [cards, setCards] = useState<Array<HTMLElement>>([]);

  const addCard = useCallback((card: HTMLElement) => {
    setCards((prevCards) => [...prevCards, card]);
  }, []);

  const removeCard = useCallback((card: HTMLElement) => {
    setCards((prevCards) => prevCards.filter((c) => c !== card));
  }, []);

  const onMouseMove = useCallback(
    (position: MousePosition) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;

        const x = position.x - rect.left;
        const y = position.y - rect.top;
        const inside = x < w && x > 0 && y < h && y > 0;

        if (inside) {
          cards.forEach((card) => {
            const cardX = -(card.getBoundingClientRect().left - rect.left) + x;
            const cardY = -(card.getBoundingClientRect().top - rect.top) + y;

            card.style.setProperty('--mouse-x', `${cardX}px`);
            card.style.setProperty('--mouse-y', `${cardY}px`);
          });
        }
      }
    },
    [cards],
  );

  useEffect(() => {
    onMouseMove(mousePosition);
  }, [mousePosition, onMouseMove]);

  const value = useMemo(() => {
    return {
      addCard,
      containerRect: containerRef.current?.getBoundingClientRect() ?? null,
      removeCard,
    };
  }, [addCard, removeCard]);

  return (
    <MousePositionContext.Provider value={value}>
      <div
        ref={containerRef}
        className={clsx('group/card-container', className)}>
        {children}
      </div>
    </MousePositionContext.Provider>
  );
}
