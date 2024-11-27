import clsx from 'clsx';
import { RiArrowRightLine, RiChat4Line } from 'react-icons/ri';

import { useQuestionFormatsData } from '~/data/QuestionCategories';

import useBehavioralInterviewGuidebookNavigation, {
  basePath,
} from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import type {
  QuestionMetadata,
  QuestionSlug,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import {
  categorizeQuestionsProgress,
  categorizeQuestionsProgressByCodingFormat,
} from '~/db/QuestionsUtils';

import QuestionTopics from '../../metadata/QuestionTopics';

import type { GuideProgress } from '@prisma/client';

type InterviewsQuestionFormatType = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  listingDescription: string;
  listingName: string;
  question: Readonly<{
    completed: number;
    total: number;
  }>;
  topics?: Array<QuestionTopic>;
}>;

function InterviewsQuestionFormatCard({
  listingDescription: description,
  href,
  icon: Icon,
  question,
  listingName: title,
  topics,
}: InterviewsQuestionFormatType) {
  const { completed, total } = question;

  return (
    <div
      className={clsx(
        'group relative',
        'flex flex-1 flex-col gap-4 sm:flex-row sm:items-center',
        'rounded-lg px-6 py-4',
        'transition',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'rounded-md',
          'size-10 shrink-0',
          themeBackgroundLayerEmphasized,
          themeGlassyBorder,
        )}>
        <Icon className={clsx('size-5', themeTextSubtitleColor)} />
      </div>
      <div className="flex flex-1 items-center gap-4">
        <div className="flex flex-grow items-center gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Text size="body1" weight="bold">
                {title}
              </Text>
              <Text color="secondary" size="body2">
                {description}
              </Text>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <InterviewsEntityProgress
                completed={completed}
                title={title}
                total={total}
                type="question"
              />
              {topics && <QuestionTopics topics={topics} />}
            </div>
          </div>
          <RiArrowRightLine
            className={clsx(
              'size-6 shrink-0 transition-colors',
              themeTextSubtleColor,
              themeTextBrandColor_GroupHover,
            )}
          />
        </div>
        <Anchor aria-label={title} className="absolute inset-0" href={href} />
      </div>
    </div>
  );
}

type Props = Readonly<{
  guidesProgress: ReadonlyArray<GuideProgress>;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsQuestionFormatsSection({
  questions,
  questionsProgress,
  guidesProgress,
}: Props) {
  const intl = useIntl();
  const behavioralInterviewGuidebook =
    useBehavioralInterviewGuidebookNavigation();
  const questionsProgressAll = categorizeQuestionsProgress(questionsProgress);

  const { quizQuestions, systemDesignQuestions, codingQuestions } = questions;

  const codingQuestionsProgressAll =
    categorizeQuestionsProgressByCodingFormat(questionsProgress);
  const algoQuestions = codingQuestions.filter(
    (question) => question.format === 'algo',
  );
  const jsQuestions = codingQuestions.filter(
    (question) => question.format === 'javascript',
  );
  const uiQuestions = codingQuestions.filter(
    (question) => question.format === 'user-interface',
  );

  const behavioralGuideProgress = guidesProgress.filter(
    ({ book }) => book === 'BEHAVIORAL_INTERVIEW_PLAYBOOK',
  );
  const formats = useQuestionFormatsData();

  const quizQuestionsData: InterviewsQuestionFormatType = {
    ...formats.quiz,
    question: {
      completed: questionsProgressAll.quiz.size,
      total: quizQuestions.length,
    },
  };

  const jsQuestionsData: InterviewsQuestionFormatType = {
    ...formats.javascript,
    question: {
      completed: codingQuestionsProgressAll.javascript.size,
      total: jsQuestions.length,
    },
  };

  const uiQuestionsData: InterviewsQuestionFormatType = {
    ...formats['user-interface'],
    question: {
      completed: codingQuestionsProgressAll['user-interface'].size,
      total: uiQuestions.length,
    },
  };

  const algoQuestionsData: InterviewsQuestionFormatType = {
    ...formats.algo,
    question: {
      completed: codingQuestionsProgressAll.algo.size,
      total: algoQuestions.length,
    },
  };

  const systemDesignQuestionsData: InterviewsQuestionFormatType = {
    ...formats['system-design'],
    question: {
      completed: questionsProgressAll['system-design'].size,
      total: systemDesignQuestions.length,
    },
  };

  const behavioralQuestionsData: InterviewsQuestionFormatType = {
    href: basePath,
    icon: RiChat4Line,
    listingDescription: intl.formatMessage({
      defaultMessage:
        'Non-technical interview questions designed to assess your past behavior in professional settings, including your communication, teamwork, leadership and problem solving skills.',
      description: 'Description for behavioral questions',
      id: 'etjCNj',
    }),
    listingName: intl.formatMessage({
      defaultMessage: 'Behavioral',
      description: 'Title for behavioral questions',
      id: '9EIdsB',
    }),
    question: {
      completed: behavioralGuideProgress.length,
      total: behavioralInterviewGuidebook.navigation.items
        .map((item) => item.items)
        .flat().length,
    },
  };

  const questionFormatsData = [
    jsQuestionsData,
    uiQuestionsData,
    algoQuestionsData,
    quizQuestionsData,
    systemDesignQuestionsData,
    behavioralQuestionsData,
  ];

  return (
    <div
      className={clsx('flex flex-col gap-6', 'scroll-mt-40 lg:scroll-mt-20')}>
      <div className="flex flex-col gap-3">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Question formats"
            description="Title for question formats section"
            id="qTr5bi"
          />
        </Heading>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Gain expertise in handling commonly asked question formats in front end interviews"
            description="Description for question formats section"
            id="vmqlMW"
          />
        </Text>
      </div>
      <div className="flex flex-col gap-6">
        {questionFormatsData.map((item) => (
          <InterviewsQuestionFormatCard {...item} key={item.listingName} />
        ))}
      </div>
    </div>
  );
}
