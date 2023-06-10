import clsx from 'clsx';

import Container from '../Container';
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
    <div>
      <Container>
        <Heading level="heading2">{title}</Heading>
        <hr className="mt-2" />
      </Container>
      <Section>
        <div className="flex flex-col">
          <div>
            <Container>
              <div className={clsx('grid w-full py-12', gapClasses[gapSize])}>
                {children}
              </div>
            </Container>
          </div>
          <div className="bg-slate-900">
            <Container>
              <div
                className={clsx('dark grid w-full py-12', gapClasses[gapSize])}>
                {children}
              </div>
            </Container>
          </div>
        </div>
      </Section>
    </div>
  );
}
