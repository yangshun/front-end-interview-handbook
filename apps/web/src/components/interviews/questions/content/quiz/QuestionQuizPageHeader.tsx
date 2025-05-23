import {
  QuestionFrameworkLabels,
  QuestionLanguageLabels,
} from '~/data/QuestionCategories';

import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type {
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import QuestionQuizPageHeaderCodingSection from './QuestionQuizPageHeaderCodingSection';

type LanguageOrFramework = QuestionFramework | QuestionLanguage;

type Props = Readonly<{
  languageOrFramework: LanguageOrFramework;
  questionCount: number;
}>;

export default function QuestionQuizPageHeader({
  languageOrFramework,
  questionCount,
}: Props) {
  const questionFeatures = useInterviewsQuestionsFeatures();
  const features = [
    questionFeatures.solvedByExInterviewers,
    questionFeatures.criticalTopics,
  ];

  const { description, longDescription, title } = useQuizHeaderContent(
    languageOrFramework,
    questionCount,
  );

  return (
    <InterviewsPageHeader
      description={description}
      features={features}
      title={title}>
      <div className="space-y-12">
        <Text color="secondary" size="body2">
          {longDescription}
        </Text>
        <QuestionQuizPageHeaderCodingSection
          languageOrFramework={languageOrFramework}
        />
      </div>
    </InterviewsPageHeader>
  );
}

function useQuizHeaderContent(
  languageOrFramework: QuestionFramework | QuestionLanguage,
  questionCount: number,
) {
  const intl = useIntl();
  const labels: Record<LanguageOrFramework, string> = {
    ...QuestionLanguageLabels,
    ...QuestionFrameworkLabels,
  };

  const title = intl.formatMessage(
    {
      defaultMessage:
        '{questionCount}+ {languageOrFramework} Interview Questions',
      description: 'Title of interviews quiz questions page',
      id: '/UIl1v',
    },
    {
      languageOrFramework: labels[languageOrFramework],
      questionCount: roundQuestionCountToNearestTen(questionCount),
    },
  );
  const description = intl.formatMessage(
    {
      defaultMessage:
        'The ultimate list of {questionCount}+ JavaScript Interview Questions, all answered by ex-FAANG interviewers.',
      description: 'Subtitle of JavaScript interview quiz questions page',
      id: 'owZ+42',
    },
    { questionCount: roundQuestionCountToNearestTen(questionCount) },
  );
  const longDescription = intl.formatMessage(
    {
      defaultMessage:
        'The ultimate list of {questionCount}+ JavaScript Interview Questions, all answered by ex-FAANG interviewers. The ultimate list of {questionCount}+ JavaScript Interview Questions, all answered by ex-FAANG interviewers.The ultimate list of {questionCount}+ JavaScript Interview Questions, all answered by ex-FAANG interviewers.The ultimate list of {questionCount}+ JavaScript Interview Questions, all answered by ex-FAANG interviewers.',
      description: 'Description of JavaScript interview quiz questions page',
      id: '+LARfx',
    },
    { questionCount: roundQuestionCountToNearestTen(questionCount) },
  );

  return {
    description,
    longDescription,
    title,
  };
}
