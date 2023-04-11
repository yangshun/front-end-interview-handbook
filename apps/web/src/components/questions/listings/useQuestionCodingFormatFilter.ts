import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCodingFormat } from '../common/QuestionsTypes';

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
  const intl = useIntl();
  const [codingFormatFilters, setCodingFormatFilters] = useState<
    Set<QuestionCodingFormat>
  >(new Set(initialValue));
  let options: ReadonlyArray<{
    label: string;
    tooltip: string;
    value: QuestionCodingFormat;
  }> = [
    {
      label: intl.formatMessage({
        defaultMessage: 'JavaScript Utilities',
        description: 'Front end JavaScript utility functions',
        id: 'pcXH8p',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Implement popular JavaScript library and utility functions',
        description: 'Description of JavaScript utility function questions',
        id: 'HOCjPY',
      }),
      value: 'utilities',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'User Interface',
        description: 'Front end user interface questions',
        id: 'y3aYKb',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Build user interface apps and components in JavaScript frameworks',
        description: 'Description of front end user interface questions',
        id: 'GJt7KQ',
      }),
      value: 'user-interface',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Data Structures & Algorithms',
        description: 'Data structures and algorithm questions',
        id: '0D9NcL',
      }),
      tooltip: intl.formatMessage({
        defaultMessage: 'Implement important Data Structures & Algorithms',
        description: 'Description of data structures and algorithm questions',
        id: '7xAtDI',
      }),
      value: 'data-structures-algorithms',
    },
  ];

  if (filter != null) {
    options = options.filter((option) => filter(option.value));
  }
  if (order != null) {
    options = options.slice().sort((a, b) => order(a.value, b.value));
  }

  const codingFormatFilterOptions: QuestionFilter<QuestionCodingFormat> = {
    id: 'coding-format',
    name: intl.formatMessage({
      defaultMessage: 'Coding Format',
      description: 'Front end coding interview questions',
      id: 'P2baTC',
    }),
    onChange: (value) => {
      const formats = new Set(codingFormatFilters);

      formats.has(value) ? formats.delete(value) : formats.add(value);
      setCodingFormatFilters(formats);
    },
    options,
  };

  return [codingFormatFilters, codingFormatFilterOptions];
}
