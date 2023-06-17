'use client';

import { useIntl } from 'react-intl';

import { useSystemDesignLearningContent } from '~/components/questions/content/system-design/SystemDesignNavigation';
import QuestionsFocusAreas from '~/components/questions/listings/auxilliary/QuestionsFocusAreas';
import QuestionsPreparationOnboarding from '~/components/questions/listings/auxilliary/QuestionsPreparationOnboarding';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import QuestionPreparationPageHeader from '~/components/questions/listings/headers/QuestionPreparationPageHeader';
import QuestionsSystemDesignListWithFilters from '~/components/questions/listings/items/QuestionsSystemDesignListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function PrepareSystemDesignQuestionsPage() {
  const intl = useIntl();
  const systemDesignLearningContent = useSystemDesignLearningContent();

  return (
    <Container className="grid gap-y-12 py-8" variant="normal">
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage: 'Front End Interview Preparation — System Design',
          description:
            'Prepare for front end interview system design questions',
          id: '8KNiXb',
        })}
      </Heading>
      <Section>
        <div className="flex flex-col gap-y-6">
          <QuestionPreparationPageHeader />
          <QuestionsPreparationOnboarding />
        </div>
        <QuestionsFocusAreas />
        <QuestionsPreparationTabs area="system-design" />
        <QuestionsSystemDesignListWithFilters />
      </Section>
    </Container>
  );
}
