import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  RiArrowRightLine,
  RiArticleLine,
  RiBookOpenLine,
  RiCheckFill,
  RiTimelineView,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import PreparationGFE75Logo from '~/data/plans/logo/PreparationGFE75Logo';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
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
  themeGradientGreenYellow,
  themeTextBrandColor_GroupHover,
  themeTextColor,
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
    variant,
    href,
  } = data;

  return (
    <div
      className={clsx(
        'group relative w-full',
        'flex flex-col gap-6 md:flex-row',
        'p-6',
        'rounded-lg',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
      )}>
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
                className={clsx(
                  'size-6 shrink-0',
                  variant === 'warning' && 'text-warning',
                  variant === 'info' && 'text-info',
                  variant === 'neutral' && themeTextColor,
                )}
              />
            </div>
          )}

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-1">
            <Text size="body1" weight="medium">
              {title}
            </Text>
            <RiArrowRightLine
              className={clsx(
                'size-5 shrink-0',
                themeTextSubtleColor,
                themeTextBrandColor_GroupHover,
              )}
            />
          </div>
          <Text color="secondary" size="body2">
            {description}
          </Text>
        </div>

        {/* Progress */}
        <div className="gapy-y-2 flex flex-col gap-x-8 md:flex-row">
          {article && (
            <InterviewsEntityProgress
              completed={article.completed}
              progressClassName={themeGradientGreenYellow.className}
              title={title}
              total={article.total}
              type="article"
            />
          )}
          {question && (
            <InterviewsEntityProgress
              completed={question.completed}
              progressClassName={themeGradientGreenYellow.className}
              title={title}
              total={question.total}
              type="question"
            />
          )}
        </div>
      </div>

      <Anchor className="absolute inset-0" href={href} />
    </div>
  );
}

export default function InterviewsDashboardRecommendedPreparationStrategy() {
  const intl = useIntl();

  // TODO(interview-revamp): Re-look into these data and values
  const preparationStrategies: Array<PreparationStrategyItem> = [
    {
      article: {
        completed: 5,
        total: 10,
      },
      description: intl.formatMessage({
        defaultMessage:
          'Learn the best way to prepare for front end interviews.',
        description: 'Description for front end interview guide',
        id: '5+dRvd',
      }),
      href: '/front-end-interview-guidebook',
      icon: RiTimelineView,
      title: intl.formatMessage({
        defaultMessage: 'Read our Front End Interview Guide',
        description: 'Title for front end interview guide',
        id: 'hCCpOf',
      }),
      variant: 'neutral',
    },
    {
      customIcon: <PreparationGFE75Logo size="sm" />,
      description: intl.formatMessage({
        defaultMessage:
          'The most essential list of front end interview questions that gets you prepared for 75% of interview, with a wide range of question patterns and formats.',
        description: 'Description for gfe75',
        id: 'zeqI5d',
      }),
      href: '/interviews/greatfrontend75',
      question: {
        completed: 2,
        total: 90,
      },
      title: intl.formatMessage({
        defaultMessage: 'Complete GFE75',
        description: 'Title for gfe75',
        id: 'ENKd5S',
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
      icon: RiArticleLine,
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
        defaultMessage: 'Complete Blind75',
        description: 'Title for Blind75',
        id: 'Yijkp6',
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
      href: '/prepare/system-design',
      icon: RiBookOpenLine,
      question: {
        completed: 5,
        total: 90,
      },
      tagLabel: intl.formatMessage({
        defaultMessage: 'If you‘re a senior engineer',
        description: 'Label for frontend system design tag',
        id: 'I2EyMO',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Study our Front End System Design Guide',
        description: 'Title for frontend system design guide',
        id: 'e6zEt6',
      }),
      variant: 'info',
    },
  ];

  return (
    <Section>
      <div className="flex flex-col gap-[18px] md:gap-8">
        <Heading className={themeTextColor} color="custom" level="heading6">
          <FormattedMessage
            defaultMessage="Recommended preparation strategy"
            description="Title for recommended preparation strategy section"
            id="EQ25bl"
          />
        </Heading>
        <div
          className={clsx('relative flex flex-col gap-4', 'overflow-hidden')}>
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
                        'absolute top-[55%] -z-10 h-[90%] w-px translate-y-3 self-center border-l-2',
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
