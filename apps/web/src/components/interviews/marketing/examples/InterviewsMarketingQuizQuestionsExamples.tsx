import clsx from 'clsx';

import gtag from '~/lib/gtag';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';

export default function InterviewsMarketingQuizQuestionsExamples({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  const intl = useIntl();

  return (
    <div className={clsx('relative lg:grid lg:grid-cols-6 lg:gap-x-8')}>
      <div className="lg:col-span-2">
        <Text
          className="block text-base sm:text-lg"
          color="active"
          weight="bold">
          <FormattedMessage
            defaultMessage="Know your fundamentals"
            description="Label for an example list of Quiz Questions on marketing pages"
            id="7Po5ci"
          />
        </Text>
        <Heading className="mt-2 flex items-center gap-4" level="heading3">
          <span>
            <FormattedMessage
              defaultMessage="Quiz Questions"
              description="Title for an example list of Quiz Questions on marketing pages"
              id="BGn++d"
            />
          </span>
          <div className="flex items-center">
            <Badge
              label={intl.formatMessage({
                defaultMessage: 'Free',
                description: 'Label indicating that quiz questions are free',
                id: 'fevC5W',
              })}
              variant="success"
            />
          </div>
        </Heading>
        <Section>
          <Text className="block py-10 text-lg md:text-xl" color="secondary">
            <FormattedMessage
              defaultMessage="Knowledge is power. Over {count} short questions with answers to build and solidify your front end fundamentals."
              description="Subtitle for an example list of Quiz Questions on marketing pages"
              id="kF3Llo"
              values={{
                count: 100,
              }}
            />
          </Text>
          <div>
            <Button
              href="/prepare/quiz"
              label={intl.formatMessage({
                defaultMessage: 'View All Questions',
                description:
                  'Link label to the list of all Quiz coding questions',
                id: 'u0dndi',
              })}
              size="lg"
              variant="primary"
              onClick={() => {
                gtag.event({
                  action: 'marketing.questions.quiz.cta.click',
                  category: 'engagement',
                  label: 'View All Questions',
                });
                logEvent('click', {
                  element: 'Homepage Quiz question embed',
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
