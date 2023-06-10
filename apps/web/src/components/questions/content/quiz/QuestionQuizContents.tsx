'use client';

import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

import { useI18n } from '~/next-i18nostic/src';

import QuestionQuizBottomNav from './QuestionQuizBottomNav';
import QuestionPagination from '../QuestionPagination';
import QuestionImportanceLabel from '../../common/QuestionImportanceLabel';
import QuestionQuizTopics from '../../common/QuestionQuizTopics';
import QuestionReportIssueButton from '../../common/QuestionReportIssueButton';
import type {
  QuestionQuiz,
  QuestionQuizMetadata,
} from '../../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../../common/useQuestionLogEventCopyContents';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  question: QuestionQuiz;
  questionList: ReadonlyArray<QuestionQuizMetadata>;
}>;

function GitHubEditButton({
  question,
}: Readonly<{
  question: QuestionQuiz;
}>) {
  const intl = useIntl();
  const { locale } = useI18n();

  return (
    <Button
      href={`https://github.com/yangshun/front-end-interview-handbook/blob/main/packages/quiz/questions/${question.metadata.slug}/${locale}.mdx`}
      icon={PencilSquareIcon}
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

  return (
    <div>
      <div className="mx-auto w-full max-w-xl px-4 py-12 sm:max-w-3xl sm:px-6 md:max-w-4xl lg:px-8 2xl:max-w-5xl">
        <div className="grid gap-y-6">
          <div>
            <div className="mb-1 flex justify-between gap-x-2 text-sm text-neutral-500">
              <FormattedMessage
                defaultMessage="Quiz Questions"
                description="Header for quiz questions"
                id="lmBDjV"
              />
            </div>
            {/* Question solution */}
            <div
              key={question.metadata.slug}
              className="relative mx-auto flex min-w-0 flex-1 flex-col">
              <article aria-labelledby="question-title" className="grow">
                <div className="min-h-0 flex-1">
                  <header className="grid gap-y-4 border-b border-neutral-200 pb-10">
                    <Heading
                      className="pb-4"
                      id="question-title"
                      level="heading5">
                      {question.metadata.title}
                    </Heading>
                    {question.metadata.subtitle && (
                      <p className="pb-4 text-lg text-neutral-900 sm:text-xl">
                        {question.metadata.subtitle}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex space-x-8">
                        <QuestionImportanceLabel
                          showIcon={true}
                          value={question.metadata.importance}
                        />
                        <QuestionQuizTopics topics={question.metadata.topics} />
                      </div>
                      <GitHubEditButton question={question} />
                    </div>
                  </header>
                  <Section>
                    {/* Contents section*/}
                    <div ref={copyRef} className="space-y-2 py-8">
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
                          <Solution components={MDXComponents} />
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
              format={question.format}
              isLabelHidden={false}
              showTooltip={false}
              title={question.metadata.title}
            />
            <GitHubEditButton question={question} />
          </div>
          <hr />
          <QuestionPagination
            currentHref={question.metadata.href}
            items={questionList.map(({ title: titleParam, href }) => ({
              href,
              title: titleParam,
            }))}
          />
        </div>
      </div>
      <QuestionQuizBottomNav question={question} questionList={questionList} />
    </div>
  );
}
