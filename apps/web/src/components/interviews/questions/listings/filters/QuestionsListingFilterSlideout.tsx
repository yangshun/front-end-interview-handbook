import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';

import type {
  QuestionFormat,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import SlideOut from '~/components/ui/SlideOut';

import useQuestionUnifiedFilters from './hooks/useQuestionUnifiedFilters';
import QuestionListingFilterButtonBadgeWrapper from './QuestionListingFilterButtonBadgeWrapper';
import QuestionListingUnifiedFilters from './QuestionListingUnifiedFilters';
import type { QuestionsListAttributesUnion } from './QuestionsProcessor';

type Props = Readonly<{
  attributesUnion: QuestionsListAttributesUnion;
  formatFiltersFilterPredicate?: (format: QuestionFormat) => boolean;
  formatFiltersOrderComparator?: (
    a: QuestionFormat,
    b: QuestionFormat,
  ) => number;
  initialFormat?: QuestionFormat | null;
  initialOpenItems?: ReadonlyArray<string>;
  listType?: QuestionListTypeData;
  mode?: 'default' | 'framework';
}>;

export default function QuestionsListingFilterSlideOut({
  attributesUnion,
  listType,
  initialFormat,
  formatFiltersFilterPredicate,
  formatFiltersOrderComparator,
  initialOpenItems,
  mode,
}: Props) {
  const intl = useIntl();
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const {
    difficultyFilters,
    difficultyFilterOptions,
    companyFilters,
    companyFilterOptions,
    languageFilters,
    languageFilterOptions,
    frameworkFilters,
    frameworkFilterOptions,
    importanceFilters,
    importanceFilterOptions,
    completionStatusFilters,
    completionStatusFilterOptions,
    formatFilters,
    formatFilterOptions,
    topicFilters,
    topicFilterOptions,
    filters,
  } = useQuestionUnifiedFilters({
    formatFiltersFilterPredicate,
    formatFiltersOrderComparator,
    initialFormat,
    listType,
  });

  // To maintain local state of the filters
  const {
    topicFilters: localTopicFilters,
    topicFilterOptions: localTopicsFilterOptions,
    difficultyFilters: localDifficultyFilters,
    difficultyFilterOptions: localDifficultyFilterOptions,
    companyFilters: localCompanyFilters,
    companyFilterOptions: localCompanyFilterOptions,
    languageFilters: localLanguageFilters,
    languageFilterOptions: localLanguageFilterOptions,
    frameworkFilters: localFrameworkFilters,
    frameworkFilterOptions: localFrameworkFilterOptions,
    importanceFilters: localImportanceFilters,
    importanceFilterOptions: localImportanceFilterOptions,
    completionStatusFilters: localCompletionStatusFilters,
    completionStatusFilterOptions: localCompletionStatusFilterOptions,
    formatFilters: localFormatFilters,
    formatFilterOptions: localFormatFilterOptions,
    clearAllFilters,
  } = useQuestionUnifiedFilters({
    formatFiltersFilterPredicate,
    formatFiltersOrderComparator,
    initialFormat,
  });

  const numberOfFilters = filters.filter(([size]) => size > 0).length;

  const onApply = () => {
    topicFilterOptions.setValues(localTopicFilters);
    difficultyFilterOptions.setValues(localDifficultyFilters);
    companyFilterOptions.setValues(localCompanyFilters);
    languageFilterOptions.setValues(localLanguageFilters);
    frameworkFilterOptions.setValues(localFrameworkFilters);
    importanceFilterOptions.setValues(localImportanceFilters);
    completionStatusFilterOptions.setValues(localCompletionStatusFilters);
    formatFilterOptions.setValues(localFormatFilters);
    setIsFiltersShown(false);
  };

  useEffect(() => {
    if (!isFiltersShown) {
      return;
    }
    localTopicsFilterOptions.setValues(topicFilters);
    localDifficultyFilterOptions.setValues(difficultyFilters);
    localCompanyFilterOptions.setValues(companyFilters);
    localLanguageFilterOptions.setValues(languageFilters);
    localFrameworkFilterOptions.setValues(frameworkFilters);
    localImportanceFilterOptions.setValues(importanceFilters);
    localCompletionStatusFilterOptions.setValues(completionStatusFilters);
    localFormatFilterOptions.setValues(formatFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiltersShown]);

  return (
    <SlideOut
      isShown={isFiltersShown}
      primaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Apply',
            description: 'Label for apply button',
            id: 'aJWJvF',
          })}
          size="md"
          variant="primary"
          onClick={onApply}
        />
      }
      secondaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Clear all',
            description: 'Label for clear all button',
            id: 'LEh5WZ',
          })}
          size="md"
          variant="secondary"
          onClick={clearAllFilters}
        />
      }
      size="sm"
      title={intl.formatMessage({
        defaultMessage: 'Filters',
        description: 'Label for filters button',
        id: 'k2Oi+j',
      })}
      trigger={
        <QuestionListingFilterButtonBadgeWrapper
          badgeClassName={clsx('-right-2 -top-1.5', 'size-5 text-xs')}
          numberOfFilters={numberOfFilters}>
          <FilterButton
            icon={RiFilterLine}
            isLabelHidden={true}
            label={
              intl.formatMessage({
                defaultMessage: 'Filters',
                description: 'Label for filters button',
                id: 'k2Oi+j',
              }) + (numberOfFilters > 0 ? ` (${numberOfFilters})` : '')
            }
            selected={numberOfFilters > 0}
            size="sm"
            onClick={() => {
              setIsFiltersShown(true);
            }}
          />
        </QuestionListingFilterButtonBadgeWrapper>
      }
      onClose={() => {
        setIsFiltersShown(false);
      }}>
      <QuestionListingUnifiedFilters
        attributesUnion={attributesUnion}
        companyFilterOptions={localCompanyFilterOptions}
        companyFilters={localCompanyFilters}
        completionStatusFilterOptions={localCompletionStatusFilterOptions}
        completionStatusFilters={localCompletionStatusFilters}
        difficultyFilterOptions={localDifficultyFilterOptions}
        difficultyFilters={localDifficultyFilters}
        formatFilterOptions={localFormatFilterOptions}
        formatFilters={localFormatFilters}
        frameworkFilterOptions={localFrameworkFilterOptions}
        frameworkFilters={localFrameworkFilters}
        importanceFilterOptions={localImportanceFilterOptions}
        importanceFilters={localImportanceFilters}
        initialOpenItems={initialOpenItems}
        languageFilterOptions={localLanguageFilterOptions}
        languageFilters={localLanguageFilters}
        mode={mode}
        topicFilterOptions={localTopicsFilterOptions}
        topicFilters={localTopicFilters}
      />
    </SlideOut>
  );
}
