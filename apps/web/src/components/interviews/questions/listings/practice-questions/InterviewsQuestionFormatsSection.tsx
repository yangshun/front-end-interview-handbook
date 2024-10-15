import clsx from 'clsx';
import { useId } from 'react';
import {
  RiArrowRightLine,
  RiChat4Line,
  RiJavascriptLine,
  RiPagesLine,
  RiQuestionnaireLine,
  RiTimelineView,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import type { GuideCategory } from '~/components/guides/types';
import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
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
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  question: {
    completed: number;
    total: number;
  };
  title: string;
  topics?: Array<QuestionTopic>;
}>;

const MAX_TOPIC = 4;

function InterviewsQuestionFormatCard({
  description,
  href,
  icon: Icon,
  question,
  title,
  topics,
}: InterviewsQuestionFormatType) {
  const intl = useIntl();
  const id = useId();
  const { completed, total } = question;

  const topicLabels = useQuestionTopicLabels();

  return (
    <div
      className={clsx(
        'group relative flex flex-1 items-center gap-x-8 md:gap-x-6 ',
        'rounded-lg px-6 py-5',
        'transition',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div className="flex flex-grow flex-col gap-6 md:flex-row md:items-center">
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
        <div className="flex flex-1 flex-col gap-5">
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
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-6 shrink-0 transition-colors',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
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

  const quizQuestionsData: InterviewsQuestionFormatType = {
    description: intl.formatMessage({
      defaultMessage:
        'Short questions which test your knowledge and have clear, non-subjective answers. Commonly asked during recruiter screens or by companies which do not adopt coding rounds.',
      description: 'Description for quiz questions',
      id: 'tDwpNT',
    }),
    href: '/interviews/questions/quiz',
    icon: RiQuestionnaireLine,
    question: {
      completed: questionsProgressAll.quiz.size,
      total: quizQuestions.length,
    },
    title: intl.formatMessage({
      defaultMessage: 'Quiz',
      description: 'Title for quiz questions',
      id: 'gAvT0O',
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

  const jsQuestionsData: InterviewsQuestionFormatType = {
    description: intl.formatMessage({
      defaultMessage:
        'Coding questions that require you to implement functions in JavaScript, which can be utility functions found in Lodash/Underscore. a polyfill for the JavaScript language, or DOM APIs.',
      description: 'Description for js coding questions',
      id: 'S/DgGm',
    }),
    href: '/interviews/questions/javascript',
    icon: RiJavascriptLine,
    question: {
      completed: codingQuestionsProgressAll.javascript.size,
      total: jsQuestions.length,
    },
    title: intl.formatMessage({
      defaultMessage: 'JavaScript Coding',
      description: 'Title for js coding questions',
      id: 'ZeUMGU',
    }),
  };

  const uiQuestionsData: InterviewsQuestionFormatType = {
    description: intl.formatMessage({
      defaultMessage:
        'Coding questions that require you to build user interfaces, whether it is a UI component, an app, or a game. Requires HTML, CSS, JavaScript, or UI frameworks.',
      description: 'Description for ui coding questions',
      id: 'bJYnS1',
    }),
    href: '/interviews/questions/user-interface',
    icon: RiPagesLine,
    question: {
      completed: codingQuestionsProgressAll['user-interface'].size,
      total: uiQuestions.length,
    },
    title: intl.formatMessage({
      defaultMessage: 'User Interfaces Coding',
      description: 'Title for ui coding questions',
      id: 'ZS/d9t',
    }),
  };

  const algoQuestionsData: InterviewsQuestionFormatType = {
    description: intl.formatMessage({
      defaultMessage:
        'LeetCode-style algorithmic coding questions which evaluate your core data structures and algorithms skills.',
      description: 'Description for ui coding questions',
      id: 'Hph7Vz',
    }),
    href: '/interviews/questions/algo',
    icon: TbBinaryTree,
    question: {
      completed: codingQuestionsProgressAll.algo.size,
      total: algoQuestions.length,
    },
    title: intl.formatMessage({
      defaultMessage: 'Data Structures and Algorithms Coding',
      description: 'Title for ui coding questions',
      id: 'xWBL/9',
    }),
  };

  const systemDesignQuestionsData: InterviewsQuestionFormatType = {
    description: intl.formatMessage({
      defaultMessage:
        'Technical architecture design questions that assess your ability to design scalable and maintainable front end systems. Typically asked for mid to senior level positions.',
      description: 'Description for system design questions',
      id: 'KS2MMz',
    }),
    href: '/interviews/questions/system-design',
    icon: RiTimelineView,
    question: {
      completed: questionsProgressAll['system-design'].size,
      total: systemDesignQuestions.length,
    },
    title: intl.formatMessage({
      defaultMessage: 'Front End System Design',
      description: 'Title for system design questions',
      id: '83BIY0',
    }),
  };

  const behavioralQuestionsData: InterviewsQuestionFormatType = {
    description: intl.formatMessage({
      defaultMessage:
        'Non-technical interview questions designed to assess your past behavior in professional settings, including your communication, teamwork, leadership and problem solving skills.',
      description: 'Description for behavioral questions',
      id: 'etjCNj',
    }),
    href: '/prepare/behavioral',
    icon: RiChat4Line,
    question: {
      completed: behavioralGuideProgress.length,
      total: behavioralInterviewGuidebook.items.map((item) => item.links).flat()
        .length,
    },
    title: intl.formatMessage({
      defaultMessage: 'Behavioral',
      description: 'Title for behavioral questions',
      id: '9EIdsB',
    }),
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
    <div className="flex flex-col gap-6">
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
          <InterviewsQuestionFormatCard {...item} key={item.title} />
        ))}
      </div>
    </div>
  );
}
