'use client';

import clsx from 'clsx';
import { RiArrowLeftLine } from 'react-icons/ri';

import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import type { InterviewsPurchasePremiumFeature } from './InterviewsPurchaseTypes';

// Keep in sync with InterviewsStudyListDocument.category.
type StudyListCategory = 'company' | 'focus-area' | 'study-plan';

type Props = Readonly<{
  studyListCategory: StudyListCategory;
}>;

const studyListCategoryToFeature: Record<
  StudyListCategory,
  InterviewsPurchasePremiumFeature
> = {
  company: 'company-guides',
  'focus-area': 'focus-areas',
  'study-plan': 'study-plans',
};

export default function InterviewsPurchaseStudyListPaywallPage({
  studyListCategory,
}: Props) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'flex flex-col',
        'h-[calc(100vh_-_var(--global-sticky-height))]',
      )}>
      <div
        className={clsx(
          'flex grow flex-col items-center justify-center',
          'gap-y-8',
          'px-6 py-8',
        )}>
        <InterviewsPurchasePaywall
          background="none"
          premiumFeature={studyListCategoryToFeature[studyListCategory]}
        />
        <Button
          addonPosition="start"
          href="/interviews/dashboard"
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'Back to dashboard',
            description: 'Back to dashboard button label',
            id: 'lN+yNL',
          })}
          variant="secondary"
        />
      </div>
    </div>
  );
}
