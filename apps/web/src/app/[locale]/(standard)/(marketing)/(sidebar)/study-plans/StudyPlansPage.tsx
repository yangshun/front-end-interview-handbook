'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { PreparationPlanExtra } from '~/data/PreparationPlansUI';
import { usePreparationPlansUI } from '~/data/PreparationPlansUI';
import type { Testimonial } from '~/data/Testimonials';
import { useTestimonials } from '~/data/Testimonials';

import QuestionCountLabel from '~/components/questions/common/QuestionCountLabel';
import QuestionDifficultySummary from '~/components/questions/common/QuestionDifficultySummary';
import QuestionStudyAllocationLabel from '~/components/questions/common/QuestionStudyAllocationLabel';
import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

import CompletionCountSummary from './CompletionCountSummary';

function PreparationPlanCard({
  plan: {
    backgroundClass,
    name,
    description,
    questions,
    href,
    iconOutline: Icon,
  },
}: {
  plan: PreparationPlanExtra;
}) {
  const questionCount = Object.values(questions)
    .map((q) => q.length)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div
      className={clsx(
        'group relative flex flex-1 items-center gap-6 rounded-lg py-5 px-8',
        'bg-white transition dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
        themeGlassyBorder,
      )}>
      <div
        className={clsx(
          'flex h-20 w-20 items-center justify-center rounded-[5px]',
          backgroundClass,
        )}>
        <Icon className="h-10 w-10 text-white" />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Anchor href={href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Heading level="heading6">{name}</Heading>
          </Anchor>
          <Text color="secondary" size="body3">
            {description}
          </Text>
        </div>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
          <QuestionCountLabel count={questionCount} showIcon={true} />
          {/* TODO(redesign): calculate daily. */}
          <QuestionStudyAllocationLabel
            frequency="daily"
            hours={2}
            showIcon={true}
          />
          {/* TODO(redesign): calculate breakdown. */}
          <QuestionDifficultySummary
            easy={30}
            hard={10}
            medium={20}
            showIcon={true}
          />
          {false && (
            // TODO(redesign): fetch progress.
            <CompletionCountSummary completed={10} total={questionCount} />
          )}
        </div>
      </div>
      <RiArrowRightLine className="h-6 w-6 text-neutral-400" />
    </div>
  );
}

type PreparationPlanSection = Readonly<{
  plans: Array<PreparationPlanExtra>;
  title: string;
}>;

function TestimonialCard({
  authorThumbnailUrl,
  name,
  testimonial,
  title,
  location,
}: Testimonial) {
  return (
    <Card className="grid gap-y-4">
      <Text display="block" size="body2">
        "{testimonial}"
      </Text>
      <div className="flex items-center gap-x-4">
        {authorThumbnailUrl && (
          <img
            alt={name}
            className="h-8 w-8 shrink-0 rounded-full"
            src={authorThumbnailUrl}
          />
        )}
        <div>
          <Text display="block" size="body2">
            {name}
          </Text>
          <Text color="secondary" display="block" size="body3">
            {title ?? location}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default function StudyPlansPage() {
  const intl = useIntl();
  const preparationPlans = usePreparationPlansUI();
  const testimonials = useTestimonials();

  const preparationPlanSections: Array<PreparationPlanSection> = [
    {
      plans: (['one-week', 'one-month', 'three-months'] as const).map(
        (key) => preparationPlans[key],
      ),
      title: intl.formatMessage({
        defaultMessage: 'Holistic study plans',
        description: 'Title of list of study plans',
        id: '2LouBj',
      }),
    },
  ];

  return (
    <div className="h-full p-8">
      <div className="mb-12 flex flex-col gap-3">
        <Heading level="heading4">
          {intl.formatMessage({
            defaultMessage: 'Study plans',
            description: 'Title of study plans page',
            id: 'swjkuF',
          })}
        </Heading>
        <Text color="secondary" display="block" size="body2">
          {intl.formatMessage({
            defaultMessage:
              'Discover study plans tailored to your needs to help your prepare for your upcoming technical interviews.',
            description: 'Description for study plans page',
            id: '2vDjTb',
          })}
        </Text>
      </div>
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-1 flex-col gap-12 lg:col-span-2">
            {preparationPlanSections.map(({ plans, title }) => (
              <div key={title}>
                <Heading className="mb-6" level="heading5">
                  {title}
                </Heading>
                <Section>
                  <div className="flex flex-col gap-4">
                    {plans.map((plan) => (
                      <PreparationPlanCard key={plan.type} plan={plan} />
                    ))}
                  </div>
                </Section>
              </div>
            ))}
          </div>
          <div className="hidden flex-col gap-6 md:flex">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Hear from our users"
                description="Title of testimonials section"
                id="pRxRs2"
              />
            </Heading>
            <Section>
              <CardContainer>
                <div className="flex flex-col gap-y-4">
                  <TestimonialCard {...testimonials.alan} />
                  <TestimonialCard {...testimonials.luke} />
                </div>
              </CardContainer>
            </Section>
          </div>
        </div>
      </Section>
    </div>
  );
}
