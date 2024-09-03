import {
  RiFlowChart,
  RiJavascriptLine,
  RiQuestionnaireFill,
  RiTerminalWindowLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';
import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  filter?: (format: QuestionFormat) => boolean;
  initialValue?: ReadonlyArray<QuestionFormat>;
  namespace: string;
  order?: (a: QuestionFormat, b: QuestionFormat) => number;
}>;

export default function useQuestionFormatFilter({
  initialValue = [],
  filter,
  namespace,
  order,
}: Props): [Set<QuestionFormat>, QuestionFilter<QuestionFormat>] {
  const intl = useIntl();
  const [codingFormatFilters, setCodingFormatFilters] =
    useSessionStorageForSets<QuestionFormat>(
      `gfe:${namespace}:coding-format-filter`,
      new Set(initialValue),
    );
  let options: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    tooltip: string;
    value: QuestionFormat;
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
          'Coding questions focused on testing your understanding of JavaScript, including concepts like closures, event handling, asynchronous programming, and manipulating the DOM',
        description: 'Description of JavaScript function questions',
        id: 'Aqyo8Q',
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
          'Coding questions focused on building user interfaces. Candidates are expected to build components, style elements, and ensure the UI behaves correctly across different devices and screen sizes',
        description: 'Description of front end user interface questions',
        id: 'zVBgBc',
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
        defaultMessage:
          'Coding questions focused on testing your understanding of data structures and algorithms. May be asked in larger companies even for front end engineers. Examples include solving problems related to array manipulation, string processing, or implementing common algorithms like sorting or searching',
        description: 'Description of data structures and algorithm questions',
        id: 'VjJtDL',
      }),
      value: 'algo',
    },
    {
      icon: RiFlowChart,
      label: intl.formatMessage({
        defaultMessage: 'System design',
        description: 'Front end system design questions',
        id: '5n/TXe',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          "System design questions in front-end interviews evaluate a candidate's ability to architect large-scale, maintainable, and scalable web applications. Unlike backend system design, these questions focus more on designing the client-side architecture, managing state, ensuring performance, and integrating with APIs or backend services. Candidates may be asked to design complex UI systems, plan for accessibility, or discuss strategies for handling large volumes of user interactions or data. Asked in mid-level to senior level interviews",
        description: 'Description of data structures and algorithm questions',
        id: 'Rz6MDM',
      }),
      value: 'system-design',
    },
    {
      icon: RiQuestionnaireFill,
      label: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Front end quiz questions',
        id: 'L2l9WA',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Short answer questions imed at quickly assessing a candidate’s knowledge of specific front-end topics. These can cover a wide range of areas, including HTML/CSS best practices, JavaScript nuances, browser APIs, web performance, and security. Frequently asked in recruiter screens or companies without technical coding rounds',
        description: 'Description of data structures and algorithm questions',
        id: 'dcgLwn',
      }),
      value: 'quiz',
    },
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
