import { useState } from 'react';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCodingFormat } from '../common/QuestionsTypes';

const CODING_FORMAT_OPTIONS: ReadonlyArray<{
  label: string;
  tooltip: string;
  value: QuestionCodingFormat;
}> = [
  {
    label: 'JavaScript Utilities',
    tooltip: 'Implement popular JavaScript library and utility functions',
    value: 'utilities',
  },
  {
    label: 'User Interface',
    tooltip:
      'Build user interface apps and components in JavaScript frameworks',
    value: 'user-interface',
  },
  {
    label: 'Data Structures & Algorithms',
    tooltip: 'Implement important Data Structures & Algorithms',
    value: 'data-structures-algorithms',
  },
];

type Props = Readonly<{
  filter?: (format: QuestionCodingFormat) => boolean;
  initialValue?: ReadonlyArray<QuestionCodingFormat>;
  order?: (a: QuestionCodingFormat, b: QuestionCodingFormat) => number;
}>;

export default function useQuestionCodingFormatFilter({
  initialValue = [],
  filter,
  order,
}: Props): [Set<QuestionCodingFormat>, QuestionFilter<QuestionCodingFormat>] {
  const [codingFormatFilters, setCodingFormatFilters] = useState<
    Set<QuestionCodingFormat>
  >(new Set(initialValue));

  let options = CODING_FORMAT_OPTIONS;

  if (filter != null) {
    options = options.filter((option) => filter(option.value));
  }
  if (order != null) {
    options = options.slice().sort((a, b) => order(a.value, b.value));
  }

  const codingFormatFilterOptions: QuestionFilter<QuestionCodingFormat> = {
    id: 'coding-format',
    name: 'Coding Format',
    onChange: (value) => {
      const formats = new Set(codingFormatFilters);

      formats.has(value) ? formats.delete(value) : formats.add(value);
      setCodingFormatFilters(formats);
    },
    options,
  };

  return [codingFormatFilters, codingFormatFilterOptions];
}
