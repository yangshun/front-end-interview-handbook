import clsx from 'clsx';

import gtag from '~/lib/gtag';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';

export default function InterviewsMarketingUserInterfaceQuestionsExamples({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  const intl = useIntl();

  return (
    <div className={clsx('lg:grid lg:grid-cols-6 lg:gap-x-8')}>
      <div className="lg:col-span-2">
        <Text
          className="block text-base sm:text-lg"
          color="active"
          weight="bold">
          <FormattedMessage
            defaultMessage="Pick your framework"
            description="Label for an example list of User Interface Questions on marketing pages"
            id="w3pn1B"
          />
        </Text>
        <Heading className="mt-2" level="heading3">
          <FormattedMessage
            defaultMessage="User Interface Questions"
            description="Title for an example list of User Interface Questions on marketing pages"
            id="bxZm1S"
          />
        </Heading>
        <Section>
          <Text className="block py-10 text-lg md:text-xl" color="secondary">
            <FormattedMessage
              defaultMessage="Practice build all sorts of user interfaces: components, apps, games, etc, in the framework of your choice."
              description="Subtitle for an example list of User Interface Questions on marketing pages"
              id="uogn1k"
            />
          </Text>
          <div>
            <Button
              href="/questions/js/coding/user-interface"
              label={intl.formatMessage({
                defaultMessage: 'View All Questions',
                description:
                  'Link label to the list of all User Interface coding questions',
                id: 'z+5YJV',
              })}
              size="lg"
              variant="primary"
              onClick={() => {
                gtag.event({
                  action: 'marketing.questions.user_interface.cta.click',
                  category: 'engagement',
                  label: 'View All Questions',
                });
                logEvent('click', {
                  element: 'Homepage User Interface questions list',
                  label: 'View All Questions',
                  namespace: 'interviews',
                });
              }}
            />
          </div>
        </Section>
      </div>
      <Section>
        <div className="mt-12 lg:col-span-4 lg:mt-0">
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
