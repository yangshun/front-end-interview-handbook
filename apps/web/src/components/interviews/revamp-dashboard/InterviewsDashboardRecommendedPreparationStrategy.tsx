import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  RiArrowRightLine,
  RiBookOpenLine,
  RiCheckFill,
  RiEye2Line,
  RiTimelineView,
} from 'react-icons/ri';

import PreparationGFE75Logo from '~/data/plans/logo/PreparationGFE75Logo';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextColor,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

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
        'bg-neutral-200/40 dark:bg-neutral-800/40',
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

export default function InterviewsDashboardRecommendedPreparationStrategy() {
  const intl = useIntl();

  // TODO(interviews): Re-look into these data and values
  const preparationStrategies: Array<PreparationStrategyItem> = [
    {
      article: {
        completed: 5,
        total: 10,
      },
      description: intl.formatMessage({
        defaultMessage: 'A starter guide to preparing for front end interviews',
        description: 'Description for front end interview guide',
        id: '4PQzx7',
      }),
      href: '/front-end-interview-playbook',
      icon: RiTimelineView,
      title: intl.formatMessage({
        defaultMessage: 'Front End Interview Playbook',
        description: 'Title for front end interview guide',
        id: 's/8W4z',
      }),
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
        completed: 2,
        total: 90,
      },
      title: intl.formatMessage({
        defaultMessage: 'GFE 75',
        description: 'Title for gfe75',
        id: 'C9uKzE',
      }),
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
      icon: RiEye2Line,
      question: {
        completed: 30,
        total: 90,
      },
      tagLabel: intl.formatMessage({
        defaultMessage: 'If you expect DSA questions',
        description: 'Label for Blind75 tag',
        id: 'ifwPMU',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Blind 75',
        description: 'Title for Blind75',
        id: 'dCV3vl',
      }),
      variant: 'warning',
    },
    {
      article: {
        completed: 10,
        total: 90,
      },
      description: intl.formatMessage({
        defaultMessage:
          'Core System Design techniques and in-depth solutions to common questions like building a social media feed, autocomplete component, e-commerce website.',
        description: 'Description for frontend system design guide',
        id: 'lKKC9U',
      }),
      href: '/front-end-system-design-playbook',
      icon: RiBookOpenLine,
      question: {
        completed: 5,
        total: 90,
      },
      tagLabel: intl.formatMessage({
        defaultMessage: "If you're a senior engineer",
        description: 'Label for frontend system design tag',
        id: 'jb5IjS',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Front End System Design Playbook',
        description: 'Title for frontend system design guide',
        id: 'Ul08Jw',
      }),
      variant: 'info',
    },
  ];

  return (
    <Section>
      <div className="mb-12 flex flex-col gap-[30px]">
        <Heading className={themeTextColor} color="custom" level="heading5">
          <FormattedMessage
            defaultMessage="Recommended preparation"
            description="Title for recommended preparation strategy section"
            id="zKboNH"
          />
        </Heading>
        <div
          className={clsx('relative flex flex-col gap-8', 'overflow-hidden')}>
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
                  {strategy.tagLabel && (
                    <Badge
                      label={strategy.tagLabel}
                      variant={strategy.variant}
                    />
                  )}
                  <PreparationStrategyCard data={strategy} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
