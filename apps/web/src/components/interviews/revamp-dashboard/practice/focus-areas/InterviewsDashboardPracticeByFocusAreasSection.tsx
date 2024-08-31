import { useIntl } from 'react-intl';

import {
  type FocusAreas,
  getFocusAreaTheme,
} from '~/data/focus-areas/FocusAreas';

import InterviewsDashboardLearningSection from '~/components/interviews/revamp-dashboard/InterviewsDashboardLearningSection';
import { themeGradientGreenYellow } from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import InterviewsDashboardPracticeCard from '../InterviewsDashboardPracticeCard';
import InterviewsDashboardProgress from '../../InterviewsDashboardProgress';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  focusAreas: FocusAreas;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardPracticeByFocusAreasSection({
  focusAreas,
  questionListSessions,
}: Props) {
  const intl = useIntl();
  const areas = Object.values(focusAreas);

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage:
          'Dive into 8 topical areas tested in front end interviews',
        description: 'Description for practice by focus areas section',
        id: 'n44/YY',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Practice by focus areas',
        description: 'Title for practice by focus areas section',
        id: 'WVS7Vj',
      })}>
      <div className="flex flex-col gap-6">
        {areas.map((area) => {
          const session = questionListSessions.find(
            (session_) => session_.key === area.type,
          );
          const completionCount = session?._count.progress;
          const theme = getFocusAreaTheme(area.type);
          const questionCount = countNumberOfQuestionsInList(area.questions);

          return (
            <InterviewsDashboardPracticeCard
              key={area.type}
              description={area.shortDescription}
              href={area.href}
              icon={theme.iconOutline}
              title={area.name}>
              <div>
                <InterviewsDashboardProgress
                  completed={completionCount ?? 0}
                  progressClassName={themeGradientGreenYellow.className}
                  title={area.name}
                  total={questionCount}
                  type="question"
                />
              </div>
            </InterviewsDashboardPracticeCard>
          );
        })}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
