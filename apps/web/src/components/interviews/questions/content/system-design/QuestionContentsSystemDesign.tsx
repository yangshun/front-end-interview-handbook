import clsx from 'clsx';

import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import QuestionCompanies from '../QuestionCompanies';
import QuestionContentProse from '../QuestionContentProse';
import QuestionProgressAction from '../../common/QuestionProgressAction';
import type { QuestionBase } from '../../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../../common/useQuestionLogEventCopyContents';
import useQuestionsAutoMarkAsComplete from '../../common/useQuestionsAutoMarkAsComplete';
import QuestionMetadataSection from '../../metadata/QuestionMetadataSection';
import InterviewsPremiumBadge from '../../../common/InterviewsPremiumBadge';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  question: QuestionBase;
  studyListKey?: string;
}>;

export default function QuestionContentsSystemDesign({
  canViewPremiumContent,
  studyListKey,
  isQuestionLocked,
  question,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data, isLoading } = useQueryQuestionProgress(
    question.metadata,
    studyListKey ?? null,
  );

  useQuestionsAutoMarkAsComplete(question.metadata, studyListKey);

  const copyRef = useQuestionLogEventCopyContents<HTMLElement>();

  const { description, metadata, solution } = question;

  return (
    <article ref={copyRef} className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8">
        <div>
          <Text className="mb-1 block" color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="System design"
              description="Label for system design question"
              id="of3jrc"
            />
          </Text>
          <header className="flex flex-wrap items-center gap-4">
            <Heading className="inline-flex" level="heading4">
              {metadata.title}
            </Heading>
            <div className="flex gap-2">
              {metadata.access === 'premium' && <InterviewsPremiumBadge />}
              {data?.questionProgress?.status === 'complete' && (
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
        </div>
        <Section>
          <div className="flex items-start justify-between">
            <QuestionMetadataSection metadata={metadata} />
            <QuestionReportIssueButton
              entity="question"
              format={question.metadata.format}
              isLabelHidden={false}
              slug={question.metadata.slug}
            />
          </div>
        </Section>
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
            entity="question"
            format={question.metadata.format}
            isLabelHidden={false}
            showTooltip={false}
            slug={question.metadata.slug}
          />
          <div
            className={clsx(
              'transition-colors',
              isLoading && user != null ? 'opacity-0' : 'opacity-100',
            )}>
            <QuestionProgressAction
              metadata={question.metadata}
              studyListKey={studyListKey}
            />
          </div>
        </div>
      </Section>
    </article>
  );
}
