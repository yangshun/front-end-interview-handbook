import clsx from 'clsx';

import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import { useIntl } from '~/components/intl';
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
import InterviewsPremiumBadge from '../../../common/InterviewsPremiumBadge';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  listKey?: string;
  question: QuestionBase;
}>;

export default function QuestionContentsSystemDesign({
  canViewPremiumContent,
  listKey,
  isQuestionLocked,
  question,
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
        <header className="flex flex-wrap items-center gap-4">
          <Heading className="inline-flex" level="heading4">
            {metadata.title}
          </Heading>
          <div className="flex gap-2">
            {metadata.premium && <InterviewsPremiumBadge />}
            {questionProgress?.status === 'complete' && (
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
          </div>
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
      <Section>
        <div className="flex flex-col gap-y-8">
          {!isQuestionLocked &&
            metadata.companies &&
            metadata.companies.length > 0 && (
              <QuestionCompanies
                canViewPremiumContent={canViewPremiumContent}
                companies={metadata.companies}
              />
            )}
          <Divider />
          <QuestionContentProse contents={description} textSize="md" />
        </div>
        <Divider />
        <div>
          <QuestionContentProse
            contents={solution}
            isContentsHidden={isQuestionLocked}
            textSize="md"
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
              listKey={listKey}
              metadata={question.metadata}
              questionProgress={questionProgress}
            />
          </div>
        </div>
      </Section>
    </article>
  );
}
