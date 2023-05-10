import AmazonLogo from '~/components/icons/AmazonLogo';
import GoogleLogo from '~/components/icons/GoogleLogo';
import MetaLogo from '~/components/icons/MetaLogo';
import Container from '~/components/ui/Container';

import {
  ChartBarIcon,
  DocumentCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const summaryFeatures = [
  {
    description:
      'Your entire portfolio - including GitHub, resume and portfolio website, projects will be reviewed',
    icon: DocumentCheckIcon,
    name: 'End-to-end review',
  },
  {
    description:
      'Get personalized and insightful guidance from ex-interviewers',
    icon: UsersIcon,
    name: '1:1 personalized guidance',
  },
  {
    description:
      'Our users now work at companies like Airbnb, Amazon, Meta and Lyft',
    icon: ChartBarIcon,
    name: 'High success rate',
  },
];
const featuredReviews = [
  {
    designation: 'Now Software Engineer at Meta',
    pic: (
      <img
        alt="Meta logo mark"
        className="h-6 w-6 flex-none rounded-full"
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
        className="h-6 w-6 flex-none rounded-full"
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
    <div className="relative isolate overflow-hidden bg-slate-900">
      <Container>
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
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
          <svg className="overflow-visible fill-slate-800/20" x="50%" y={-1}>
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
        <div className="pb-10 xl:pb-20">
          <div className="mx-auto lg:flex ">
            <div>
              <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl">
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  <a className="inline-flex space-x-6" href="#">
                    <span className="rounded-full bg-slate-300/10 px-3 py-1 text-sm font-semibold leading-6 text-slate-300 ring-1 ring-inset ring-slate-300/20">
                      Front End Portfolio Review
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Take your front end portfolio to the next level
                </h1>
                <div className="sm:text-md space-y-4 py-8 pb-6 text-left text-sm font-medium text-slate-400 ">
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
                <p className="mt-2 text-lg leading-8 text-slate-300">
                  Having reviewed over 100+ candidates (each) at various big
                  tech companies, we know what to look out for and how to
                  improve your chances at getting shortlisted.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    className="rounded-md bg-pink-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                    href="#whats-included">
                    What is included{' '}
                    <span className="text-slate-200">{'->'}</span>
                  </a>
                  <a
                    className="text-sm font-semibold leading-6 text-white"
                    href="#pricing">
                    Pricing <span className="text-slate-400">{'->'}</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden w-full pt-6 lg:ml-auto lg:block lg:w-2/6 lg:flex-shrink-0">
              {featuredReviews.map((review) => (
                <figure
                  key={review.reviewerName}
                  className="mt-16 border-l border-white pl-8 text-slate-300">
                  <blockquote className="text-sm leading-6">
                    <p>{review.review}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex gap-x-4 text-sm leading-6">
                    {review.pic}
                    <div>
                      <span className="font-semibold text-slate-900">
                        {review.reviewerName}
                      </span>{' '}
                      – {review.designation}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mt-24 lg:max-w-7xl xl:sm:mt-28">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-slate-300 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {summaryFeatures.map((feature) => (
                <div key={feature.name} className="relative pl-12">
                  <dt className=" font-semibold text-white">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-8 w-8 text-pink-300"
                    />
                    {feature.name}
                  </dt>{' '}
                  <dd>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </div>
  );
}
