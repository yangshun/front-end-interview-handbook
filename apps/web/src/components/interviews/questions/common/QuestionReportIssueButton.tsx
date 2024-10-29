import { useState } from 'react';
import { RiBugLine } from 'react-icons/ri';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import type { TooltipContentSide } from '~/components/ui/Tooltip';

import type { QuestionFormat } from './QuestionsTypes';

type Props = Readonly<{
  className?: string;
  format: QuestionFormat;
  isLabelHidden?: boolean;
  showTooltip?: boolean;
  title: string;
  tooltipSide?: TooltipContentSide;
}>;

// https://github.com/greatfrontend/greatfrontend/labels
const QuestionFormatToGitHubIssueLabel: Record<QuestionFormat, string> = {
  algo: 'question-algo',
  javascript: 'question-javascript',
  quiz: 'question-quiz',
  'system-design': 'question-system-design',
  'user-interface': 'question-ui',
};

export default function QuestionReportIssueButton({
  className,
  isLabelHidden = true,
  format,
  showTooltip = true,
  title,
  tooltipSide = 'top',
}: Props) {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const gitHubIssueHref = `https://github.com/greatfrontend/greatfrontend/issues/new?template=question-report.md&labels=${QuestionFormatToGitHubIssueLabel[format]}&title=Issue with ${title}`;

  return (
    <>
      <Button
        className={className}
        icon={RiBugLine}
        isLabelHidden={isLabelHidden}
        label={intl.formatMessage({
          defaultMessage: 'Report an issue',
          description: 'Label for reporting an issue',
          id: 'ZYFcYD',
        })}
        size="xs"
        tooltip={
          showTooltip
            ? intl.formatMessage({
                defaultMessage: 'Report an issue',
                description: 'Tooltip for button to report an issue',
                id: 'gDAVYm',
              })
            : undefined
        }
        tooltipSide={showTooltip ? tooltipSide : undefined}
        variant="secondary"
        onClick={() => setIsOpen(true)}
      />
      <FeedbackDialog
        isShown={isOpen}
        preBodyContents={
          <>
            <div>
              <FormattedMessage
                defaultMessage="Found a bug or have an improvement to suggest to a question? We would prefer if you could create an issue on <link>GitHub</link>."
                description="Sentence to report bug on GitHub"
                id="LfcLVQ"
                values={{
                  link: (chunks) => (
                    <Anchor href={gitHubIssueHref}>{chunks}</Anchor>
                  ),
                }}
              />
            </div>
            <Divider />
          </>
        }
        showHideWidgetForSessionButton={false}
        title={intl.formatMessage({
          defaultMessage: 'Report an issue',
          description: 'Label for reporting an issue',
          id: 'ZYFcYD',
        })}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
