'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import {
  getPreparationPlanTheme,
  type PreparationPlan,
  type PreparationPlans,
  type PreparationPlanType,
} from '~/data/plans/PreparationPlans';

import InterviewsMarketingTestimonialCard from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialCard';
import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import type { QuestionDifficulty } from '~/components/interviews/questions/common/QuestionsTypes';
import CompletionCountSummary from '~/components/interviews/questions/listings/stats/CompletionCountSummary';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionDifficultySummary from '~/components/interviews/questions/metadata/QuestionDifficultySummary';
import QuestionStudyAllocationLabel from '~/components/interviews/questions/metadata/QuestionStudyAllocationLabel';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

function PreparationPlanCard({
  difficultySummary,
  plan: { type, name, description, questions, href, schedule },
  isStarted = false,
  completionCount = 0,
}: {
  completionCount?: number;
  difficultySummary: Record<QuestionDifficulty, number>;
  isStarted?: boolean;
  plan: PreparationPlan;
}) {
  const intl = useIntl();
  const questionCount = countNumberOfQuestionsInList(questions);
  const theme = getPreparationPlanTheme(type);

  return (
    <div
      className={clsx(
        'group relative',
        'flex flex-1 items-center gap-6',
        'rounded-lg',
        'px-8 py-5',
        'bg-white transition dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
        themeGlassyBorder,
      )}>
      {theme.customIcon ? (
        <theme.customIcon size="lg" />
      ) : (
        <div
          className={clsx(
            'size-20 flex items-center justify-center rounded',
            theme.gradient.className,
          )}>
          <theme.iconOutline className="size-10 text-white" />
        </div>
      )}
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
          <QuestionStudyAllocationLabel
            frequency={schedule.frequency}
            hours={schedule.hours}
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
      <RiArrowRightLine className="group-hover:text-brand-dark dark:group-hover:text-brand size-6 text-neutral-400 transition-colors" />
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

export default function InterviewsStudyPlansPage({
  preparationPlans,
  plansDifficultySummary,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const testimonials = InterviewsMarketingTestimonialsDict();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

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
    <Container
      className={clsx(
        'flex flex-col',
        'py-4 md:py-6 lg:py-8 xl:py-16',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
      )}>
      <div className="flex flex-col gap-3">
        <Heading level="heading5">
          {intl.formatMessage({
            defaultMessage: 'Study plans',
            description: 'Title of study plans page',
            id: 'swjkuF',
          })}
        </Heading>
        <Text className="block" color="secondary" size="body2">
          {intl.formatMessage({
            defaultMessage:
              'Discover study plans tailored to your needs to help you prepare for your upcoming technical interviews.',
            description: 'Description for study plans page',
            id: 't5nQRB',
          })}
        </Text>
      </div>
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-1 flex-col gap-12 lg:col-span-2">
            {preparationPlanSections.map(({ plans, title }) => (
              <div key={title} className="flex flex-col gap-y-4">
                <Heading level="heading6">{title}</Heading>
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
          <div className="hidden flex-col gap-y-4 md:flex">
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
                  <InterviewsMarketingTestimonialCard
                    {...testimonials.locChuong}
                  />
                  <InterviewsMarketingTestimonialCard
                    {...testimonials.chenweiZhang}
                  />
                </div>
              </CardContainer>
            </Section>
          </div>
        </div>
      </Section>
    </Container>
  );
}
