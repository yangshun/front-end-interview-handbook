import clsx from 'clsx';
import type { ReactNode } from 'react';

import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: ReactNode;
  description: string;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  longDescription: ReactNode;
  metadata: {
    description: string;
    href: string;
    title: string;
  };
  title: string;
}>;

export default function GuidesCoverLayout({
  description,
  title,
  features,
  icon,
  longDescription,
  children,
  metadata,
}: Props) {
  return (
    <Container className={clsx('flex flex-col gap-y-12', 'py-12', 'relative')}>
      <InterviewsRecommendedPrepStrategyPageTitleSection
        description={description}
        features={features}
        icon={icon}
        longDescription={longDescription}
        metadata={metadata}
        showQuestionCountCard={false}
        title={title}
      />
      {children}
    </Container>
  );
}
