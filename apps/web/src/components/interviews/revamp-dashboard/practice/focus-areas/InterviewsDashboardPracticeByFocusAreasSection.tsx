import type { InterviewsStudyList } from 'contentlayer/generated';

import {
  categorizeFocusAreas,
  FocusAreaIcons,
} from '~/components/interviews/questions/content/study-list/FocusAreas';
import InterviewsStudyListCard from '~/components/interviews/questions/listings/learning/InterviewsStudyListCard';
import InterviewsDashboardLearningSection from '~/components/interviews/revamp-dashboard/InterviewsDashboardLearningSection';
import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  focusAreas: ReadonlyArray<InterviewsStudyList>;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardPracticeByFocusAreasSection({
  questionListSessions,
  focusAreas,
}: Props) {
  const intl = useIntl();
  const focusAreasCategories = categorizeFocusAreas(intl, focusAreas);

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
      <div className="flex flex-col gap-10">
        {focusAreasCategories.map(({ title, items }) => (
          <div key={title} className="flex flex-col gap-6">
            <Text color="subtitle" size="body1" weight="bold">
              {title}
            </Text>
            <div className="flex flex-col gap-4">
              {items.map((focusArea) => {
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
                    studyList={focusArea}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
