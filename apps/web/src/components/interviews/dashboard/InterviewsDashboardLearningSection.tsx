import clsx from 'clsx';
import type { ReactNode } from 'react';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextSubtitleColor } from '~/components/ui/theme';

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  description: string;
  title: string;
}>;

export default function InterviewsDashboardLearningSection({
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-3">
        <Heading
          className={themeTextSubtitleColor}
          color="custom"
          level="heading6">
          {title}
        </Heading>
        <Text color="secondary" size="body2">
          {description}
        </Text>
      </div>
      <Section>{children}</Section>
    </div>
  );
}
