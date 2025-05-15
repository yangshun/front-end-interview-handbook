import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import React, { type ReactNode } from 'react';

import { trpc } from '~/hooks/trpc';

import InterviewsPageLongDescription from '~/components/interviews/common/InterviewsPageLongDescription';
import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Tooltip from '~/components/ui/Tooltip';

import InterviewsPageHeaderActions from '../common/InterviewsPageHeaderActions';
import type { InterviewsQuestionItemMinimal } from '../questions/common/QuestionsTypes';
import InterviewsStudyListPageTitleSection from '../questions/listings/study-list/InterviewsStudyListPageTitleSection';
import InterviewsRecommendedPrepStrategyPopover from './InterviewsRecommendedPrepStrategyPopover';

type CommonProps = Readonly<{
  beforeDividerElement?: ReactNode;
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
  questions?: ReadonlyArray<InterviewsQuestionItemMinimal>;
  studyListKey: string | null;
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
  features,
  longDescription,
  metadata,
  questions,
  title,
  ...props
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    { enabled: !!user },
  );

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
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
              overallProgress={questionProgressParam ?? []}
            />
          </div>
          {metadata && (
            <div className="flex flex-1 justify-end">
              <InterviewsPageHeaderActions metadata={metadata} />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-8">
        <InterviewsStudyListPageTitleSection
          description={description}
          features={features}
          overallProgress={questionProgressParam ?? []}
          progressTrackingAvailableToNonPremiumUsers={true}
          questions={questions ?? []}
          title={title}
          {...props}
        />
        <InterviewsPageLongDescription>
          {longDescription}
        </InterviewsPageLongDescription>
      </div>
    </div>
  );
}
