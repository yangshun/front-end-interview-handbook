'use client';

import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

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
type Props = Readonly<{
  question: QuestionQuiz;
  questionList: ReadonlyArray<QuestionQuizMetadata>;
}>;

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
      <div className="mx-auto w-full max-w-xl space-y-6 px-4 py-12 sm:max-w-3xl sm:px-6 md:max-w-4xl lg:px-8 2xl:max-w-5xl">
        <div>
          <div className="mb-2 flex justify-between space-x-2 text-slate-500">
            <div className="space-x-2 text-slate-500">
              <span>
                <FormattedMessage
                  defaultMessage="Quiz Questions"
                  description="Header for quiz questions"
                  id="lmBDjV"
                />
              </span>
            </div>
          </div>
          {/* Question solution */}
          <div
            key={question.metadata.slug}
            className="relative mx-auto flex min-w-0 flex-1 flex-col">
            <article aria-labelledby="question-title" className="grow">
              <div className="min-h-0 flex-1">
                <header className="space-y-4 border-b border-slate-200 pt-4 pb-10 ">
                  <Heading
                    className="pb-4 text-2xl font-medium !leading-10 text-slate-900 sm:text-3xl"
                    id="question-title">
                    {question.metadata.title}
                  </Heading>
                  {question.metadata.subtitle && (
                    <p className="pb-4 text-lg text-slate-900 sm:text-xl">
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
                      <Prose textSize="lg">
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
        </div>
        <QuestionPagination
          currentHref={question.metadata.href}
          items={questionList.map(({ title: titleParam, href }) => ({
            href,
            title: titleParam,
          }))}
        />
      </div>
      <QuestionQuizBottomNav question={question} questionList={questionList} />
    </div>
  );
}
