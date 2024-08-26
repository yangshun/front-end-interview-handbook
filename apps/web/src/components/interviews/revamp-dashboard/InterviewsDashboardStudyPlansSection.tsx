import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import {
  getPreparationPlanTheme,
  type PreparationPlan,
  type PreparationPlans,
} from '~/data/plans/PreparationPlans';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextBrandColor_GroupHover,
  themeTextColor,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import InterviewsDashboardLearningSection from './InterviewsDashboardLearningSection';
import CompletionCountSummary from '../questions/listings/stats/CompletionCountSummary';
import QuestionCountLabel from '../questions/metadata/QuestionCountLabel';
import QuestionStudyAllocationLabel from '../questions/metadata/QuestionStudyAllocationLabel';

import type { LearningSession } from '@prisma/client';

function DashboardPreparationPlanCard({
  plan: { type, name, description, questions, href, schedule },
  isStarted,
  completionCount = 0,
}: {
  completionCount?: number;
  isStarted: boolean;
  plan: PreparationPlan;
}) {
  const questionCount = countNumberOfQuestionsInList(questions);
  const theme = getPreparationPlanTheme(type);

  const arrow = (
    <RiArrowRightLine
      className={clsx(
        'size-6 transition-colors',
        themeTextSubtleColor,
        themeTextBrandColor_GroupHover,
      )}
    />
  );

  return (
    <div
      className={clsx(
        'group relative',
        'flex flex-1 flex-col gap-6 md:flex-row',
        'rounded-lg',
        'px-6 py-5',
        themeBackgroundCardWhiteOnLightColor,
        themeBorderElementColor,
      )}>
      <div
        className={clsx(
          'size-10 md:size-12 flex items-center justify-center rounded-md',
          themeBackgroundLayerEmphasized,
          ['border', themeBorderElementColor],
        )}>
        <theme.iconOutline
          className={clsx('size-6 md:size-7', themeTextSubtitleColor)}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Anchor className="flex-1" href={href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Heading
                className={themeTextColor}
                color="custom"
                level="heading6">
                {name}
              </Heading>
            </Anchor>
            <div className="block md:hidden">{arrow}</div>
          </div>
          <Text color="secondary" size="body2">
            {description}
          </Text>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 md:gap-x-10">
          <QuestionCountLabel count={questionCount} showIcon={true} />
          <QuestionStudyAllocationLabel
            frequency={schedule.frequency}
            hours={schedule.hours}
            showIcon={true}
          />
          {isStarted && (
            <CompletionCountSummary
              completed={completionCount}
              total={questionCount}
            />
          )}
        </div>
      </div>
      <div className="hidden md:block">{arrow}</div>
    </div>
  );
}

type Props = Readonly<{
  preparationPlans: PreparationPlans;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardStudyPlansSection({
  preparationPlans,
  questionListSessions,
}: Props) {
  const intl = useIntl();

  const plans = (['one-week', 'one-month', 'three-months'] as const).map(
    (key) => preparationPlans[key],
  );

  return (
    <InterviewsDashboardLearningSection
      description={intl.formatMessage({
        defaultMessage: 'Prepare the best you can within any timeline.',
        description: 'Description for study plans section',
        id: '9B1Aqh',
      })}
      title={intl.formatMessage({
        defaultMessage: 'Study plans',
        description: 'Title for study plans section',
        id: 'KRGHVm',
      })}>
      <div className="flex flex-col gap-4">
        {plans.map((plan) => {
          const session = questionListSessions.find(
            (session_) => session_.key === plan.type,
          );
          const completionCount = session?._count.progress;

          return (
            <DashboardPreparationPlanCard
              key={plan.type}
              completionCount={completionCount}
              isStarted={session != null}
              plan={plan}
            />
          );
        })}
      </div>
    </InterviewsDashboardLearningSection>
  );
}
