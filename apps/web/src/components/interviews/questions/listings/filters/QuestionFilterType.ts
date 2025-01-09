import type { Dispatch, SetStateAction } from 'react';

import type { QuestionMetadata } from '../../common/QuestionsTypes';

export type QuestionFilter<
  T extends string,
  Q extends QuestionMetadata = QuestionMetadata,
> = Readonly<{
  id: string;
  matches: (question: Q) => boolean;
  name: string;
  onChange: (value: T) => void;
  onClear: () => void;
  options: ReadonlyArray<{
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    tooltip?: string;
    value: T;
  }>;
  setValues: Dispatch<SetStateAction<Set<T>>>;
  tooltip?: string;
}>;
