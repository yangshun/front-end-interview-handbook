import {
  RiQuestionnaireLine,
  RiTerminalBoxLine,
  RiTerminalWindowLine,
  RiTestTubeLine,
  RiTimerLine,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

export type QuestionListFeature =
  | 'answeredByExInterviewers'
  | 'codeInBrowser'
  | 'criticalTopics'
  | 'curatedByExInterviews'
  | 'officialSolutionAndTest'
  | 'officialSolutions'
  | 'realWorldApplications'
  | 'robustFramework'
  | 'solvedByExInterviewers'
  | 'solvedPracticeQuestions'
  | 'solvedQuestions'
  | 'testCases'
  | 'testScenarios'
  | 'timeEfficient';

export default function useInterviewsQuestionsFeatures(count?: number): Record<
  QuestionListFeature,
  Readonly<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>
> {
  const intl = useIntl();

  return {
    answeredByExInterviewers: {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Answers by ex-interviewers',
        description: 'Features for question format page',
        id: 'AIKOQQ',
      }),
    },
    codeInBrowser: {
      icon: RiWindow2Line,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for question format page',
        id: 'X/O+1P',
      }),
    },
    criticalTopics: {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage({
        defaultMessage: 'Covers critical topics',
        description: 'Features for question format page',
        id: 'EvFlpz',
      }),
    },
    curatedByExInterviews: {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Curated by ex-interviewers',
        description: 'Features for focus areas question listing',
        id: '0/Rv7O',
      }),
    },
    officialSolutionAndTest: {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions and tests',
        description: 'Features for focus areas',
        id: '1VQd95',
      }),
    },
    officialSolutions: {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions',
        description: 'Features for all practice questions page',
        id: 'vlMgF6',
      }),
    },
    realWorldApplications: {
      icon: RiTerminalWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'Deep-dives into real world applications',
        description: 'Features for question format page',
        id: '5pdUYV',
      }),
    },
    robustFramework: {
      icon: RiTerminalBoxLine,
      label: intl.formatMessage({
        defaultMessage: 'Robust framework',
        description: 'Features for question format page',
        id: 'c23MPV',
      }),
    },
    solvedByExInterviewers: {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Solved by ex-interviewers',
        description: 'Features for question format page',
        id: 'gl9tj6',
      }),
    },
    solvedPracticeQuestions: {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} solved practice questions',
          description: 'Features for focus areas question listing',
          id: 'DthPOl',
        },
        { questionCount: count },
      ),
    },
    solvedQuestions: {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount}+ solved questions',
          description: 'Features for frontend system design playbook page',
          id: 'DmLCt5',
        },
        {
          questionCount: roundQuestionCountToNearestTen(count ?? 0),
        },
      ),
    },
    testCases: {
      icon: RiTestTubeLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for question format page',
        id: 'nI4Alg',
      }),
    },
    testScenarios: {
      icon: RiTestTubeLine,
      label: intl.formatMessage({
        defaultMessage: 'Test scenarios',
        description: 'Features for question format page',
        id: 'HB0fzm',
      }),
    },
    timeEfficient: {
      icon: RiTimerLine,
      label: intl.formatMessage({
        defaultMessage: 'Time efficient',
        description: 'Features for focus areas question listing',
        id: 'nyYJ7j',
      }),
    },
  };
}
