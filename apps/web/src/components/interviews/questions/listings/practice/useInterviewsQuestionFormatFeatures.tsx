import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

export default function useInterviewsQuestionFormatFeatures(
  questionCount: number,
): Record<
  QuestionFormat,
  ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>
> {
  const features = useInterviewsQuestionsFeatures(questionCount);

  return {
    algo: [
      features.codeInBrowser,
      features.solvedByExInterviewers,
      features.testCases,
    ],
    javascript: [
      features.codeInBrowser,
      features.solvedByExInterviewers,
      features.testCases,
    ],
    quiz: [features.criticalTopics, features.answeredByExInterviewers],
    'system-design': [
      features.robustFramework,
      features.solvedQuestions,
      features.realWorldApplications,
    ],
    'user-interface': [
      features.codeInBrowser,
      features.solvedByExInterviewers,
      features.testScenarios,
    ],
  };
}
