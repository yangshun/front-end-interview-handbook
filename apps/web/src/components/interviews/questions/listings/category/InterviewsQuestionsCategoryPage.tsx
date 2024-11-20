'use client';

import clsx from 'clsx';
import { type ReactNode } from 'react';

import {
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import type {
  FrontEndInterviewSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
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
import Text from '~/components/ui/Text';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  description: string;
  guides: ReadonlyArray<GuideCardMetadata>;
  questionCompletionCount?: QuestionCompletionCount;
  questionList: ReadonlyArray<QuestionMetadata>;
  searchPlaceholder: string;
  selectedCategoryTab?: QuestionUserFacingFormat;
  title: string;
  titleAddOnText?: string;
}> &
  (
    | Readonly<{
        category: 'framework';
        categoryValue: QuestionFramework;
      }>
    | Readonly<{
        category: 'language';
        categoryValue: QuestionLanguage;
      }>
  );

export default function InterviewsQuestionsCategoryPage({
  categoryTabs,
  description,
  questionCompletionCount,
  questionList,
  searchPlaceholder,
  title,
  selectedCategoryTab,
  guides,
  ...props
}: Props) {
  const languages = useQuestionLanguagesData();
  const frameworks = useQuestionFrameworksData();
  const questionFeatures = useInterviewsQuestionsFeatures();
  const categoryItem =
    props.category === 'language'
      ? languages[props.categoryValue]
      : frameworks[props.categoryValue];
  const { icon: Icon, label } = categoryItem;
  const intl = useIntl();
  const filterNamespace = `${props.category}:${props.categoryValue}`;
  const features = [
    questionFeatures.solvedByExInterviewers,
    props.category === 'language'
      ? questionFeatures.testCases
      : questionFeatures.testScenarios,
    questionFeatures.codeInBrowser,
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
    guidesSlugs[props.categoryValue].includes(
      guide.slug as FrontEndInterviewSlugType,
    ),
  );

  const guidesWithCompletionStatus =
    useGuidesWithCompletionStatus(filteredGuides);

  const questionsCount = countQuestionsByAccess(questionList);

  return (
    <div className={clsx('flex flex-col', 'gap-y-10 xl:gap-y-16')}>
      <InterviewsPageHeader
        className="flex-col min-[1186px]:flex-row"
        description={intl.formatMessage(
          {
            defaultMessage:
              '{category} interview questions with detailed solutions and tests',
            description: 'Description for guide card',
            id: 'GwrX5t',
          },
          {
            category:
              props.category === 'language'
                ? languages[props.categoryValue].label
                : frameworks[props.categoryValue].label,
          },
        )}
        features={features}
        icon={Icon}
        sideElement={
          <div className="w-full min-[1186px]:w-auto min-[1186px]:max-w-[292px] xl:max-w-[363px]">
            <InterviewsQuestionsCategoryContentSlider
              frameworkOrLanguage={props.categoryValue}
            />
          </div>
        }
        title={title}>
        <Text
          className="block text-sm lg:max-w-[75%] xl:text-base"
          color="secondary"
          size="inherit">
          {description}
        </Text>
      </InterviewsPageHeader>
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          categoryTabs={categoryTabs}
          defaultSortField="difficulty"
          filterNamespace={filterNamespace}
          guides={
            guidesWithCompletionStatus.length > 0
              ? {
                  description: intl.formatMessage(
                    {
                      defaultMessage:
                        'Explore our starter guides to get a solid grasp of {category} interview prep before jumping into practice.',
                      description: 'Description for guide card',
                      id: 'FtnCTh',
                    },
                    {
                      category: label,
                    },
                  ),
                  items: guidesWithCompletionStatus,
                  title: intl.formatMessage(
                    {
                      defaultMessage: '{category} Interview Guides',
                      description: 'Description for guide card',
                      id: 'VYDUrI',
                    },
                    {
                      category: label,
                    },
                  ),
                }
              : undefined
          }
          list={
            props.category === 'framework'
              ? { framework: props.categoryValue }
              : { language: props.categoryValue }
          }
          mode="framework"
          questionCompletionCount={questionCompletionCount}
          questions={questionList}
          searchPlaceholder={searchPlaceholder}
          sideColumnAddOn={
            <div className="hidden lg:block">
              <QuestionListingAccessSummary
                {...questionsCount}
                className="mb-6"
              />
            </div>
          }
        />
      </Section>
    </div>
  );
}
