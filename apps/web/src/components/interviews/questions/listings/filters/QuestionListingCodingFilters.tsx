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

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionFilterItemGap } from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemCheckboxes from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemLabel from './QuestionListingFilterItemLabel';
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
  itemGap: QuestionFilterItemGap;
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
            <QuestionListingFilterItemLabel
              label="Framework / Language"
              tooltip={
                <p className="flex flex-col gap-2">
                  You may complete questions in any language or framework within
                  our coding workspace.
                  <br />
                  <br />
                  This filter helps you to find questions with official
                  solutions in these Frameworks or Languages.
                </p>
              }
            />
          </AccordionTrigger>
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
          section={codingFormatFilterOptions}
          values={codingFormatFilters}
        />
      </Accordion>
    </form>
  );
}
