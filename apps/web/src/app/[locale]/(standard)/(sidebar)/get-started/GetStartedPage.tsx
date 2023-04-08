'use client';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import { usePreparationPlansUI } from '~/data/PreparationPlansUI';

import PromoBanner from '~/components/global/PromoBanner';
import MarketingJavaScriptQuestionsExamples from '~/components/marketing/examples/MarketingJavaScriptQuestionsExamples';
import MarketingQuizQuestionsExamples from '~/components/marketing/examples/MarketingQuizQuestionsExamples';
import MarketingSystemDesignQuestionsExamples from '~/components/marketing/examples/MarketingSystemDesignQuestionsExamples';
import MarketingUserInterfaceQuestionsExamples from '~/components/marketing/examples/MarketingUserInterfaceQuestionsExamples';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import logEvent from '~/logging/logEvent';
import { I18nLink } from '~/next-i18nostic/src';

type Props = Readonly<{
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  userInterfaceQuestions: ReadonlyArray<QuestionMetadata>;
}>;

function PreparationPlansSection() {
  const intl = useIntl();
  const preparationPlansExtra = usePreparationPlansUI();

  return (
    <div>
      <div className="space-y-4">
        <Heading className="text-2xl font-bold tracking-tight sm:text-3xl">
          {intl.formatMessage({
            defaultMessage: 'Preparation Plans',
            description: 'Preparation plans section title',
            id: 'J90fcx',
          })}
        </Heading>
        <p className="text-lg text-slate-500">
          {intl.formatMessage({
            defaultMessage:
              "Regardless of preparation timeline, there's a plan for you.",
            description: 'Preparation plans section subtitle',
            id: 'WRQRec',
          })}
        </p>
      </div>
      <Section>
        <div className="mt-20 grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-6">
          {Object.entries(preparationPlansExtra).map(([_, plan]) => (
            <div
              key={plan.key}
              className={clsx(
                'focus-within:ring-brand-500 relative flex flex-col rounded-2xl px-6 pt-12 pb-8 focus-within:ring-2 focus-within:ring-inset md:px-8',
                plan.backgroundClass,
              )}>
              <div
                className={clsx(
                  'absolute top-0 inline-block -translate-y-1/2 transform rounded-xl border-2 bg-white p-3 shadow-lg',
                  plan.iconBorderClass,
                )}>
                <plan.iconSolid
                  aria-hidden="true"
                  className={clsx('h-8 w-8', plan.iconClass)}
                />
              </div>
              <Heading className="text-xl font-semibold text-white">
                {plan.longName}
              </Heading>
              <Section>
                <p className="mt-4 text-base text-slate-50">
                  {plan.description}
                </p>
                <I18nLink
                  className={clsx(
                    'mt-4 text-base font-medium text-white focus:outline-none',
                  )}
                  href={plan.href}
                  onClick={() => {
                    gtag.event({
                      action: `get_started.plans.${plan.type}.click`,
                      category: 'engagement',
                      label: 'See plan',
                    });
                    logEvent('click', {
                      element: 'Get Started button',
                      label: 'See plan',
                    });
                  }}>
                  {/* Extend touch target to entire panel */}
                  <span aria-hidden="true" className="absolute inset-0" />
                  {intl.formatMessage({
                    defaultMessage: 'See plan',
                    description: 'Link to view study plan details',
                    id: '8UZ9q3',
                  })}{' '}
                  <span aria-hidden="true"> &rarr;</span>
                </I18nLink>
              </Section>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function PracticeQuestionsSection({
  quizQuestions,
  javaScriptQuestions,
  userInterfaceQuestions,
  systemDesignQuestions,
}: Props) {
  const intl = useIntl();

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="space-y-4">
        <Heading className="text-2xl font-bold tracking-tight sm:text-3xl">
          {intl.formatMessage({
            defaultMessage: 'Practice Questions',
            description:
              'Title of question examples section on getting started page',
            id: 'Nh3PP/',
          })}
        </Heading>
        <p className="text-lg text-slate-500">
          {intl.formatMessage(
            {
              defaultMessage:
                'Practice makes perfect. With our collection of over {count} front end questions, you get all-rounded coverage for your preparation — HTML, CSS, JavaScript, algorithms, DOM APIs, accessibility, performance, front end fundamentals, and more.',
              description:
                'Title of question examples section on getting started page',
              id: '0p6dRS',
            },
            {
              count: 100,
            },
          )}
        </p>
      </div>
      <Section>
        <MarketingJavaScriptQuestionsExamples questions={javaScriptQuestions} />
        <MarketingUserInterfaceQuestionsExamples
          questions={userInterfaceQuestions}
        />
        <MarketingSystemDesignQuestionsExamples
          questions={systemDesignQuestions}
        />
        <MarketingQuizQuestionsExamples questions={quizQuestions} />
      </Section>
    </div>
  );
}

export default function GetStartedPage({
  javaScriptQuestions,
  userInterfaceQuestions,
  quizQuestions,
  systemDesignQuestions,
}: Props) {
  const intl = useIntl();

  return (
    <>
      <PromoBanner />
      <Container>
        <div className="space-y-12 py-12 lg:space-y-16 lg:py-16">
          <Heading className="text-3xl font-bold tracking-tight sm:text-4xl">
            {intl.formatMessage({
              defaultMessage: 'Get Started',
              description: 'Title of get started page',
              id: 'cktXm2',
            })}
          </Heading>
          <Section>
            <PreparationPlansSection />
            <hr />
            <PracticeQuestionsSection
              javaScriptQuestions={javaScriptQuestions}
              quizQuestions={quizQuestions}
              systemDesignQuestions={systemDesignQuestions}
              userInterfaceQuestions={userInterfaceQuestions}
            />
          </Section>
        </div>
      </Container>
    </>
  );
}
