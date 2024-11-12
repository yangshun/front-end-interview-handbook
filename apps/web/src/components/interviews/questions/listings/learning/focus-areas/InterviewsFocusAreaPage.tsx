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

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  FocusAreaIcons,
  focusAreaLongDescription,
} from '~/components/interviews/questions/content/study-list/StudyListUtils';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionsStudyList from '~/components/interviews/questions/listings/learning/QuestionsStudyList';
import QuestionsStudyListPageTitleSection from '~/components/interviews/questions/listings/learning/QuestionsStudyListPageTitleSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import {
  categorizeQuestionsProgress,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  questions: ReadonlyArray<QuestionMetadata>;
  questionsSlugs: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  studyList: InterviewsStudyList;
}>;

export default function InterviewsFocusAreaPage({
  bottomContent,
  studyList,
  questions,
  questionsSlugs,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { userProfile } = useUserProfile();
  const canViewFocusAreas = userProfile?.isInterviewsPremium;
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

  const features = [
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} solved practice questions',
          description: 'Features for focus areas question listing',
          id: 'DthPOl',
        },
        { questionCount: questions.length },
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
  const longDescription = focusAreaLongDescription(intl);

  return (
    <div className={clsx('flex flex-col gap-y-12 md:gap-y-16', 'relative')}>
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
        <QuestionsStudyListPageTitleSection
          description={studyList.description}
          features={features}
          icon={FocusAreaIcons[studyList.slug]}
          overallProgress={questionProgressParam ?? []}
          questions={questions}
          questionsSessionKey={studyList.slug}
          title={studyList.longName}
        />
        {longDescription[studyList.slug] && (
          <div className={clsx('grid items-center gap-6 lg:grid-cols-12')}>
            <div className="lg:col-span-9">
              <Text color="secondary" size="body1">
                {longDescription[studyList.slug]}
              </Text>
            </div>
          </div>
        )}
      </div>
      <Section>
        {canViewFocusAreas ? (
          <QuestionsStudyList
            listKey={studyList.slug}
            overallProgress={questionsOverallProgress}
            questions={questions}
            showSummarySection={false}
          />
        ) : (
          <div className="relative">
            <div
              className="border-lg pointer-events-none touch-none select-none"
              // So that focus cannot go into the card, which is not meant to be used.
              inert="">
              <QuestionsList
                checkIfCompletedQuestion={() => false}
                questions={questions.slice(0, 5)}
              />
            </div>
            <div className={clsx('absolute bottom-0 top-0 w-full')}>
              <div
                className={clsx(
                  'absolute bottom-0 top-0 w-full',
                  'bg-gradient-to-t from-white via-white dark:from-neutral-950 dark:via-neutral-950',
                )}
              />
              <div className={clsx('absolute bottom-0 w-full px-8')}>
                <QuestionPaywall background={false} feature="focus-areas" />
              </div>
            </div>
          </div>
        )}
      </Section>
      {bottomContent && (
        <>
          <Divider className="my-8 md:my-4" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </div>
  );
}
