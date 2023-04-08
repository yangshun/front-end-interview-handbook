'use client';

import { useIntl } from 'react-intl';

import PromoBanner from '~/components/global/banners/PromoBanner';
import { useSystemDesignLearningContent } from '~/components/questions/content/system-design/SystemDesignNavigation';
import QuestionFormatTitleSection from '~/components/questions/listings/QuestionFormatTitleSection';
import QuestionsGuidesGrid from '~/components/questions/listings/QuestionsGuidesGrid';
import QuestionsSystemDesignListWithFilters from '~/components/questions/listings/QuestionsSystemDesignListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function PrepareSystemDesignQuestionsPage() {
  const intl = useIntl();
  const systemDesignLearningContent = useSystemDesignLearningContent();

  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-12 py-8 md:py-12" variant="normal">
        <Heading className="sr-only">
          {intl.formatMessage({
            defaultMessage: 'Front End Interview Preparation — System Design',
            description:
              'Prepare for front end interview system design questions',
            id: '8KNiXb',
          })}
        </Heading>
        <Section>
          <QuestionFormatTitleSection format="system-design" />
          <QuestionsGuidesGrid
            columns={6}
            items={systemDesignLearningContent}
            title={intl.formatMessage({
              defaultMessage: 'System Design Study Guides',
              description: 'System design interview study guides',
              id: '/4g12b',
            })}
          />
          <div className="grid gap-4">
            <Heading className="text-lg font-semibold text-slate-900">
              {intl.formatMessage({
                defaultMessage: 'System Design Practice Questions',
                description: 'Coding question list title',
                id: 'iOfgIz',
              })}
            </Heading>
            <Section>
              <QuestionsSystemDesignListWithFilters category="systemDesign" />
            </Section>
          </div>
        </Section>
      </Container>
    </>
  );
}
