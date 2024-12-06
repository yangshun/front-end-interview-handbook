'use client';

import clsx from 'clsx';

import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import CodingWorkspaceBottomBar from '../../workspace/common/CodingWorkspaceBottomBar';

type Props = Readonly<{
  metadata: QuestionMetadata;
  mode: 'practice' | 'solution';
  studyListKey?: string;
}>;

export default function InterviewsPurchaseQuestionPaywallPage({
  metadata,
  mode,
  studyListKey,
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
        <div className="flex flex-col gap-y-4 text-center">
          <Heading level="heading4">{metadata.title}</Heading>
          <QuestionMetadataSection metadata={metadata} />
        </div>
        <Section>
          <QuestionPaywall
            feature={
              mode === 'solution' ? 'official-solutions' : 'premium-questions'
            }
          />
        </Section>
      </div>
      <CodingWorkspaceBottomBar
        metadata={metadata}
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout"
        studyListKey={studyListKey}
      />
    </div>
  );
}
