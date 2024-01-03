import clsx from 'clsx';
import { cookies } from 'next/headers';
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
  themeLineColor,
} from '~/components/ui/theme';

import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams?: Readonly<{ cty?: string }>;
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
        'group relative flex items-center rounded-lg p-6 transition-colors md:p-8',
        ['border', themeLineColor],
        [themeBackgroundLayerColor, themeBackgroundLayerEmphasizedHover],
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

export default function Page({ searchParams }: Props) {
  const cookieStore = cookies();
  // 1. Read from query param (for overrides, useful for testing).
  // 2. Read from cookie set during middleware.
  // 3. Defaults to US in case something blows up.
  const countryCode: string =
    searchParams?.cty ?? cookieStore.get('country')?.value ?? 'US';

  return (
    <Container
      className="my-10 grid gap-y-8 md:my-20 md:gap-y-16"
      variant="narrow">
      <div className="flex flex-col gap-y-6">
        <Heading level="heading2">Open positions</Heading>
        <Text className="text-lg" color="subtitle" size="custom">
          Join us in building innovative products that are well-loved by Front
          End Engineers.
        </Text>
      </div>
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {countryCode === 'IN' ? (
            <>
              <JobPostingItem
                department="Engineering"
                href="/jobs/staff-front-end-software-engineer"
                location="Remote"
                title="Staff Front End Software Engineer"
              />
              <JobPostingItem
                department="Engineering"
                href="/jobs/senior-content-engineer"
                location="Remote"
                title="Senior Content Engineer"
              />
            </>
          ) : (
            <>
              <JobPostingItem
                department="Engineering"
                href="/jobs/senior-front-end-contributor-ui"
                location="Remote"
                title="Senior Front End Contributor (UI Questions)"
              />
              <JobPostingItem
                department="Engineering"
                href="/jobs/senior-front-end-contributor-js"
                location="Remote"
                title="Senior Front End Contributor (JS Questions)"
              />
              <JobPostingItem
                department="Engineering"
                href="/jobs/senior-front-end-software-engineer"
                location="Remote"
                title="Senior Front End Software Engineer"
              />
              <JobPostingItem
                department="Engineering"
                href="/jobs/front-end-software-engineer"
                location="Remote"
                title="Front End Software Engineer"
              />
              <JobPostingItem
                department="Engineering"
                href="/jobs/front-end-software-engineer-intern"
                location="Remote"
                title="Front End Software Engineer Intern"
              />
            </>
          )}
          <JobPostingItem
            department="Marketing"
            href="/jobs/technical-marketing-specialist"
            location="Remote"
            title="Technical Marketing Specialist"
          />
        </div>
      </Section>
    </Container>
  );
}
