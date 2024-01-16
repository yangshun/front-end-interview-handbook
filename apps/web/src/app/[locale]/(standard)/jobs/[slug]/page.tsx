import { allJobsPostings } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import JobPage from '../JobPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

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

  return (
      <JobPage
        content={job.body.html}
        employmentType={job.employmentType}
        href={job.applyHref}
        payRange={job.payRange}
        title={job.title}
      />
  );
}
