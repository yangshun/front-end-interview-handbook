import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import type { GuideCategory } from '~/components/guides/types';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsFrameworkAndLanguageSection from '~/components/interviews/questions/listings/practice-questions/InterviewsFrameworkAndLanguageSection';
import InterviewsQuestionFormatsSection from '~/components/interviews/questions/listings/practice-questions/InterviewsQuestionFormatsSection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

type Props = Readonly<{
  guidesProgress: ReadonlyArray<
    Readonly<{ id: string; slug: string; type: GuideCategory }>
  >;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<QuestionMetadata>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<QuestionMetadata>
    >;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardPracticeQuestionsSection({
  questions,
  questionsProgress,
  guidesProgress,
}: Props) {
  return (
    <Section>
      <div className={clsx('flex flex-col gap-12')}>
        <div className="flex flex-col gap-3">
          <Heading className={themeTextColor} color="custom" level="heading5">
            <FormattedMessage
              defaultMessage="All practice questions"
              description="Title for practice questions section"
              id="tQEmTt"
            />
          </Heading>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="More practice questions you can dive into with any excess time"
              description="Description for practice questions section"
              id="U1S0XM"
            />
          </Text>
        </div>

        <InterviewsQuestionFormatsSection
          guidesProgress={guidesProgress}
          questions={questions}
          questionsProgress={questionsProgress ?? []}
        />
        <InterviewsFrameworkAndLanguageSection
          questions={questions}
          questionsProgress={questionsProgress ?? []}
        />
      </div>
    </Section>
  );
}
