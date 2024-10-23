'use client';

import clsx from 'clsx';

import InterviewsDashboardStudyGuideList from '~/components/interviews/dashboard/InterviewsDashboardStudyGuideList';
import InterviewsDashboardStudyPlansCTA from '~/components/interviews/dashboard/InterviewsDashboardStudyPlansCTA';
import { useSystemDesignGuides } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';
import QuestionsSystemDesignListWithFilters from '~/components/interviews/questions/listings/items/QuestionsSystemDesignListWithFilters';

export default function InterviewsDashboardPrepareSystemDesignPage() {
  const systemDesignLearningContent = useSystemDesignGuides();

  return (
    <div className="xl:grid xl:grid-cols-12 xl:gap-x-6">
      <div className="xl:col-span-9">
        <QuestionsSystemDesignListWithFilters
          layout="embedded"
          namespace="prepare-system-design"
        />
      </div>
      <aside
        className={clsx(
          'hidden h-full flex-col gap-y-12 xl:col-span-3 xl:flex',
        )}>
        <InterviewsDashboardStudyPlansCTA />
        <InterviewsDashboardStudyGuideList
          href={systemDesignLearningContent[0].href}
          items={systemDesignLearningContent}
        />
      </aside>
    </div>
  );
}
