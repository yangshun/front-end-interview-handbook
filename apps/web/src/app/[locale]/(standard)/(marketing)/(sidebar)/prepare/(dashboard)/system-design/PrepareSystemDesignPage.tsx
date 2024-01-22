'use client';

import clsx from 'clsx';

import DashboardStudyGuideList from '~/components/interviews/dashboard/DashboardStudyGuideList';
import DashboardStudyPlansCTA from '~/components/interviews/dashboard/DashboardStudyPlansCTA';
import { useSystemDesignGuides } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';
import QuestionsSystemDesignListWithFilters from '~/components/interviews/questions/listings/items/QuestionsSystemDesignListWithFilters';

export default function PrepareSystemDesignPage() {
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
        <DashboardStudyPlansCTA />
        <DashboardStudyGuideList
          href={systemDesignLearningContent[0].href}
          items={systemDesignLearningContent}
        />
      </aside>
    </div>
  );
}
