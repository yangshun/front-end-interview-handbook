'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import { RiListCheck3, RiTimerLine, RiVerifiedBadgeLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import {
  type PreparationPlan,
  type PreparationPlans,
} from '~/data/plans/PreparationPlans';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import InterviewsStudyPlanCard from '~/components/interviews/questions/listings/learning/study-plan/InterviewsStudyPlanCard';
import InterviewsStudyPlanTestimonialsSection from '~/components/interviews/questions/listings/learning/study-plan/InterviewsStudyPlanTestimonialsSection';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useUser } from '@supabase/auth-helpers-react';

type PreparationPlanSection = Readonly<{
  plans: Array<PreparationPlan>;
  title: string;
}>;

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  preparationPlans: PreparationPlans;
}>;

export default function InterviewsRevampStudyPlansPage({
  preparationPlans,
  bottomContent,
}: Props) {
  const intl = useIntl();
  const user = useUser();
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

  const features = [
    {
      icon: RiListCheck3,
      label: intl.formatMessage({
        defaultMessage: 'Prioritized lists',
        description: 'Features for study plans',
        id: 'gvncuz',
      }),
    },
    {
      icon: RiTimerLine,
      label: intl.formatMessage({
        defaultMessage: 'Time-efficient',
        description: 'Features for study plans',
        id: 'xoXirC',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Curated by ex-interviewers',
        description: 'Features for study plans',
        id: 'fNJWwT',
      }),
    },
  ];

  return (
    <Container className={clsx('flex flex-col', 'py-10', 'gap-y-12')}>
      <div>
        <div className="flex flex-col gap-4">
          <Heading level="heading4">
            {intl.formatMessage({
              defaultMessage: 'Study plans',
              description: 'Title of study plans page',
              id: 'swjkuF',
            })}
          </Heading>
          <Text className="block" color="subtitle" size="body1" weight="medium">
            {intl.formatMessage({
              defaultMessage:
                'Prepare well for your front end interviews regardless of time left.',
              description: 'Description for study plans page',
              id: '+wAHkD',
            })}
          </Text>
        </div>
        {/* Features */}
        <div className="mt-10">
          <InterviewsPageFeatures features={features} />
        </div>
        <Divider className="mt-8" />
      </div>
      <Section>
        <div className="flex flex-col gap-4">
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
                      <InterviewsStudyPlanCard
                        key={plan.type}
                        completionCount={completionCount}
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
      </Section>
      <div className="hidden md:block">
        <InterviewsStudyPlanTestimonialsSection />
      </div>

      {bottomContent && (
        <>
          <Divider className="my-8" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </Container>
  );
}
