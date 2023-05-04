'use client';

import AmazonLogo from '~/components/icons/AmazonLogo';
import GoogleLogo from '~/components/icons/GoogleLogo';
import MetaLogo from '~/components/icons/MetaLogo';
import Container from '~/components/ui/Container';

import { DocumentCheckIcon } from '@heroicons/react/24/outline';

const summaryFeatures = [
  {
    description:
      'The entire presentation of your portfolio - including github, resume and portfolio website, will be reviewed',
    icon: DocumentCheckIcon,
    name: 'End to end review',
  },
  {
    description:
      'The entire presentation of your portfolio - including github, resume and portfolio website, will be reviewed',
    icon: DocumentCheckIcon,
    name: 'End to end review',
  },
  {
    description:
      'The entire presentation of your portfolio - including github, resume and portfolio website, will be reviewed',
    icon: DocumentCheckIcon,
    name: 'End to end review',
  },
];
const featuredReviews = [
  {
    designation: 'Software Engineer, Cerritos, California',
    pic: (
      <img
        alt=""
        className="h-6 w-6 flex-none rounded-full"
        src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
      />
    ),
    profileLink: 'Title',
    review:
      'This service was super helpful and well worth the investment! Not only did it help me address glaring issues with my old resume, but they also gave me comprehensive suggestions on how to improve my overall profile and land more FAANG interviews. My application-to-interview rate has never been higher!',
    reviewerName: '',
  },
  {
    designation: 'Software Engineer, Cerritos, California',
    pic: (
      <img
        alt=""
        className="h-6 w-6 flex-none rounded-full"
        src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
      />
    ),
    profileLink: 'Title',
    review:
      'The Resume Review service was instrumental in improving my resume to better highlight my significant work experience. It has come a long way from my previous version. FTL was very friendly and helpful from the moment we first started communicating and even gave valuable career advice on Software Engineering. In short, I recommend the service. Thanks for your help, FTL!',
    reviewerName: '',
  },
];

export default function ResumeReviewHero() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
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
          <svg className="overflow-visible fill-gray-800/20" x="50%" y={-1}>
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
        <div className="pb-40">
          <div className="mx-auto lg:flex ">
            <div>
              <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl ">
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  <a className="inline-flex space-x-6" href="#">
                    <span className="bg-brand-500/10 text-brand-400 ring-brand-500/20 rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset">
                      Front end portfolio review
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Take your front end portfolio to the next level
                </h1>
                <div className="sm:text-md space-y-4 py-8 pb-6 text-left text-sm font-medium text-slate-400 ">
                  <p>By ex-interviewers at</p>
                  <span className="justify-left flex items-center space-x-6 ">
                    <GoogleLogo
                      className="h-[1.5rem] text-slate-500 "
                      title="Google logo"
                    />
                    <AmazonLogo
                      className="mt-1 h-5 text-slate-500 "
                      title="Amazon logo"
                    />
                    <MetaLogo
                      className="h-4 text-slate-500 "
                      title="Meta logo"
                    />
                  </span>
                </div>
                <p className="mt-2 text-lg leading-8 text-gray-300">
                  Having reviewed over 100+ candidates (each) at various big
                  tech companies, we know what to look out for and how to
                  improve your chances at getting shortlisted.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    className="bg-brand-500 hover:bg-brand-400 focus-visible:outline-brand-400 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    href="#">
                    What is included{' '}
                    <span className="text-gray-200">{'->'}</span>
                  </a>
                  <a
                    className="text-sm font-semibold leading-6 text-white"
                    href="#">
                    See examples of reviews{' '}
                    <span className="text-gray-400">{'->'}</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden w-full lg:ml-auto lg:block lg:w-2/5 lg:flex-shrink-0">
              {featuredReviews.map((review) => (
                <figure
                  key={review.reviewerName}
                  className="mt-16 border-l border-gray-500 pl-8 text-gray-500">
                  <blockquote className="text-sm leading-6">
                    <p>{review.review}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex gap-x-4 text-sm leading-6">
                    {review.pic}
                    <div>
                      <span className="font-semibold text-gray-900">
                        {review.reviewerName}
                      </span>{' '}
                      – {review.designation}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-7xl">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {summaryFeatures.map((feature) => (
                <div key={feature.name} className="relative pl-11">
                  <dt className=" font-semibold text-white">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-7 w-7 text-indigo-400"
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
