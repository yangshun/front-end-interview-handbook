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
import { StudyPlanIcons } from '~/components/interviews/questions/content/study-list/StudyListUtils';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionsStudyList from '~/components/interviews/questions/listings/learning/QuestionsStudyList';
import QuestionsStudyListPageTitleSection from '~/components/interviews/questions/listings/learning/QuestionsStudyListPageTitleSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

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

export default function InterviewsStudyPlanPage({
  bottomContent,
  studyList,
  questions,
  questionsSlugs,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const user = useUser();
  const canViewStudyPlans = userProfile?.isInterviewsPremium;

  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    { enabled: !!user },
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
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Curated by ex-interviewers',
        description: 'Features for study plans question listing',
        id: 'rJK/mv',
      }),
    },
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} solved practice questions',
          description: 'Features for study plans question listing',
          id: 'wVk78R',
        },
        { questionCount: questions.length },
      ),
    },
    {
      icon: RiTimerLine,
      label: intl.formatMessage({
        defaultMessage: 'Time efficient',
        description: 'Features for study plans question listing',
        id: 'a3MONw',
      }),
    },
  ];

  return (
    <div className={clsx('flex flex-col gap-y-12 md:gap-y-16', 'relative')}>
      <div className="relative flex flex-col gap-y-8">
        <QuestionsStudyListPageTitleSection
          description={studyList.description}
          feature="study-plans"
          features={features}
          icon={StudyPlanIcons[studyList.slug]}
          overallProgress={questionProgressParam ?? []}
          questions={questions}
          questionsSessionKey={studyList.slug}
          title={studyList.longName}
        />
      </div>
      <Section>
        <div>
          {canViewStudyPlans ? (
            <QuestionsStudyList
              listKey={studyList.slug}
              overallProgress={questionsOverallProgress}
              questions={questions}
              showSummarySection={false}
            />
          ) : (
            <VignetteOverlay
              overlay={
                <QuestionPaywall background={false} feature="study-plans" />
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
        </div>
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
