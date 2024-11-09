import clsx from 'clsx';
import { useId } from 'react';
import { RiArrowRightLine, RiChat4Line } from 'react-icons/ri';

import { SCROLL_HASH_INTERVIEWS_QUESTIONS_FORMAT } from '~/hooks/useScrollToHash';

import { useQuestionFormatsData } from '~/data/QuestionFormats';

import type { GuideCategory } from '~/components/guides/types';
import useBehavioralInterviewGuidebookNavigation, {
  basePath,
} from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import type {
  QuestionMetadata,
  QuestionSlug,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionTopicLabels from '~/components/interviews/questions/listings/filters/useQuestionTopicLabels';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
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

type InterviewsQuestionFormatType = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  listingDescription: string;
  listingName: string;
  question: {
    completed: number;
    total: number;
  };
  topics?: Array<QuestionTopic>;
}>;

const MAX_TOPIC = 4;

function InterviewsQuestionFormatCard({
  listingDescription: description,
  href,
  icon: Icon,
  question,
  listingName: title,
  topics,
}: InterviewsQuestionFormatType) {
  const intl = useIntl();
  const id = useId();
  const { completed, total } = question;

  const topicLabels = useQuestionTopicLabels();

  return (
    <div
      className={clsx(
        'group relative flex flex-1 items-center gap-4',
        'md:flex-row md:items-center',
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
          'size-12 shrink-0',
          themeBackgroundLayerEmphasized,
          themeGlassyBorder,
        )}>
        <Icon className={clsx('size-6', themeTextSubtitleColor)} />
      </div>
      <div className="flex flex-grow items-center gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <Text size="body1" weight="medium">
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
            {topics && (
              <>
                <span className="sr-only" id={id}>
                  <FormattedMessage
                    defaultMessage="Question topics"
                    description="Screenreader text to indicate the question topics"
                    id="PtAdqY"
                  />
                </span>
                <div
                  aria-labelledby={id}
                  className="flex flex-wrap gap-x-2 gap-y-1">
                  {topics.slice(0, MAX_TOPIC).map((topic) => (
                    <Badge
                      key={topic}
                      label={`#${topicLabels[topic].label}`}
                      size="sm"
                      variant="neutral"
                    />
                  ))}
                  {topics.length > MAX_TOPIC && (
                    <Badge
                      label={intl.formatMessage(
                        {
                          defaultMessage: '+{count} more',
                          description: 'Badge label for more topics',
                          id: 'sg/5hy',
                        },
                        {
                          count: topics.length - MAX_TOPIC,
                        },
                      )}
                      size="sm"
                      variant="neutral"
                    />
                  )}
                </div>
              </>
            )}
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
  );
}

type Props = Readonly<{
  guidesProgress: ReadonlyArray<
    Readonly<{ id: string; slug: string; type: GuideCategory }>
  >;
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
    ({ type }) => type === 'behavioral-interview-guide',
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
      total: behavioralInterviewGuidebook.items.map((item) => item.items).flat()
        .length,
    },
  };

  const questionFormatsData = [
    quizQuestionsData,
    jsQuestionsData,
    uiQuestionsData,
    algoQuestionsData,
    systemDesignQuestionsData,
    behavioralQuestionsData,
  ];

  return (
    <div
      className={clsx('flex flex-col gap-6', 'md:scroll-mt-16 lg:scroll-mt-12')}
      id={SCROLL_HASH_INTERVIEWS_QUESTIONS_FORMAT}>
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
