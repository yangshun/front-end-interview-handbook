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
import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import InterviewsPageHeaderLogo from '~/components/interviews/common/InterviewsPageHeaderLogo';
import type {
  QuestionFramework,
  QuestionFrameworkOrLanguage,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

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
      <div>
        <div className="grid gap-x-6 gap-y-8 xl:grid-cols-3">
          <div className="flex flex-col gap-8 xl:col-span-2">
            <div className="flex items-center gap-6">
              <InterviewsPageHeaderLogo icon={Icon} />
              <Heading level="heading4">{title}</Heading>
            </div>
            <Text
              className="block"
              color="subtitle"
              size="body1"
              weight="medium">
              {description}
            </Text>
          </div>
          <div className="col-span-1">
            <InterviewsGitHubSlider />
          </div>
        </div>
        {/* Features */}
        <div className="mt-6">
          <InterviewsPageFeatures features={features} />
        </div>
        <Divider className="mt-8" />
      </div>
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          categoryTabs={categoryTabs}
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
