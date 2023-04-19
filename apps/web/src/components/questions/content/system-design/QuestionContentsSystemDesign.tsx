import clsx from 'clsx';
import { useIntl } from 'react-intl';

import StatisticsPanel from '~/components/debug/StatisticsPanel';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import QuestionCompanies from '../QuestionCompanies';
import QuestionContentProse from '../QuestionContentProse';
import QuestionMetadataSection from '../../common/QuestionMetadataSection';
import QuestionProgressAction from '../../common/QuestionProgressAction';
import type { QuestionBase } from '../../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../../common/useQuestionLogEventCopyContents';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  hasCompletedQuestion: boolean;
  isQuestionLocked: boolean;
  question: QuestionBase;
  serverDuration: number;
}>;

export default function QuestionContentsSystemDesign({
  canViewPremiumContent,
  hasCompletedQuestion,
  isQuestionLocked,
  question,
  serverDuration,
}: Props) {
  const intl = useIntl();
  const copyRef = useQuestionLogEventCopyContents<HTMLElement>();
  const { description, metadata, solution } = question;
  const { data: questionProgress, isSuccess } = useQueryQuestionProgress(
    question.metadata,
  );

  return (
    <article ref={copyRef} className="space-y-8">
      <div className="space-y-8">
        <header className="mb-9">
          <Heading className="font-display flex items-center space-x-2 text-3xl font-bold leading-6 tracking-tight text-slate-900 sm:text-4xl">
            <span>{metadata.title}</span>
            {hasCompletedQuestion && (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Completed',
                  description:
                    'Label to indicate that a question has been completed',
                  id: 'LPfKTO',
                })}
                variant="success"
              />
            )}
          </Heading>
        </header>
        <div className="flex justify-between">
          <Section>
            <QuestionMetadataSection metadata={metadata} variant="body" />
            <QuestionReportIssueButton
              format={question.format}
              isLabelHidden={false}
              title={question.metadata.title}
            />
          </Section>
        </div>
      </div>
      <StatisticsPanel serverDuration={serverDuration} />
      <Section>
        <div className="space-y-8">
          {!isQuestionLocked &&
            metadata.companies &&
            metadata.companies.length > 0 && (
              <>
                <hr />
                <QuestionCompanies
                  canViewPremiumContent={canViewPremiumContent}
                  question={metadata}
                />
              </>
            )}
          <hr />
          <QuestionContentProse
            contents={description}
            isContentsHidden={isQuestionLocked}
            textSize="xl"
          />
        </div>
        <hr />
        <div>
          <QuestionContentProse
            contents={solution}
            isContentsHidden={isQuestionLocked}
            textSize="xl"
          />
        </div>
        <div className="flex justify-between">
          <QuestionReportIssueButton
            format={question.format}
            isLabelHidden={false}
            showTooltip={false}
            title={question.metadata.title}
          />
          <div
            className={clsx(
              'transition-colors',
              isSuccess ? 'opacity-100' : 'opacity-0',
            )}>
            <QuestionProgressAction
              question={question}
              questionProgress={questionProgress}
            />
          </div>
        </div>
      </Section>
    </article>
  );
}
