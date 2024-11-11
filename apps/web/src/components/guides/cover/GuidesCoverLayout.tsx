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
  metadata?: {
    description: string;
    href: string;
    title: string;
  };
  recommendedPrepData?: Readonly<{
    blind75: Readonly<{
      listKey: string;
      questionCount: number;
    }>;
    gfe75: Readonly<{
      listKey: string;
      questionCount: number;
    }>;
    systemDesignQuestionCount: number;
  }>;
  title: string;
}>;

export default function GuidesCoverLayout({
  description,
  title,
  features,
  icon,
  longDescription,
  recommendedPrepData,
  metadata,
  children,
}: Props) {
  return (
    <div className={clsx('flex flex-col gap-y-12 md:gap-y-16', 'relative')}>
      <InterviewsRecommendedPrepStrategyPageTitleSection
        description={description}
        features={features}
        icon={icon}
        longDescription={longDescription}
        metadata={metadata}
        recommendedPrepData={recommendedPrepData}
        showQuestionCountCard={false}
        title={title}
      />
      {children}
    </div>
  );
}
