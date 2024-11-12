import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightLine, RiCheckFill } from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import type { QuestionSlug } from '~/components/interviews/questions/common/QuestionsTypes';
import PreparationGFE75Logo from '~/components/interviews/questions/content/study-list/logo/PreparationGFE75Logo';
import { StudyPlanIcons } from '~/components/interviews/questions/content/study-list/StudyListUtils';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundCardWhiteOnLightColor,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextColor,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useGuideCompletionCount } from '~/db/guides/GuidesProgressClient';
import { categorizeQuestionsProgress } from '~/db/QuestionsUtils';

import type { LearningSession } from '@prisma/client';

type PreparationStrategyItem = Readonly<{
  article?: {
    completed: number;
    total: number;
  };
  customIcon?: ReactNode;
  description: string;
  href: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  question?: {
    completed: number;
    total: number;
  };
  tagLabel?: string;
  tagTooltip?: string;
  title: string;
  variant: 'info' | 'neutral' | 'warning';
}>;

function PreparationStrategyCard({ data }: { data: PreparationStrategyItem }) {
  const {
    title,
    description,
    icon: Icon,
    customIcon,
    question,
    article,
    href,
  } = data;

  return (
    <div
      className={clsx(
        'group relative w-full',
        'flex items-center gap-2 md:gap-6',
        'px-6 py-5',
        'rounded-lg',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
      )}>
      <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center">
        {customIcon
          ? customIcon
          : Icon && (
              <div
                className={clsx(
                  'flex items-center justify-center',
                  'size-12 shrink-0',
                  'rounded-lg',
                  themeGlassyBorder,
                  themeBackgroundCardColor,
                )}>
                <Icon
                  className={clsx('size-6 shrink-0', themeTextSubtitleColor)}
                />
              </div>
            )}

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Text size="body0" weight="bold">
              {title}
            </Text>
            <Text color="secondary" size="body2">
              {description}
            </Text>
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row">
            {article && (
              <InterviewsEntityProgress
                completed={article.completed}
                title={title}
                total={article.total}
                type="article"
              />
            )}
            {question && (
              <InterviewsEntityProgress
                completed={question.completed}
                title={title}
                total={question.total}
                type="question"
              />
            )}
          </div>
        </div>
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-5 shrink-0',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
      <Anchor aria-label={title} className="absolute inset-0" href={href} />
    </div>
  );
}

type Props = Readonly<{
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  >;
  recommendedPrepData: Readonly<{
    blind75: Readonly<{
      listKey: string;
      questionCount: number;
    }>;
    gfe75: Readonly<{
      listKey: string;
      questionCount: number;
    }>;
    systemDesignQuestionCount: number;
  }>;
}>;

