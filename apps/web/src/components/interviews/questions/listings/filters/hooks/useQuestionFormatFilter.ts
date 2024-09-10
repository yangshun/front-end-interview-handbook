import { useState } from 'react';
import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import { useQuestionFormatsData } from '~/data/QuestionFormats';

import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  filter?: (format: QuestionFormat) => boolean;
  initialValue?: ReadonlyArray<QuestionFormat>;
  namespace?: string;
  order?: (a: QuestionFormat, b: QuestionFormat) => number;
}>;

export default function useQuestionFormatFilter({
  initialValue = [],
  filter,
  namespace,
  order,
}: Props): [Set<QuestionFormat>, QuestionFilter<QuestionFormat>] {
  const intl = useIntl();
  const questionFormatsData = useQuestionFormatsData();
  const [codingFormatState, setCodingFormatState] = useState(
    new Set<QuestionFormat>(initialValue),
  );
  const [codingFormatSessionStorage, setCodingFormatSessionStorage] =
    useSessionStorageForSets<QuestionFormat>(
      `gfe:${namespace}:coding-format-filter`,
      new Set(initialValue),
    );

  // Conditionally select which hook's state to use
  const codingFormatFilters = namespace
    ? codingFormatSessionStorage
    : codingFormatState;
  const setCodingFormatFilters = namespace
    ? setCodingFormatSessionStorage
    : setCodingFormatState;

  let options: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    tooltip: string;
    value: QuestionFormat;
  }> = [
    questionFormatsData.javascript,
    questionFormatsData['user-interface'],
    questionFormatsData.algo,
    questionFormatsData['system-design'],
    questionFormatsData.quiz,
  ];

  if (filter != null) {
    options = options.filter((option) => filter(option.value));
  }
  if (order != null) {
    options = options.slice().sort((a, b) => order(a.value, b.value));
  }

  const codingFormatFilterOptions: QuestionFilter<QuestionFormat> = {
    id: 'coding-format',
    matches: (question) => {
      if (codingFormatFilters.size === 0) {
        return true;
      }

      return codingFormatFilters.has(question.format as QuestionFormat);
    },
    name: intl.formatMessage({
      defaultMessage: 'Question format',
      description: 'Front end interview questions format',
      id: '0zc/ng',
    }),
    onChange: (value) => {
      const formats = new Set(codingFormatFilters);

      formats.has(value) ? formats.delete(value) : formats.add(value);
      setCodingFormatFilters(formats);
    },
    onClear: () => {
      setCodingFormatFilters(new Set());
    },
    options,
    setValues: setCodingFormatFilters,
    tooltip: intl.formatMessage({
      defaultMessage:
        'Formats / types of questions you can expect in your interview',
      description: 'Tooltip for question format label',
      id: 'H9WHbl',
    }),
  };

  return [codingFormatFilters, codingFormatFilterOptions];
}
