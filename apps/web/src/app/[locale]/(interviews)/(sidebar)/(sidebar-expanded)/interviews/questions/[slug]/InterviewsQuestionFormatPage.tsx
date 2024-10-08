'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import {
  RiArrowLeftLine,
  RiTestTubeLine,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsQuizListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsQuizListWithFiltersAndProgress';
import QuestionsSystemDesignListWithFilters from '~/components/interviews/questions/listings/items/QuestionsSystemDesignListWithFilters';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  description: string;
  format: QuestionFormat;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
  title: string;
}>;

export default function InterviewsQuestionFormatPage({
  title,
  description,
  format,
  questions,
  questionCompletionCount,
  bottomContent,
}: Props) {
  const intl = useIntl();
  const features = [
    {
      icon: RiWindow2Line,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for question format page',
        id: 'X/O+1P',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Solved by ex-interviewers',
        description: 'Features for question format page',
        id: 'gl9tj6',
      }),
    },
    {
      icon: RiTestTubeLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for question format page',
        id: 'nI4Alg',
      }),
    },
  ];

  return (
    <Container className={clsx('flex flex-col', 'py-10', 'gap-y-12')}>
      <div>
        <div className="mb-8 flex items-center justify-between gap-2">
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/interviews/questions"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to All practice questions',
              description:
                'Link text to navigate to all practice questions page',
              id: '1hQIJA',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Heading level="heading4">{title}</Heading>
          <Text className="block" color="subtitle" size="body1" weight="medium">
            {description}
          </Text>
        </div>
        {/* Features */}
        <div className="mt-10">
          <InterviewsPageFeatures features={features} />
        </div>

        <Divider className="mt-8" />
      </div>

      <Section>
        {format === 'quiz' && (
          <QuestionsQuizListWithFiltersAndProgress
            namespace={`${format}-format`}
            questionCompletionCount={questionCompletionCount}
            questions={questions}
            showTopicFilterTags={false}
          />
        )}
        {(format === 'javascript' ||
          format === 'algo' ||
          format === 'user-interface') && (
          <QuestionsUnifiedListWithFiltersAndProgress
            namespace={`${format}-format`}
            questionCompletionCount={questionCompletionCount}
            questions={questions}
            showSummarySection={false}
          />
        )}
        {format === 'system-design' && (
          <QuestionsSystemDesignListWithFilters
            layout="full"
            namespace="system-design-format"
          />
        )}
      </Section>

      {bottomContent && (
        <>
          <Divider className="my-8" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </Container>
  );
}
