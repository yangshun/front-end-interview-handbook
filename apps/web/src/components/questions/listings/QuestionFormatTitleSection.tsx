import clsx from 'clsx';
import type { ReactNode } from 'react';

import { QuestionCount } from '~/components/questions/listings/QuestionCount';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionUserFacingFormat } from '../common/QuestionsTypes';
import TextPairing from '../../common/TextPairing';

type FormatValue = QuestionUserFacingFormat | 'behavioral';

type Props = Readonly<{
  format: FormatValue;
}>;

const items: ReadonlyArray<{
  description: ReactNode;
  href: string;
  label: string;
  value: FormatValue;
}> = [
  {
    description: (
      <>
        All types of coding round questions from JS utilities to React
        interfaces
      </>
    ),
    href: '/prepare/coding',
    label: 'Coding',
    value: 'coding',
  },
  {
    description: (
      <>Trivia-style front end questions asked across all interview rounds</>
    ),
    href: '/prepare/quiz',
    label: 'Quizzes',
    value: 'quiz',
  },
  {
    description: (
      <>
        Design, architecture and optimization decisions for common front end
        apps
      </>
    ),
    href: '/prepare/system-design',
    label: 'System Design',
    value: 'system-design',
  },
  {
    description: (
      <>
        Strategies to tackle the wide domain of behavioral interviews, specific
        to SWE
      </>
    ),
    href: '/prepare/behavioral',
    label: 'Behavioral',
    value: 'behavioral',
  },
];

export default function QuestionFormatTitleSection({ format }: Props) {
  return (
    <div>
      <Heading className="sr-only">Preparation Stages</Heading>
      <Section>
        <div className="grid gap-6 xl:grid-cols-4">
          <div className="col-span-3 grid gap-y-6">
            <TextPairing
              description={
                <>
                  Prepare holistically for all types of front end interview
                  questions and rounds. Guides and {QuestionCount}+ practice
                  questions included.
                </>
              }
              sectionLabel={
                <>
                  Front End Engineer &middot; Web Developer &middot; Full Stack
                  Engineer
                </>
              }
              size="lg"
              title="Front End Interview Preparation"
            />
          </div>
          <div>
            <p className="bg-brand-100 text-brand-600 border p-3 text-xs">
              First time preparing for front end interviews? Find out what to
              expect in our{' '}
              <Anchor href="/front-end-interview-guidebook" underline={true}>
                Front End Interview Guidebook
              </Anchor>
              .
            </p>
          </div>
        </div>
        <div className="mt-8 flex overflow-y-auto md:mt-12 lg:block">
          <div className="min-w-full flex-none pb-4 md:pb-8">
            <div className="grid grid-cols-4 gap-x-4 border-t border-slate-200 md:gap-x-6 lg:gap-x-8">
              {items.map(({ description, href, label, value }, index) => (
                <div
                  key={value}
                  className={clsx(
                    'group relative -mt-px flex flex-none flex-col items-start border-t pt-4 text-left md:w-[35vw] md:pt-8 lg:w-auto',
                    format === value
                      ? 'border-brand-500'
                      : 'hover:border-brand-500',
                  )}>
                  <p
                    className={clsx(
                      'text-sm leading-6 text-slate-600 md:rounded-full md:px-2 md:text-xs md:font-semibold md:leading-7',
                      format === value
                        ? 'md:bg-brand-500 md:text-white'
                        : 'md:bg-slate-100 md:group-hover:bg-slate-200',
                    )}>
                    <span className="font-medium">Stage {index + 1}</span>
                  </p>
                  <Heading className="md:mt-4">
                    <Anchor
                      className={clsx(
                        'text-sm font-semibold md:text-base md:leading-7',
                        format === value ? 'text-brand-600' : 'text-slate-900',
                      )}
                      href={href}
                      variant="unstyled">
                      <span className="absolute inset-0 -top-px"></span>
                      {label}
                    </Anchor>
                  </Heading>
                  <p className="mt-2 hidden text-sm leading-6 text-slate-700 md:block">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
