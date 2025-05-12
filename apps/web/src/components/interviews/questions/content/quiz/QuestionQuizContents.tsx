'use client';

import clsx from 'clsx';
import { RiEditBoxLine } from 'react-icons/ri';

import { useAuthActiveEngagementPoints } from '~/components/auth/auth-points';
import { FormattedMessage, useIntl } from '~/components/intl';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';

import { hashQuestion } from '~/db/QuestionsUtils';

import QuestionQuizItem from './QuestionQuizItem';
import QuestionReportIssueButton from '../../common/QuestionReportIssueButton';
import type { QuestionQuiz } from '../../common/QuestionsTypes';
import useQuestionsAutoMarkAsComplete from '../../common/useQuestionsAutoMarkAsComplete';
import InterviewsStudyListBottomBar from '../../listings/study-list/InterviewsStudyListBottomBar';

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

  if (!question.info.gitHubEditUrl) {
    return null;
  }

  return (
    <Button
      href={question.info.gitHubEditUrl}
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
  studyListKey,
  listIsShownInSidebarOnDesktop,
}: Props) {
  useQuestionsAutoMarkAsComplete(question.metadata, studyListKey);
  useAuthActiveEngagementPoints({
    entityId: question.metadata.slug,
    entityType: 'quiz',
  });

  return (
    <div
      className={clsx(
        'flex flex-col',
        'min-h-[calc(100vh_-_var(--global-sticky-height))]',
      )}>
      <Container className={clsx('grow', 'py-6 lg:py-8 xl:py-12')} width="3xl">
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
      </Container>
      <InterviewsStudyListBottomBar
        listIsShownInSidebarOnDesktop={listIsShownInSidebarOnDesktop}
        metadata={question.metadata}
        studyListKey={studyListKey}
      />
    </div>
  );
}
