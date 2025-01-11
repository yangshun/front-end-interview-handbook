'use client';

import clsx from 'clsx';

import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsStudyListBottomBar from '~/components/interviews/questions/listings/study-list/InterviewsStudyListBottomBar';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

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
        'min-h-[calc(100vh_-_var(--global-sticky-height))]',
      )}>
      <Container
        // Cannot vertically center via flex otherwise on
        // short viewports it will get cut off
        className={clsx('grow flex-col gap-y-6', 'py-[10vh]')}
        width="2xl">
        <div className="flex flex-col items-center gap-y-4">
          <Heading level="heading4">{metadata.title}</Heading>
          <QuestionMetadataSection justify="start" metadata={metadata} />
        </div>
        <Section>
          <div className="mt-6">
            <InterviewsPurchasePaywall
              premiumFeature={
                mode === 'solution' ? 'official-solutions' : 'premium-questions'
              }
            />
          </div>
        </Section>
      </Container>
      <InterviewsStudyListBottomBar
        allowMarkComplete={false}
        metadata={metadata}
        studyListKey={studyListKey}
      />
    </div>
  );
}
