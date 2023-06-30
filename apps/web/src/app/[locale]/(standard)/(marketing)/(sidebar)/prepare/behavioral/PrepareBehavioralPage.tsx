'use client';

import { useIntl } from 'react-intl';

import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import QuestionsFocusAreas from '~/components/questions/listings/auxilliary/DashboardFeaturedFocusAreas';
import QuestionsGuidesGrid from '~/components/questions/listings/auxilliary/QuestionsGuidesGrid';
import QuestionsPreparationOnboarding from '~/components/questions/listings/auxilliary/QuestionsPreparationOnboarding';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import QuestionPreparationPageHeader from '~/components/questions/listings/headers/QuestionPreparationPageHeader';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function PrepareBehavioralInterviewPage() {
  const intl = useIntl();
  const behavioralInterviewGuidebookNavigation =
    useBehavioralInterviewGuidebookNavigation();

  return (
    <Container className="grid gap-y-12 py-8" variant="normal">
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage:
            'Front End Interview Preparation — Behavioral Interviews',
          description: 'Prepare for front end interview behavioral questions',
          id: 'LnN52b',
        })}
      </Heading>
      <Section>
        <div className="flex flex-col gap-y-6">
          <QuestionPreparationPageHeader />
          <QuestionsPreparationOnboarding />
        </div>
        <QuestionsFocusAreas />
        <QuestionsPreparationTabs area="behavioral" />
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
  );
}
