import clsx from 'clsx';
import type { Metadata } from 'next/types';
import { RiArrowRightLine, RiMapPinLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerColor,
  themeBackgroundLayerEmphasizedHover,
  themeIconColor,
} from '~/components/ui/theme';

import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    locale,
    pathname: '/jobs',
    title: 'We are hiring! See all available jobs',
  });
}

function JobPostingItem({
  title,
  department,
  location,
  href,
}: Readonly<{
  department: string;
  href: string;
  location: string;
  title: string;
}>) {
  return (
    <div
      className={clsx(
        'group relative flex items-center rounded-lg p-8 transition-colors',
        themeBackgroundLayerColor,
        themeBackgroundLayerEmphasizedHover,
      )}>
      <div className="flex grow flex-col gap-y-4">
        <Text
          className="uppercase tracking-widest"
          color="secondary"
          display="block"
          size="body2"
          weight="medium">
          {department}
        </Text>
        <div className="flex grow flex-col gap-y-3">
          <Heading level="heading6">
            {title}{' '}
            <Anchor
              aria-label={title}
              className="absolute inset-0"
              href={href}
            />
          </Heading>
          <Text
            className="items-center gap-x-2"
            color="subtitle"
            display="inline-flex"
            size="body2">
            <RiMapPinLine className={clsx('h-5 w-5', themeIconColor)} />{' '}
            {location}
          </Text>
        </div>
      </div>
      <RiArrowRightLine
        className={clsx(
          'h-8 w-8 shrink-0',
          themeIconColor,
          'group-hover:text-brand-dark dark:group-hover:text-brand',
        )}
      />
    </div>
  );
}

export default function Page() {
  return (
    <Container
      className="my-10 grid gap-y-8 md:my-20 md:gap-y-16"
      variant="narrow">
      <Heading level="heading2">Open positions</Heading>
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <JobPostingItem
            department="Engineering"
            href="/jobs/senior-front-end-contributor"
            location="Remote"
            title="Senior Front End Contributor"
          />
        </div>
      </Section>
    </Container>
  );
}
