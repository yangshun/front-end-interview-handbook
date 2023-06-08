import clsx from 'clsx';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';

type GapSize = 'lg' | 'md';

const gapClasses: Record<GapSize, string> = {
  lg: 'gap-8',
  md: 'gap-4',
};

export default function UIExamplesGroup({
  title,
  children,
  gapSize = 'md',
}: Readonly<{ children: React.ReactNode; gapSize?: GapSize; title: string }>) {
  return (
    <div className="grid gap-4">
      <Heading level="heading2">{title}</Heading>
      <hr />
      <Section>
        <div className={clsx('grid', gapClasses[gapSize])}>{children}</div>
      </Section>
    </div>
  );
}
