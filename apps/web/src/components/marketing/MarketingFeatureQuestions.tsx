import { FormattedMessage } from 'react-intl';

import MarketingMarqueeQuestionListSection from '~/components/marketing/MarketingMarqueeQuestionListSection';
import type {
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';
import Container from '~/components/ui/Container';

import MarketingSectionHeader from './MarketingSectionHeader';
import { QuestionCount } from '../questions/listings/stats/QuestionCount';
import Text from '../ui/Text';

// TODO: Add company tagged questions
export default function MarketingFeatureQuestions({
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
  return (
    <div>
      <Container className="flex flex-col gap-y-12 py-8 md:gap-y-24 lg:gap-y-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            description={
              <FormattedMessage
                defaultMessage="With over {QuestionCount} practice questions curated by senior front end engineers, you get all-rounded coverage for your preparation — HTML, CSS, JavaScript, algorithms, DOM APIs, accessibility, performance, front end fundamentals, and more."
                description="Subtitle of the 'Practice Everything Here' marketing section on Homepage"
                id="6yAWpI"
                values={{ QuestionCount }}
              />
            }
            heading={
              <FormattedMessage
                defaultMessage="Practice everything here"
                description="Title of the 'Practice Everything Here' marketing section on Homepage"
                id="D/cRh1"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="Large question bank"
                description="Title of the 'Practice Everything Here' marketing section on Homepage"
                id="3i5xK8"
              />
            }
          />
        </div>
        <MarketingMarqueeQuestionListSection
          description={
            <FormattedMessage
              defaultMessage="Front end coding interview questions come in many forms — practice writing JavaScript functions, data structures, and algorithms."
              description="Subtitle for an example list of JavaScript Questions on marketing pages"
              id="b0OofK"
            />
          }
          href="/questions"
          questions={javaScriptQuestions}
          title={
            <>
              JavaScript questions{' '}
              <Text
                className="text-xl"
                color="secondary"
                size="custom"
                weight="bold">
                (with TypeScript support)
              </Text>
            </>
          }
        />
        <MarketingMarqueeQuestionListSection
          description={
            <FormattedMessage
              defaultMessage="Practice build all sorts of user interfaces: components, apps, games, etc, in the framework of your choice."
              description="Subtitle for an example list of User Interface Questions on marketing pages"
              id="uogn1k"
            />
          }
          href="/questions/js/coding/user-interface"
          questions={userInterfaceQuestions}
          title={
            <FormattedMessage
              defaultMessage="User Interface Questions"
              description="Title for an example list of User Interface Questions on marketing pages"
              id="bxZm1S"
            />
          }
        />
        <MarketingMarqueeQuestionListSection
          description={
            <FormattedMessage
              defaultMessage="Front end system design resources are virtually non-existent. This is the only place you'll find in-depth solutions for front end system design questions along with our proven answering framework."
              description="Subtitle for an example list of User Interface Questions on marketing pages"
              id="QIRY6V"
            />
          }
          href="/prepare/system-design"
          questions={systemDesignQuestions}
          title={
            <FormattedMessage
              defaultMessage="System Design Questions"
              description="Title for an example list of System Design Questions on marketing pages"
              id="jnV/ZP"
            />
          }
        />
        <MarketingMarqueeQuestionListSection
          description={
            <FormattedMessage
              defaultMessage="Knowledge is power. Over {count} short questions with answers to build and solidify your front end fundamentals."
              description="Subtitle for an example list of Quiz Questions on marketing pages"
              id="kF3Llo"
              values={{
                count: 100,
              }}
            />
          }
          href="/prepare/quiz"
          questions={quizQuestions}
          title={
            <FormattedMessage
              defaultMessage="Quiz Questions"
              description="Title for an example list of Quiz Questions on marketing pages"
              id="BGn++d"
            />
          }
          titleLines={2}
        />
      </Container>
    </div>
  );
}
