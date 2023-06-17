'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import usePreparationPlans from '~/data/PreparationPlans';

import type { PreparationPlan } from '~/components/questions/common/PreparationPlanTypes';
import QuestionCountLabel from '~/components/questions/common/QuestionCountLabel';
import QuestionStudyAllocationLabel from '~/components/questions/common/QuestionStudyAllocationLabel';
import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

import CompletionCountSummary from './CompletionCountSummary';
import DifficultySummary from './DifficultySummary';

function PreparationPlanCard({
  plan: { title, description, questions, href },
}: {
  plan: PreparationPlan;
}) {
  const questionCount = Object.values(questions)
    .map((q) => q.length)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div
      className={clsx(
        'group flex flex-1 items-center gap-6 rounded-lg bg-white p-5 transition dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
        themeGlassyBorder,
      )}>
      <div className="h-20 w-20 rounded-[5px] bg-neutral-200/70 dark:bg-neutral-800" />
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Anchor href={href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Heading level="heading6">{title}</Heading>
          </Anchor>
          <Text color="secondary" size="body3">
            {description}
          </Text>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          <QuestionCountLabel count={questionCount} showIcon={true} />
          <QuestionStudyAllocationLabel
            frequency="daily"
            hours={2}
            showIcon={true}
          />
          <DifficultySummary easy={30} hard={10} medium={20} showIcon={true} />
          <CompletionCountSummary completed={10} total={10} />
        </div>
      </div>
      <RiArrowRightLine className="text-neutral-400" />
    </div>
  );
}

type PreparationPlanSection = {
  plans: Array<PreparationPlan>;
  title: string;
};

export default function StudyPlansPage() {
  const intl = useIntl();
  const preparationPlans = usePreparationPlans();

  const preparationPlanSections: Array<PreparationPlanSection> = [
    {
      plans: (['one-week', 'one-month', 'three-months'] as const).map(
        (key) => preparationPlans[key],
      ),
      // TODO: add i18n for this in the study plan collection
      title: 'Holistic study plans',
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
        <div className="flex items-start gap-6">
          <div className="flex flex-1 flex-col gap-12">
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
          <div className="flex w-[266px] flex-col gap-6">
            <Heading level="heading6">Hear from our users</Heading>
            <Section>
              <Card className={clsx('h-[150px]')}>{null}</Card>
              <Card className={clsx('h-[150px]')}>{null}</Card>
            </Section>
          </div>
        </div>
      </Section>
    </div>
  );
}
