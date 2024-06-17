import { allJobsPostings } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { JobPostingJsonLd } from 'next-seo';

import JobPostingPage from '~/components/hiring/JobPostingPage';

import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateStaticParams() {
  return generateStaticParamsWithLocale(
    allJobsPostings.map((jobPosting) => ({
      slug: jobPosting.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = params;

  const job = allJobsPostings.find((jobPosting) => jobPosting.slug === slug);

  if (!job) {
    return notFound();
  }

  return defaultMetadata({
    locale,
    pathname: `/jobs/${job.slug}`,
    title: job.title,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = params;

  const job = allJobsPostings.find((jobPosting) => jobPosting.slug === slug);

  if (!job) {
    notFound();
  }

  const today = new Date();
  const oneMonthFromNow = new Date(
    new Date().setMonth(new Date().getMonth() + 1),
  );

  return (
    <>
      <JobPostingJsonLd
        applicantLocationRequirements={
          job.locationRequirements ? job.locationRequirements[0] : undefined
        }
        datePosted={today.toISOString()}
        description={job.body.html}
        employmentType={job.employmentType}
        experienceRequirements={
          job.minimumMonthsOfExperience
            ? {
                occupational: {
                  minimumMonthsOfExperience: job.minimumMonthsOfExperience,
                },
              }
            : undefined
        }
        hiringOrganization={{
          logo: 'https://www.greatfrontend.com/img/brand-assets/logo-brand.png',
          name: 'GreatFrontEnd',
          sameAs: 'https://www.greatfrontend.com',
        }}
        jobLocationType="TELECOMMUTE"
        title={job.title}
        useAppDir={true}
        validThrough={oneMonthFromNow.toISOString()}
      />
      <JobPostingPage
        content={job.body.html}
        employmentType={job.employmentType}
        href={job.applyHref}
        payRange={job.payRange}
        title={job.title}
      />
    </>
  );
}
