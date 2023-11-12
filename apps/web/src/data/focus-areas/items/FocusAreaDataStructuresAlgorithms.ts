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
          'Hone your computer science fundamentals by implementing important data structures and algorithms from scratch and practice the questions where algorithmic efficiency is key.',
        description: 'Description for interview preparation focus area',
        id: 'FcKhvG',
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
      javascript: [
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
          'Hone your computer science fundamentals by implementing important data structures and algorithms from scratch and practice the questions where algorithmic efficiency is key.',
        description: 'Description for interview preparation focus area',
        id: 'FcKhvG',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Prepare for tackling data structures and algorithms questions in front end interviews',
        description: 'Title for interview preparation focus area',
        id: 'r1cPM9',
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
