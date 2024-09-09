import clsx from 'clsx';
import type { ReactNode } from 'react';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import InterviewsPageHeaderLogo from '~/components/interviews/common/InterviewsPageHeaderLogo';
import type {
  QuestionFeatureType,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import QuestionsListSession from './QuestionsListSession';

type CommonProps = Readonly<{
  description: ReactNode;
  feature?: QuestionFeatureType;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  logo?: React.ReactNode;
  logoImgSrc?: string;
  overallProgress: ReadonlyArray<QuestionProgress>;
  progressTrackingAvailableToNonPremiumUsers?: boolean;
  questions: ReadonlyArray<QuestionMetadata>;
  questionsSessionKey?: string;
  themeBackgroundClass: string;
  title: string;
}>;

type WithIconProps = CommonProps &
  Readonly<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  }>;

type WithLogoProps = CommonProps &
  Readonly<{
    logo: React.ReactNode;
  }>;

type Props = WithIconProps | WithLogoProps;

export default function QuestionsLearningListPageTitleSection({
  description,
  themeBackgroundClass,
  title,
  features,
  overallProgress,
  questions,
  progressTrackingAvailableToNonPremiumUsers = false,
  logoImgSrc,
  feature,
  ...props
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-x-4 gap-y-8 md:flex-row">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center gap-6">
          {'logo' in props ? (
            props.logo
          ) : logoImgSrc ? (
            <div
              className={clsx(
                'inline-flex shrink-0 items-center justify-center',
                'size-16 rounded-lg shadow-md',
                'bg-white',
              )}>
              <img
                alt={title}
                className="size-9"
                decoding="async"
                loading="lazy"
                src={logoImgSrc}
              />
            </div>
          ) : (
            <InterviewsPageHeaderLogo
              icon={props.icon}
              startColor="#EAE8FF"
              stopColor="#787878"
            />
          )}
          <Heading className={themeTextColor} color="custom" level="heading4">
            {title}
          </Heading>
        </div>
        <div className="flex max-w-3xl flex-col gap-10">
          <Text color="subtitle" size="body1" weight="medium">
            {description}
          </Text>

          {/* Features */}
          <InterviewsPageFeatures features={features} />
        </div>
      </div>
      {/* Start/End Session */}
      {props.questionsSessionKey && (
        <QuestionsListSession
          feature={feature}
          overallProgress={overallProgress}
          progressTrackingAvailableToNonPremiumUsers={
            progressTrackingAvailableToNonPremiumUsers
          }
          questionCount={questions.length}
          questionListKey={props.questionsSessionKey}
          questions={questions}
          themeBackgroundClass={themeBackgroundClass}
        />
      )}
    </div>
  );
}
