'use client';

import clsx from 'clsx';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';

import ArticlePagination from '~/components/common/ArticlePagination';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import QuestionQuizBottomNav from './QuestionQuizBottomNav';
import QuestionReportIssueButton from '../../common/QuestionReportIssueButton';
import type {
  QuestionMetadata,
  QuestionQuiz,
} from '../../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../../common/useQuestionLogEventCopyContents';
import QuestionDifficultyLabel from '../../metadata/QuestionDifficultyLabel';
import QuestionImportanceLabel from '../../metadata/QuestionImportanceLabel';
import QuestionTopics from '../../metadata/QuestionTopics';

type Props = Readonly<{
  question: QuestionQuiz;
  questionList: ReadonlyArray<QuestionMetadata>;
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
      <div
        className={clsx(
          'mx-auto',
          'w-full max-w-xl sm:max-w-3xl md:max-w-4xl 2xl:max-w-5xl',
          'px-4 md:px-6 lg:px-8',
          'py-6 lg:py-8 xl:py-16',
        )}>
        <div className="grid gap-y-6">
          <div className="overflow-auto">
            <Text className="mb-1 block" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="Quiz Questions"
                description="Header for quiz questions"
                id="lmBDjV"
              />
            </Text>
            {/* Question solution */}
            <div
              key={question.metadata.slug}
              className="relative mx-auto flex min-w-0 flex-1 flex-col">
              <article aria-labelledby="question-title" className="grow">
                <div className="min-h-0 flex-1">
                  <header
                    className={clsx(
                      'grid gap-y-4 border-b pb-10',
                      themeBorderColor,
                    )}>
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
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex space-x-8">
                        <QuestionImportanceLabel
                          showIcon={true}
                          value={question.metadata.importance}
                        />
                        <QuestionDifficultyLabel
                          showIcon={true}
                          value={question.metadata.difficulty}
                        />
                        <QuestionTopics topics={question.metadata.topics} />
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
          <Divider />
          <ArticlePagination
            activeItem={question.metadata.href}
            items={questionList.map(({ title, href }) => ({
              href,
              label: title,
            }))}
          />
        </div>
      </div>
      <QuestionQuizBottomNav question={question} questionList={questionList} />
    </div>
  );
}
