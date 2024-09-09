import { TbBinaryTree } from 'react-icons/tb';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaDataStructuresAlgorithms(
  intl: IntlShape,
): FocusArea {
  return {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Targeted practice on Data Structures & Algorithms interview questions',
        description: 'Description for interview preparation focus area',
        id: 'lf+GYY',
      },
      {
        numberOfQuestions: QuestionCount,
      },
    ),
    href: '/focus-areas/data-structures-algorithms',
    longName: intl.formatMessage({
      defaultMessage: 'Data Structures & Algorithms',
      description: 'Name of focus area questions',
      id: 'qZRTqi',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Data Structures & Algorithms',
      description: 'Name of focus area questions',
      id: 'qZRTqi',
    }),
    questions: {
      algo: [
        'stack',
        'queue',
        'merge-sort',
        'quick-sort',
        'heap-sort',
        'topological-sort',
        'insertion-sort',
        'selection-sort',
        'binary-search',
        'depth-first-search',
        'breadth-first-search',
      ],
      javascript: [
        'data-merging',
        'data-selection',
        'event-emitter',
        'event-emitter-ii',
        'backbone-model',
        'table-of-contents',
        'unique-array',
      ],
      quiz: [],
      'system-design': [],
      'user-interface': [
        'transfer-list',
        'transfer-list-ii',
        'undoable-counter',
        'wordle',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice data structures and algorithms interview questions in-browser with JavaScript / TypeScript solutions from ex-interviewers',
        description: 'Description for interview preparation focus area',
        id: 'urxhTe',
      }),
      socialTitle: intl.formatMessage({
        defaultMessage:
          'Data Structures and Algorithms Interview Questions | GreatFrontEnd',
        description: 'Social title for interview preparation focus area',
        id: 'fDWt7h',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Practice Data Structures and Algorithms Interview Questions',
        description: 'Title for interview preparation focus area',
        id: 'EteZq/',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Hone your computer science fundamentals by implementing important data structures and algorithms from scratch.',
      description: 'Description for interview preparation focus area',
      id: 'HMJJLh',
    }),
    type: 'data-structures-algorithms',
  };
}

const gradient: ThemeGradient<'#50C9C3', '#96DEDA'> = {
  className: 'bg-[linear-gradient(133.77deg,_#50C9C3_0%,_#96DEDA_97.95%)]',
  endColor: '#96DEDA',
  startColor: '#50C9C3',
};

export function getFocusAreaThemeDataStructuresAlgorithms(): QuestionListTheme {
  return {
    gradient,
    iconOutline: TbBinaryTree,
    iconSolid: TbBinaryTree,
  };
}
