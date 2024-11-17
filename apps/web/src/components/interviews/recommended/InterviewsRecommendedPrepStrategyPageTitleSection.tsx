import clsx from 'clsx';
import { type ReactNode } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';

import InterviewsRecommendedPrepStrategyPopover from './InterviewsRecommendedPrepStrategyPopover';
import InterviewsPageHeaderActions from '../common/InterviewsPageHeaderActions';
import type { QuestionMetadata } from '../questions/common/QuestionsTypes';
import QuestionsStudyListPageTitleSection from '../questions/listings/learning/QuestionsStudyListPageTitleSection';

type CommonProps = Readonly<{
  description: ReactNode;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  longDescription: ReactNode;
  metadata?: {
    description: string;
    href: string;
    title: string;
  };
  overallProgress?: ReadonlyArray<QuestionProgress>;
  questions?: ReadonlyArray<QuestionMetadata>;
  questionsSessionKey?: string;
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

export default function InterviewsRecommendedPrepStrategyPageTitleSection({
  description,
  title,
  features,
  longDescription,
  metadata,
  questions,
  overallProgress,
  ...props
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-8">
      {metadata && (
        <div
          className={clsx(
            'flex flex-wrap items-center justify-between gap-x-2 gap-y-4',
            'h-7', // Add a fixed height so that the page contents don't shift around when navigating between pages that don't have metadata.
          )}>
          <div className="flex items-center gap-3">
            <Tooltip
              asChild={true}
              label={
                <FormattedMessage
                  defaultMessage="This study list is part of our recommended preparation strategy."
                  description="Tooltip for recommended preparation strategy badge"
                  id="G+XbLQ"
                />
              }>
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Recommended',
                  description: 'Label for Recommended tag',
                  id: 'baItxW',
                })}
                size="xs"
                variant="neutral-active"
              />
            </Tooltip>
            <InterviewsRecommendedPrepStrategyPopover
              overallProgress={overallProgress ?? []}
            />
          </div>
          {metadata && (
            <div className="flex flex-1 justify-end">
              <InterviewsPageHeaderActions metadata={metadata} />
            </div>
          )}
        </div>
      )}
      <QuestionsStudyListPageTitleSection
        description={description}
        features={features}
        overallProgress={overallProgress ?? []}
        progressTrackingAvailableToNonPremiumUsers={true}
        questions={questions ?? []}
        title={title}
        {...props}
      />
      <div className={clsx('grid lg:grid-cols-12')}>
        <div className="lg:col-span-9">{longDescription}</div>
      </div>
    </div>
  );
}
