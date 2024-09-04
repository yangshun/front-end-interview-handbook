import clsx from 'clsx';

import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionFilterItemGap } from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemCheckboxes from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemLabel from './QuestionListingFilterItemLabel';
import type {
  QuestionCompany,
  QuestionCompletionStatus,
  QuestionDifficulty,
  QuestionFormat,
  QuestionFramework,
  QuestionImportance,
  QuestionLanguage,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  companyFilterOptions: QuestionFilter<QuestionCompany, QuestionMetadata>;
  companyFilters: Set<QuestionCompany>;
  completionStatusFilterOptions: QuestionFilter<
    QuestionCompletionStatus,
    QuestionMetadataWithCompletedStatus
  >;
  completionStatusFilters: Set<QuestionCompletionStatus>;
  difficultyFilterOptions: QuestionFilter<QuestionDifficulty, QuestionMetadata>;
  difficultyFilters: Set<QuestionDifficulty>;
  formatFilterOptions: QuestionFilter<QuestionFormat, QuestionMetadata>;
  formatFilters: Set<QuestionFormat>;
  frameworkFilterOptions: QuestionFilter<QuestionFramework, QuestionMetadata>;
  frameworkFilters: Set<QuestionFramework>;
  importanceFilterOptions: QuestionFilter<QuestionImportance, QuestionMetadata>;
  importanceFilters: Set<QuestionImportance>;
  itemGap: QuestionFilterItemGap;
  languageFilterOptions: QuestionFilter<QuestionLanguage, QuestionMetadata>;
  languageFilters: Set<QuestionLanguage>;
  mode?: 'default' | 'framework';
}>;

export default function QuestionListingCodingFilters({
  formatFilterOptions,
  formatFilters,
  companyFilterOptions,
  companyFilters,
  completionStatusFilterOptions,
  completionStatusFilters,
  difficultyFilterOptions,
  difficultyFilters,
  importanceFilterOptions,
  importanceFilters,
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
        <QuestionListingFilterItem
          itemGap={itemGap}
          section={importanceFilterOptions}
          values={importanceFilters}
        />
        <AccordionItem value="framework-language">
          <Tooltip
            asChild={true}
            label={
              <p className="flex flex-col gap-2">
                You may complete questions in any language or framework within
                our coding workspace.
                <br />
                <br />
                This filter helps you to find questions with official solutions
                in these Frameworks or Languages.
              </p>
            }>
            <AccordionTrigger>
              <QuestionListingFilterItemLabel
                label="Framework / Language"
                showInfoIcon={true}
              />
            </AccordionTrigger>
          </Tooltip>
          <AccordionContent>
            <div className="flex flex-col gap-y-5">
              {mode !== 'framework' && (
                <>
                  <div className="flex flex-col gap-y-3">
                    <Text className="block" size="body2">
                      {frameworkFilterOptions.name}
                    </Text>
                    <QuestionListingFilterItemCheckboxes
                      itemGap={itemGap}
                      section={frameworkFilterOptions}
                      values={frameworkFilters}
                    />
                  </div>
                  <Divider />
                </>
              )}
              <div className="flex flex-col gap-y-3">
                <Text className="block" size="body2">
                  {languageFilterOptions.name}
                </Text>
                <QuestionListingFilterItemCheckboxes
                  itemGap={itemGap}
                  section={languageFilterOptions}
                  values={languageFilters}
                />
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
          section={formatFilterOptions}
          values={formatFilters}
        />
      </Accordion>
    </form>
  );
}
