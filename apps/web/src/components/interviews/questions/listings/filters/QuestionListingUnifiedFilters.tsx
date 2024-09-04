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
import QuestionListingFilterItemCheckboxes from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemLabel from './QuestionListingFilterItemLabel';
import type { QuestionsListAttributesUnion } from './QuestionsProcessor';
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
  attributesUnion: QuestionsListAttributesUnion;
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
  languageFilterOptions: QuestionFilter<QuestionLanguage, QuestionMetadata>;
  languageFilters: Set<QuestionLanguage>;
  mode?: 'default' | 'framework';
}>;

export default function QuestionListingUnifiedFilters({
  attributesUnion,
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
}: Props) {
  return (
    <form>
      <Accordion
        className={clsx('border-y', themeBorderElementColor)}
        defaultValue={[
          companyFilterOptions.id,
          difficultyFilterOptions.id,
          importanceFilters.size > 0 ? importanceFilterOptions.id : null,
          frameworkFilters.size > 0 || languageFilters.size > 0
            ? 'framework-language'
            : null,
          completionStatusFilters.size > 0
            ? completionStatusFilterOptions.id
            : null,
          formatFilters.size > 0 ? formatFilterOptions.id : null,
        ].flatMap((val) => (val != null ? [val] : []))}
        type="multiple">
        <QuestionListingFilterItem
          section={companyFilterOptions}
          values={companyFilters}
        />
        <QuestionListingFilterItem
          coveredValues={attributesUnion.difficulty}
          section={difficultyFilterOptions}
          values={difficultyFilters}
        />
        <QuestionListingFilterItem
          coveredValues={attributesUnion.importance}
          section={importanceFilterOptions}
          values={importanceFilters}
        />
        {(attributesUnion.frameworks.size > 1 ||
          attributesUnion.languages.size > 1) && (
          <AccordionItem value="framework-language">
            <Tooltip
              asChild={true}
              label={
                <p className="flex flex-col gap-2">
                  You may complete questions in any language or framework within
                  our coding workspace.
                  <br />
                  <br />
                  This filter helps you to find questions with official
                  solutions in these Frameworks or Languages.
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
                {mode !== 'framework' &&
                  attributesUnion.frameworks.size > 1 && (
                    <>
                      <div className="flex flex-col gap-y-3">
                        <Text className="block" size="body2">
                          {frameworkFilterOptions.name}
                        </Text>
                        <QuestionListingFilterItemCheckboxes
                          coveredValues={attributesUnion.frameworks}
                          section={frameworkFilterOptions}
                          values={frameworkFilters}
                        />
                      </div>
                      <Divider />
                    </>
                  )}
                {attributesUnion.languages.size > 1 && (
                  <div className="flex flex-col gap-y-3">
                    <Text className="block" size="body2">
                      {languageFilterOptions.name}
                    </Text>
                    <QuestionListingFilterItemCheckboxes
                      coveredValues={attributesUnion.languages}
                      section={languageFilterOptions}
                      values={languageFilters}
                    />
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        <QuestionListingFilterItem
          section={completionStatusFilterOptions}
          values={completionStatusFilters}
        />
        <QuestionListingFilterItem
          coveredValues={attributesUnion.formats}
          section={formatFilterOptions}
          values={formatFilters}
        />
      </Accordion>
    </form>
  );
}
