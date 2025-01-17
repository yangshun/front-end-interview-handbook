import clsx from 'clsx';

import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsFrameworkAndLanguageSection from '~/components/interviews/questions/listings/practice/InterviewsFrameworkAndLanguageSection';
import InterviewsQuestionFormatsSection from '~/components/interviews/questions/listings/practice/InterviewsQuestionFormatsSection';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import type { GuideProgress } from '@prisma/client';

type Props = Readonly<{
  guidesProgress: ReadonlyArray<GuideProgress>;
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
    <div className={clsx('flex flex-col gap-16')}>
      <div className="flex flex-col gap-3">
        <Heading className={themeTextColor} color="custom" level="heading5">
          <FormattedMessage
            defaultMessage="Practice questions"
            description="All front end interview practice questions"
            id="Lm4GCE"
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
      <Section>
        <div className="flex flex-col gap-12">
          <InterviewsQuestionFormatsSection
            guidesProgress={guidesProgress}
            questions={questions}
            questionsProgress={questionsProgress ?? []}
            variant="compact"
          />
          <InterviewsFrameworkAndLanguageSection
            questions={questions}
            questionsProgress={questionsProgress ?? []}
          />
        </div>
      </Section>
    </div>
  );
}
