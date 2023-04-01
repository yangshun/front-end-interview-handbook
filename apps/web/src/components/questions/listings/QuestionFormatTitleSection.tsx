import clsx from 'clsx';
import type { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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

function useStageItems() {
  const intl = useIntl();

  const stages: ReadonlyArray<{
    description: ReactNode;
    href: string;
    label: string;
    value: FormatValue;
  }> = [
    {
      description: (
        <FormattedMessage
          defaultMessage="All types of coding round questions from JS utilities to React user interfaces"
          description="Description for coding interview stage"
          id="hXf/Wl"
        />
      ),
      href: '/prepare/coding',
      label: intl.formatMessage({
        defaultMessage: 'Coding',
        description: 'Coding interviews stage label',
        id: 'IQnWm4',
      }),
      value: 'coding',
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Trivia-style front end questions asked across all interview rounds"
          description="Description for quiz interview stage"
          id="P4yQWv"
        />
      ),
      href: '/prepare/quiz',
      label: intl.formatMessage({
        defaultMessage: 'Quizzes',
        description: 'Quiz interviews stage label',
        id: 'KzFlkU',
      }),
      value: 'quiz',
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Design, architecture and optimization decisions for common front end apps"
          description="Description for system design interview stage"
          id="slAmNi"
        />
      ),
      href: '/prepare/system-design',
      label: intl.formatMessage({
        defaultMessage: 'System Design',
        description: 'System design interviews stage label',
        id: 'LeyIrf',
      }),
      value: 'system-design',
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Strategies to tackle the wide domain of behavioral interviews, specific to SWE"
          description="Description for behavioral interview stage"
          id="+/N6q+"
        />
      ),
      href: '/prepare/behavioral',
      label: intl.formatMessage({
        defaultMessage: 'Behavioral',
        description: 'Behavioral interviews stage label',
        id: 'wMMGUk',
      }),
      value: 'behavioral',
    },
  ];

  return stages;
}

export default function QuestionFormatTitleSection({ format }: Props) {
  const stages = useStageItems();

  return (
    <div>
      <Heading className="sr-only">
        <FormattedMessage
          defaultMessage="Preparation Stages"
          description="Preparation page title"
          id="MNRS6S"
        />
      </Heading>
      <Section>
        <div className="grid gap-6 xl:grid-cols-4">
          <div className="col-span-3 grid gap-y-6">
            <TextPairing
              description={
                <FormattedMessage
                  defaultMessage="Prepare holistically for all types of front end interview
                  questions and rounds. Guides and {QuestionCount}+ practice
                  questions included."
                  description="Preparation page subtitle"
                  id="dSaXF6"
                  values={{
                    QuestionCount,
                  }}
                />
              }
              sectionLabel={
                <div className="flex gap-x-2">
                  <FormattedMessage
                    defaultMessage="Front End Engineer"
                    description="Front End Engineer job title"
                    id="j3EFJn"
                  />
                  <span>&middot;</span>
                  <FormattedMessage
                    defaultMessage="Web Developer"
                    description="Web Developer job title"
                    id="yRjuKv"
                  />
                  <span>&middot;</span>
                  <FormattedMessage
                    defaultMessage="Full Stack Engineer"
                    description="Full Stack Engineer job title"
                    id="dxwKBt"
                  />
                </div>
              }
              size="lg"
              title="Front End Interview Preparation"
            />
          </div>
          <div>
            <p className="bg-brand-100 text-brand-600 border p-3 text-xs">
              <FormattedMessage
                defaultMessage="First time preparing for front end interviews? Find out what to
              expect in our <link>Front End Interview Guidebook</link>"
                description="Link to front end interview guidebook"
                id="MstQla"
                values={{
                  link: (chunk) => (
                    <Anchor
                      href="/front-end-interview-guidebook"
                      underline={true}>
                      {chunk}
                    </Anchor>
                  ),
                }}
              />
            </p>
          </div>
        </div>
        <div className="mt-8 flex overflow-y-auto md:mt-12 lg:block">
          <div className="min-w-full flex-none pb-4 md:pb-8">
            <div className="grid grid-cols-4 gap-x-4 border-t border-slate-200 md:gap-x-6 lg:gap-x-8">
              {stages.map(({ description, href, label, value }, index) => (
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
