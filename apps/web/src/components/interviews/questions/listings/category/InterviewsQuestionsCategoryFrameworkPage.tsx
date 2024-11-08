'use client';

import { useQuestionFrameworksData } from '~/data/QuestionFormats';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type { QuestionFramework } from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  'description' | 'framework' | 'searchPlaceholder' | 'title'
> &
  Readonly<{
    framework: QuestionFramework;
  }>;

export default function InterviewsQuestionsCategoryFrameworkPage({
  framework,
  ...props
}: Props) {
  const frameworks = useQuestionFrameworksData();

  return (
    <InterviewsQuestionsCategoryPage
      description={frameworks[framework].description}
      framework={framework}
      searchPlaceholder={frameworks[framework].searchPlaceholder}
      title={frameworks[framework].longName}
      {...props}
    />
  );
}
