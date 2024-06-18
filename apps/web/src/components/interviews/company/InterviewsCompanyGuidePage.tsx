'use client';

import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { RiArrowLeftLine, RiGoogleFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

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
  const { data: questionProgressParam } =
    trpc.questionProgress.getAll.useQuery();
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery({
      listKey: companyGuide.slug,
    });

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
            href="/interviews/companies"
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
            description={
              <Prose
                dangerouslySetInnerHTML={{ __html: companyGuide.body.html }}
                textSize="sm"
              />
            }
            icon={({ className, ...props }) => (
              <RiGoogleFill
                className={clsx('text-neutral-900', className)}
                {...props}
              />
            )}
            logoImgSrc={companyGuide.logoUrl}
            questionCount={questionCount}
            questionListKey={companyGuide.slug}
            themeBackgroundClass={clsx('bg-white', 'shadow-md')}
            title={companyGuide.name}
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
          <QuestionsLearningList
            codingQuestions={codingQuestions}
            listKey={companyGuide.slug}
            overallProgress={questionsOverallProgress}
            quizQuestions={quizQuestions}
            sessionProgress={questionsSessionProgress}
            systemDesignQuestions={systemDesignQuestions}
          />
        </Container>
      </Section>
    </div>
  );
}
