'use client';

import clsx from 'clsx';
import { startCase } from 'lodash-es';
import {
  RiArrowLeftLine,
  RiChat1Line,
  RiComputerLine,
  RiGoogleFill,
  RiPhoneLine,
  RiUser2Line,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { FocusArea } from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsTotalDurationMins } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsLearningList from '~/components/interviews/questions/listings/learning/QuestionsLearningList';
import QuestionsLearningListTitleSection from '~/components/interviews/questions/listings/learning/QuestionsLearningListTitleSection';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import { textVariants } from '~/components/ui/Text';

import {
  categorizeQuestionListSessionProgress,
  categorizeQuestionsProgress,
  countNumberOfQuestionsInList,
  filterQuestionsProgressByList,
} from '~/db/QuestionsUtils';

import InterviewsCompanyRoundCard from './InterviewsCompanyRoundCard';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  company: string;
  focusArea: FocusArea;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsCompanyPage({
  company,
  quizQuestions,
  codingQuestions,
  systemDesignQuestions,
  focusArea,
}: Props) {
  const intl = useIntl();
  const { data: questionProgressParam } =
    trpc.questionProgress.getAll.useQuery();
  const { data: questionListsProgressParam } =
    trpc.questionLists.getSessionProgress.useQuery({ listKey: focusArea.type });

  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const questionsListsProgressAll = categorizeQuestionListSessionProgress(
    questionListsProgressParam,
  );

  const questionsOverallProgress = filterQuestionsProgressByList(
    questionsProgressAll,
    focusArea.questions,
  );
  const questionsSessionProgress = filterQuestionsProgressByList(
    questionsListsProgressAll,
    focusArea.questions,
  );

  const questionCount = countNumberOfQuestionsInList(focusArea.questions);

  const totalDuration = countQuestionsTotalDurationMins([
    ...codingQuestions,
    ...quizQuestions,
    ...systemDesignQuestions,
  ]);

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
        <div className="grid gap-4 md:grid-cols-3 md:items-end">
          <div className="md:col-span-2">
            <QuestionsLearningListTitleSection
              description={
                <>
                  Candidates can expect to be tested on fundamental Computer
                  Science concepts as well as their front end knowledge/skills.
                  Candidates should be ready to cover topics like front end
                  latency and implementation of standard CS algorithms using
                  idiomatic JavaScript. Candidates should be able to articulate
                  Javascript strengths and shortcomings and ready to cover any
                  of the following: Web security issues (XSS, XSRF), Prototypal
                  inheritance, DOM API & manipulation, CSS manipulation, Browser
                  / DOM events & event handling, XHR requests & HTTP headers,
                  JavaScript closures
                </>
              }
              icon={({ className, ...props }) => (
                <RiGoogleFill
                  className={clsx('text-neutral-900', className)}
                  {...props}
                />
              )}
              questionCount={questionCount}
              questionListKey={focusArea.type}
              themeBackgroundClass="bg-white"
              title={startCase(company)}
              totalDurationMins={totalDuration}
            />
          </div>
          <Section>
            <div className="flex w-full">
              <Alert
                className="w-full"
                title="Official resources"
                variant="primary">
                <ul className="list-disc pt-1">
                  {[
                    {
                      name: 'Front End or Mobile Software Engineers',
                    },
                    {
                      name: 'Front End/Mobile Software Engineers (Old)',
                    },
                    {
                      name: 'Non-technical interviews',
                    },
                  ].map(({ name }) => (
                    <li key={name}>
                      <Anchor
                        className={textVariants({ size: 'body3' })}
                        href="#"
                        variant="flat">
                        {name}
                      </Anchor>
                    </li>
                  ))}
                </ul>
              </Alert>
            </div>
          </Section>
        </div>
      </Container>
      <Section>
        <Container className="@container flex flex-col gap-12 pb-12">
          <CardContainer className="@4xl:grid-cols-4 @md:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-3 md:gap-4 lg:gap-6">
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
          </CardContainer>
          <QuestionsLearningList
            codingQuestions={codingQuestions}
            listKey={focusArea.type}
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
