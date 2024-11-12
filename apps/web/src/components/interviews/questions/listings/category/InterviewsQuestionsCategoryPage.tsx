'use client';

import clsx from 'clsx';
import { type ReactNode } from 'react';
import {
  RiTestTubeLine,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';

import {
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionLists';

import InterviewsGitHubSlider from '~/components/interviews/common/github/InterviewsGitHubSlider';
import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import type {
  QuestionFramework,
  QuestionFrameworkOrLanguage,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  description: string;
  framework: QuestionFrameworkOrLanguage;
  questionCompletionCount?: QuestionCompletionCount;
  questionList: ReadonlyArray<QuestionMetadata>;
  searchPlaceholder: string;
  title: string;
  titleAddOnText?: string;
}>;

export default function InterviewsQuestionsCategoryPage({
  categoryTabs,
  description,
  framework,
  questionCompletionCount,
  questionList,
  searchPlaceholder,
  title,
}: Props) {
  const languages = useQuestionLanguagesData();
  const frameworks = useQuestionFrameworksData();
  const Icon =
    framework in languages
      ? languages[framework as QuestionLanguage].icon
      : frameworks[framework as QuestionFramework].icon;
  const intl = useIntl();
  const filterNamespace = `category:${framework}`;
  const features = [
    {
      icon: RiWindow2Line,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for question format page',
        id: 'X/O+1P',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Solved by ex-interviewers',
        description: 'Features for question format page',
        id: 'gl9tj6',
      }),
    },
    {
      icon: RiTestTubeLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for question format page',
        id: 'nI4Alg',
      }),
    },
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-8 md:gap-y-10 2xl:gap-y-12')}>
      <InterviewsPageHeader
        description={description}
        features={features}
        icon={Icon}
        sideElement={<InterviewsGitHubSlider />}
        title={title}
      />
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          categoryTabs={categoryTabs}
          defaultSortField="difficulty"
          filterNamespace={filterNamespace}
          framework={framework}
          mode="framework"
          questionCompletionCount={questionCompletionCount}
          questions={questionList}
          searchPlaceholder={searchPlaceholder}
        />
      </Section>
    </div>
  );
}
