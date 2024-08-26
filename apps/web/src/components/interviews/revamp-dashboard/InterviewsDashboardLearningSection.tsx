import type { ReactNode } from 'react';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextSubtitleColor } from '~/components/ui/theme';

type Props = Readonly<{
  children: ReactNode;
  description: string;
  title: string;
}>;

export default function InterviewsDashboardLearningSection({
  title,
  description,
  children,
}: Props) {
  return (
    <Section>
      <div className="flex flex-col gap-6">
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
        {children}
      </div>
    </Section>
  );
}
