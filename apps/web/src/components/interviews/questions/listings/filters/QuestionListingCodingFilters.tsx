import clsx from 'clsx';
import { values } from 'lodash-es';

import type { FilterItemGap } from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

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

const itemGapClasses: Record<FilterItemGap, string> = {
  compact: 'gap-x-4 gap-y-3',
  spacious: 'gap-6',
};

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
    <form>
      <Accordion
        className={clsx('border-y', themeBorderElementColor)}
        defaultValue={['company', 'difficulty']}
        type="multiple">
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
        <AccordionItem value="framework-language">
          <AccordionTrigger>
            <Text size="body2" weight="medium">
              Framework / Language
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-y-5">
              {mode !== 'framework' && (
                <>
                  <div className="flex flex-col gap-y-3">
                    <Text className="block" size="body2">
                      {frameworkFilterOptions.name}
                    </Text>
                    <div
                      className={clsx(
                        'flex flex-wrap',
                        itemGapClasses[itemGap],
                      )}>
                      {frameworkFilterOptions.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <CheckboxInput
                            label={option.label}
                            value={frameworkFilters.has(option.value)}
                            onChange={() =>
                              frameworkFilterOptions.onChange(option.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <Divider />
                </>
              )}
              <div className="flex flex-col gap-y-3">
                <Text className="block" size="body2">
                  {languageFilterOptions.name}
                </Text>
                <div
                  className={clsx('flex flex-wrap', itemGapClasses[itemGap])}>
                  {languageFilterOptions.options.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <CheckboxInput
                        label={option.label}
                        value={languageFilters.has(option.value)}
                        onChange={() =>
                          languageFilterOptions.onChange(option.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
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
      </Accordion>
    </form>
  );
}
