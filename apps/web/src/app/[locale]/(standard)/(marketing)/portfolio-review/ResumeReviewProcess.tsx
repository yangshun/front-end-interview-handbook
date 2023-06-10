'use client';

import GitHubIcon from '~/components/icons/GitHubIcon';
import Container from '~/components/ui/Container';

import {
  CheckIcon,
  ComputerDesktopIcon,
  DocumentCheckIcon,
  IdentificationIcon,
} from '@heroicons/react/20/solid';

const features = [
  {
    description:
      'We will start with an overarching understanding of your current front end skills, experiences and career aspirations to recommend steps you can take to progress your career',
    icon: IdentificationIcon,
    name: 'In-depth Profile Assessment',
    subfeatures: [
      'Front-end specific recommendations from seniors',
      'Tailored to your current skills, experiences and goals',
      "Actionable next steps with specific how-to's and examples",
      'Imparting of industry-specific tips and know-how',
    ],
  },
  {
    description:
      'We will conduct a detailed review of your resume and help you present your profile in the best way possible',
    icon: DocumentCheckIcon,
    name: 'Resume Review',
    subfeatures: [
      'First impressions from experienced interviewers',
      'Suggestions customized to industry and experience level',
      'Detection of ATS readability issues',
      'Examples of good front end resumes',
    ],
  },
  {
    description:
      'We will conduct a review of your GitHub profile and conduct a critique of your top 3 pinned projects',
    icon: GitHubIcon,
    name: 'GitHub Review',
    subfeatures: [
      'First impressions from experienced interviewers',
      'Suggestions customized to industry and experience level',
      'Examples of good GitHub profiles',
      "Assessment of top 3 projects' presentation and code quality",
    ],
  },
  {
    description:
      'If you have a portfolio website, we will review the presentation and code quality of it',
    icon: ComputerDesktopIcon,
    name: 'Portfolio Website Review',
    subfeatures: [
      'First impressions from experienced interviewers',
      'Suggestions customized to industry and experience level',
      'Examples of good portfolio websites',
      'Assessment of website presentation and code quality',
    ],
  },
];

export default function ResumeReviewProcess() {
  return (
    <div
      className="relative isolate overflow-hidden bg-neutral-900 py-16 lg:py-24 xl:py-32"
      id="whats-included">
      <img
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80&blend=111827&blend-mode=multiply&sat=-100&exp=15"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10">
          <div
            className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ADD8E6] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <Container variant="narrow">
          <div className="mx-auto text-left">
            <p className="pb-6 text-base font-semibold leading-7 text-pink-500">
              What's Included
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              We go beyond your portfolio to help you grow
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Our feedback is tailored for career progression, not just 1
              one-time job search. We combine years of experience screening
              candidates with a detailed understanding of your skillsets and
              goals to derive impactful recommendations.
            </p>
          </div>
          <div>
            <div className="lg:gap-y-18 mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-1 lg:mt-16 lg:grid-cols-2 lg:gap-x-16">
              {features.map((feature) => (
                <div key={feature.name}>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-neutral-300 ">
                      {feature.description}
                    </p>
                  </div>
                  <ul
                    className="mt-8 space-y-3 text-base leading-6 text-neutral-300 xl:mt-10"
                    role="list">
                    {feature.subfeatures.map((subfeature) => (
                      <li key={subfeature} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-pink-500"
                        />
                        {subfeature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
