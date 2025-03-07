'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { RiListCheck3 } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import {
  createStudyListMapFromArray,
  StudyPlanIcons,
} from '~/components/interviews/questions/content/study-list/StudyListUtils';
import InterviewsStudyListCard from '~/components/interviews/questions/listings/study-list/InterviewsStudyListCard';
import InterviewsStudyPlanTestimonialsSection from '~/components/interviews/questions/listings/study-list/study-plans/InterviewsStudyPlanTestimonialsSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import SponsorsAdFormatSpotlightCard from '~/components/sponsors/ads/SponsorsAdFormatSpotlightCard';
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
  const questionFeatures = useInterviewsQuestionsFeatures();
  const { data: questionListSessions } =
    trpc.questionSessions.getActive.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];
  const mapStudyPlans = createStudyListMapFromArray(studyPlans);

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
    questionFeatures.timeEfficient,
    questionFeatures.curatedByExInterviews,
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-10')}>
      <InterviewsPageHeader
        description={intl.formatMessage({
          defaultMessage:
            'Prepare well for your front end interviews regardless of time left.',
          description: 'Description for study plans page',
          id: '+wAHkD',
        })}
        features={features}
        headingAddOnElement={<InterviewsPremiumBadge />}
        sideElement={
          <SponsorsAdFormatSpotlightCard adPlacement="page_header" />
        }
        title={intl.formatMessage({
          defaultMessage: 'Study plans',
          description: 'Title of study plans page',
          id: 'swjkuF',
        })}
      />
      <div className="flex flex-col gap-y-16">
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
                          showLongName={true}
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
            <Divider className="my-4" />
            <Section>
              <MDXContent mdxCode={bottomContent.body.code} />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
