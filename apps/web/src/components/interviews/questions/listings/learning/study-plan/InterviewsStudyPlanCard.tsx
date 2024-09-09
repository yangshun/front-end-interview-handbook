import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import {
  getPreparationPlanTheme,
  type PreparationPlan,
} from '~/data/plans/PreparationPlans';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import QuestionStudyAllocationLabel from '~/components/interviews/questions/metadata/QuestionStudyAllocationLabel';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextColor,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

export default function InterviewsStudyPlanCard({
  plan: { type, name, description, questions, href, schedule },
  isStarted = false,
  completionCount = 0,
}: {
  completionCount?: number;
  isStarted?: boolean;
  plan: PreparationPlan;
}) {
  const questionCount = countNumberOfQuestionsInList(questions);
  const theme = getPreparationPlanTheme(type);

  return (
    <div
      className={clsx(
        'group relative',
        'flex flex-grow items-center gap-2 md:gap-6',
        'rounded-lg',
        'px-6 py-5',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
      )}>
      <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center">
        <div
          className={clsx(
            'flex items-center justify-center',
            'size-12 shrink-0',
            'rounded-md',
            themeBackgroundLayerEmphasized,
            themeGlassyBorder,
          )}>
          <theme.iconOutline
            className={clsx('size-6', themeTextSubtitleColor)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Anchor href={href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Heading
                className={themeTextColor}
                color="custom"
                level="heading6">
                {name}
              </Heading>
            </Anchor>
            <Text color="secondary" size="body2">
              {description}
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 md:gap-x-10">
            <InterviewsEntityProgress
              completed={completionCount}
              progressClassName={theme.gradient.className}
              showProgress={isStarted ?? false}
              title={name}
              total={questionCount}
              type="question"
            />
            <QuestionStudyAllocationLabel
              frequency={schedule.frequency}
              hours={schedule.hours}
              showIcon={true}
            />
          </div>
        </div>
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-6 shrink-0 transition-colors',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
    </div>
  );
}
