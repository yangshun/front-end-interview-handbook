'use client';

import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';

import gtag from '~/lib/gtag';

import InterviewsMarketingJavaScriptQuestionsExamples from '~/components/interviews/marketing/examples/InterviewsMarketingJavaScriptQuestionsExamples';
import InterviewsMarketingQuizQuestionsExamples from '~/components/interviews/marketing/examples/InterviewsMarketingQuizQuestionsExamples';
import InterviewsMarketingSystemDesignQuestionsExamples from '~/components/interviews/marketing/examples/InterviewsMarketingSystemDesignQuestionsExamples';
import InterviewsMarketingUserInterfaceQuestionsExamples from '~/components/interviews/marketing/examples/InterviewsMarketingUserInterfaceQuestionsExamples';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import {
  mapStudyPlansBySlug,
  StudyPlanIcons,
} from '~/components/interviews/questions/content/study-list/StudyPlans';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBackgroundColor } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

type Props = Readonly<{
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  userInterfaceQuestions: ReadonlyArray<QuestionMetadata>;
}>;

function PreparationPlansSection({
  studyPlans,
}: {
  studyPlans: ReadonlyArray<InterviewsStudyList>;
}) {
  const intl = useIntl();

  const mapStudyPlans = mapStudyPlansBySlug(studyPlans);
  const plans = [
    {
      ...mapStudyPlans['one-week'],
      gradient: {
        className:
          'bg-[linear-gradient(133.77deg,_#f7ff00_0%,_#db36a4_97.95%)]',
        endColor: '#db36a4',
        startColor: '#f7ff00',
      },
    },
    {
      ...mapStudyPlans['one-month'],
      gradient: {
        className:
          'bg-[linear-gradient(133.77deg,_#bc4e9c_0%,_#f80759_97.95%)]',
        endColor: '#f80759',
        startColor: '#bc4e9c',
      },
    },
    {
      ...mapStudyPlans['three-months'],
      gradient: {
        className:
          'bg-[linear-gradient(133.77deg,_#7F00FF_0%,_#E100FF_97.95%)]',
        endColor: '#E100FF',
        startColor: '#7F00FF',
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <Heading level="heading4">
          {intl.formatMessage({
            defaultMessage: 'Preparation Plans',
            description: 'Preparation plans section title',
            id: 'J90fcx',
          })}
        </Heading>
        <Text className="block text-lg" color="secondary" size="inherit">
          {intl.formatMessage({
            defaultMessage:
              "Regardless of preparation timeline, there's a plan for you.",
            description: 'Preparation plans section subtitle',
            id: 'WRQRec',
          })}
        </Text>
      </div>
      <Section>
        <div className="mt-20 grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0">
          {plans.map((plan) => {
            const Icon = StudyPlanIcons[plan.slug];

            return (
              <div
                key={plan.slug}
                className={clsx(
                  'focus-within:ring-brand relative flex flex-col rounded-2xl px-6 pb-8 pt-12 focus-within:ring-2 focus-within:ring-inset',
                  plan.gradient.className,
                )}>
                <div
                  className={clsx(
                    'absolute top-0 inline-block -translate-y-1/2 transform rounded-xl border-2 p-3 shadow-lg',
                    themeBackgroundColor,
                  )}
                  style={{ borderColor: plan.gradient.startColor }}>
                  <Icon
                    aria-hidden="true"
                    className={clsx('size-8')}
                    style={{
                      color: plan.gradient.startColor,
                    }}
                  />
                </div>
                <Heading color="light" level="heading6">
                  {plan.longName}
                </Heading>
                <Section>
                  <Text className="mt-4 block" color="light" size="body2">
                    {plan.description}
                  </Text>
                  <Anchor
                    className={clsx(
                      'mt-4 text-base font-medium text-white focus:outline-none',
                    )}
                    href={plan.href}
                    variant="unstyled"
                    onClick={() => {
                      gtag.event({
                        action: `get_started.plans.${plan.type}.click`,
                        category: 'engagement',
                        label: 'See plan',
                      });
                      logEvent('click', {
                        element: 'Get Started button',
                        label: 'See plan',
                        namespace: 'interviews',
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
                  </Anchor>
                </Section>
              </div>
            );
          })}
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
    <div className="flex flex-col gap-y-12 lg:gap-y-16">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading4">
          {intl.formatMessage({
            defaultMessage: 'Practice Questions',
            description:
              'Title of question examples section on getting started page',
            id: 'Nh3PP/',
          })}
        </Heading>
        <Text className="block text-lg" color="secondary" size="inherit">
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
        </Text>
      </div>
      <Section>
        <InterviewsMarketingJavaScriptQuestionsExamples
          questions={javaScriptQuestions}
        />
        <InterviewsMarketingUserInterfaceQuestionsExamples
          questions={userInterfaceQuestions}
        />
        <InterviewsMarketingSystemDesignQuestionsExamples
          questions={systemDesignQuestions}
        />
        <InterviewsMarketingQuizQuestionsExamples questions={quizQuestions} />
      </Section>
    </div>
  );
}

export default function InterviewsMarketingGetStartedPage({
  javaScriptQuestions,
  userInterfaceQuestions,
  quizQuestions,
  systemDesignQuestions,
  studyPlans,
}: Props & Readonly<{ studyPlans: ReadonlyArray<InterviewsStudyList> }>) {
  const intl = useIntl();

  return (
    <Container
      className={clsx(
        'flex flex-col',
        'py-4 md:py-6 lg:py-8 xl:py-16',
        'gap-y-12 lg:gap-y-16',
      )}>
      <Heading level="heading3">
        {intl.formatMessage({
          defaultMessage: 'Get Started',
          description: 'Title of get started page',
          id: 'cktXm2',
        })}
      </Heading>
      <Section>
        <PreparationPlansSection studyPlans={studyPlans} />
        <Divider />
        <PracticeQuestionsSection
          javaScriptQuestions={javaScriptQuestions}
          quizQuestions={quizQuestions}
          systemDesignQuestions={systemDesignQuestions}
          userInterfaceQuestions={userInterfaceQuestions}
        />
      </Section>
    </Container>
  );
}
