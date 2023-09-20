'use client';

import { RiArrowLeftLine } from 'react-icons/ri';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import PromoBanner from '~/components/global/banners/PromoBanner';
import NavbarImpl from '~/components/global/navbar/NavbarImpl';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionMetadataSection from '~/components/questions/metadata/QuestionMetadataSection';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

export default function CodingWorkspacePaywallPage({ metadata }: Props) {
  return (
    <>
      <PromoBanner />
      <NavbarImpl />
      <Container>
        <div
          className="flex flex-col items-center gap-y-8 py-16 sm:justify-center"
          style={{
            height: FooterlessContainerHeight,
          }}>
          <div className="flex flex-col gap-y-4 text-center">
            <Heading level="heading3">{metadata.title}</Heading>
            <QuestionMetadataSection metadata={metadata} />
          </div>
          <Section>
            <div className="flex flex-col items-center gap-y-4">
              <QuestionPaywall />
              <Button
                addonPosition="start"
                href="/prepare/coding"
                icon={RiArrowLeftLine}
                label="Back to questions list"
                variant="secondary"
              />
            </div>
          </Section>
        </div>
      </Container>
    </>
  );
}
