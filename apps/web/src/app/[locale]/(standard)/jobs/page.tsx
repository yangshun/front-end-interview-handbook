import clsx from 'clsx';
import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';
import { RiArrowRightLine, RiMapPinLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundLayerColor,
  themeBackgroundLayerEmphasized_Hover,
  themeBorderColor,
  themeIconColor,
} from '~/components/ui/theme';

import { fetchJobPostings } from '~/db/contentlayer/JobPostingReader';
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
        ['border', themeBorderColor],
        [themeBackgroundLayerColor, themeBackgroundLayerEmphasized_Hover],
      )}>
      <div className="flex grow flex-col gap-y-4">
        <Text
          className="block uppercase tracking-widest"
          color="secondary"
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
            className="inline-flex items-center gap-x-2"
            color="subtitle"
            size="body2">
            <RiMapPinLine className={clsx('size-5', themeIconColor)} />{' '}
            {location}
          </Text>
        </div>
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-8 shrink-0',
          themeIconColor,
          'group-hover:text-brand-dark dark:group-hover:text-brand',
        )}
      />
    </div>
  );
}

export default async function Page({ searchParams }: Props) {
  const cookieStore = cookies();
  // 1. Read from query param (for overrides, useful for testing).
  // 2. Read from cookie set during middleware.
  // 3. Defaults to US in case something blows up.
  const countryCode: string =
    searchParams?.cty ?? cookieStore.get('country')?.value ?? 'US';

  const jobPostings = await fetchJobPostings();

  const filteredJobPostings = jobPostings.filter((jobPosting) => {
    // If there's a location requirement,
    // check if the current country meets the req.
    if (jobPosting.locationRequirements) {
      return jobPosting.locationRequirements.includes(countryCode);
    }

    if (jobPosting.hideFromLocations?.includes(countryCode)) {
      return false;
    }

    return true;
  });

  return (
    <Container className="my-10 grid gap-y-8 md:my-20 md:gap-y-16" width="6xl">
      <div className="flex flex-col gap-y-6">
        <Heading level="heading2">Open positions</Heading>
        <Text className="text-lg" color="subtitle" size="inherit">
          Join us in building innovative products that are well-loved by Front
          End Engineers.
        </Text>
      </div>
      <Section>
        {filteredJobPostings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobPostings.map((jobPosting) => (
              <JobPostingItem
                key={jobPosting.slug}
                department={jobPosting.department}
                href={jobPosting.href}
                location="Remote"
                title={jobPosting.title}
              />
            ))}
          </div>
        ) : (
          <div
            className={clsx(
              'flex items-center justify-center',
              themeBackgroundCardColor,
              'h-80 rounded-xl',
            )}>
            <EmptyState title="There are no jobs available for your location" />
          </div>
        )}
      </Section>
    </Container>
  );
}
