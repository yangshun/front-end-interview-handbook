import type { LearningSession } from '@prisma/client';
import type { InterviewsStudyList } from 'contentlayer/generated';

import InterviewsDashboardLearningSection from '~/components/interviews/dashboard/InterviewsDashboardLearningSection';
import { FocusAreaIcons } from '~/components/interviews/questions/content/study-list/StudyListUtils';
import InterviewsStudyListCard from '~/components/interviews/questions/listings/study-list/InterviewsStudyListCard';
import { useIntl } from '~/components/intl';

type Props = Readonly<{
  focusAreas: ReadonlyArray<InterviewsStudyList>;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardFocusAreasSection({
  focusAreas,
  questionListSessions,
}: Props) {
  const intl = useIntl();

  return (
    <InterviewsDashboardLearningSection
      className="!gap-12"
      description={intl.formatMessage({
        defaultMessage:
          'Deep-dive into topical focus areas critical for front end interviews',
        description: 'Description for practice by focus areas section',
        id: 'vSV9/q',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Focus Areas',
        description: 'Title for practice by focus areas section',
        id: 'mcrQEE',
      })}>
      <div className="grid gap-6 lg:grid-cols-2">
        {focusAreas.map((focusArea) => {
          const session = questionListSessions.find(
            (session_) => session_.key === focusArea.slug,
          );
          const completionCount = session?._count.progress;

          return (
            <InterviewsStudyListCard
              key={focusArea.slug}
              completionCount={completionCount}
              icon={FocusAreaIcons[focusArea.slug]}
              isStarted={session != null}
              showDescription={false}
              showTopics={false}
              studyList={focusArea}
            />
          );
        })}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