export default function InterviewsDashboardRecommendedPreparationStrategy({
  recommendedPrepData,
  questionListSessions,
  questionsProgress,
}: Props) {
  const intl = useIntl();
  const guidesData = useGuidesData();
  const gfe75session = questionListSessions.find(
    (session) => session.key === recommendedPrepData.gfe75.listKey,
  );
  const blind75session = questionListSessions.find(
    (session) => session.key === recommendedPrepData.blind75.listKey,
  );
  const { frontendInterviewPlaybook, systemDesignPlaybook } =
    useGuideCompletionCount();
  const questionsProgressAll = categorizeQuestionsProgress(questionsProgress);

  const preparationStrategies: Array<PreparationStrategyItem> = [
    {
      article: {
        completed: frontendInterviewPlaybook.completed,
        total: frontendInterviewPlaybook.total,
      },
      description: intl.formatMessage({
        defaultMessage: 'A starter guide to preparing for front end interviews',
        description: 'Description for front end interview guide',
        id: '4PQzx7',
      }),
      href: guidesData['front-end-interview-playbook'].href,
      icon: guidesData['front-end-interview-playbook'].icon,
      title: guidesData['front-end-interview-playbook'].name,
      variant: 'neutral',
    },
    {
      customIcon: <PreparationGFE75Logo size="sm" />,
      description: intl.formatMessage({
        defaultMessage:
          'The 75 most important front end interview questions. Covers a wide range of interview patterns and formats.',
        description: 'Description for gfe75',
        id: 'bNgObx',
      }),
      href: '/interviews/greatfrontend75',
      question: {
        completed: gfe75session?._count.progress ?? 0,
        total: recommendedPrepData.gfe75.questionCount,
      },
      title: 'GFE 75',
      variant: 'neutral',
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'The famed list of questions commonly used to prepare for standard data structures and algorithms style software engineering interviews. Solved in JavaScript / TypeScript for front end engineers.',
        description: 'Description for Blind75',
        id: 'Zk/GBk',
      }),
      href: '/interviews/blind75',
      icon: StudyPlanIcons.blind75,
      question: {
        completed: blind75session?._count.progress ?? 0,
        total: recommendedPrepData.blind75.questionCount,
      },
      tagLabel: intl.formatMessage({
        defaultMessage: 'If you expect DSA questions',
        description: 'Label for Blind75 tag',
        id: 'ifwPMU',
      }),
      tagTooltip: intl.formatMessage({
        defaultMessage:
          'Some companies still test data structures and algorithms questions for their front end engineers. Practice the following if you expect these types of questions.',
        description: 'Tooltip for the tag',
        id: '6w7Ge4',
      }),
      title: 'Blind 75',
      variant: 'warning',
    },
    {
      article: {
        completed: systemDesignPlaybook.completed,
        total: systemDesignPlaybook.total,
      },
      description: intl.formatMessage({
        defaultMessage:
          'Core System Design techniques and in-depth solutions to common questions like building a social media feed, autocomplete component, e-commerce website.',
        description: 'Description for frontend system design guide',
        id: 'lKKC9U',
      }),
      href: guidesData['front-end-system-design-playbook'].href,
      icon: guidesData['front-end-system-design-playbook'].icon,
      question: {
        completed: questionsProgressAll['system-design'].size,
        total: recommendedPrepData.systemDesignQuestionCount,
      },
      tagLabel: intl.formatMessage({
        defaultMessage: "If you're a senior engineer",
        description: 'Label for frontend system design tag',
        id: 'jb5IjS',
      }),
      title: guidesData['front-end-system-design-playbook'].name,
      variant: 'info',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Heading className={themeTextColor} color="custom" level="heading5">
        <FormattedMessage
          defaultMessage="Recommended preparation"
          description="Title for recommended preparation strategy section"
          id="zKboNH"
        />
      </Heading>
      <div className={clsx('relative flex flex-col gap-8', 'overflow-hidden')}>
        {preparationStrategies.map((strategy, index) => {
          const { article, question } = strategy;
          const isCompleted =
            (question?.total || 0) + (article?.total || 0) ===
            (article?.completed || 0) + (question?.completed || 0);

          return (
            <div key={strategy.title} className="flex w-full gap-4 md:gap-6">
              <div
                className={clsx(
                  'relative flex flex-col justify-center self-stretch',
                )}>
                {isCompleted ? (
                  <Chip
                    icon={RiCheckFill}
                    isLabelHidden={true}
                    label="Completed"
                    variant="success"
                  />
                ) : (
                  <Chip label={(index + 1).toString()} variant="neutral" />
                )}
                {index < preparationStrategies.length - 1 && (
                  <div
                    className={clsx(
                      'absolute top-[55%] -z-10 h-full w-px translate-y-3 self-center border-l-2',
                      themeBorderElementColor,
                    )}
                  />
                )}
              </div>
              <div
                className={clsx('w-full', 'flex flex-col items-start gap-3')}>
                {strategy.tagLabel &&
                  (strategy.tagTooltip ? (
                    <Tooltip label={strategy.tagTooltip}>
                      <Badge
                        label={strategy.tagLabel}
                        variant={strategy.variant}
                      />
                    </Tooltip>
                  ) : (
                    <Badge
                      label={strategy.tagLabel}
                      variant={strategy.variant}
                    />
                  ))}
                <PreparationStrategyCard data={strategy} />
              </div>
            </div>
          );
        })}
      </div>
      <Text className="pt-4" color="subtitle" size="body2" weight="medium">
        <FormattedMessage
          defaultMessage="With extra time, continue working on the lists below depending on your needs!"
          description="Label for more learning section"
          id="gTOYrn"
        />
      </Text>
    </div>
  );
}
