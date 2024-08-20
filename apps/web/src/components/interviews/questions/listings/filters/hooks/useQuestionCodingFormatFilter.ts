import { RiJavascriptLine, RiTerminalWindowLine } from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';
import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import { DSAQuestions } from '~/components/interviews/questions/common/QuestionsCodingDataStructuresAlgorithms';
import type { QuestionCodingFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  filter?: (format: QuestionCodingFormat) => boolean;
  initialValue?: ReadonlyArray<QuestionCodingFormat>;
  namespace: string;
  order?: (a: QuestionCodingFormat, b: QuestionCodingFormat) => number;
}>;

export default function useQuestionCodingFormatFilter({
  initialValue = [],
  filter,
  namespace,
  order,
}: Props): [Set<QuestionCodingFormat>, QuestionFilter<QuestionCodingFormat>] {
  const intl = useIntl();
  const [codingFormatFilters, setCodingFormatFilters] =
    useSessionStorageForSets<QuestionCodingFormat>(
      `gfe:${namespace}:coding-format-filter`,
      new Set(initialValue),
    );
  let options: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    tooltip: string;
    value: QuestionCodingFormat;
  }> = [
    {
      icon: RiJavascriptLine,
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
      icon: RiTerminalWindowLine,
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
      icon: TbBinaryTree,
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
    matches: (question) => {
      if (codingFormatFilters.size === 0) {
        return true;
      }

      const isDSA =
        codingFormatFilters.has('data-structures-algorithms') &&
        DSAQuestions.has(question.slug);
      const isUtility =
        codingFormatFilters.has('utilities') &&
        question.format === 'javascript' &&
        !DSAQuestions.has(question.slug);
      const isUI =
        codingFormatFilters.has('user-interface') &&
        question.format === 'user-interface';

      return isDSA || isUtility || isUI;
    },
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
