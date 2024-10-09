import type {
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeTextColor } from '~/components/ui/theme';

import InterviewsDashboardContributionsHeatMapCard from './InterviewsDashboardContributionsHeatmapCard';
import InterviewsDashboardSolvedByTechnologyOrQuestionType from './InterviewsDashboardSolvedByQuestionType';
import InterviewsDashboardSolvedProblemsCard from './InterviewsDashboardSolvedProblemsCard';

type Props = Readonly<{
  contributions?: Record<string, number>;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardProgressAtGlanceSection({
  questionsProgress,
  questions,
  contributions,
}: Props) {
  return (
    <Section>
      <div className="flex flex-col gap-6">
        <Heading className={themeTextColor} color="custom" level="heading6">
          <FormattedMessage
            defaultMessage="Your progress at a glance"
            description="Title for progress glance section"
            id="InbLxy"
          />
        </Heading>
        <div className="grid gap-6 xl:grid-cols-2">
          <InterviewsDashboardSolvedProblemsCard
            questions={questions}
            questionsProgress={questionsProgress}
          />
          <InterviewsDashboardSolvedByTechnologyOrQuestionType
            questions={questions}
            questionsProgress={questionsProgress}
          />
        </div>
        <InterviewsDashboardContributionsHeatMapCard
          contributions={contributions}
        />
      </div>
    </Section>
  );
}
