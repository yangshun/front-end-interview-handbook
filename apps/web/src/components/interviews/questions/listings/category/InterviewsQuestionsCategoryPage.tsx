'use client';

import clsx from 'clsx';
import { type ReactNode } from 'react';

import {
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import type { GuideCardMetadata } from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import InterviewsPageLongDescription from '~/components/interviews/common/InterviewsPageLongDescription';
import useInterviewsSidebarCollapsed from '~/components/interviews/common/useInterviewsSidebarCollapsed';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryContentSlider from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryContentSlider';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatSpotlightCardContainer from '~/components/sponsors/ads/SponsorsAdFormatSpotlightCardContainer';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  description: string;
  features: React.ComponentProps<typeof InterviewsPageHeader>['features'];
  guides?: ReadonlyArray<GuideCardMetadata>;
  listType?: React.ComponentProps<
    typeof QuestionsUnifiedListWithFiltersAndProgress
  >['listType'];
  longDescription?: ReactNode;
  questionCompletionCount?: QuestionCompletionCount;
  questionList: ReadonlyArray<QuestionMetadata>;
  searchPlaceholder: string;
  title: string;
  titleAddOnText?: string;
}>;

export default function InterviewsQuestionsCategoryPage({
  categoryTabs,
  description,
  longDescription,
  features,
  questionCompletionCount,
  questionList,
  searchPlaceholder,
  listType,
  title,
  guides,
}: Props) {
  const intl = useIntl();
  const [isSidebarCollapsed] = useInterviewsSidebarCollapsed();
  const languages = useQuestionLanguagesData();
  const frameworks = useQuestionFrameworksData();
  const categoryItem =
    listType?.type === 'language'
      ? languages[listType?.value]
      : listType?.type === 'framework'
        ? frameworks[listType?.value]
        : null;

  const frameworkOrLanguageValue =
    listType?.type === 'framework' || listType?.type === 'language'
      ? listType?.value
      : null;

  const guidesWithCompletionStatus = useGuidesWithCompletionStatus(
    guides ?? [],
  );

  return (
    <div className={clsx('flex flex-col gap-y-8')}>
      <InterviewsPageHeader
        className="min-[1186px]:flex-row"
        description={description}
        features={features}
        icon={categoryItem?.icon}
        title={title}
      />
      <Section>
        {longDescription && (
          <InterviewsPageLongDescription>
            {longDescription}
          </InterviewsPageLongDescription>
        )}
        <QuestionsUnifiedListWithFiltersAndProgress
          categoryTabs={categoryTabs}
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
          questionCompletionCount={questionCompletionCount}
          questions={questionList}
          searchPlaceholder={searchPlaceholder}
          sideColumnAddOn={
            frameworkOrLanguageValue ? (
              <InterviewsQuestionsCategoryContentSlider
                frameworkOrLanguage={frameworkOrLanguageValue}
              />
            ) : isSidebarCollapsed ? (
              <SponsorsAdFormatSpotlightCardContainer adPlacement="questions_side_column" />
            ) : null
          }
        />
      </Section>
    </div>
  );
}
