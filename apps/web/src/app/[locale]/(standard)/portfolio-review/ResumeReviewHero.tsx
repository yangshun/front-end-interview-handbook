'use client';

import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiBuilding2Line,
  RiFileList3Line,
  RiGroup2Line,
} from 'react-icons/ri';

import AmazonLogo from '~/components/icons/AmazonLogo';
import GoogleLogo from '~/components/icons/GoogleLogo';
import MetaLogo from '~/components/icons/MetaLogo';
import InterviewsMarketingFeaturesRow from '~/components/interviews/marketing/InterviewsMarketingFeaturesRow';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';

const summaryFeatures = [
  {
    description:
      'Your entire portfolio - including GitHub, resume and portfolio website, projects will be reviewed',
    icon: RiFileList3Line,
    key: 'review',
    name: 'End-to-end review',
  },
  {
    description:
      'Get personalized and insightful guidance from ex-interviewers',
    icon: RiGroup2Line,
    key: 'guidance',
    name: '1:1 personalized guidance',
  },
  {
    description:
      'Our users now work at companies like Airbnb, Amazon, Meta and Lyft',
    icon: RiBuilding2Line,
    key: 'success',
    name: 'High success rate',
  },
];
const featuredReviews = [
  {
    designation: 'Now Software Engineer at Meta',
    pic: (
      <img
        alt="Meta logo mark"
        className="size-6 flex-none rounded-full"
        src="/img/company-logos/meta-logomark.png"
      />
    ),
    review:
      'This service was super helpful and well worth the investment! Not only did it help me address glaring issues with my old resume, but they also gave me comprehensive suggestions on how to improve my overall profile and land more FAANG interviews. My application-to-interview rate has never been higher!',
    reviewerName: '',
  },
  {
    designation: 'Now Senior Software Engineer at Credit Karma',
    pic: (
      <img
        alt="Credit karma logo mark"
        className="size-6 flex-none rounded-full"
        src="/img/company-logos/creditkarma-logomark.png"
      />
    ),
    review:
      'This service was instrumental in improving my resume to better highlight my significant work experience. It has come a long way from my previous version. The reviewer was very friendly and helpful from the moment we first started communicating and even gave valuable career advice on Software Engineering.',
    reviewerName: '',
  },
];

export default function ResumeReviewHero() {
  return (
    <div className="relative isolate overflow-hidden bg-neutral-950">
      <Container>
        <svg
          aria-hidden="true"
          className="size-full absolute inset-0 -z-10 stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
          <defs>
            <pattern
              height={200}
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              patternUnits="userSpaceOnUse"
              width={200}
              x="50%"
              y={-1}>
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg className="overflow-visible fill-neutral-800/20" x="50%" y={-1}>
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
            height="100%"
            strokeWidth={0}
            width="100%"
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
        <div className="flex flex-col gap-y-24 pb-10 xl:pb-20">
          <div className="mx-auto lg:flex">
            <div>
              <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl">
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  <span
                    className={clsx(
                      'group relative inline-flex items-center gap-x-1 rounded-full',
                      'px-3 py-0.5',
                      'text-sm font-medium text-neutral-300',
                      'bg-brand/20 hover:bg-brand/30 transition-colors',
                      'shiny shadow-sm',
                    )}>
                    Front end portfolio review
                  </span>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Take your front end portfolio to the next level
                </h1>
                <div className="space-y-4 py-8 pb-6 text-left text-sm font-medium text-neutral-400 sm:text-base ">
                  <p>By ex-interviewers at</p>
                  <span className="justify-left flex items-center gap-x-6 opacity-75">
                    <GoogleLogo
                      className="h-[1.5rem] text-white"
                      title="Google logo"
                    />
                    <AmazonLogo
                      className="mt-2 h-5 text-white"
                      title="Amazon logo"
                    />
                    <MetaLogo className="h-4 text-white" title="Meta logo" />
                  </span>
                </div>
                <p className="mt-2 text-lg leading-8 text-neutral-300">
                  Having reviewed over 100+ candidates (each) at various big
                  tech companies, we know what to look out for and how to
                  improve your chances at getting shortlisted.
                </p>
                <div className="mt-10 flex items-center gap-x-2">
                  <Button
                    href="#whats-included"
                    icon={RiArrowRightLine}
                    label="What is included"
                    size="lg"
                    variant="primary"
                  />
                  <Button
                    href="#pricing"
                    icon={RiArrowRightLine}
                    label="Pricing"
                    size="lg"
                    variant="tertiary"
                  />
                </div>
              </div>
            </div>
            <div className="hidden w-full pt-6 lg:ml-auto lg:block lg:w-2/6 lg:shrink-0">
              {featuredReviews.map((review) => (
                <figure
                  key={review.reviewerName}
                  className="mt-16 border-l border-white pl-8 text-neutral-300">
                  <blockquote className="text-sm leading-6">
                    <p>{review.review}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex gap-x-4 text-sm leading-6">
                    {review.pic}
                    <div>
                      <span className="font-semibold text-neutral-900">
                        {review.reviewerName}
                      </span>{' '}
                      – {review.designation}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <InterviewsMarketingFeaturesRow
            features={summaryFeatures}
            title="Features"
          />
        </div>
      </Container>
    </div>
  );
}
