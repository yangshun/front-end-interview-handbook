'use client';

import { RiArrowLeftLine } from 'react-icons/ri';

import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

export default function CodingWorkspacePaywallPage({ metadata }: Props) {
  return (
    <Container>
      <div className="flex h-[calc(100vh_-_var(--global-sticky-height))] flex-col items-center gap-y-8 py-16 sm:justify-center">
        <div className="flex flex-col gap-y-4 text-center">
          <Heading level="heading3">{metadata.title}</Heading>
          <QuestionMetadataSection metadata={metadata} />
        </div>
        <Section>
          <div className="flex flex-col items-center gap-y-4">
            <QuestionPaywall />
            <Button
              addonPosition="start"
              href="/questions"
              icon={RiArrowLeftLine}
              label="Back to questions list"
              variant="secondary"
            />
          </div>
        </Section>
      </div>
    </Container>
  );
}
