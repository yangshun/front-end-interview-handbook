'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import {
  RiQuestionnaireLine,
  RiTimerLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import VignetteOverlay from '~/components/common/VignetteOverlay';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FocusAreaIcons } from '~/components/interviews/questions/content/study-list/StudyListUtils';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionsStudyList from '~/components/interviews/questions/listings/learning/QuestionsStudyList';
import QuestionsStudyListPageTitleSection from '~/components/interviews/questions/listings/learning/QuestionsStudyListPageTitleSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeTextSecondaryColor } from '~/components/ui/theme';

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

  return (
    <div className={clsx('flex flex-col gap-y-10 xl:gap-y-16', 'relative')}>
      <div className="relative flex flex-col gap-y-8">
        <QuestionsStudyListPageTitleSection
          description={studyList.description}
          feature="focus-areas"
          features={features}
          icon={FocusAreaIcons[studyList.slug]}
          overallProgress={questionProgressParam ?? []}
          questions={questions}
          questionsSessionKey={studyList.slug}
          title={studyList.longName}
        />
        {studyList.body.code && (
          <MDXContent
            fontSize="custom"
            mdxCode={studyList.body.code}
            proseClassName={clsx(
              'block xl:max-w-[75%]',
              'text-base',
              themeTextSecondaryColor,
            )}
          />
        )}
      </div>
      <Section>
        {canViewFocusAreas ? (
          <QuestionsStudyList
            listKey={studyList.slug}
            overallProgress={questionsOverallProgress}
            questions={questions}
          />
        ) : (
          <VignetteOverlay
            overlay={
              <QuestionPaywall background={false} feature="focus-areas" />
            }>
            <div
              className="border-lg pointer-events-none touch-none select-none"
              // So that focus cannot go into the card, which is not meant to be used.
              inert="">
              <QuestionsList
                checkIfCompletedQuestion={() => false}
                questions={questions.slice(0, 5)}
              />
            </div>
          </VignetteOverlay>
        )}
      </Section>
      {bottomContent && (
        <>
          <Divider className="my-10 xl:my-4" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </div>
  );
}
