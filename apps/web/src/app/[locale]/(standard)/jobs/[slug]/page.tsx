import { allJobsPostings } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { JobPostingJsonLd } from 'next-seo';

import defaultMetadata from '~/seo/defaultMetadata';

import JobPostingPage from './JobPostingPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateStaticParams() {
  return allJobsPostings.map((jobPosting) => ({
    slug: jobPosting.slug,
  }));
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
  const { slug, locale } = params;

  const job = allJobsPostings.find((jobPosting) => jobPosting.slug === slug);

  if (!job) {
    notFound();
  }

  if (
    job.notInParticularLocale === locale ||
    (job.inParticularLocale && job.inParticularLocale !== locale)
  ) {
    notFound();
  }

  const today = new Date();
  const oneMonthFromNow = new Date(
    new Date().setMonth(new Date().getMonth() + 1),
  );

  return (
    <>
      <JobPostingJsonLd
        // ApplicantLocationRequirements="FR" // TODO(jobs): location reqs.
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
