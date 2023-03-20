import type { ReactNode } from 'react';

export type QuestionFilter<T extends string> = Readonly<{
  id: string;
  name: string;
  onChange: (value: T) => void;
  options: ReadonlyArray<{ label: ReactNode; tooltip?: string; value: T }>;
}>;
