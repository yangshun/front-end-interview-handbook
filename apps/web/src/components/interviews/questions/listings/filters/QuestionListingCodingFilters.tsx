import clsx from 'clsx';

import type { FilterItemGap } from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import { themeDivideColor, themeLineColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type {
  QuestionCodingFormat,
  QuestionCompany,
  QuestionCompletionStatus,
  QuestionDifficulty,
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  codingFormatFilterOptions: QuestionFilter<
    QuestionCodingFormat,
    QuestionMetadata
  >;
  codingFormatFilters: Set<QuestionCodingFormat>;
  companyFilterOptions: QuestionFilter<QuestionCompany, QuestionMetadata>;
  companyFilters: Set<QuestionCompany>;
  completionStatusFilterOptions: QuestionFilter<
    QuestionCompletionStatus,
    QuestionMetadataWithCompletedStatus
  >;
  completionStatusFilters: Set<QuestionCompletionStatus>;
  difficultyFilterOptions: QuestionFilter<QuestionDifficulty, QuestionMetadata>;
  difficultyFilters: Set<QuestionDifficulty>;
  frameworkFilterOptions: QuestionFilter<QuestionFramework, QuestionMetadata>;
  frameworkFilters: Set<QuestionFramework>;
  itemGap: FilterItemGap;
  languageFilterOptions: QuestionFilter<QuestionLanguage, QuestionMetadata>;
  languageFilters: Set<QuestionLanguage>;
  mode?: 'default' | 'framework';
}>;

export default function QuestionListingCodingFilters({
  codingFormatFilterOptions,
  codingFormatFilters,
  companyFilterOptions,
  companyFilters,
  completionStatusFilterOptions,
  completionStatusFilters,
  difficultyFilterOptions,
  difficultyFilters,
  frameworkFilterOptions,
  frameworkFilters,
  languageFilterOptions,
  languageFilters,
  mode,
  itemGap,
}: Props) {
  return (
    <form
      className={clsx(
        'flex flex-col divide-y border-y',
        themeLineColor,
        themeDivideColor,
      )}>
      <QuestionListingFilterItem
        itemGap={itemGap}
        section={companyFilterOptions}
        values={companyFilters}
      />
      <QuestionListingFilterItem
        itemGap={itemGap}
        section={difficultyFilterOptions}
        values={difficultyFilters}
      />
      {mode !== 'framework' && (
        <QuestionListingFilterItem
          itemGap={itemGap}
          section={frameworkFilterOptions}
          values={frameworkFilters}
        />
      )}
      <QuestionListingFilterItem
        itemGap={itemGap}
        section={languageFilterOptions}
        values={languageFilters}
      />
      <QuestionListingFilterItem
        itemGap={itemGap}
        section={completionStatusFilterOptions}
        values={completionStatusFilters}
      />
      <QuestionListingFilterItem
        itemGap={itemGap}
        section={codingFormatFilterOptions}
        values={codingFormatFilters}
      />
    </form>
  );
}
