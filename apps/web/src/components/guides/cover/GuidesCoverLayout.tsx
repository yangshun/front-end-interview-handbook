import clsx from 'clsx';
import type { ReactNode } from 'react';

import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';

type Props = Readonly<{
  children: ReactNode;
  description: string;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  longDescription: ReactNode;
  showRecommendedItemsDropdown?: boolean;
  title: string;
}>;

export default function GuidesCoverLayout({
  description,
  title,
  features,
  icon,
  longDescription,
  children,
  showRecommendedItemsDropdown,
}: Props) {
  return (
    <div className={clsx('flex flex-col gap-y-12', 'relative')}>
      <InterviewsRecommendedPrepStrategyPageTitleSection
        description={description}
        features={features}
        icon={icon}
        longDescription={longDescription}
        showQuestionCountCard={false}
        showRecommendedItemsDropdown={showRecommendedItemsDropdown}
        title={title}
      />
      {children}
    </div>
  );
}
