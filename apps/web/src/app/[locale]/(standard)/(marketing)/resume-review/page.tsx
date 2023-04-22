import ResumeReviewHero from './ResumeReviewHero';
import ResumeReviewTeam from './ResumeReviewTeam';
import ResumeReviewTestimonials from './ResumeReviewTestimonials';

export default function ResumeReviewPage() {
  return (
    <div className="relative flex flex-col gap-y-16 bg-white py-24 sm:py-32 md:gap-y-36">
      <ResumeReviewHero />
      <img
        alt=""
        aria-hidden={true}
        className="origin=[0_100%] absolute w-full will-change-transform"
        src="/img/marketing/hero.jpg"
        style={{
          height: 300,
          opacity: '20%',
          top: '10%',
          transform: `skewY(6deg)`,
        }}
      />
      <ResumeReviewTeam />
      <ResumeReviewTestimonials />
    </div>
  );
}
