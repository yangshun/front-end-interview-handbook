'use client';

import clsx from 'clsx';

import { useSystemDesignLearningContent } from '~/components/questions/content/system-design/SystemDesignNavigation';
import PreparationStudyGuideList from '~/components/questions/dashboard/PreparationStudyGuideList';
import PreparationStudyPlansCTA from '~/components/questions/dashboard/PreparationStudyPlansCTA';
import QuestionsSystemDesignListWithFilters from '~/components/questions/listings/items/QuestionsSystemDesignListWithFilters';

export default function PrepareSystemDesignPage() {
  const systemDesignLearningContent = useSystemDesignLearningContent();

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
        <PreparationStudyPlansCTA />
        <PreparationStudyGuideList
          href={systemDesignLearningContent[0].href}
          items={systemDesignLearningContent}
        />
      </aside>
    </div>
  );
}
