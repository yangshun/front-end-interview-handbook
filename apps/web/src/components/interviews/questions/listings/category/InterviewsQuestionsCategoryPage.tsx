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
  QuestionFrameworkOrLanguage,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryContentSlider from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryContentSlider';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  description: string;
  formatTabs?: ReactNode;
  guides?: ReadonlyArray<GuideCardMetadata>;
  listType?: React.ComponentProps<
    typeof QuestionsUnifiedListWithFiltersAndProgress
  >['listType'];
  longDescription?: ReactNode;
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
  longDescription,
  formatTabs,
  questionCompletionCount,
  questionList,
  searchPlaceholder,
  listType,
  title,
  selectedCategoryTab,
  guides,
}: Props) {
  const intl = useIntl();
  const languages = useQuestionLanguagesData();
  const frameworks = useQuestionFrameworksData();
  const questionFeatures = useInterviewsQuestionsFeatures();
  const categoryItem =
    listType?.type === 'language'
      ? languages[listType?.value]
      : listType?.type === 'framework'
        ? frameworks[listType?.value]
        : null;
  const features = [
    questionFeatures.solvedByExInterviewers,
    listType?.type === 'language'
      ? questionFeatures.testCases
      : questionFeatures.testScenarios,
    questionFeatures.codeInBrowser,
  ];

  const languageGuidesSlugs: ReadonlyArray<FrontEndInterviewSlugType> =
    selectedCategoryTab === 'coding'
      ? listType?.type === 'language' && listType.value === 'css'
        ? [
            'user-interface',
            'user-interface-questions-cheatsheet',
            'user-interface-components-api-design-principles',
          ]
        : [
            'javascript',
            'algorithms',
            'user-interface',
            'user-interface-questions-cheatsheet',
            'user-interface-components-api-design-principles',
          ]
      : ['quiz'];
  const frameworkGuidesSlugs: ReadonlyArray<FrontEndInterviewSlugType> =
    selectedCategoryTab === 'coding'
      ? [
          'user-interface',
          'user-interface-questions-cheatsheet',
          'user-interface-components-api-design-principles',
        ]
      : ['quiz'];
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

  const frameworkOrLanguageValue =
    listType?.type === 'framework' || listType?.type === 'language'
      ? listType?.value
      : null;

  const filteredGuides = frameworkOrLanguageValue
    ? (guides ?? [])?.filter((guide) =>
        guidesSlugs[frameworkOrLanguageValue].includes(
          guide.id as FrontEndInterviewSlugType,
        ),
      )
    : [];

  const guidesWithCompletionStatus =
    useGuidesWithCompletionStatus(filteredGuides);

  return (
    <div className={clsx('flex flex-col', 'gap-y-10')}>
      <InterviewsPageHeader
        className="flex-col min-[1186px]:flex-row"
        description={description}
        features={features}
        icon={categoryItem?.icon}
        title={title}
      />
      {longDescription && (
        <div
          className={clsx(
            'w-full xl:max-w-[75%]',
            'text-sm lg:text-base',
            themeTextSecondaryColor,
            'text-pretty',
          )}>
          {longDescription}
        </div>
      )}
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          categoryTabs={categoryTabs}
          formatTabs={formatTabs}
          framework={
            listType?.type === 'framework' ? listType?.value : undefined
          }
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
                      category: categoryItem?.label,
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
                      category: categoryItem?.label,
                    },
                  ),
                }
              : undefined
          }
          listType={listType}
          mode="framework"
          questionCompletionCount={questionCompletionCount}
          questions={questionList}
          searchPlaceholder={searchPlaceholder}
          sideColumnAddOn={
            frameworkOrLanguageValue && (
              <div className="hidden lg:block">
                <InterviewsQuestionsCategoryContentSlider
                  frameworkOrLanguage={frameworkOrLanguageValue}
                />
              </div>
            )
          }
        />
      </Section>
    </div>
  );
}
