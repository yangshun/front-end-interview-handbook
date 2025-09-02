'use client';

import clsx from 'clsx';
import { getMDXComponent } from 'mdx-bundler/client';
import type { ForwardedRef } from 'react';
import { forwardRef, useId, useMemo } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';

import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import {
  MDXComponentsForQuiz,
  MDXComponentsForScrollableQuiz,
} from '~/components/mdx/MDXComponentsForQuiz';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import type { QuestionQuiz } from '../../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../../common/useQuestionLogEventCopyContents';

type Props = Readonly<{
  question: QuestionQuiz;
  scrollMode?: boolean;
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

function QuestionQuizItem(
  { question, scrollMode }: Props,
  ref: ForwardedRef<HTMLElement>,
) {
  const titleId = useId();
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
    <article ref={ref} aria-labelledby={titleId} className="grow">
      <div className={clsx('min-h-0 flex-1', scrollMode && 'space-y-9')}>
        <header
          className={clsx('flex flex-col', scrollMode ? 'gap-y-5' : 'ga-y-4')}>
          <Heading
            className="pb-4"
            id={titleId}
            level={scrollMode ? 'heading5' : 'heading4'}>
            {question.metadata.title}
          </Heading>
          {question.metadata.subtitle && (
            <Text className="block pb-4 text-lg sm:text-xl">
              {question.metadata.subtitle}
            </Text>
          )}
          <div className="flex items-start justify-between">
            <QuestionMetadataSection
              className="gap-x-8"
              elements={['importance', 'difficulty', 'topics']}
              metadata={question.metadata}
            />
            <div className="flex gap-2">
              <QuestionReportIssueButton
                entity="question"
                format={question.metadata.format}
                slug={question.metadata.slug}
              />
              <GitHubEditButton question={question} />
            </div>
          </div>
        </header>
        {!scrollMode && <Divider className="my-8" />}
        <Section>
          {/* Contents section */}
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
                <Solution
                  components={
                    scrollMode
                      ? MDXComponentsForScrollableQuiz
                      : MDXComponentsForQuiz
                  }
                />
              </Prose>
            )}
          </div>
        </Section>
      </div>
    </article>
  );
}

export default forwardRef(QuestionQuizItem);
