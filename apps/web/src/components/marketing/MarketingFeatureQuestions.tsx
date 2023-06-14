import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeBackgroundEmphasized,
  themeLineTextColor,
} from '~/components/ui/theme';

import MarketingJavaScriptQuestionsExamples from './examples/MarketingJavaScriptQuestionsExamples';
import MarketingQuizQuestionsExamples from './examples/MarketingQuizQuestionsExamples';
import MarketingSystemDesignQuestionsExamples from './examples/MarketingSystemDesignQuestionsExamples';
import MarketingUserInterfaceQuestionsExamples from './examples/MarketingUserInterfaceQuestionsExamples';
import { QuestionCount } from '../questions/listings/QuestionCount';
import Text from '../ui/Text';

// TODO: Add company tagged questions
export default function MarketingFeatureQuestionsNew({
  javaScriptQuestions,
  userInterfaceQuestions,
  systemDesignQuestions,
  quizQuestions,
}: Readonly<{
  javaScriptQuestions: ReadonlyArray<QuestionMetadata>;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  userInterfaceQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const titleMarkerRef = useRef(null);
  const titleIsInView = useInView(titleMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div className={clsx('overflow-hidden', themeBackgroundEmphasized)}>
      <Container>
        <div className="relative mx-auto max-w-xl space-y-16 py-8 pb-24 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl lg:space-y-32 lg:py-16 lg:pb-40">
          <svg
            aria-hidden="true"
            className="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block"
            fill="none"
            height={784}
            viewBox="0 0 404 784"
            width={404}>
            <defs>
              <pattern
                height={20}
                id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                patternUnits="userSpaceOnUse"
                width={20}
                x={0}
                y={0}>
                <rect
                  className={themeLineTextColor}
                  fill="currentColor"
                  height={4}
                  width={4}
                  x={0}
                  y={0}
                />
              </pattern>
            </defs>
            <rect
              fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
              height={784}
              width={404}
            />
          </svg>
          <div
            className={clsx(
              'transition-opacity duration-[1500ms] ease-in-out',
              titleIsInView ? 'opacity-100' : 'opacity-0',
            )}>
            <div ref={titleMarkerRef} />
            <Heading level="heading2">
              <FormattedMessage
                defaultMessage="Practice everything here."
                description="Title of the 'Practice Everything Here' marketing section on Homepage"
                id="ExWrYc"
              />
            </Heading>
            <Text
              className="relative mt-10 text-lg md:text-xl"
              color="secondary"
              display="block"
              size="custom">
              <FormattedMessage
                defaultMessage="With over {QuestionCount} practice questions curated by senior front end engineers, you get all-rounded coverage for your preparation — HTML, CSS, JavaScript, algorithms, DOM APIs, accessibility, performance, front end fundamentals, and more."
                description="Subtitle of the 'Practice Everything Here' marketing section on Homepage"
                id="6yAWpI"
                values={{ QuestionCount }}
              />
            </Text>
          </div>
          <Section>
            <MarketingJavaScriptQuestionsExamples
              questions={javaScriptQuestions}
            />
            <MarketingUserInterfaceQuestionsExamples
              questions={userInterfaceQuestions}
            />
            <MarketingSystemDesignQuestionsExamples
              questions={systemDesignQuestions}
            />
            <svg
              aria-hidden="true"
              className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
              fill="none"
              height={784}
              viewBox="0 0 404 784"
              width={404}>
              <defs>
                <pattern
                  height={20}
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  patternUnits="userSpaceOnUse"
                  width={20}
                  x={0}
                  y={0}>
                  <rect
                    className={themeLineTextColor}
                    fill="currentColor"
                    height={4}
                    width={4}
                    x={0}
                    y={0}
                  />
                </pattern>
              </defs>
              <rect
                fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                height={784}
                width={404}
              />
            </svg>
            <MarketingQuizQuestionsExamples questions={quizQuestions} />
          </Section>
        </div>
      </Container>
    </div>
  );
}
