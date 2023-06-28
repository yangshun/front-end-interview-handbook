import clsx from 'clsx';
import { useIntl } from 'react-intl';

import StatisticsPanel from '~/components/debug/StatisticsPanel';
import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import Badge from '~/components/ui/Badge';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import QuestionCompanies from '../QuestionCompanies';
import QuestionContentProse from '../QuestionContentProse';
import QuestionProgressAction from '../../common/QuestionProgressAction';
import type { QuestionBase } from '../../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../../common/useQuestionLogEventCopyContents';
import QuestionMetadataSection from '../../metadata/QuestionMetadataSection';

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
      <div className="grid gap-y-8">
        <header>
          <Heading className="flex items-center gap-x-2" level="heading4">
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
            <QuestionMetadataSection metadata={metadata} />
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
        <div className="flex flex-col gap-y-8">
          {!isQuestionLocked &&
            metadata.companies &&
            metadata.companies.length > 0 && (
              <>
                <Divider />
                <QuestionCompanies
                  canViewPremiumContent={canViewPremiumContent}
                  question={metadata}
                />
              </>
            )}
          <Divider />
          <QuestionContentProse
            contents={description}
            isContentsHidden={isQuestionLocked}
          />
        </div>
        <Divider />
        <div>
          <QuestionContentProse
            contents={solution}
            isContentsHidden={isQuestionLocked}
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
