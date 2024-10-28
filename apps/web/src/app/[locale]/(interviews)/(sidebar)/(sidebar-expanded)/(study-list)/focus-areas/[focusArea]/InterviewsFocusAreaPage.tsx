'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import {
  RiArrowLeftLine,
  RiQuestionnaireLine,
  RiTimerLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FocusAreaIcons } from '~/components/interviews/questions/content/study-list/FocusAreas';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsStudyList';
import QuestionsLearningListPageTitleSection from '~/components/interviews/questions/listings/learning/QuestionsStudyListPageTitleSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
  flattenQuestionFormatMetadata,
} from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  focusArea: InterviewsStudyList;
  questionsMetadata: Record<QuestionFormat, ReadonlyArray<QuestionMetadata>>;
  questionsSlugs: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
}>;

export default function InterviewsFocusAreaPage({
  bottomContent,
  focusArea,
  questionsMetadata,
  questionsSlugs,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );

  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    questionsSlugs,
  );
  const questionCount = countNumberOfQuestionsInList(questionsSlugs);

  const features = [
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} solved practice questions',
          description: 'Features for focus areas question listing',
          id: 'DthPOl',
        },
        { questionCount },
      ),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Curated by ex-interviewers',
        description: 'Features for focus areas question listing',
        id: '0/Rv7O',
      }),
    },

    {
      icon: RiTimerLine,
      label: intl.formatMessage({
        defaultMessage: 'Time efficient',
        description: 'Features for focus areas question listing',
        id: 'nyYJ7j',
      }),
    },
  ];

  return (
    <Container className={clsx('flex flex-col gap-y-12', 'py-12', 'relative')}>
      <div className="relative flex flex-col gap-y-8">
        <div className="flex items-center justify-between gap-2">
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/focus-areas"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to focus areas',
              description: 'Link text to navigate to focus areas list page',
              id: 'PHhUwD',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <QuestionsLearningListPageTitleSection
          description={focusArea.description}
          features={features}
          icon={FocusAreaIcons[focusArea.type]}
          overallProgress={questionProgressParam ?? []}
          questions={flattenQuestionFormatMetadata(questionsMetadata)}
          questionsSessionKey={focusArea.type}
          title={focusArea.longName}
        />
        <Divider />
      </div>
      <Section>
        <QuestionsLearningList
          codingQuestions={[
            ...questionsMetadata.javascript,
            ...questionsMetadata['user-interface'],
            ...questionsMetadata.algo,
          ]}
          listKey={focusArea.slug}
          overallProgress={questionsOverallProgress}
          quizQuestions={questionsMetadata.quiz}
          systemDesignQuestions={questionsMetadata['system-design']}
        />
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
