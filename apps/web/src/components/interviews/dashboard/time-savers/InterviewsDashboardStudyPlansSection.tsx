import type { InterviewsStudyList } from 'contentlayer/generated';

import {
  createStudyListMapFromArray,
  StudyPlanIcons,
} from '~/components/interviews/questions/content/study-list/StudyListUtils';
import InterviewsStudyListCard from '~/components/interviews/questions/listings/learning/InterviewsStudyListCard';
import { useIntl } from '~/components/intl';

import InterviewsDashboardLearningSection from '../InterviewsDashboardLearningSection';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
  studyPlans: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsDashboardStudyPlansSection({
  studyPlans,
  questionListSessions,
}: Props) {
  const intl = useIntl();

  const mapStudyPlans = createStudyListMapFromArray(studyPlans);
  const plans = [
    mapStudyPlans['one-week'],
    mapStudyPlans['one-month'],
    mapStudyPlans['three-months'],
  ];

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage: 'Prepare the best you can within any timeline.',
        description: 'Description for study plans section',
        id: '9B1Aqh',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Study plans',
        description: 'Title for study plans section',
        id: 'KRGHVm',
      })}>
      <div className="flex flex-col gap-4">
        {plans.map((studyPlan) => {
          const session = questionListSessions.find(
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
    </InterviewsDashboardLearningSection>
  );
}
