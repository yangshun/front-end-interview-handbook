import type {
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import { themeTextColor } from '~/components/ui/theme';

import InterviewsDashboardContributionsHeatmapCard from './InterviewsDashboardContributionsHeatmapCard';
import InterviewsDashboardSolvedByTechnologyOrQuestionType from './InterviewsDashboardSolvedByQuestionType';
import InterviewsDashboardSolvedProblemsCard from './InterviewsDashboardSolvedProblemsCard';

type Props = Readonly<{
  contributions?: Record<string, number>;
  isContributionsLoading: boolean;
  isQuestionsProgressLoading: boolean;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardProgressSection({
  questionsProgress,
  questions,
  contributions,
  isContributionsLoading,
  isQuestionsProgressLoading,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Heading className={themeTextColor} color="custom" level="heading6">
        <FormattedMessage
          defaultMessage="Your progress at a glance"
          description="Title for progress glance section"
          id="InbLxy"
        />
      </Heading>
      <div className="grid gap-6 md:grid-cols-2">
        <InterviewsDashboardSolvedProblemsCard
          isQuestionsProgressLoading={isQuestionsProgressLoading}
          questions={questions}
          questionsProgress={questionsProgress}
        />
        <InterviewsDashboardSolvedByTechnologyOrQuestionType
          isQuestionsProgressLoading={isQuestionsProgressLoading}
          questions={questions}
          questionsProgress={questionsProgress}
        />
      </div>
      <InterviewsDashboardContributionsHeatmapCard
        contributions={contributions}
        isContributionsLoading={isContributionsLoading}
      />
    </div>
  );
}
