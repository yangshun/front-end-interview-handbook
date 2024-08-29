'use client';

import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { RiArrowLeftLine, RiGoogleFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
import MDXContent from '~/components/mdx/MDXContent';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  companyGuide: InterviewsCompanyGuide;
  companyQuestions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsCompanyGuidePage({
  companyGuide,
  quizQuestions,
  companyQuestions,
  codingQuestions,
  systemDesignQuestions,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const user = useUser();
  const canViewStudyPlans = userProfile?.isInterviewsPremium;

  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery(
      {
        listKey: companyGuide.slug,
      },
      {
        enabled: !!user,
      },
    );

  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const questionsListsProgressAll = categorizeQuestionListSessionProgress(
    questionListsProgressParam,
  );

  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    companyQuestions,
  );
  const questionsSessionProgress = filterQuestionsProgressByList(
    questionsListsProgressAll,
    companyQuestions,
  );

  const questionCount = countNumberOfQuestionsInList(companyQuestions);

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-12',
        'py-4 md:py-6 lg:py-8 xl:py-12',
        'relative',
      )}>
      <Container className="relative flex flex-col gap-y-5">
        <div>
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/interviews/company"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to companies',
              description: 'Link text to navigate to companies list page',
              id: 'YPNHFR',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <div className="md:col-span-2">
          <QuestionsLearningListTitleSection
            description={<MDXContent mdxCode={companyGuide.body.code} />}
            icon={({ className, ...props }) => (
              <RiGoogleFill
                className={clsx('text-neutral-900', className)}
                {...props}
              />
            )}
            logoImgSrc={companyGuide.logoUrl}
            overallProgress={questionProgressParam ?? []}
            questionCount={questionCount}
            questionListKey={companyGuide.slug}
            questions={[
              ...quizQuestions,
              ...codingQuestions,
              ...systemDesignQuestions,
            ]}
            themeBackgroundClass={clsx('bg-white', 'shadow-md')}
            title={`${companyGuide.name} Front End Engineer Interview Questions and Guides`}
          />
        </div>
      </Container>
      <Section>
        <Container className="@container flex flex-col gap-12 pb-12">
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
          {canViewStudyPlans ? (
            <QuestionsLearningList
              codingQuestions={codingQuestions}
              listKey={companyGuide.slug}
              overallProgress={questionsOverallProgress}
              quizQuestions={quizQuestions}
              sessionProgress={questionsSessionProgress}
              systemDesignQuestions={systemDesignQuestions}
            />
          ) : (
            <div className="relative">
              <div
                className={clsx(
                  'min-h-[500px]',
                  'pointer-events-none touch-none select-none',
                )}
                // So that focus cannot go into the card, which is not meant to be used.
                {...{ inert: '' }}>
                <QuestionsList
                  checkIfCompletedQuestion={() => false}
                  questions={[...codingQuestions, ...quizQuestions].slice(0, 4)}
                />
              </div>
              <div
                className={clsx(
                  'absolute bottom-0 top-0',
                  'w-full overflow-hidden rounded-b-lg',
                )}>
                <div
                  className={clsx(
                    'absolute bottom-0 top-0 w-full',
                    'bg-gradient-to-t from-white via-white dark:from-neutral-950 dark:via-neutral-950',
                  )}
                />
                <div className={clsx('absolute bottom-0 w-full px-8')}>
                  <QuestionPaywall
                    background={false}
                    subtitle={intl.formatMessage({
                      defaultMessage:
                        'Purchase premium to unlock full access to the company guides and all questions with high quality solutions',
                      description: 'Study plans paywall description',
                      id: 'DXfMmT',
                    })}
                    title={intl.formatMessage({
                      defaultMessage: 'Premium company guides',
                      description: 'Company guides paywall title',
                      id: 'hRQS6E',
                    })}
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
