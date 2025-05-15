'use client';

import clsx from 'clsx';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import { useIntl } from '~/components/intl';
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

import type {
  InterviewsQuestionItemMinimal,
  InterviewsQuestionItemWithCompletedStatus,
  QuestionCompany,
  QuestionCompletionStatus,
  QuestionDifficulty,
  QuestionFormat,
  QuestionFramework,
  QuestionImportance,
  QuestionLanguage,
  QuestionTopic,
} from '../../common/QuestionsTypes';
import type { QuestionFilter } from './QuestionFilterType';
import QuestionFrameworkLanguageTooltipLabel from './QuestionFrameworkLanguageTooltipLabel';
import QuestionListingFilterItemCheckboxes from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemLabel from './QuestionListingFilterItemLabel';
import type { QuestionsListAttributesUnion } from './QuestionsProcessor';

type Props = Readonly<{
  attributesUnion: QuestionsListAttributesUnion;
  companyFilterOptions: QuestionFilter<
    QuestionCompany,
    InterviewsQuestionItemMinimal
  >;
  companyFilters: Set<QuestionCompany>;
  completionStatusFilterOptions: QuestionFilter<
    QuestionCompletionStatus,
    InterviewsQuestionItemWithCompletedStatus
  >;
  completionStatusFilters: Set<QuestionCompletionStatus>;
  difficultyFilterOptions: QuestionFilter<
    QuestionDifficulty,
    InterviewsQuestionItemMinimal
  >;
  difficultyFilters: Set<QuestionDifficulty>;
  formatFilterOptions?: QuestionFilter<
    QuestionFormat,
    InterviewsQuestionItemMinimal
  >;
  formatFilters?: Set<QuestionFormat>;
  frameworkFilterOptions: QuestionFilter<
    QuestionFramework,
    InterviewsQuestionItemMinimal
  >;
  frameworkFilters: Set<QuestionFramework>;
  importanceFilterOptions: QuestionFilter<
    QuestionImportance,
    InterviewsQuestionItemMinimal
  >;
  importanceFilters: Set<QuestionImportance>;
  initialOpenItems?: ReadonlyArray<string>;
  languageFilterOptions: QuestionFilter<
    QuestionLanguage,
    InterviewsQuestionItemMinimal
  >;
  languageFilters: Set<QuestionLanguage>;
  topicFilterOptions: QuestionFilter<
    QuestionTopic,
    InterviewsQuestionItemMinimal
  >;
  topicFilters: Set<QuestionTopic>;
}>;

export default function QuestionListingUnifiedFilters({
  attributesUnion,
  companyFilterOptions,
  companyFilters,
  completionStatusFilterOptions,
  completionStatusFilters,
  difficultyFilterOptions,
  difficultyFilters,
  formatFilterOptions,
  formatFilters,
  frameworkFilterOptions,
  frameworkFilters,
  importanceFilterOptions,
  importanceFilters,
  initialOpenItems = ['format'],
  languageFilterOptions,
  languageFilters,
  topicFilterOptions,
  topicFilters,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  return (
    <form>
      <Accordion
        className={clsx('border-b', themeBorderElementColor)}
        defaultValue={[
          initialOpenItems?.includes('format') ||
          (formatFilterOptions != null &&
            formatFilters != null &&
            formatFilters.size > 0)
            ? formatFilterOptions?.id
            : null,
          companyFilterOptions.id,
          topicFilterOptions.id,
          initialOpenItems?.includes('difficulty') || difficultyFilters.size > 0
            ? difficultyFilterOptions.id
            : null,
          initialOpenItems?.includes('importance') || importanceFilters.size > 0
            ? importanceFilterOptions.id
            : null,
          initialOpenItems?.includes('framework') ||
          initialOpenItems?.includes('language') ||
          frameworkFilters.size > 0 ||
          languageFilters.size > 0
            ? 'framework-language'
            : null,
          initialOpenItems?.includes('completion') ||
          completionStatusFilters.size > 0
            ? completionStatusFilterOptions.id
            : null,
        ].flatMap((val) => (val != null ? [val] : []))}
        type="multiple">
        {formatFilterOptions != null && formatFilters != null && (
          <QuestionListingFilterItem
            coveredValues={attributesUnion.formats}
            section={formatFilterOptions}
            values={formatFilters}
          />
        )}
        <QuestionListingFilterItem
          coveredValues={attributesUnion.topics}
          section={topicFilterOptions}
          values={topicFilters}
        />
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
        {userProfile != null && (
          <QuestionListingFilterItem
            section={completionStatusFilterOptions}
            values={completionStatusFilters}
          />
        )}
        {(attributesUnion.frameworks.size > 1 ||
          attributesUnion.languages.size > 1) && (
          <AccordionItem value="framework-language">
            <Tooltip
              asChild={true}
              label={<QuestionFrameworkLanguageTooltipLabel />}>
              <AccordionTrigger>
                <QuestionListingFilterItemLabel
                  label={intl.formatMessage({
                    defaultMessage: 'Framework / Language',
                    description:
                      'Label for frameworks and programming language button',
                    id: 'XhL9G7',
                  })}
                  showInfoIcon={true}
                />
              </AccordionTrigger>
            </Tooltip>
            <AccordionContent>
              <div className="flex flex-col gap-y-5">
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
                {attributesUnion.languages.size > 1 &&
                  attributesUnion.frameworks.size > 1 && <Divider />}
                {attributesUnion.frameworks.size > 1 && (
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
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </form>
  );
}
