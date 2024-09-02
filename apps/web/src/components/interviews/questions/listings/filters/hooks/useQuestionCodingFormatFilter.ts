import { RiJavascriptLine, RiTerminalWindowLine } from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';
import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

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
        defaultMessage: 'JavaScript coding',
        description: 'Front end JavaScript utility functions',
        id: 'EQXg+W',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Implement popular JavaScript library and utility functions',
        description: 'Description of JavaScript utility function questions',
        id: 'HOCjPY',
      }),
      value: 'javascript',
    },
    {
      icon: RiTerminalWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'User interface coding',
        description: 'Front end user interface questions',
        id: 'Iq5gAi',
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
        defaultMessage: 'Algorithmic coding',
        description: 'Data structures and algorithm questions',
        id: 'RQzpcq',
      }),
      tooltip: intl.formatMessage({
        defaultMessage: 'Implement important Data Structures & Algorithms',
        description: 'Description of data structures and algorithm questions',
        id: '7xAtDI',
      }),
      value: 'algo',
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

      return codingFormatFilters.has(question.format as QuestionCodingFormat);
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
    options,
    tooltip: intl.formatMessage({
      defaultMessage:
        'Formats / types of questions you can expect in your interview',
      description: 'Tooltip for question format label',
      id: 'H9WHbl',
    }),
  };

  return [codingFormatFilters, codingFormatFilterOptions];
}
