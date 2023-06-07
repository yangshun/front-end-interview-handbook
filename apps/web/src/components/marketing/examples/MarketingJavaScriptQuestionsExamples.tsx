import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionsList from '~/components/questions/listings/QuestionsList';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import logEvent from '~/logging/logEvent';

export default function MarketingJavaScriptQuestionsExamples({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  const intl = useIntl();
  const sectionMarkerRef = useRef(null);
  const isInView = useInView(sectionMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div
      className={clsx(
        'transition-opacity duration-[1500ms] ease-in-out lg:grid lg:grid-cols-6 lg:gap-x-8',
        isInView ? 'opacity-100' : 'opacity-0',
      )}>
      <div className="lg:col-span-2">
        <p className="text-brand-500 text-base font-semibold sm:text-lg">
          <FormattedMessage
            defaultMessage="Everything you need"
            description="Label for an example list of JavaScript Questions on marketing pages"
            id="7gb9hK"
          />
        </p>
        <Heading className="mt-2" level="heading3">
          <FormattedMessage
            defaultMessage="JavaScript Questions"
            description="Title for an example list of JavaScript Questions on marketing pages"
            id="dJf+5S"
          />
        </Heading>
        <Section>
          <div ref={sectionMarkerRef} />
          <div className="space-y-2 py-10 text-lg text-slate-500 md:text-xl">
            <FormattedMessage
              defaultMessage="Front end coding interview questions come in many forms — practice writing JavaScript functions, data structures, and algorithms."
              description="Subtitle for an example list of JavaScript Questions on marketing pages"
              id="b0OofK"
            />
          </div>
          <div>
            <Button
              href="/prepare/coding"
              label={intl.formatMessage({
                defaultMessage: 'View All Questions',
                description:
                  'Link label to the list of all JavaScript coding questions',
                id: 'lJupPX',
              })}
              variant="primary"
              onClick={() => {
                gtag.event({
                  action: 'marketing.questions.javascript.cta.click',
                  category: 'engagement',
                  label: 'View All Questions',
                });
                logEvent('click', {
                  element: 'Homepage JavaScript questions list',
                  label: 'View All Questions',
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
            columns={2}
            questions={questions}
            showProgress={false}
          />
        </div>
      </Section>
    </div>
  );
}
