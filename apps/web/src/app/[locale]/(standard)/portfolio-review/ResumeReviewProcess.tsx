'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import {
  RiAccountBoxLine,
  RiComputerLine,
  RiGithubFill,
  RiSurveyLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeGlassyBorder,
  themeTextBrandColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

export default function ResumeReviewProcess() {
  const intl = useIntl();
  const features = useFeatures();

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
              {intl.formatMessage({
                defaultMessage: "What's Included",
                description:
                  'Label for what is included for the resume review page',
                id: 'Y7zgiT',
              })}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {intl.formatMessage({
                defaultMessage: 'We go beyond your portfolio to help you grow',
                description:
                  'Section title for what is included for the resume review page',
                id: 'GLg9RL',
              })}
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              {intl.formatMessage({
                defaultMessage:
                  'Our feedback is tailored for career progression, not just 1 one-time job search. We combine years of experience screening candidates with a detailed understanding of your skillsets and goals to derive impactful recommendations.',
                description:
                  'Section description for what is included for the resume review page',
                id: '4YVG6h',
              })}
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

function useFeatures() {
  const intl = useIntl();

  return [
    {
      description: intl.formatMessage({
        defaultMessage:
          'We will start with an overarching understanding of your current front end skills, experiences and career aspirations to recommend steps you can take to progress your career',
        description: 'Resume review feature description',
        id: 'ZDOKnm',
      }),

      icon: RiAccountBoxLine,

      name: intl.formatMessage({
        defaultMessage: 'In-depth Profile Assessment',
        description: 'Resume review feature',
        id: 'Mvs/7B',
      }),

      subfeatures: [
        intl.formatMessage({
          defaultMessage: 'Front-end specific recommendations from seniors',
          description:
            'Sub features for "In-depth profile assessment" feature of resume review',
          id: 'ymhecl',
        }),
        intl.formatMessage({
          defaultMessage:
            'Tailored to your current skills, experiences and goals',
          description:
            'Sub features for "In-depth profile assessment" feature of resume review',
          id: 'FdWaB1',
        }),
        intl.formatMessage({
          defaultMessage:
            "Actionable next steps with specific how-to's and examples",
          description:
            'Sub features for "In-depth profile assessment" feature of resume review',
          id: 'dPbAai',
        }),
        intl.formatMessage({
          defaultMessage: 'Imparting of industry-specific tips and know-how',
          description:
            'Sub features for "In-depth profile assessment" feature of resume review',
          id: 'fuKeE5',
        }),
      ],
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'We will conduct a detailed review of your resume and help you present your profile in the best way possible',
        description: 'Resume review feature description',
        id: '/8jOEO',
      }),

      icon: RiSurveyLine,

      name: intl.formatMessage({
        defaultMessage: 'Resume Review',
        description: 'Resume review feature',
        id: 'k1rvru',
      }),

      subfeatures: [
        intl.formatMessage({
          defaultMessage: 'First impressions from experienced interviewers',
          description:
            'Sub features for "Resume review" feature of resume review',
          id: 'h0Xc3E',
        }),
        intl.formatMessage({
          defaultMessage:
            'Suggestions customized to industry and experience level',
          description:
            'Sub features for "Resume review" feature of resume review',
          id: 'G2nvbp',
        }),
        intl.formatMessage({
          defaultMessage: 'Detection of ATS readability issues',
          description:
            'Sub features for "Resume review" feature of resume review',
          id: 'CLotAN',
        }),
        intl.formatMessage({
          defaultMessage: 'Examples of good front end resumes',
          description:
            'Sub features for "Resume review" feature of resume review',
          id: 'x3R5oi',
        }),
      ],
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'We will conduct a review of your GitHub profile and conduct a critique of your top 3 pinned projects',
        description: 'Resume review feature description',
        id: 'Y2WgdA',
      }),

      icon: RiGithubFill,

      name: intl.formatMessage({
        defaultMessage: 'GitHub Review',
        description: 'Resume review feature',
        id: 'DRZ4Z6',
      }),

      subfeatures: [
        intl.formatMessage({
          defaultMessage: 'First impressions from experienced interviewers',
          description:
            'Sub features for "GitHub review" feature of resume review',
          id: 'k3StnS',
        }),
        intl.formatMessage({
          defaultMessage:
            'Suggestions customized to industry and experience level',
          description:
            'Sub features for "GitHub review" feature of resume review',
          id: 'Uq6/Lx',
        }),
        intl.formatMessage({
          defaultMessage: 'Examples of good GitHub profiles',
          description:
            'Sub features for "GitHub review" feature of resume review',
          id: 'IdIQQw',
        }),
        intl.formatMessage({
          defaultMessage:
            "Assessment of top 3 projects' presentation and code quality",
          description:
            'Sub features for "GitHub review" feature of resume review',
          id: 'lXbWnZ',
        }),
      ],
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'If you have a portfolio website, we will review the presentation and code quality of it',
        description: 'Resume review feature description',
        id: 'F5eadI',
      }),

      icon: RiComputerLine,

      name: intl.formatMessage({
        defaultMessage: 'Portfolio Website Review',
        description: 'Resume review feature',
        id: 'GgPkMZ',
      }),

      subfeatures: [
        intl.formatMessage({
          defaultMessage: 'First impressions from experienced interviewers',
          description:
            'Sub features for "Portfolio website review" feature of resume review',
          id: 'QvSn+W',
        }),
        intl.formatMessage({
          defaultMessage:
            'Suggestions customized to industry and experience level',
          description:
            'Sub features for "Portfolio website review" feature of resume review',
          id: '1OO9Du',
        }),
        intl.formatMessage({
          defaultMessage: 'Examples of good portfolio websites',
          description:
            'Sub features for "Portfolio website review" feature of resume review',
          id: '0dAHAW',
        }),
        intl.formatMessage({
          defaultMessage: 'Assessment of website presentation and code quality',
          description:
            'Sub features for "Portfolio website review" feature of resume review',
          id: 'CCT97r',
        }),
      ],
    },
  ];
}
