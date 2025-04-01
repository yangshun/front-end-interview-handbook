import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import {
  useQuestionFormatsData,
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import SideNavigation from '~/components/common/SideNavigation';
import type {
  QuestionFormat,
  QuestionLanguage,
  QuestionMetadata,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionFramework } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionFrameworkFilter, {
  FRAMEWORK_OPTIONS,
} from '~/components/interviews/questions/listings/filters/hooks/useQuestionFrameworkFilter';
import useQuestionLanguageFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionLanguageFilter';
import useQuestionTopicFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionTopicFilter';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '~/components/interviews/questions/metadata/QuestionTotalTimeLabel';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { QuestionTopicToDisplay } from './InterviewsMarketingDisplayTopics';
import {
  InterviewsMarketingDisplayTopics,
  InterviewsMarketingDisplayTopicsHrefs,
} from './InterviewsMarketingDisplayTopics';
import useQuestionFormatFilter from '../questions/listings/filters/hooks/useQuestionFormatFilter';
import useQuestionTopicLabels from '../questions/listings/items/useQuestionTopicLabels';

type FilterType = 'format' | 'framework' | 'topics';

type QuestionDataType = {
  count: number;
  duration: number;
  questions: ReadonlyArray<QuestionMetadata>;
};

export type QuestionBankDataType = Readonly<{
  format: Record<QuestionFormat, QuestionDataType>;
  framework: Record<QuestionFramework, QuestionDataType>;
  language: Record<QuestionLanguage, QuestionDataType>;
  topic: Partial<Record<QuestionTopic, QuestionDataType>>;
}>;

type Props = Readonly<{
  questions: QuestionBankDataType;
}>;

const MAX_TO_SHOW = 4;

export default function InterviewsMarketingPracticeQuestionBankSection({
  questions,
}: Props) {
  const intl = useIntl();

  const topics = useQuestionTopicLabels();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('topics');
  const [formatFilters, formatFilterOptions] = useQuestionFormatFilter({
    initialValue: ['javascript'],
  });
  const [topicFilters, topicFilterOptions] = useQuestionTopicFilter({
    initialValue: ['a11y'],
  });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    initialValue: ['html'],
  });
  const [frameworkFilters, frameworkFilterOptions] =
    useQuestionFrameworkFilter();

  const selectedFormat = Array.from(formatFilters)[0];
  const selectedTopic = Array.from(topicFilters)[0];
  const selectedLanguage = Array.from(languageFilters)[0];
  const selectedFramework = Array.from(frameworkFilters)[0];

  const filterTabs: ReadonlyArray<{
    label: string;
    value: FilterType;
  }> = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Topics',
        description: 'Label for topics filter',
        id: 'hNYptD',
      }),
      value: 'topics',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Framework / language',
        description: 'Label for framework/language filter',
        id: 'D0xOX8',
      }),
      value: 'framework',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Format',
        description: 'Label for format filter',
        id: 'vTb+8H',
      }),
      value: 'format',
    },
  ];

  const navigation = {
    format: {
      items: formatFilterOptions.options,
      onClick: (value: string) =>
        formatFilterOptions.setValues(new Set([value]) as Set<QuestionFormat>),
      value: selectedFormat,
    },
    framework: {
      items: [
        ...languageFilterOptions.options,
        ...frameworkFilterOptions.options,
      ],
      onClick: (value: string) => {
        if (FRAMEWORK_OPTIONS.includes(value as QuestionFramework)) {
          languageFilterOptions.onClear();
          frameworkFilterOptions.setValues(
            new Set([value]) as Set<QuestionFramework>,
          );
        } else {
          frameworkFilterOptions.onClear();
          languageFilterOptions.setValues(
            new Set([value]) as Set<QuestionLanguage>,
          );
        }
      },
      value: selectedFramework || selectedLanguage,
    },
    topics: {
      items: InterviewsMarketingDisplayTopics.map((topic) => ({
        label: topics[topic].label,
        value: topic,
      })),
      onClick: (value: string) =>
        topicFilterOptions.setValues(new Set([value]) as Set<QuestionTopic>),
      value: selectedTopic,
    },
  };

  const filterNavigation = navigation[selectedFilter];

  const { framework, language, format, topic } = questions;
  const frameworksData = useQuestionFrameworksData();
  const languagesData = useQuestionLanguagesData();
  const formatsData = useQuestionFormatsData();

  const selectedRoute = (() => {
    switch (selectedFilter) {
      case 'topics': {
        return (
          InterviewsMarketingDisplayTopicsHrefs[
            selectedTopic as QuestionTopicToDisplay
          ] ?? '/questions'
        );
      }
      case 'framework': {
        return (
          frameworksData[selectedFramework] || languagesData[selectedLanguage]
        ).href;
      }
      case 'format': {
        return formatsData[selectedFormat].href;
      }
    }
  })();

  function processQuestions() {
    switch (selectedFilter) {
      case 'format': {
        return format[selectedFormat];
      }
      case 'framework': {
        return framework[selectedFramework] || language[selectedLanguage];
      }
      case 'topics': {
        return topic[selectedTopic] ?? { count: 0, duration: 0, questions: [] };
      }
    }
  }

  const {
    questions: processedQuestions,
    count: questionsCount,
    duration,
  } = processQuestions();

  const questionsWithCompletionStatus = processedQuestions.map((question) => ({
    ...question,
    isCompleted: false,
  }));

  const listMetadata = (
    <div className={clsx('flex gap-x-10', themeTextSecondaryColor)}>
      <QuestionCountLabel
        color="inherit"
        count={questionsCount}
        showIcon={true}
      />
      <QuestionTotalTimeLabel color="inherit" mins={duration} showIcon={true} />
    </div>
  );

  return (
    <Container
      className={clsx('py-16 sm:py-20')}
      tag="section"
      width="marketing">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Huge question bank"
          description="Marketing section title"
          id="2JUtFz"
        />
      </Heading>
      <Heading
        className={clsx(
          themeMarketingHeadingSize,
          themeGradientHeading,
          'max-w-2xl pb-1',
        )}
        level="custom"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="A practice question bank with everything you'd ever need"
          description="Title for marketing page section"
          id="scZfxP"
        />
      </Heading>
      <Section>
        <Text
          className={clsx(
            'mt-6 block',
            'text-base lg:text-lg',
            'lg:font-medium',
            'md:max-w-[634px]',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="We have questions in every critical topic, interview format and framework / language. Every question comes with solutions and test cases."
            description="Subtitle for marketing page section"
            id="2vJhW9"
          />
        </Text>
        <div className={clsx('mt-12 lg:mt-16', 'flex flex-col gap-6')}>
          <div className="xl:grid xl:grid-cols-12">
            <div
              className={clsx(
                'xl:col-span-11',
                'flex flex-col justify-between gap-8 lg:flex-row lg:items-center',
              )}>
              <div className="flex gap-x-2">
                {filterTabs.map(({ value, label }) => (
                  <FilterButton
                    key={value}
                    label={label}
                    selected={selectedFilter === value}
                    onClick={() => setSelectedFilter(value)}
                  />
                ))}
              </div>
              <div className="hidden md:block">{listMetadata}</div>
            </div>
          </div>
          <div
            className={clsx(
              'flex flex-col gap-x-6 gap-y-8 md:grid md:grid-cols-8 lg:grid-cols-12',
            )}>
            <div className="md:col-span-2 lg:col-span-3">
              <div className="md:hidden">
                <TabsUnderline
                  label={intl.formatMessage({
                    defaultMessage: 'Select navigation item',
                    description: 'Select navigation item label',
                    id: '94sK60',
                  })}
                  size="sm"
                  tabs={filterNavigation.items}
                  value={filterNavigation.value}
                  onSelect={filterNavigation.onClick}
                />
              </div>
              <div className="hidden md:block">
                <SideNavigation
                  activeValue={filterNavigation.value}
                  items={filterNavigation.items}
                  onClick={filterNavigation.onClick}
                />
              </div>
            </div>
            <div
              className={clsx(
                'md:col-span-6 lg:col-span-9 xl:col-span-8',
                'flex flex-col gap-4',
              )}>
              <div className="md:hidden">{listMetadata}</div>
              <div className="relative">
                <div
                  className="pointer-events-none touch-none select-none"
                  // So that focus cannot go into the card, which is not meant to be used.
                  inert="">
                  <QuestionsList
                    key={selectedFilter}
                    checkIfCompletedQuestion={() => false}
                    questionCompletionCount={{}}
                    questions={questionsWithCompletionStatus.slice(
                      0,
                      MAX_TO_SHOW,
                    )}
                    showArrowRight={false}
                    showOverlayAtLastItem={
                      questionsWithCompletionStatus.length >= MAX_TO_SHOW
                    }
                  />
                </div>
                {questionsWithCompletionStatus.length >= MAX_TO_SHOW && (
                  <div
                    className={clsx(
                      'absolute bottom-10 left-1/2 -translate-x-1/2',
                    )}>
                    <Button
                      href={selectedRoute}
                      icon={RiArrowRightLine}
                      label={intl.formatMessage({
                        defaultMessage: 'See all questions',
                        description: 'Label for see all questions button',
                        id: 'Ntem6r',
                      })}
                      prefetch={null}
                      size="md"
                      variant="secondary"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
