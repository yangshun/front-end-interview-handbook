import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import FeedbackDialog from '~/components/feedback/FeedbackDialog';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import type { TooltipPosition } from '~/components/ui/Tooltip';

import type { QuestionFormat } from './QuestionsTypes';

import { BugAntIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  format: QuestionFormat;
  isLabelHidden?: boolean;
  showTooltip?: boolean;
  title: string;
  tooltipPosition?: TooltipPosition;
}>;

// https://github.com/greatfrontend/greatfrontend/labels
const QuestionFormatToGitHubIssueLabel: Record<QuestionFormat, string> = {
  javascript: 'question-javascript',
  quiz: 'question-quiz',
  'system-design': 'question-system-design',
  'user-interface': 'question-ui',
};

export default function QuestionReportIssueButton({
  isLabelHidden = true,
  format,
  showTooltip = true,
  title,
  tooltipPosition = 'above',
}: Props) {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const gitHubIssueHref = `https://github.com/greatfrontend/greatfrontend/issues/new?template=question-report.md&labels=${QuestionFormatToGitHubIssueLabel[format]}&title=Issue with ${title}`;

  return (
    <>
      <Button
        icon={BugAntIcon}
        isLabelHidden={isLabelHidden}
        label={intl.formatMessage({
          defaultMessage: 'Report an issue',
          description: 'Label for reporting an issue',
          id: 'ZYFcYD',
        })}
        size="sm"
        tooltip={
          showTooltip
            ? intl.formatMessage({
                defaultMessage: 'Report an issue',
                description: 'Tooltip for button to report an issue',
                id: 'gDAVYm',
              })
            : undefined
        }
        tooltipPosition={showTooltip ? tooltipPosition : undefined}
        variant="tertiary"
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
            <hr />
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
