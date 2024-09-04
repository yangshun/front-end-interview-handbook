import {
  RiChat4Line,
  RiQuestionnaireLine,
  RiTimelineView,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import type {
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { categorizeQuestionsProgress } from '~/db/QuestionsUtils';

import InterviewsDashboardPracticeCodingQuestionsCard from './InterviewsDashboardPracticeCodingQuestionsCard';
import InterviewsDashboardPracticeQuestionsCard from './InterviewsDashboardPracticeQuestionsCard';
import InterviewsDashboardLearningSection from '../../InterviewsDashboardLearningSection';
import type { InterviewsDashboardPracticeQuestionsType } from '../../types';

type Props = Readonly<{
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardPracticeByQuestionType({
  questions,
  questionsProgress,
}: Props) {
  const intl = useIntl();
  const questionsFormat = useQuestionUserFacingFormatData();
  const behavioralInterviewGuidebook =
    useBehavioralInterviewGuidebookNavigation();
  const questionsProgressAll = categorizeQuestionsProgress(questionsProgress);

  const { quizQuestions, systemDesignQuestions, codingQuestions } = questions;

  const quizQuestionsData: InterviewsDashboardPracticeQuestionsType = {
    description: intl.formatMessage({
      defaultMessage:
        'Commonly asked during recruiter phone screens or companies which do not adopt heavy coding rounds',
      description: 'Description for quiz questions',
      id: 'wsvJvT',
    }),
    href: questionsFormat.quiz.href,
    icon: RiQuestionnaireLine,
    question: {
      completed: questionsProgressAll.quiz.size,
      total: quizQuestions.length,
    },
    title: intl.formatMessage({
      defaultMessage: 'Quiz questions',
      description: 'Title for quiz questions',
      id: '3Xl32/',
    }),
    topics: [
      'javascript',
      'html',
      'performance',
      'a11y',
      'i18n',
      'css',
      'network',
      'security',
      'testing',
    ],
  };

  const systemDesignQuestionsData: InterviewsDashboardPracticeQuestionsType = {
    description: intl.formatMessage({
      defaultMessage:
        'Asked during technical interviews for Senior engineers. Evaluates decision-making abilities when it comes to technical architecture.',
      description: 'Description for system design questions',
      id: 'QNiLn7',
    }),
    href: questionsFormat['system-design'].href,
    icon: RiTimelineView,
    question: {
      completed: questionsProgressAll['system-design'].size,
      total: systemDesignQuestions.length,
    },
    title: intl.formatMessage({
      defaultMessage: 'Front End System Design questions',
      description: 'Title for system design questions',
      id: 'SCEKXz',
    }),
  };

  // TODO(interviews-revamp): get real completion count for behavioral questions
  const behavioralQuestionsData: InterviewsDashboardPracticeQuestionsType = {
    article: {
      completed: 0,
      total: behavioralInterviewGuidebook.items.map((item) => item.links).flat()
        .length,
    },
    description: intl.formatMessage({
      defaultMessage:
        'Questions to assess your soft skills, culture fit and personality. With sample answers for front end engineers.',
      description: 'Description for behavioral questions',
      id: '0MOo70',
    }),
    href: '/prepare/behavioral',
    icon: RiChat4Line,
    title: intl.formatMessage({
      defaultMessage: 'Behavioral questions',
      description: 'Title for behavioral questions',
      id: 'ZwQFwM',
    }),
  };

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage:
          'There are typically four types of questions that can be asked in a front end interview:',
        description: 'Description for practice by question type section',
        id: 'eWyygi',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Practice by question type',
        description: 'Title for practice by question type section',
        id: 'sSOyrU',
      })}>
      <InterviewsDashboardPracticeQuestionsCard data={quizQuestionsData} />
      <InterviewsDashboardPracticeCodingQuestionsCard
        questions={codingQuestions}
        questionsProgress={questionsProgress}
      />
      <InterviewsDashboardPracticeQuestionsCard
        data={systemDesignQuestionsData}
      />
      <InterviewsDashboardPracticeQuestionsCard
        data={behavioralQuestionsData}
      />
    </InterviewsDashboardLearningSection>
  );
}
