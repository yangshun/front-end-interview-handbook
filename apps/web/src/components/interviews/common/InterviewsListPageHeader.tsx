import type { ReactNode } from 'react';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import InterviewsPageFeatures from './InterviewsPageFeatures';
import InterviewsPageHeaderActions from './InterviewsPageHeaderActions';

type Props = Readonly<{
  children?: ReactNode;
  description: string;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  metadata?: {
    description: string;
    href: string;
    title: string;
  };
  title: string;
}>;

export default function InterviewsListPageHeader({
  metadata,
  title,
  description,
  children,
  features,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      {metadata && (
        <InterviewsPageHeaderActions
          className="mb-8 flex w-full justify-end"
          metadata={metadata}
        />
      )}
      <div className="flex flex-col gap-4">
        <Heading level="heading4">{title}</Heading>
        <Text className="block" color="subtitle" size="body1" weight="medium">
          {description}
        </Text>
      </div>
      {/* Features */}
      <InterviewsPageFeatures features={features} />
      <Divider />
      {children}
    </div>
  );
}
