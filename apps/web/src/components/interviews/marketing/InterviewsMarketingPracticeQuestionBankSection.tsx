import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import SideNavigation from '~/components/common/SideNavigation';
import type {
  QuestionLanguage,
  QuestionMetadata,
  QuestionTopic,
  QuestionUserFacingFormat,
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
import { themeGradientHeading } from '~/components/ui/theme';

type FilterType = 'format' | 'framework' | 'topics';

type QuestionDataType = {
  count: number;
  duration: number;
  questions: ReadonlyArray<QuestionMetadata>;
};

export type QuestionBankDataType = Readonly<{
  coding: QuestionDataType;
  framework: Record<QuestionFramework, QuestionDataType>;
  language: Record<QuestionLanguage, QuestionDataType>;
  quiz: QuestionDataType;
  systemDesign: {
    count: number;
    duration: number;
    questions: ReadonlyArray<QuestionMetadata>;
  };
  topic: Record<QuestionTopic, QuestionDataType>;
}>;

type Props = Readonly<{
  questions: QuestionBankDataType;
}>;

const formatRoute: Record<QuestionUserFacingFormat, string> = {
  coding: '/interviews/questions/javascript',
  quiz: '/interviews/questions/quiz',
  'system-design': '/interviews/questions/system-design',
};
const frameworkRoute: Record<QuestionFramework, string> = {
  angular: '/questions/angular',
  react: '/questions/react',
  svelte: '/questions/svelte',
  vanilla: '/questions/vanilla',
  vue: '/questions/vue',
};
const languageRoute: Record<QuestionLanguage, string> = {
  css: '/questions/css',
  html: '/questions/html',
  js: '/questions/js',
  ts: '/questions/js',
};

const topicRoute: Record<QuestionTopic, string> = {
  a11y: '/interviews/questions/quiz',
  css: '/questions/css',
  html: '/questions/html',
  i18n: '/interviews/questions/quiz',
  javascript: '/questions/js',
  network: '/interviews/questions/quiz',
  performance: '/interviews/questions/quiz',
  security: '/interviews/questions/quiz',
  testing: '/interviews/questions/quiz',
};

const MAX_TO_SHOW = 4;

export default function InterviewsMarketingPracticeQuestionBankSection({
  questions,
}: Props) {
  const intl = useIntl();

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('topics');
  const [selectedFormat, setSelectedFormat] =
    useState<QuestionUserFacingFormat>('coding');
  const [topicFilters, topicFilterOptions] = useQuestionTopicFilter({
    initialValue: ['javascript'],
  });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    initialValue: ['html'],
  });
  const [frameworkFilters, frameworkFilterOptions] =
    useQuestionFrameworkFilter();
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
      items: [
        {
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Label for coding format',
            id: 'Y9v6Lw',
          }),
          value: 'coding',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Quiz',
            description: 'Label for quiz format',
            id: 'hS+erO',
          }),
          value: 'quiz',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'System Design',
            description: 'Label for system design format',
            id: '40aZC1',
          }),
          value: 'system-design',
        },
      ],
      onClick: (value: string) =>
        setSelectedFormat(value as QuestionUserFacingFormat),
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
      items: topicFilterOptions.options,
      onClick: (value: string) =>
        topicFilterOptions.setValues(new Set([value]) as Set<QuestionTopic>),
      value: selectedTopic,
    },
  };

  const filterNavigation = navigation[selectedFilter];

  const { framework, language, coding, quiz, topic, systemDesign } = questions;

  const selectedRoute = (() => {
    switch (selectedFilter) {
      case 'topics': {
        return topicRoute[selectedTopic];
      }
      case 'framework': {
        return (
          frameworkRoute[selectedFramework] || languageRoute[selectedLanguage]
        );
      }
      case 'format': {
        return formatRoute[selectedFormat];
      }
    }
  })();

  function processQuestions() {
    switch (selectedFilter) {
      case 'format': {
        if (selectedFormat === 'coding') {
          return coding;
        }
        if (selectedFormat === 'quiz') {
          return quiz;
        }

        return systemDesign;
      }
      case 'framework': {
        return framework[selectedFramework] || language[selectedLanguage];
      }
      case 'topics': {
        return topic[selectedTopic];
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
    <div className="flex gap-x-10">
      <QuestionCountLabel count={questionsCount} showIcon={true} />
      <QuestionTotalTimeLabel mins={duration} showIcon={true} />
    </div>
  );

  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
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
            'max-w-md lg:max-w-2xl',
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
        <div className={clsx('mt-16', 'flex flex-col gap-8')}>
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
                  label="Select navigation item"
                  size="sm"
                  tabs={filterNavigation.items}
                  value={filterNavigation.value}
                  onSelect={filterNavigation.onClick}
                />
              </div>
              <SideNavigation
                activeValue={filterNavigation.value}
                items={filterNavigation.items}
                onClick={filterNavigation.onClick}
              />
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
