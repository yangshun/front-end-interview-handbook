'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { RiFlaskLine, RiVerifiedBadgeLine, RiWindowLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { StudyPlanIcons } from '~/components/interviews/questions/content/study-list/StudyPlans';
import QuestionsStudyList from '~/components/interviews/questions/listings/learning/QuestionsStudyList';
import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
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
  recommendedPrepData: Readonly<{
    blind75: Readonly<{
      listKey: string;
      questionCount: number;
    }>;
    gfe75: Readonly<{
      listKey: string;
      questionCount: number;
    }>;
    systemDesignQuestionCount: number;
  }>;
  studyList: InterviewsStudyList;
}>;

export default function InterviewsBlind75Page({
  bottomContent,
  studyList,
  questions,
  questionsSlugs,
  recommendedPrepData,
}: Props) {
  const intl = useIntl();
  const user = useUser();

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
      icon: RiWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for blind75',
        id: 'e/MXjM',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions in JS/TS',
        description: 'Features for blind75',
        id: 'RW0xSE',
      }),
    },
    {
      icon: RiFlaskLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for blind75',
        id: 'KE8wmG',
      }),
    },
  ];

  return (
    <div className={clsx('flex flex-col gap-y-12', 'relative')}>
      <div className="relative flex flex-col gap-y-5">
        <InterviewsRecommendedPrepStrategyPageTitleSection
          description={studyList.description}
          features={features}
          icon={StudyPlanIcons[studyList.slug]}
          longDescription={
            <div className="flex flex-col gap-4">
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="Front end interviews are mostly practical in nature – till you're met with the traditional data structure and algorithms questions that are expected of traditional software engineering interviews."
                  description="Description for Blind75 page"
                  id="Eq+Sdc"
                />
              </Text>
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="Our recommended approach is to work on the Blind75, which is the smallest list of data structures and algorithms (DSA) questions that prepares you well for such interviews. Many candidates use the Blind 75 list as a study guide, working through each problem and understanding the underlying concepts, patterns, and techniques."
                  description="Description for Blind75 page"
                  id="1Dvsx4"
                />
              </Text>
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="We've solved all of these questions in JavaScript / TypeScript, which would be friendly for the front end engineering community."
                  description="Description for Blind75 page"
                  id="Wc2sX9"
                />
              </Text>
            </div>
          }
          metadata={{
            description: studyList.seoDescription,
            href: studyList.href,
            title: studyList.socialTitle || studyList.seoTitle,
          }}
          overallProgress={questionProgressParam ?? []}
          questions={questions}
          questionsSessionKey="blind75"
          recommendedPrepData={recommendedPrepData}
          title={studyList.name}
        />
      </div>
      <Section>
        <div className="flex flex-col gap-20">
          <QuestionsStudyList
            listKey={studyList.slug}
            overallProgress={questionsOverallProgress}
            questions={questions}
            showSummarySection={false}
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
