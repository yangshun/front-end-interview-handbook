'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { RiListCheck3, RiTimerLine, RiVerifiedBadgeLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import InterviewsListPageHeader from '~/components/interviews/common/InterviewsListPageHeader';
import {
  mapStudyPlansBySlug,
  StudyPlanIcons,
} from '~/components/interviews/questions/content/study-list/StudyPlans';
import InterviewsStudyListCard from '~/components/interviews/questions/listings/learning/InterviewsStudyListCard';
import InterviewsStudyPlanTestimonialsSection from '~/components/interviews/questions/listings/learning/study-plans/InterviewsStudyPlanTestimonialsSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useUser } from '@supabase/auth-helpers-react';

type StudyPlanSection = Readonly<{
  plans: ReadonlyArray<InterviewsStudyList>;
  title: string;
}>;

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  studyPlans: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsStudyPlansPage({
  studyPlans,
  bottomContent,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];
  const mapStudyPlans = mapStudyPlansBySlug(studyPlans);

  const StudyPlanSections: Array<StudyPlanSection> = [
    {
      plans: [
        mapStudyPlans['one-week'],
        mapStudyPlans['one-month'],
        mapStudyPlans['three-months'],
      ],
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
      <InterviewsListPageHeader
        description={intl.formatMessage({
          defaultMessage:
            'Prepare well for your front end interviews regardless of time left.',
          description: 'Description for study plans page',
          id: '+wAHkD',
        })}
        features={features}
        title={intl.formatMessage({
          defaultMessage: 'Study plans',
          description: 'Title of study plans page',
          id: 'swjkuF',
        })}
      />
      <Section>
        <div className="flex flex-col gap-4">
          {StudyPlanSections.map(({ plans, title }) => (
            <div key={title} className="flex flex-col gap-y-4">
              <Heading level="heading6">{title}</Heading>
              <Section>
                <div className="flex flex-col gap-4">
                  {plans.map((studyPlan) => {
                    const session = sessions.find(
                      (session_) => session_.key === studyPlan.slug,
                    );
                    const completionCount = session?._count.progress;

                    return (
                      <InterviewsStudyListCard
                        key={studyPlan.slug}
                        completionCount={completionCount}
                        icon={StudyPlanIcons[studyPlan.slug]}
                        isStarted={session != null}
                        studyList={studyPlan}
                      />
                    );
                  })}
                </div>
              </Section>
            </div>
          ))}
        </div>
      </Section>
      <InterviewsStudyPlanTestimonialsSection />
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
