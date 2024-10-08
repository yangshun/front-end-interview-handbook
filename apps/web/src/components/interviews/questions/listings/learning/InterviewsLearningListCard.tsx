import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import type { PreparationPlanSchedule } from '~/data/plans/PreparationPlans';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import type {
  QuestionList,
  QuestionListTheme,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionStudyAllocationLabel from '~/components/interviews/questions/metadata/QuestionStudyAllocationLabel';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

type Props = Readonly<{
  completionCount?: number;
  isStarted?: boolean;
  metadata: QuestionList;
  schedule?: PreparationPlanSchedule;
  theme: QuestionListTheme;
}>;

export default function InterviewsLearningListCard({
  completionCount = 0,
  metadata,
  schedule,
  theme,
}: Props) {
  const { name, shortDescription, questions, href } = metadata;
  const questionCount = countNumberOfQuestionsInList(questions);

  return (
    <div
      className={clsx(
        'group',
        'relative isolate',
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
          <div className="flex flex-col items-start gap-1">
            <Text size="body0" weight="bold">
              {name}
            </Text>
            <Text color="secondary" size="body2">
              {shortDescription}
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 md:gap-x-10">
            <InterviewsEntityProgress
              completed={completionCount}
              title={name}
              total={questionCount}
              type="question"
            />
            {schedule && (
              <QuestionStudyAllocationLabel
                frequency={schedule.frequency}
                hours={schedule.hours}
                showIcon={true}
              />
            )}
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
      <Anchor aria-label={name} className="absolute inset-0" href={href} />
    </div>
  );
}
