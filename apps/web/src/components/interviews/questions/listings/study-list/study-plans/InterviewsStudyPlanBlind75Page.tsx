'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { RiVerifiedBadgeLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { StudyPlanIcons } from '~/components/interviews/questions/content/study-list/StudyListUtils';
import InterviewsStudyListQuestions from '~/components/interviews/questions/listings/study-list/InterviewsStudyListQuestions';
import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import SponsorsAdFormatSpotlightCard from '~/components/sponsors/ads/SponsorsAdFormatSpotlightCard';
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

export default function InterviewsStudyPlanBlind75Page({
  bottomContent,
  studyList,
  questions,
  questionsSlugs,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const questionFeatures = useInterviewsQuestionsFeatures();

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
    questionFeatures.codeInBrowser,
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions in JS/TS',
        description: 'Features for blind75',
        id: 'RW0xSE',
      }),
    },
    questionFeatures.testCases,
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-10', 'relative')}>
      <div className="relative flex flex-col gap-y-6">
        <InterviewsRecommendedPrepStrategyPageTitleSection
          description={studyList.description}
          features={features}
          icon={StudyPlanIcons[studyList.slug]}
          longDescription={
            <>
              <Text color="inherit" size="inherit">
                <FormattedMessage
                  defaultMessage="For data structures and algorithms (DSA) questions, we recommend working through the Blind 75, a concise list that effectively prepares you for these topics."
                  description="Description for Blind 75 page"
                  id="iF6Qjg"
                />
              </Text>
              <Text color="inherit" size="inherit">
                <FormattedMessage
                  defaultMessage="Many candidates use this list as a guide, focusing on each problem to grasp core concepts and techniques. We've solved these questions in JavaScript/TypeScript to make them accessible to front end engineers."
                  description="Description for Blind 75 page"
                  id="Wyg5gk"
                />
              </Text>
            </>
          }
          metadata={{
            description: studyList.seoDescription,
            href: studyList.href,
            title: studyList.socialTitle || studyList.seoTitle,
          }}
          questions={questions}
          studyListKey="blind75"
          title={studyList.name}
        />
        <div className="max-w-md min-[1200px]:hidden">
          <SponsorsAdFormatSpotlightCard adPlacement="side_column" />
        </div>
      </div>
      <Section>
        <div className="flex flex-col gap-20">
          <InterviewsStudyListQuestions
            overallProgress={questionsOverallProgress}
            questions={questions}
            sideColumnAddOn={
              <SponsorsAdFormatSpotlightCard adPlacement="side_column" />
            }
            studyListKey={studyList.slug}
          />
          {bottomContent && (
            <Section>
              <Divider />
              <MDXContent mdxCode={bottomContent.body.code} />
            </Section>
          )}
        </div>
      </Section>
    </div>
  );
}
