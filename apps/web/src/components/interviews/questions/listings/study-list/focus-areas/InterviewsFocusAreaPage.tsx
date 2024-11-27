'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';

import { trpc } from '~/hooks/trpc';

import VignetteOverlay from '~/components/common/VignetteOverlay';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FocusAreaIcons } from '~/components/interviews/questions/content/study-list/StudyListUtils';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import InterviewsStudyListPageTitleSection from '~/components/interviews/questions/listings/study-list/InterviewsStudyListPageTitleSection';
import InterviewsStudyListQuestions from '~/components/interviews/questions/listings/study-list/InterviewsStudyListQuestions';
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
  const user = useUser();
  const { userProfile } = useUserProfile();
  const questionFeatures = useInterviewsQuestionsFeatures(questions.length);
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
    questionFeatures.solvedPracticeQuestions,
    questionFeatures.curatedByExInterviews,
    questionFeatures.timeEfficient,
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-10 xl:gap-y-16', 'relative')}>
      <div className="relative flex flex-col gap-y-8">
        <InterviewsStudyListPageTitleSection
          description={studyList.description}
          feature="focus-areas"
          features={features}
          icon={FocusAreaIcons[studyList.slug]}
          overallProgress={questionProgressParam ?? []}
          questions={questions}
          studyListKey={studyList.slug}
          title={studyList.longName}
        />
        {studyList.body.code && (
          <MDXContent
            fontSize="custom"
            mdxCode={studyList.body.code}
            proseClassName={clsx(
              'block lg:max-w-[75%]',
              'text-base',
              themeTextSecondaryColor,
            )}
          />
        )}
      </div>
      <Section>
        {canViewFocusAreas ? (
          <InterviewsStudyListQuestions
            overallProgress={questionsOverallProgress}
            questions={questions}
            studyListKey={studyList.slug}
          />
        ) : (
          <VignetteOverlay
            className="max-h-[500px] md:max-h-none"
            overlay={
              <QuestionPaywall background={false} feature="focus-areas" />
            }
            overlayClass="top-[20%] md:top-auto md:bottom-0">
            <div
              className="border-lg pointer-events-none touch-none select-none"
              // So that focus cannot go into the card, which is not meant to be used.
              inert="">
              <QuestionsList
                checkIfCompletedQuestion={() => false}
                questions={questions.slice(0, 4)}
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
