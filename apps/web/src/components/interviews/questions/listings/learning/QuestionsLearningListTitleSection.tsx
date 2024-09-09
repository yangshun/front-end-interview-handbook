import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { PreparationPlanSchedule } from '~/data/plans/PreparationPlans';

import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionDifficultySummary from '~/components/interviews/questions/metadata/QuestionDifficultySummary';
import QuestionStudyAllocationLabel from '~/components/interviews/questions/metadata/QuestionStudyAllocationLabel';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import QuestionsListSession from './QuestionsListSession';
import type {
  QuestionDifficulty,
  QuestionFeatureType,
  QuestionMetadata,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  description?: ReactNode;
  difficultySummary?: Record<QuestionDifficulty, number>;
  feature?: QuestionFeatureType;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  logoImgSrc?: string;
  overallProgress: ReadonlyArray<QuestionProgress>;
  progressTrackingAvailableToNonPremiumUsers?: boolean;
  questionCount: number;
  questionListKey: string;
  questions: ReadonlyArray<QuestionMetadata>;
  schedule?: PreparationPlanSchedule;
  themeBackgroundClass: string;
  title: string;
}>;

export default function QuestionsLearningListTitleSection({
  description,
  difficultySummary,
  icon: Icon,
  logoImgSrc,
  progressTrackingAvailableToNonPremiumUsers = false,
  questionListKey,
  questionCount,
  schedule,
  themeBackgroundClass,
  title,
  overallProgress,
  questions,
  feature = 'premium-questions',
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-x-8 gap-y-4 md:flex-row">
      <div className="flex flex-col gap-4">
        <div className="flex gap-x-6">
          <div
            className={clsx(
              'inline-flex shrink-0 items-center justify-center',
              'size-16 rounded-lg',
              'text-white',
              themeBackgroundClass,
            )}>
            {logoImgSrc ? (
              <img
                alt={title}
                className="size-10"
                decoding="async"
                loading="lazy"
                src={logoImgSrc}
              />
            ) : (
              <Icon aria-hidden={true} className="size-10" />
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Heading level="heading5">{title}</Heading>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <QuestionCountLabel count={questionCount} showIcon={true} />
              {schedule != null && (
                <QuestionStudyAllocationLabel
                  frequency={schedule.frequency}
                  hours={schedule.hours}
                  showIcon={true}
                />
              )}
              {difficultySummary && (
                <QuestionDifficultySummary
                  easy={difficultySummary.easy}
                  hard={difficultySummary.hard}
                  medium={difficultySummary.medium}
                  showIcon={true}
                />
              )}
            </div>
          </div>
        </div>
        {description && (
          <Text className="block max-w-3xl" color="secondary" size="body2">
            {description}
          </Text>
        )}
      </div>
      <QuestionsListSession
        feature={feature}
        overallProgress={overallProgress}
        progressTrackingAvailableToNonPremiumUsers={
          progressTrackingAvailableToNonPremiumUsers
        }
        questionCount={questionCount}
        questionListKey={questionListKey}
        questions={questions}
        themeBackgroundClass={themeBackgroundClass}
      />
    </div>
  );
}
