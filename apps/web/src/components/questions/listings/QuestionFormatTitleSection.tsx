import clsx from 'clsx';
import type { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { QuestionCount } from '~/components/questions/listings/QuestionCount';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeLineColor,
  themeTextBrandColor,
  themeTextColor,
} from '~/components/ui/theme';

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
  const intl = useIntl();
  const stages = useStageItems();

  return (
    <div>
      <Heading className="sr-only" level="custom">
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
                <div>
                  <FormattedMessage
                    defaultMessage="Front End Engineer"
                    description="Front End Engineer job title"
                    id="j3EFJn"
                  />
                  <span aria-hidden={true} className="mx-2">
                    &middot;
                  </span>
                  <FormattedMessage
                    defaultMessage="Web Developer"
                    description="Web Developer job title"
                    id="yRjuKv"
                  />
                  <span aria-hidden={true} className="mx-2">
                    &middot;
                  </span>
                  <FormattedMessage
                    defaultMessage="Full Stack Engineer"
                    description="Full Stack Engineer job title"
                    id="dxwKBt"
                  />
                </div>
              }
              title={intl.formatMessage({
                defaultMessage: 'Front End Interview Preparation',
                description: 'Front end interview preparation pages title',
                id: 'cgpi3r',
              })}
            />
          </div>
          <div>
            <Text
              className={clsx('bg-brand-lightest dark:bg-brand-darkest p-3')}
              color="active"
              display="block"
              size="body3">
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
            </Text>
          </div>
        </div>
        <div className="mt-8 flex overflow-y-auto md:mt-12 lg:block">
          <div className="min-w-full flex-none pb-4 md:pb-8">
            <div
              className={clsx(
                'grid grid-cols-4 gap-x-4 border-t md:gap-x-6 lg:gap-x-8',
                themeLineColor,
              )}>
              {stages.map(({ description, href, label, value }, index) => (
                <div
                  key={value}
                  className={clsx(
                    'group relative -mt-px flex flex-none flex-col items-start border-t pt-4 text-left md:w-[35vw] md:pt-8 lg:w-auto',
                    format === value
                      ? 'border-brand'
                      : clsx(themeLineColor, 'hover:border-brand'),
                  )}>
                  <div
                    className={clsx(
                      'md:rounded-full md:px-2',
                      format === value
                        ? 'md:bg-brand-dark dark:md:bg-brand'
                        : clsx(
                            themeBackgroundEmphasized,
                            'md:group-hover:bg-neutral-200 dark:md:group-hover:bg-neutral-800',
                          ),
                    )}>
                    <Text
                      className="leading-6 md:leading-7"
                      color={format === value ? 'default' : 'secondary'}
                      size="body3"
                      weight="bold">
                      <FormattedMessage
                        defaultMessage="Stage {stageNumber}"
                        description="Preparation stage number"
                        id="W7BkGp"
                        values={{
                          stageNumber: index + 1,
                        }}
                      />
                    </Text>
                  </div>
                  <Heading className="md:mt-4" level="custom">
                    <Anchor
                      className={clsx(
                        'text-sm font-semibold md:text-base md:leading-7',
                        format === value ? themeTextBrandColor : themeTextColor,
                      )}
                      href={href}
                      variant="unstyled">
                      <span className="absolute inset-0 -top-px"></span>
                      {label}
                    </Anchor>
                  </Heading>
                  <Text
                    className="mt-2 hidden leading-6 md:block"
                    color="secondary"
                    display="block"
                    size="body2">
                    {description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
