'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { useState } from 'react';
import { RiFlaskLine, RiVerifiedBadgeLine, RiWindowLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import PreparationGFE75Logo from '~/components/interviews/questions/content/study-list/logo/PreparationGFE75Logo';
import QuestionsStudyList from '~/components/interviews/questions/listings/learning/QuestionsStudyList';
import InterviewsRecommendedPrepStrategyPageTitleSection from '~/components/interviews/recommended/InterviewsRecommendedPrepStrategyPageTitleSection';
import { FormattedMessage, useIntl } from '~/components/intl';
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

export default function InterviewsGFE75Page({
  bottomContent,
  studyList,
  questions,
  questionsSlugs,
}: Props) {
  const intl = useIntl();
  const user = useUser();

  const { setShowFeedbackWidget } = useUserPreferences();
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

  const features = [
    {
      icon: RiWindowLine,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for interviews questions',
        id: 'qZTabX',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions',
        description: 'Features for interviews questions',
        id: 'l+NV6Y',
      }),
    },
    {
      icon: RiFlaskLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for interviews questions',
        id: 'CZJo2K',
      }),
    },
  ];

  return (
    <div className={clsx('flex flex-col gap-y-12', 'relative')}>
      <div className="relative flex flex-col gap-y-5">
        <InterviewsRecommendedPrepStrategyPageTitleSection
          description={studyList.description}
          features={features}
          logo={<PreparationGFE75Logo />}
          longDescription={
            <div className="flex flex-col gap-4">
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="The smallest list of practice questions that gets you the most mileage in your preparation. Covers the most commonly asked front end interview topics."
                  description="Description for GFE75 page"
                  id="5jNSb2"
                />
              </Text>
              <Text color="secondary" size="body1">
                <FormattedMessage
                  defaultMessage="Created with the expertise of senior to staff front end interviewers from some of the top companies in the world. <button>Have a suggestion?</button>"
                  description="Description for GFE75 page"
                  id="L2J7Pv"
                  values={{
                    button: (chunks) => (
                      <button
                        className={clsx(
                          textVariants({ color: 'active', size: 'body1' }),
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
          overallProgress={questionProgressParam ?? []}
          questions={questions}
          questionsSessionKey="greatfrontend75"
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
