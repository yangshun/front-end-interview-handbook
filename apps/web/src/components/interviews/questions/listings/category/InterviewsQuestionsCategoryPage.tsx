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

import type {
  FrontEndInterviewSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import type {
  QuestionFramework,
  QuestionFrameworkOrLanguage,
  QuestionLanguage,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryContentSlider from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryContentSlider';
import { countQuestionsByAccess } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import QuestionListingAccessSummary from '~/components/interviews/questions/listings/stats/QuestionListingAccessSummary';
import { useIntl } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  description: string;
  framework: QuestionFrameworkOrLanguage;
  guides: ReadonlyArray<GuideCardMetadata>;
  questionCompletionCount?: QuestionCompletionCount;
  questionList: ReadonlyArray<QuestionMetadata>;
  searchPlaceholder: string;
  selectedCategoryTab?: QuestionUserFacingFormat;
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
  selectedCategoryTab,
  guides,
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
    {
      icon: RiWindow2Line,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for question format page',
        id: 'X/O+1P',
      }),
    },
  ];

  const languageGuidesSlugs: ReadonlyArray<FrontEndInterviewSlugType> =
    selectedCategoryTab === 'coding'
      ? [
          'javascript',
          'algorithms',
          'user-interface',
          'user-interface-questions-cheatsheet',
          'user-interface-components-api-design-principles',
        ]
      : ['quiz'];
  const frameworkGuidesSlugs: ReadonlyArray<FrontEndInterviewSlugType> = [
    'user-interface',
    'user-interface-questions-cheatsheet',
    'user-interface-components-api-design-principles',
  ];
  const guidesSlugs: Record<
    QuestionFrameworkOrLanguage,
    ReadonlyArray<FrontEndInterviewSlugType>
  > = {
    angular: frameworkGuidesSlugs,
    css: languageGuidesSlugs,
    html: languageGuidesSlugs,
    js: languageGuidesSlugs,
    react: frameworkGuidesSlugs,
    svelte: frameworkGuidesSlugs,
    ts: languageGuidesSlugs,
    vanilla: languageGuidesSlugs,
    vue: frameworkGuidesSlugs,
  };

  const filteredGuides = guides.filter((guide) =>
    guidesSlugs[framework].includes(guide.slug as FrontEndInterviewSlugType),
  );

  const guidesWithCompletionStatus =
    useGuidesWithCompletionStatus(filteredGuides);

  const questionsCount = countQuestionsByAccess(questionList);

  return (
    <div className={clsx('flex flex-col', 'gap-y-10 md:gap-y-16')}>
      <InterviewsPageHeader
        description={description}
        features={features}
        icon={Icon}
        sideElement={
          <InterviewsQuestionsCategoryContentSlider framework={framework} />
        }
        title={title}
      />
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          categoryTabs={categoryTabs}
          defaultSortField="difficulty"
          filterNamespace={filterNamespace}
          framework={framework}
          guides={
            guidesWithCompletionStatus.length > 0
              ? {
                  description: intl.formatMessage({
                    defaultMessage:
                      'Gain an insider overview of essential tips to prepare effectively before you begin practicing.',
                    description: 'Description for guide card',
                    id: 'v1a7l5',
                  }),
                  items: guidesWithCompletionStatus,
                  title: intl.formatMessage(
                    {
                      defaultMessage: '{framework} Interview Guides',
                      description: 'Description for guide card',
                      id: 'gaTO0X',
                    },
                    {
                      framework:
                        framework in languages
                          ? languages[framework as QuestionLanguage].label
                          : frameworks[framework as QuestionFramework].label,
                    },
                  ),
                }
              : undefined
          }
          mode="framework"
          questionCompletionCount={questionCompletionCount}
          questions={questionList}
          searchPlaceholder={searchPlaceholder}
          sideColumnAddOn={
            <div className="hidden lg:block">
              <QuestionListingAccessSummary {...questionsCount} />
            </div>
          }
        />
      </Section>
    </div>
  );
}
