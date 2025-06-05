import clsx from 'clsx';
import type { InterviewsQuestionQuizScrollableContent } from 'contentlayer/generated';

import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type {
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import MDXContent from '~/components/mdx/MDXContent';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import QuestionQuizPageHeaderCodingSection from './QuestionQuizPageHeaderCodingSection';

type LanguageOrFramework =
  | Extract<QuestionFramework, 'react'>
  | QuestionLanguage;

type Props = Readonly<{
  description: string;
  languageOrFramework: LanguageOrFramework;
  longDescription: InterviewsQuestionQuizScrollableContent;
  questionCount: number;
  title: string;
}>;

export default function QuestionQuizPageHeader({
  description,
  languageOrFramework,
  longDescription,
  questionCount,
  title,
}: Props) {
  const questionFeatures = useInterviewsQuestionsFeatures();
  const features = [
    questionFeatures.solvedByExInterviewers,
    questionFeatures.criticalTopics,
  ];

  return (
    <InterviewsPageHeader
      description={description}
      descriptionWidthFull={true}
      features={features}
      title={title}>
      <div className="space-y-12">
        <MDXContent
          components={{
            QuestionCount: () => (
              <span>{roundQuestionCountToNearestTen(questionCount)}</span>
            ),
          }}
          fontSize="md"
          mdxCode={longDescription.body.code}
          proseClassName={clsx('prose-sm', themeTextSecondaryColor)}
        />
        <QuestionQuizPageHeaderCodingSection
          languageOrFramework={languageOrFramework}
        />
      </div>
    </InterviewsPageHeader>
  );
}
