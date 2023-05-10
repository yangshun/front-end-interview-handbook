import type { Metadata } from 'next';

import defaultMetadata from '~/seo/defaultMetadata';

import ResumeReviewContact from './ResumeReviewContact';
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
    <main>
      <ResumeReviewHero />
      <ResumeReviewLogoWall />
      <ResumeReviewProcess />
      <ResumeReviewTestimonials />
      <ResumeReviewPricing />
      <ResumeReviewFAQs />
      <ResumeReviewContact />
    </main>
  );
}
