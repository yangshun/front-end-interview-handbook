import clsx from 'clsx';

import Divider from '~/components/ui/Divider';

import Container from '../Container';
import Heading from '../Heading';
import Section from '../Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
  darkMode?: 'horizontal' | 'none' | 'vertical';
  gapSize?: GapSize;
  title: string;
}>;

type GapSize = 'lg' | 'md';

const gapClasses: Record<GapSize, string> = {
  lg: 'gap-8',
  md: 'gap-4',
};

export default function UIExamplesGroup({
  children,
  gapSize = 'md',
  darkMode = 'vertical',
  title,
}: Props) {
  return (
    <div>
      <Container>
        <Heading level="heading2">{title}</Heading>
        <Divider className="mt-2" />
      </Container>
      <Section>
        {(darkMode === 'vertical' || darkMode === 'none') && (
          <div className="flex flex-col">
            <div>
              <Container>
                <div className={clsx('grid w-full py-12', gapClasses[gapSize])}>
                  {children}
                </div>
              </Container>
            </div>
            {darkMode !== 'none' && (
              <div className="bg-neutral-950 dark text-white">
                <Container>
                  <div
                    className={clsx('grid w-full py-12', gapClasses[gapSize])}>
                    {children}
                  </div>
                </Container>
              </div>
            )}
          </div>
        )}
        {darkMode === 'horizontal' && (
          <div className="relative flex">
            <div className="bg-neutral-950 absolute inset-y-0 right-0 w-1/2"></div>
            <Container className="z-10 w-full">
              <div className="grid w-full grid-cols-2">
                <div
                  className={clsx(
                    'grid grow py-12 pr-12',
                    gapClasses[gapSize],
                  )}>
                  {children}
                </div>
                <div className="dark pl-12 text-white">
                  <div
                    className={clsx('grid w-full py-12', gapClasses[gapSize])}>
                    {children}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </Section>
    </div>
  );
}
