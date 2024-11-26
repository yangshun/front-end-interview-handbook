import clsx from 'clsx';
import type { ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import { SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION } from '~/hooks/useScrollToHash';

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
    tagLabel,
    tagTooltip,
    variant,
  } = data;

  return (
    <div
      className={clsx(
        'group relative w-full',
        'flex items-center gap-2 md:gap-6',
        'px-6 py-4',
        'rounded-lg',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
      )}>
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        {customIcon
          ? customIcon
          : Icon && (
              <div
                className={clsx(
                  'flex items-center justify-center',
                  'size-10 shrink-0',
                  'rounded-lg',
                  themeGlassyBorder,
                  themeBackgroundCardColor,
                )}>
                <Icon
                  className={clsx('size-5 shrink-0', themeTextSubtitleColor)}
                />
              </div>
            )}

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <Text size="body1" weight="bold">
                {title}
              </Text>
              {tagLabel &&
                (tagTooltip ? (
                  <Tooltip label={tagTooltip}>
                    <Badge label={tagLabel} size="sm" variant={variant} />
                  </Tooltip>
                ) : (
                  <Badge label={tagLabel} size="sm" variant={variant} />
                ))}
            </div>
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
}>;

export default function InterviewsDashboardRecommendedPreparationStrategy({
  questionListSessions,
  questionsProgress,
}: Props) {
  const intl = useIntl();
  const guidesData = useGuidesData();
  const { data: recommendedPrepData } =
    trpc.questionLists.getRecommendedStudyList.useQuery(undefined);
  const gfe75session = questionListSessions.find(
    (session) =>
      recommendedPrepData && session.key === recommendedPrepData.gfe75.listKey,
  );
  const blind75session = questionListSessions.find(
    (session) =>
      recommendedPrepData &&
      session.key === recommendedPrepData.blind75.listKey,
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
      href: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href,
      icon: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.icon,
      title: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name,
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
      href: '/interviews/gfe75',
      question: {
        completed: gfe75session?._count.progress ?? 0,
        total: recommendedPrepData?.gfe75.questionCount ?? 0,
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
        total: recommendedPrepData?.blind75.questionCount ?? 0,
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
      href: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href,
      icon: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.icon,
      question: {
        completed: questionsProgressAll['system-design'].size,
        total: recommendedPrepData?.systemDesignQuestionCount ?? 0,
      },
      tagLabel: intl.formatMessage({
        defaultMessage: "If you're a senior engineer",
        description: 'Label for frontend system design tag',
        id: 'jb5IjS',
      }),
      title: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.name,
      variant: 'info',
    },
  ];

  return (
    <div
      className={clsx('flex flex-col gap-6', 'scroll-mt-36 lg:scroll-mt-20')}
      id={SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION}>
      <div className="flex flex-col gap-3">
        <Heading className={themeTextColor} color="custom" level="heading6">
          <FormattedMessage
            defaultMessage="Recommended preparation"
            description="Title for recommended preparation strategy section"
            id="zKboNH"
          />
        </Heading>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Not sure where to start? This preparation roadmap has been proven to work for most of our users."
            description="Description for recommended preparation strategy section"
            id="toykkS"
          />
        </Text>
      </div>
      <div className={clsx('relative flex flex-col gap-6', 'overflow-hidden')}>
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
                    icon={FaCheck}
                    iconClassName="size-5"
                    isLabelHidden={true}
                    label="Completed"
                    variant="success"
                  />
                ) : (
                  <Chip label={(index + 1).toString()} variant="neutral" />
                )}
              </div>
              <div
                className={clsx('w-full', 'flex flex-col items-start gap-3')}>
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
