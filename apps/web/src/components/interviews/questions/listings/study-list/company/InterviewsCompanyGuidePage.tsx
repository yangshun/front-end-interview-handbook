'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { useMemo } from 'react';
import {
  RiQuestionnaireLine,
  RiThumbUpLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import VignetteOverlay from '~/components/common/VignetteOverlay';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import useInterviewsSidebarCollapsed from '~/components/interviews/common/useInterviewsSidebarCollapsed';
import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import InterviewsStudyListPageTitleSection from '~/components/interviews/questions/listings/study-list/InterviewsStudyListPageTitleSection';
import InterviewsStudyListQuestions from '~/components/interviews/questions/listings/study-list/InterviewsStudyListQuestions';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import SponsorsAdFormatSpotlightCard from '~/components/sponsors/ads/SponsorsAdFormatSpotlightCard';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import {
  categorizeQuestionsProgress,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import useQuestionTopicLabels from '../../items/useQuestionTopicLabels';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  questions: ReadonlyArray<QuestionMetadata>;
  questionsSlugs: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  studyList: InterviewsStudyList;
}>;

export default function InterviewsCompanyGuidePage({
  studyList,
  questions,
  questionsSlugs,
  bottomContent,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const [isSidebarCollapsed] = useInterviewsSidebarCollapsed();
  const user = useUser();
  const topicLabels = useQuestionTopicLabels();
  const canViewStudyPlans = userProfile?.isInterviewsPremium;

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

  const topics = useMemo(() => {
    const topicsSet = new Set<QuestionTopic>();

    questions.forEach((question) => {
      question.topics.forEach((topic) => {
        topicsSet.add(topic);
      });
    });

    return Array.from(topicsSet).map((topic) => topicLabels[topic].label);
  }, [questions, topicLabels]);
  const questionCount = questions.length;

  const features = [
    {
      icon: RiQuestionnaireLine,
      label: intl.formatMessage(
        {
          defaultMessage: '{questionCount} known questions with solutions',
          description: 'Features for company guides question listing',
          id: 'M6LdL8',
        },
        { questionCount },
      ),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Insider tips',
        description: 'Features for company guides question listing',
        id: 'F9KpiA',
      }),
    },
    {
      icon: RiThumbUpLine,
      label: intl.formatMessage({
        defaultMessage: 'Recommended resources',
        description: 'Features for focus areas question listing',
        id: 'BQSRxW',
      }),
    },
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-10', 'relative')}>
      <div className="relative flex flex-col gap-y-8">
        <InterviewsStudyListPageTitleSection
          description={studyList.shortDescription}
          features={features}
          logoImgSrc={studyList.logoUrl}
          overallProgress={questionProgressParam ?? []}
          purchaseFeature="company-guides"
          questions={questions}
          studyListKey={studyList.slug}
          title={intl.formatMessage(
            {
              defaultMessage: '{company} Front End Interview Guide',
              description: 'Title for company guides detail page',
              id: 'SaUyXa',
            },
            {
              company: studyList.name,
            },
          )}
        />
        {studyList.body.code && (
          <MDXContent
            fontSize="custom"
            mdxCode={studyList.body.code}
            proseClassName={clsx(
              'block lg:max-w-[75%]',
              'text-sm xl:text-base',
              themeTextSecondaryColor,
            )}
          />
        )}
      </div>
      <Section>
        <div className="@container flex flex-col gap-20">
          {/* <CardContainer className="@4xl:grid-cols-4 @md:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-3 md:gap-4 lg:gap-6">
            <InterviewsCompanyRoundCard
              description={<>2 questions on data structures and algorithms</>}
              icon={RiComputerLine}
              title="Online assessment"
            />
            <InterviewsCompanyRoundCard
              description={
                <>1 hour, live coding on a collaborative code editor</>
              }
              icon={RiPhoneLine}
              title="Phone interview"
            />
            <InterviewsCompanyRoundCard
              description={<>3 hours, 3 interviews with Google engineers</>}
              icon={RiChat1Line}
              title="Virtual onsite"
            />
            <InterviewsCompanyRoundCard
              description={<>1 hour, interview with engineering director</>}
              icon={RiUser2Line}
              title="Final round"
            />
          </CardContainer> */}
          <div className="flex flex-col gap-8">
            <div className="max-w-md min-[1200px]:hidden">
              <SponsorsAdFormatSpotlightCard adPlacement="side_column" />
            </div>
            <Heading level="heading6">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Known {company} front end interview questions',
                  description:
                    'Heading for questions listing for company guides',
                  id: '5jFQfq',
                },
                {
                  company: studyList.name,
                },
              )}
            </Heading>
            {canViewStudyPlans ? (
              <InterviewsStudyListQuestions
                overallProgress={questionsOverallProgress}
                questions={questions}
                sideColumnAddOn={
                  isSidebarCollapsed ? (
                    <SponsorsAdFormatSpotlightCard adPlacement="side_column" />
                  ) : null
                }
                studyListKey={studyList.slug}
              />
            ) : (
              <VignetteOverlay
                className="max-h-[500px] md:max-h-none"
                overlay={
                  <InterviewsPurchasePaywall
                    background="vignette"
                    premiumFeature="company-guides"
                  />
                }
                overlayClass="top-8 sm:top-16 md:top-24">
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
          </div>
          {bottomContent && (
            <Section>
              <Divider />
              <MDXContent
                components={{
                  CompanyName: () => <span>{studyList.name}</span>,
                  QuestionCount: () => <span>{questionCount}</span>,
                  Topics: () => <span>{Array.from(topics).join(', ')}</span>,
                }}
                mdxCode={bottomContent.body.code}
              />
            </Section>
          )}
        </div>
      </Section>
    </div>
  );
}
