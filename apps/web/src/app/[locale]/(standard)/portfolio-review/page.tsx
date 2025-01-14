import type { Metadata } from 'next';

import InterviewsMarketingContactSection from '~/components/interviews/marketing/InterviewsMarketingContactSection';

import defaultMetadata from '~/seo/defaultMetadata';

import ResumeReviewFAQs from './ResumeReviewFAQs';
import ResumeReviewHero from './ResumeReviewHero';
import ResumeReviewLogoWall from './ResumeReviewLogoWall';
import ResumeReviewPricing from './ResumeReviewPricing';
import ResumeReviewProcess from './ResumeReviewProcess';
import ResumeReviewTestimonials from './ResumeReviewTestimonials';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    locale,
    pathname: '/portfolio-review',
    title: 'Portfolio Review',
  });
}

export default function PortfolioReviewPage() {
  return (
    <main className="bg-neutral-950" data-color-scheme="dark">
      <ResumeReviewHero />
      <ResumeReviewLogoWall />
      <ResumeReviewProcess />
      <ResumeReviewTestimonials />
      <ResumeReviewPricing />
      <ResumeReviewFAQs />
      <InterviewsMarketingContactSection />
    </main>
  );
}
