import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import * as gtag from '~/lib/gtag';

import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionsQuizList from '~/components/questions/listings/QuestionsQuizList';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingQuizQuestionsExamples({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionQuizMetadata>;
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
        'relative transition-opacity duration-[1500ms] ease-in-out lg:grid lg:grid-cols-6 lg:gap-x-8',
        isInView ? 'opacity-100' : 'opacity-0',
      )}>
      <div className="lg:col-span-2">
        <p className="text-brand-500 text-base font-semibold sm:text-lg">
          <FormattedMessage
            defaultMessage="Know your fundamentals"
            description="Label for an example list of Quiz Questions on marketing pages"
            id="7Po5ci"
          />
        </p>
        <Heading className="mt-2 flex gap-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
          <FormattedMessage
            defaultMessage="Quiz Questions"
            description="Title for an example list of Quiz Questions on marketing pages"
            id="BGn++d"
          />
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'Free',
              description: 'Label indicating that quiz questions are free',
              id: 'fevC5W',
            })}
            variant="success"
          />
        </Heading>
        <Section>
          <div ref={sectionMarkerRef} />
          <div className="py-10 text-lg text-slate-500 md:text-xl">
            <FormattedMessage
              defaultMessage="Knowledge is power. Over {count} short questions with answers to build and solidify your front end fundamentals."
              description="Subtitle for an example list of Quiz Questions on marketing pages"
              id="kF3Llo"
              values={{
                count: 100,
              }}
            />
          </div>
          <div>
            <Button
              href="/prepare/quiz"
              label={intl.formatMessage({
                defaultMessage: 'View All Questions',
                description:
                  'Link label to the list of all Quiz coding questions',
                id: 'u0dndi',
              })}
              variant="primary"
              onClick={() => {
                gtag.event({
                  action: 'marketing.questions.quiz.cta.click',
                  category: 'engagement',
                  label: 'View All Questions',
                });
              }}
            />
          </div>
        </Section>
      </div>
      <Section>
        <div className="mt-12 lg:col-span-4 lg:mt-0">
          <QuestionsQuizList
            checkIfCompletedQuestion={() => false}
            questions={questions}
            showProgress={false}
          />
        </div>
      </Section>
    </div>
  );
}
