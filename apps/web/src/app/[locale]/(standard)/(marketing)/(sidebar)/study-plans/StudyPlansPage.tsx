'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type {
  PreparationPlan,
  PreparationPlans,
  PreparationPlanType,
} from '~/data/plans/PreparationPlans';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';
import { useTestimonials } from '~/data/Testimonials';

import TestimonialCard from '~/components/marketing/testimonials/TestimonialCard';
import type { QuestionDifficulty } from '~/components/questions/common/QuestionsTypes';
import QuestionCountLabel from '~/components/questions/metadata/QuestionCountLabel';
import QuestionDifficultySummary from '~/components/questions/metadata/QuestionDifficultySummary';
import QuestionStudyAllocationLabel from '~/components/questions/metadata/QuestionStudyAllocationLabel';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

import CompletionCountSummary from './CompletionCountSummary';

function PreparationPlanCard({
  difficultySummary,
  plan: { type, name, description, questions, href },
  isStarted = false,
  completionCount = 0,
}: {
  completionCount?: number;
  difficultySummary: Record<QuestionDifficulty, number>;
  isStarted?: boolean;
  plan: PreparationPlan;
}) {
  const intl = useIntl();
  const questionCount = Object.values(questions)
    .map((q) => q.length)
    .reduce((prev, curr) => prev + curr, 0);
  const theme = getPreparationPlanTheme(type);

  return (
    <div
      className={clsx(
        'group relative flex flex-1 items-center gap-6 rounded-lg py-5 px-8',
        'bg-white transition dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
        themeGlassyBorder,
      )}>
      <div
        className={clsx(
          'flex h-20 w-20 items-center justify-center rounded',
          theme.gradient.className,
        )}>
        <theme.iconOutline className="h-10 w-10 text-white" />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-x-4">
            <Anchor href={href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Heading level="heading6">{name}</Heading>
            </Anchor>
            {isStarted && (
              <span>
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Started',
                    description: 'Started on study plan label',
                    id: 'cKn3cK',
                  })}
                  size="sm"
                  variant="info"
                />
              </span>
            )}
          </div>
          <Text color="secondary" size="body2">
            {description}
          </Text>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <QuestionCountLabel count={questionCount} showIcon={true} />
          {/* TODO(redesign): calculate daily. */}
          <QuestionStudyAllocationLabel
            frequency="daily"
            hours={2}
            showIcon={true}
          />
          <QuestionDifficultySummary
            easy={difficultySummary.easy}
            hard={difficultySummary.hard}
            medium={difficultySummary.medium}
            showIcon={true}
          />
          {isStarted && (
            <CompletionCountSummary
              completed={completionCount}
              total={questionCount}
            />
          )}
        </div>
      </div>
      <RiArrowRightLine className="group-hover:text-brand-dark dark:group-hover:text-brand h-6 w-6 text-neutral-400 transition-colors" />
    </div>
  );
}

type PreparationPlanSection = Readonly<{
  plans: Array<PreparationPlan>;
  title: string;
}>;

export type PlanDifficultySummary = Record<
  PreparationPlanType,
  Record<QuestionDifficulty, number>
>;

type Props = Readonly<{
  plansDifficultySummary: PlanDifficultySummary;
  preparationPlans: PreparationPlans;
}>;

export default function StudyPlansPage({
  preparationPlans,
  plansDifficultySummary,
}: Props) {
  const intl = useIntl();
  const testimonials = useTestimonials();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery();

  const sessions = questionListSessions ?? [];

  const preparationPlanSections: Array<PreparationPlanSection> = [
    {
      plans: (['one-week', 'one-month', 'three-months'] as const).map(
        (key) => preparationPlans[key],
      ),
      title: intl.formatMessage({
        defaultMessage: 'Holistic study plans',
        description: 'Title of list of study plans',
        id: '2LouBj',
      }),
    },
  ];

  return (
    <div className="h-full p-8">
      <div className="mb-12 flex flex-col gap-3">
        <Heading level="heading4">
          {intl.formatMessage({
            defaultMessage: 'Study plans',
            description: 'Title of study plans page',
            id: 'swjkuF',
          })}
        </Heading>
        <Text color="secondary" display="block" size="body2">
          {intl.formatMessage({
            defaultMessage:
              'Discover study plans tailored to your needs to help your prepare for your upcoming technical interviews.',
            description: 'Description for study plans page',
            id: '2vDjTb',
          })}
        </Text>
      </div>
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-1 flex-col gap-12 lg:col-span-2">
            {preparationPlanSections.map(({ plans, title }) => (
              <div key={title}>
                <Heading className="mb-6" level="heading5">
                  {title}
                </Heading>
                <Section>
                  <div className="flex flex-col gap-4">
                    {plans.map((plan) => {
                      const session = sessions.find(
                        (session_) => session_.key === plan.type,
                      );
                      const completionCount = session?._count.progress;

                      return (
                        <PreparationPlanCard
                          key={plan.type}
                          completionCount={completionCount}
                          difficultySummary={plansDifficultySummary[plan.type]}
                          isStarted={session != null}
                          plan={plan}
                        />
                      );
                    })}
                  </div>
                </Section>
              </div>
            ))}
          </div>
          <div className="hidden flex-col gap-6 md:flex">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Hear from our users"
                description="Title of testimonials section"
                id="pRxRs2"
              />
            </Heading>
            <Section>
              <CardContainer>
                <div className="flex flex-col gap-y-4">
                  <TestimonialCard {...testimonials.alan} />
                  <TestimonialCard {...testimonials.luke} />
                </div>
              </CardContainer>
            </Section>
          </div>
        </div>
      </Section>
    </div>
  );
}
