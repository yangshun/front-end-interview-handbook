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
  themeGradientHeading,
  themeIconColor,
  themeMarketingHeadingSize,
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
    <Container className="flex flex-col py-12 lg:py-20" width="marketing">
      <Heading
        className={clsx(
          themeGradientHeading,
          themeMarketingHeadingSize,
          'max-w-lg pb-1 md:max-w-2xl',
        )}
        level="custom"
        tag="h1"
        weight="medium">
        Open Positions
      </Heading>
      <Text
        className={clsx(
          'mt-6 block',
          'text-base lg:text-lg',
          'lg:font-medium',
          'lg:max-w-3xl',
          'text-pretty',
        )}
        color="secondary"
        size="inherit"
        weight="inherit">
        Join us in building innovative products that are well-loved by Front End
        Engineers.
      </Text>
      <Section>
        {filteredJobPostings.length > 0 ? (
          <div className={clsx('grid gap-6 md:grid-cols-2', 'mt-12 lg:mt-16')}>
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
