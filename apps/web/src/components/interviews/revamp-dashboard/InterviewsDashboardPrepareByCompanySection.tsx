import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { useIntl } from 'react-intl';

import InterviewsDashboardLearningSection from './InterviewsDashboardLearningSection';
import { InterviewsCompanyGuideCard } from '../company/InterviewsCompanyGuideCard';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardPrepareByCompanySection({
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
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {companyGuides.map((companyGuide) => {
          const session = questionListSessions.find(
            (session_) => session_.key === companyGuide.slug,
          );
          const completionCount = session?._count.progress;

          return (
            <InterviewsCompanyGuideCard
              key={companyGuide.slug}
              companyGuide={companyGuide}
              completionCount={completionCount}
              isStarted={session != null}
            />
          );
        })}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
