import clsx from 'clsx';

import Divider from '~/components/ui/Divider';

import Container from '../Container';
import Heading from '../Heading';
import Section from '../Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
  darkMode?: 'horizontal' | 'none' | 'vertical';
  gapSize?: GapSize;
  title?: string;
}>;

type GapSize = 'lg' | 'md';

const gapClasses: Record<GapSize, string> = {
  lg: 'gap-8',
  md: 'gap-4',
};

export default function UIExamplesGroup({
  children,
  darkMode = 'vertical',
  gapSize = 'md',
  title,
}: Props) {
  return (
    <div>
      {title && (
        <Container>
          <Heading level="heading2">{title}</Heading>
          <Divider className="mt-2" />
        </Container>
      )}
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
              <div
                className="bg-neutral-900 text-white"
                data-color-scheme="dark">
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
            <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-neutral-900 lg:block"></div>
            <Container className="w-full">
              <div className="grid w-full md:grid-cols-2">
                <div
                  className={clsx(
                    'grid grow py-12 lg:pr-12',
                    gapClasses[gapSize],
                  )}>
                  {children}
                </div>
                <div
                  className="bg-neutral-900 text-white lg:bg-transparent lg:pl-12"
                  data-color-scheme="dark">
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
