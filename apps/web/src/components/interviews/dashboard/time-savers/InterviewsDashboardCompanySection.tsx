import type { InterviewsStudyList } from 'contentlayer/generated';

import InterviewsStudyListCard from '~/components/interviews/questions/listings/learning/InterviewsStudyListCard';
import { useIntl } from '~/components/intl';

import InterviewsDashboardLearningSection from '../InterviewsDashboardLearningSection';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsStudyList>;
  questionListSessions: ReadonlyArray<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardCompanySection({
  companyGuides,
  questionListSessions,
}: Props) {
  const intl = useIntl();

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage:
          'Prepare for specific companies by learning insider tips and practicing known questions.',
        description: 'Description for prepare by company',
        id: 'uA9EBK',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Company Guides',
        description: 'Title for prepare by company',
        id: 'kju3R1',
      })}>
      <div className="grid gap-6 md:grid-cols-2">
        {companyGuides.map((companyGuide) => {
          const session = questionListSessions.find(
            (session_) => session_.key === companyGuide.slug,
          );
          const completionCount = session?._count.progress;

          return (
            <InterviewsStudyListCard
              key={companyGuide.slug}
              alignVerticalOnMobile={false}
              completionCount={completionCount}
              isStarted={session != null}
              showDescription={false}
              studyList={companyGuide}
            />
          );
        })}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
