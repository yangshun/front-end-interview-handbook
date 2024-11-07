import { RiQuestionAnswerFill } from 'react-icons/ri';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import type { QuestionUserFacingFormat } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

export type PreparationArea = QuestionUserFacingFormat | 'behavioral';
type PreparationAreaData = Record<
  PreparationArea,
  Readonly<{
    description?: string;
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    name: string;
    value: string;
  }>
>;

export function usePreparationAreas(): PreparationAreaData {
  const intl = useIntl();
  const questionFormats = useQuestionUserFacingFormatData();

  return {
    behavioral: {
      description: intl.formatMessage({
        defaultMessage:
          'Strategies to tackle the wide domain of behavioral interviews, specific to SWE',
        description: 'Description of behavioral interview preparation',
        id: '854lgU',
      }),
      href: '/prepare/behavioral',
      icon: RiQuestionAnswerFill,
      name: intl.formatMessage({
        defaultMessage: 'Behavioral',
        description: 'Title of behavioral interview preparation area',
        id: 'WoqXSx',
      }),
      value: 'behavioral',
    },
    coding: {
      description: intl.formatMessage({
        defaultMessage:
          '3 subcategories of questions: JavaScript, User Interfaces & Data Structures and Algorithms',
        description: 'Description of coding interview preparation',
        id: 'xU32y0',
      }),
      href: questionFormats.coding.href,
      icon: questionFormats.coding.icon,
      name: questionFormats.coding.label,
      value: questionFormats.coding.id,
    },
    quiz: {
      description: intl.formatMessage({
        defaultMessage:
          'Trivia-style front end questions asked across all interview rounds',
        description: 'Description of quiz interview preparation',
        id: 'XhK6jS',
      }),
      href: questionFormats.quiz.href,
      icon: questionFormats.quiz.icon,
      name: questionFormats.quiz.label,
      value: questionFormats.quiz.id,
    },
    'system-design': {
      description: intl.formatMessage({
        defaultMessage:
          'Design, architecture and optimization decisions for common front end apps',
        description: 'Description of system design interview preparation',
        id: 'tcKl41',
      }),
      href: questionFormats['system-design'].href,
      icon: questionFormats['system-design'].icon,
      name: questionFormats['system-design'].label,
      value: questionFormats['system-design'].id,
    },
  };
}
