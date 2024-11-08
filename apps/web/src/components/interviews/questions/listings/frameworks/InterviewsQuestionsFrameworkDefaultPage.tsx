'use client';

import { useQuestionTechnologyLists } from '~/data/QuestionFormats';

import InterviewsQuestionsFrameworkPage from './InterviewsQuestionsFrameworkPage';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsFrameworkPage>,
  'description' | 'searchPlaceholder' | 'title'
>;

export default function InterviewsQuestionsFrameworkDefaultPage({
  framework,
  ...props
}: Props) {
  const tech = useQuestionTechnologyLists();

  return (
    <InterviewsQuestionsFrameworkPage
      description={tech[framework].description}
      framework={framework}
      searchPlaceholder={tech[framework].searchPlaceholder}
      title={tech[framework].longName}
      {...props}
    />
  );
}
