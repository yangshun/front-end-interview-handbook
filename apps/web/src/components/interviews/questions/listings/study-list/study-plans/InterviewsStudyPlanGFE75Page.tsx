'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import PreparationGFE75Logo from '~/components/interviews/questions/content/study-list/logo/PreparationGFE75Logo';
import { countQuestionsByAccess } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionListingAccessSummary from '~/components/interviews/questions/listings/stats/QuestionListingAccessSummary';
import InterviewsStudyListQuestions from '~/components/interviews/questions/listings/study-list/InterviewsStudyListQuestions';
import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';
import { FormattedMessage } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import { themeOutlineElementBrandColor_FocusVisible } from '~/components/ui/theme';

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

export default function InterviewsStudyPlanGFE75Page({
  bottomContent,
  studyList,
  questions,
  questionsSlugs,
}: Props) {
  const user = useUser();
  const isTabletAndAbove = useMediaQuery('(min-width: 640px)');
  const isLaptopAndAbove = useMediaQuery('(min-width: 1280px)');

  const { setShowFeedbackWidget } = useUserPreferences();
  const questionFeatures = useInterviewsQuestionsFeatures();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);

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
  const questionsCount = countQuestionsByAccess(questions);

  const features = [
    questionFeatures.codeInBrowser,
    questionFeatures.officialSolutions,
    questionFeatures.testCases,
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-10', 'relative')}>
      <div className="relative flex flex-col gap-y-6">
        <InterviewsRecommendedPrepStrategyPageTitleSection
          description={studyList.description}
          features={features}
          logo={
            <PreparationGFE75Logo
              size={isLaptopAndAbove ? 'xl' : isTabletAndAbove ? 'lg' : 'md'}
            />
          }
          longDescription={
            <div
              className={clsx('flex flex-col gap-4', 'text-sm xl:text-base')}>
              <Text color="secondary" size="inherit">
                <FormattedMessage
                  defaultMessage="The smallest list of practice questions that gets you the most mileage in your preparation. Covers the most commonly asked front end interview topics."
                  description="Description for study list"
                  id="oXdinV"
                />
              </Text>
              <Text color="secondary" size="inherit">
                <FormattedMessage
                  defaultMessage="Created with the expertise of senior to staff front end interviewers from some of the top companies in the world. <button>Have a suggestion?</button>"
                  description="Description for study list"
                  id="X2w/yO"
                  values={{
                    button: (chunks) => (
                      <button
                        className={clsx(
                          textVariants({ color: 'active', size: 'inherit' }),
                          themeOutlineElementBrandColor_FocusVisible,
                        )}
                        type="button"
                        onClick={() => setIsOpenFeedback(true)}>
                        {chunks}
                      </button>
                    ),
                  }}
                />
              </Text>
            </div>
          }
          metadata={{
            description: studyList.seoDescription,
            href: studyList.href,
            title: studyList.socialTitle || studyList.seoTitle,
          }}
          questions={questions}
          studyListKey="gfe75"
          title={studyList.name}
        />
        <div className="block lg:hidden">
          <QuestionListingAccessSummary {...questionsCount} />
        </div>
      </div>
      <Section>
        <div className="flex flex-col gap-20">
          <InterviewsStudyListQuestions
            overallProgress={questionsOverallProgress}
            questions={questions}
            sideColumnAddOn={
              <div className="hidden lg:block">
                <QuestionListingAccessSummary {...questionsCount} />
              </div>
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
      <FeedbackDialog
        isShown={isOpenFeedback}
        onClose={() => setIsOpenFeedback(false)}
        onHideWidgetForSession={() => {
          setShowFeedbackWidget(false);
        }}
      />
    </div>
  );
}
