'use client';

import clsx from 'clsx';
import { RiEditBoxLine } from 'react-icons/ri';

import type { QuestionQuiz } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';

import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionReportIssueButton from '../../common/QuestionReportIssueButton';
import useQuestionsAutoMarkAsComplete from '../../common/useQuestionsAutoMarkAsComplete';
import InterviewsStudyListBottomBar from '../../listings/study-list/InterviewsStudyListBottomBar';
import QuestionQuizItem from './QuestionQuizItem';
import QuestionQuizScrollModeToggle from './QuestionQuizScrollModeToggle';

type Props = Readonly<{
  listIsShownInSidebarOnDesktop: boolean;
  question: QuestionQuiz;
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
  listIsShownInSidebarOnDesktop,
  question,
  studyListKey,
}: Props) {
  useQuestionsAutoMarkAsComplete(question.metadata, studyListKey);

  return (
    <div
      className={clsx(
        'flex flex-col',
        'min-h-[calc(100vh_-_var(--global-sticky-height))]',
      )}>
      <div
        className={clsx(
          'mx-auto w-full',
          'grow',
          'py-6 lg:py-8 xl:py-12',
          'px-4 sm:px-6 lg:px-12 min-[1101px]:px-0',
          'w-full min-[1101px]:max-w-[756px] xl:max-w-[864px]',
        )}>
        <div className="flex flex-col gap-y-6">
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
              <QuestionQuizItem question={question} />
            </div>
          </div>
          <Divider />
          <div className="flex justify-between">
            <QuestionReportIssueButton
              entity="question"
              format={question.metadata.format}
              isLabelHidden={false}
              showTooltip={false}
              slug={question.metadata.slug}
            />
            <GitHubEditButton question={question} />
          </div>
        </div>
        <Divider className="my-6" color="emphasized" />
        <SponsorsAdFormatInContentContainer
          adPlacement="questions_quiz"
          size="md"
        />
      </div>
      <InterviewsStudyListBottomBar
        leftAddOnItem={
          <QuestionQuizScrollModeToggle
            isScrollModeValue={false}
            slug={question.metadata.slug}
          />
        }
        listIsShownInSidebarOnDesktop={listIsShownInSidebarOnDesktop}
        metadata={question.metadata}
        studyListKey={studyListKey}
      />
    </div>
  );
}
