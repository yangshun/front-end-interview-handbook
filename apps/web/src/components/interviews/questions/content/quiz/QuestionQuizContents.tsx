'use client';

import clsx from 'clsx';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';

import ArticlePagination from '~/components/common/ArticlePagination';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponentsForQuiz from '~/components/mdx/MDXComponentsForQuiz';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionReportIssueButton from '../../common/QuestionReportIssueButton';
import type {
  QuestionMetadata,
  QuestionQuiz,
} from '../../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../../common/useQuestionLogEventCopyContents';
import useQuestionsAutoMarkAsComplete from '../../common/useQuestionsAutoMarkAsComplete';
import InterviewsStudyListBottomNav from '../../listings/study-list/InterviewsStudyListBottomNav';

type Props = Readonly<{
  paginationEl: React.ReactNode;
  question: QuestionQuiz;
  questionList?: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

function GitHubEditButton({
  question,
}: Readonly<{
  question: QuestionQuiz;
}>) {
  const intl = useIntl();

  if (!question.metadata.gitHubEditUrl) {
    return null;
  }

  return (
    <Button
      href={question.metadata.gitHubEditUrl}
      icon={RiEditBoxLine}
      label={intl.formatMessage({
        defaultMessage: 'Edit on GitHub',
        description: 'Edit on GitHub button',
        id: '1wrVTx',
      })}
      size="xs"
      variant="secondary"
    />
  );
}

export default function QuestionQuizContents({
  question,
  questionList,
  studyListKey,
  paginationEl,
}: Props) {
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const { solution } = question;
  // It's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Solution = useMemo(() => {
    if (!solution) {
      return null;
    }

    return getMDXComponent(solution, {
      MDXCodeBlock,
    });
  }, [solution]);

  useQuestionsAutoMarkAsComplete(question.metadata, studyListKey);

  return (
    <div>
      <Container className="py-6 lg:py-8 xl:py-12" width="3xl">
        <div className="grid gap-y-6">
          <div className="overflow-auto">
            <Text className="mb-1 block" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="Quiz"
                description="Label for quiz question"
                id="By417i"
              />
            </Text>
            {/* Question solution */}
            <div
              key={hashQuestion(question.metadata)}
              className="relative mx-auto flex min-w-0 flex-1 flex-col">
              <article aria-labelledby="question-title" className="grow">
                <div className="min-h-0 flex-1">
                  <header className={clsx('flex flex-col gap-y-4')}>
                    <Heading
                      className="pb-4"
                      id="question-title"
                      level="heading4">
                      {question.metadata.title}
                    </Heading>
                    {question.metadata.subtitle && (
                      <Text className="block pb-4 text-lg sm:text-xl">
                        {question.metadata.subtitle}
                      </Text>
                    )}
                    <div className="flex items-start justify-between">
                      <QuestionMetadataSection
                        elements={['importance', 'difficulty', 'topics']}
                        metadata={question.metadata}
                      />
                      <GitHubEditButton question={question} />
                    </div>
                  </header>
                  <Divider className="my-8" />
                  <Section>
                    {/* Contents section*/}
                    <div ref={copyRef}>
                      {Solution == null ? (
                        <div>
                          <FormattedMessage
                            defaultMessage="Something went wrong"
                            description="Text that appears when the solution fails to load"
                            id="6UytmZ"
                          />
                        </div>
                      ) : (
                        <Prose>
                          <Solution components={MDXComponentsForQuiz} />
                        </Prose>
                      )}
                    </div>
                  </Section>
                </div>
              </article>
            </div>
          </div>
          <div className="flex justify-between">
            <QuestionReportIssueButton
              format={question.metadata.format}
              isLabelHidden={false}
              showTooltip={false}
              title={question.metadata.title}
            />
            <GitHubEditButton question={question} />
          </div>
          {questionList != null && (
            <>
              <Divider />
              <ArticlePagination
                activeItem={question.metadata.href}
                items={questionList.map(({ title, href }) => ({
                  href,
                  label: title,
                }))}
              />
            </>
          )}
        </div>
      </Container>
      <InterviewsStudyListBottomNav
        paginationEl={paginationEl}
        question={question}
        studyListKey={studyListKey}
      />
    </div>
  );
}
