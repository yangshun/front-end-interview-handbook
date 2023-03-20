import { QuestionCount } from '~/components/questions/listings/QuestionCount';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  BeakerIcon,
  BookOpenIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  CodeBracketSquareIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    description: (
      <>
        {QuestionCount}+ interview questions across{' '}
        <Anchor href="/prepare/coding">coding</Anchor> and{' '}
        <Anchor href="/prepare/quiz">quiz</Anchor> formats and new questions
        constantly being added.
      </>
    ),
    icon: BookOpenIcon,
    name: 'Huge question bank',
  },
  {
    description: (
      <>
        All questions come with solutions written by ex-FAANG Senior Front End
        Engineers.
      </>
    ),
    icon: CheckBadgeIcon,
    name: 'High quality solutions',
  },
  {
    description: (
      <>
        Preparation plans for all kinds of preparation timelines —{' '}
        <Anchor href="/prepare/one-week">1 week</Anchor>,{' '}
        <Anchor href="/prepare/one-month">1 month</Anchor>,{' '}
        <Anchor href="/prepare/three-months">3 months</Anchor>.
      </>
    ),
    icon: AcademicCapIcon,
    name: 'Proven preparation plans',
  },
  {
    description: (
      <>Find out what questions companies are asking their candidates.</>
    ),
    icon: BuildingOfficeIcon,
    name: 'Company-tagged questions',
  },
  {
    description: (
      <>Simulate real interview conditions, no need for any setup!</>
    ),
    icon: CodeBracketSquareIcon,
    name: 'In-browser coding workspace',
  },
  {
    description: (
      <>
        Coding questions supported in Vanilla JavaScript and React, with support
        for more libraries coming soon!
      </>
    ),
    icon: BeakerIcon,
    name: 'Bring your own framework',
  },
  {
    description: (
      <>
        The only platform with front end system design questions with official
        solutions written by senior engineers.
      </>
    ),
    icon: CubeIcon,
    name: 'Front end system design',
  },
  {
    description: (
      <>
        We add more questions and guides from time to time, available for free
        to premium subscribers.
      </>
    ),
    icon: ArrowTrendingUpIcon,
    name: 'Free continuous updates',
  },
  // {
  //   name: 'Exclusive techniques and best practices guides',
  //   description:
  //     'TODO',
  // },
];

export default function MarketingFeatures() {
  return (
    <Container variant="narrow">
      <Heading className="sr-only">Features</Heading>
      <Section>
        <dl className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                  <feature.icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <Heading className="ml-16 text-lg font-medium leading-6 text-slate-900">
                  {feature.name}
                </Heading>
              </dt>
              <Section>
                <dd className="mt-2 ml-16 text-base text-slate-500">
                  {feature.description}
                </dd>
              </Section>
            </div>
          ))}
        </dl>
      </Section>
    </Container>
  );
}
