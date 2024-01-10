import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';

export default function MarketingSystemDesignQuestionsExamples({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  const intl = useIntl();

  return (
    <div className={clsx('lg:grid lg:grid-cols-6 lg:gap-x-8')}>
      <div className="lg:col-span-2">
        <Text
          className="text-base sm:text-lg"
          color="active"
          display="block"
          size="inherit"
          weight="bold">
          <FormattedMessage
            defaultMessage="You can't find it elsewhere"
            description="Label for an example list of System Design Questions on marketing pages"
            id="kL0yEH"
          />
        </Text>
        <Heading className="mt-2" level="heading3">
          <FormattedMessage
            defaultMessage="System Design Questions"
            description="Title for an example list of System Design Questions on marketing pages"
            id="jnV/ZP"
          />
        </Heading>
        <Section>
          <Text
            className="py-10 text-lg md:text-xl"
            color="secondary"
            display="block"
            size="inherit">
            <FormattedMessage
              defaultMessage="Front end system design resources are virtually non-existent. This is the only place you'll find in-depth solutions for front end system design questions along with our proven answering framework."
              description="Subtitle for an example list of User Interface Questions on marketing pages"
              id="QIRY6V"
            />
          </Text>
          <div>
            <Button
              href="/prepare/system-design"
              label={intl.formatMessage({
                defaultMessage: 'View All Questions',
                description:
                  'Link label to the list of all System Design questions',
                id: '68EGSg',
              })}
              size="lg"
              variant="primary"
              onClick={() => {
                gtag.event({
                  action: 'marketing.questions.system_design.cta.click',
                  category: 'engagement',
                  label: 'View All Questions',
                });
                logEvent('click', {
                  element: 'Homepage System Design question embed',
                  label: 'View All Questions',
                });
              }}
            />
          </div>
        </Section>
      </div>
      <Section>
        <div className="relative mt-12 select-none lg:col-span-4 lg:mt-0">
          <QuestionsList
            checkIfCompletedQuestion={() => false}
            questions={questions}
            showProgress={false}
          />
        </div>
      </Section>
    </div>
  );
}
