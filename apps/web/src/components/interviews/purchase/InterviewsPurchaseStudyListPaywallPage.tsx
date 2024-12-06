'use client';

import clsx from 'clsx';
import { RiArrowLeftLine } from 'react-icons/ri';

import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import Button from '~/components/ui/Button';

type Props = Readonly<{
  studyListHref: string;
}>;

export default function InterviewsPurchaseStudyListPaywallPage({
  studyListHref,
}: Props) {
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
        <QuestionPaywall background="none" feature="study-lists" />
        <Button
          addonPosition="start"
          href={studyListHref}
          icon={RiArrowLeftLine}
          label="Back to study list"
          variant="secondary"
        />
      </div>
    </div>
  );
}
