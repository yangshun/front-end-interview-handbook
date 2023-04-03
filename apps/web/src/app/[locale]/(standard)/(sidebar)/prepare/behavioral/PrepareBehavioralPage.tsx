'use client';

import { useIntl } from 'react-intl';

import PromoBanner from '~/components/global/PromoBanner';
import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import QuestionFormatTitleSection from '~/components/questions/listings/QuestionFormatTitleSection';
import QuestionsGuidesGrid from '~/components/questions/listings/QuestionsGuidesGrid';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function PrepareBehavioralInterviewPage() {
  const intl = useIntl();
  const behavioralInterviewGuidebookNavigation =
    useBehavioralInterviewGuidebookNavigation();

  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only">
          {intl.formatMessage({
            defaultMessage:
              'Front End Interview Preparation — Behavioral Interviews',
            description: 'Prepare for front end interview behavioral questions',
            id: 'LnN52b',
          })}
        </Heading>
        <Section>
          <QuestionFormatTitleSection format="behavioral" />
          <QuestionsGuidesGrid
            items={behavioralInterviewGuidebookNavigation.items
              .map((item) => item.links)
              .flat()}
            title={intl.formatMessage({
              defaultMessage: 'Behavioral Interview Study Guides',
              description: 'Behavioral interview study guides',
              id: 's7CwKz',
            })}
          />
        </Section>
      </Container>
    </>
  );
}
