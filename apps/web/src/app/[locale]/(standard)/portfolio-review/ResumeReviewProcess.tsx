'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import {
  RiAccountBoxLine,
  RiComputerLine,
  RiGithubFill,
  RiSurveyLine,
} from 'react-icons/ri';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeGlassyBorder,
  themeTextBrandColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

const features = [
  {
    description:
      'We will start with an overarching understanding of your current front end skills, experiences and career aspirations to recommend steps you can take to progress your career',
    icon: RiAccountBoxLine,
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
    icon: RiSurveyLine,
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
    icon: RiGithubFill,
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
    icon: RiComputerLine,
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
      className="relative isolate overflow-hidden bg-neutral-950 py-16 lg:py-24 xl:py-32"
      id="whats-included">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10">
          <div
            className="from-brand-light to-brand-dark aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <Container width="6xl">
          <div className="mx-auto text-left">
            <p className="text-brand pb-6 text-base font-semibold leading-7">
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
            <div className="lg:gap-y-18 mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-1 md:grid-cols-2 lg:mt-16 lg:gap-x-16">
              {features.map((feature) => (
                <div key={feature.name}>
                  <div>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        'inline-block rounded-full p-3 dark:bg-neutral-800/70',
                        themeGlassyBorder,
                      )}>
                      <feature.icon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </span>
                  </div>
                  <div className="mt-6 flex flex-col gap-y-2">
                    <Heading
                      className={themeTextSubtitleColor}
                      color="custom"
                      level="heading6">
                      {feature.name}
                    </Heading>
                    <Text className="mt-2 block" color="secondary" size="body1">
                      {feature.description}
                    </Text>
                  </div>
                  <ul className="mt-8 space-y-3 xl:mt-10" role="list">
                    {feature.subfeatures.map((subfeature) => (
                      <li key={subfeature} className="flex gap-x-3">
                        <FaCheck
                          aria-hidden="true"
                          className={clsx('h-5 flex-none', themeTextBrandColor)}
                        />
                        <Text className="block" color="secondary" size="body1">
                          {subfeature}
                        </Text>
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
