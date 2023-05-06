import ResumeReviewFAQs from './ResumeReviewFAQs';
import ResumeReviewHero from './ResumeReviewHero';
import ResumeReviewLogoWall from './ResumeReviewLogoWall';
import ResumeReviewPricing from './ResumeReviewPricing';
import ResumeReviewProcess from './ResumeReviewProcess';
import ResumeReviewTestimonials from './ResumeReviewTestimonials';

export default function ResumeReviewPage() {
  return (
    <main>
      <ResumeReviewHero />
      <ResumeReviewLogoWall />
      <ResumeReviewProcess />
      <ResumeReviewTestimonials />
      <ResumeReviewPricing />
      <ResumeReviewFAQs />
    </main>
  );
}
