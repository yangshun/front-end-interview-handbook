import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import FilterButton from '~/components/common/FilterButton';
import type { QuestionMetadataWithCompletedStatus } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '~/components/interviews/questions/metadata/QuestionTotalTimeLabel';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeGradientHeading,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

export default function InterviewsMarketingPracticeQuestionBankSection() {
  const intl = useIntl();
  const questions: ReadonlyArray<QuestionMetadataWithCompletedStatus> = [
    {
      author: 'yangshun',
      companies: ['amazon'],
      created: 1656028800,
      difficulty: 'easy',
      duration: 5,
      excerpt:
        'Build a simple counter that increments whenever a button is clicked',
      featured: false,
      format: 'user-interface',
      frameworkDefault: 'react',
      frameworks: [
        {
          framework: 'react',
          href: '/questions/user-interface/counter/react',
        },
        {
          framework: 'vanilla',
          href: '/questions/user-interface/counter/vanilla',
        },
        {
          framework: 'angular',
          href: '/questions/user-interface/counter/angular',
        },
        {
          framework: 'vue',
          href: '/questions/user-interface/counter/vue',
        },
        {
          framework: 'svelte',
          href: '/questions/user-interface/counter/svelte',
        },
      ],
      href: '/questions/user-interface/counter',
      importance: 'low',
      isCompleted: false,
      languages: ['html', 'js'],
      nextQuestions: [],
      premium: false,
      published: true,
      ranking: 100,
      similarQuestions: [],
      slug: 'counter',
      subtitle: null,
      title: 'Counter',
      topics: [],
    },
    {
      author: 'yangshun',
      companies: [],
      created: 1670025600,
      difficulty: 'easy',
      duration: 10,
      excerpt:
        'Implement a stack data structure containing the common stack methods',
      featured: false,
      format: 'algo',
      frameworkDefault: null,
      frameworks: [],
      href: '/questions/algo/stack',
      importance: 'low',
      isCompleted: false,
      languages: ['js', 'ts'],
      nextQuestions: [],
      premium: false,
      published: true,
      ranking: 100,
      similarQuestions: [],
      slug: 'stack',
      subtitle: null,
      title: 'Stack',
      topics: [],
    },
    {
      author: 'yangshun',
      companies: [],
      created: 1649894400,
      difficulty: 'easy',
      duration: 10,
      excerpt:
        'Implement utilities to determine primitive variable types in JavaScript',
      featured: false,
      format: 'javascript',
      frameworkDefault: null,
      frameworks: [],
      href: '/questions/javascript/type-utilities',
      importance: 'low',
      isCompleted: false,
      languages: ['js', 'ts'],
      nextQuestions: [],
      premium: false,
      published: true,
      ranking: 100,
      similarQuestions: [],
      slug: 'type-utilities',
      subtitle: null,
      title: 'Type Utilities',
      topics: [],
    },
    {
      author: null,
      companies: [],
      created: 1710633600,
      difficulty: 'easy',
      duration: 5,
      excerpt:
        'Implement a function that finds the mean of the values inside an array',
      featured: false,
      format: 'javascript',
      frameworkDefault: null,
      frameworks: [],
      href: '/questions/javascript/mean',
      importance: 'low',
      isCompleted: false,
      languages: ['js', 'ts'],
      nextQuestions: [],
      premium: false,
      published: true,
      ranking: 100,
      similarQuestions: [],
      slug: 'mean',
      subtitle: null,
      title: 'Mean',
      topics: [],
    },
  ];
  const questionCompletionCount: QuestionCompletionCount = {
    algo: {
      stack: 10000,
    },
    javascript: {
      mean: 10000,
      'type-utilities': 10000,
    },
    'user-interface': {
      counter: 10000,
    },
  };
  const questionType = [
    { label: 'Coding', value: 'coding' },
    { label: 'Quiz', value: 'quiz' },
    { label: 'System Design', value: 'system-design' },
  ];
  const activeQuestionType = 'coding';

  const listMetadata = (
    <div className="flex gap-x-10">
      <QuestionCountLabel count={148} showIcon={true} />
      <QuestionTotalTimeLabel mins={2700} showIcon={true} />
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
          <div
            className="xl:grid xl:grid-cols-12"
            // So that focus cannot go into the card, which is not meant to be used.
            {...{ inert: '' }}>
            <div
              className={clsx(
                'xl:col-span-11',
                'flex flex-col justify-between gap-8 lg:flex-row lg:items-center',
              )}>
              <div className="flex gap-x-2">
                <FilterButton
                  label={intl.formatMessage({
                    defaultMessage: 'Topics',
                    description: 'Label for topics filter',
                    id: 'hNYptD',
                  })}
                  purpose="button"
                />
                <FilterButton
                  label={intl.formatMessage({
                    defaultMessage: 'Framework / language',
                    description: 'Label for framework/language filter',
                    id: 'D0xOX8',
                  })}
                  purpose="tab"
                />
                <FilterButton
                  label={intl.formatMessage({
                    defaultMessage: 'Format',
                    description: 'Label for format filter',
                    id: 'vTb+8H',
                  })}
                  purpose="tab"
                />
              </div>
              <div className="hidden md:block">{listMetadata}</div>
            </div>
          </div>
          <div
            className={clsx(
              'grid gap-x-6 gap-y-8 md:grid-cols-8 lg:grid-cols-12',
            )}>
            <div className="md:col-span-2 lg:col-span-3">
              <div className="md:hidden">
                <TabsUnderline
                  label="Select navigation item"
                  size="sm"
                  tabs={questionType}
                  value={activeQuestionType}
                  onSelect={() => {}}
                />
              </div>
              <ul
                className={clsx('hidden md:flex', 'flex-col gap-y-2.5', [
                  'border-l-2',
                  themeBorderColor,
                ])}
                role="list">
                {questionType.map((item) => (
                  <div
                    key={item.value}
                    className={clsx(
                      '-ml-0.5 pl-5',
                      item.value === activeQuestionType && [
                        'border-l-2',
                        'border-neutral-900 dark:border-neutral-100',
                      ],
                    )}>
                    <Text
                      className={clsx(
                        item.value === activeQuestionType
                          ? ['font-medium', themeTextColor]
                          : themeTextSecondaryColor,
                      )}
                      color="inherit"
                      size="body2">
                      {item.label}
                    </Text>
                  </div>
                ))}
              </ul>
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
                  {...{ inert: '' }}>
                  <QuestionsList
                    checkIfCompletedQuestion={() => false}
                    questionCompletionCount={questionCompletionCount}
                    questions={questions}
                    showOverlayAtLastItem={true}
                  />
                </div>
                <div
                  className={clsx(
                    'absolute bottom-10 left-1/2 -translate-x-1/2',
                  )}>
                  <Button
                    href="/prepare"
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
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
