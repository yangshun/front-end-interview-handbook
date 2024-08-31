import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { FocusAreas } from '~/data/focus-areas/FocusAreas';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import InterviewsDashboardPracticeByFocusAreasSection from './focus-areas/InterviewsDashboardPracticeByFocusAreasSection';
import InterviewsDashboardPracticeByFrameworkLanguageSection from './framework-language/InterviewsDashboardPracticeByFrameworkLanguageSection';
import InterviewsDashboardPracticeByQuestionType from './question-type/InterviewsDashboardPracticeByQuestionTypeSection';

import type { LearningSession } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  focusAreas: FocusAreas;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
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
}>;

export default function InterviewsDashboardPracticeQuestionsSection({
  questions,
  focusAreas,
  questionListSessions,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionsProgress } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );

  return (
    <Section>
      <div className={clsx('flex flex-col gap-12')}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Heading className={themeTextColor} color="custom" level="heading5">
              <FormattedMessage
                defaultMessage="All practice questions"
                description="Title for practice questions section"
                id="tQEmTt"
              />
            </Heading>
            <div className="flex gap-2">
              <Badge
                label={intl.formatMessage({
                  defaultMessage: '200+ questions',
                  description: 'Badge label for questions count',
                  id: 'xRWPeC',
                })}
                size="sm"
                variant="neutral-active"
              />
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Solutions & test from ex-interviewers',
                  description: 'Badge label for solutiosn & test',
                  id: 'ZjVKE/',
                })}
                size="sm"
                variant="neutral-active"
              />
            </div>
          </div>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="More practice questions you can dive into with any excess time"
              description="Description for practice questions section"
              id="U1S0XM"
            />
          </Text>
        </div>

        <InterviewsDashboardPracticeByQuestionType
          questions={questions}
          questionsProgress={questionsProgress ?? []}
        />
        <InterviewsDashboardPracticeByFrameworkLanguageSection
          questions={questions}
          questionsProgress={questionsProgress ?? []}
        />
        <InterviewsDashboardPracticeByFocusAreasSection
          focusAreas={focusAreas}
          questionListSessions={questionListSessions}
        />
      </div>
    </Section>
  );
}
