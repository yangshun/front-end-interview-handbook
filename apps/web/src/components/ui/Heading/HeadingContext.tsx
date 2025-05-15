'use client';

import { createContext, useContext } from 'react';

type HeadingContextType = Readonly<{
  level: number;
}>;

export const HeadingContext = createContext<HeadingContextType>({
  level: 1,
});

export function useHeadingLevel() {
  return useContext(HeadingContext);
}

type Props = Readonly<{
  children: React.ReactNode;
  increment?: boolean; // Whether to increment the heading level.
  level?: number; // Override level.
}>;

export default function Section({
  children,
  increment = true,
  level: levelProp,
}: Props) {
  const { level } = useHeadingLevel();

  const nextLevel = Math.min(level + (increment ? 1 : 0), 6); // Max of H6.

  return (
    <HeadingContext.Provider value={{ level: levelProp ?? nextLevel }}>
      {children}
    </HeadingContext.Provider>
  );
}
