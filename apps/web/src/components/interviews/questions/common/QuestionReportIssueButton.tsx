import type { GuidebookItem } from '@prisma/client';
import clsx from 'clsx';
import { kebabCase } from 'lodash-es';
import { useState } from 'react';
import { RiBugLine } from 'react-icons/ri';
import url from 'url';

import FeedbackDialog from '~/components/global/feedback/FeedbackDialog';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import type { TooltipContentSide } from '~/components/ui/Tooltip';

import type { QuestionFormat } from './QuestionsTypes';

type CommonProps = Readonly<{
  className?: string;
  isLabelHidden?: boolean;
  showTooltip?: boolean;
  slug: string;
  tooltipSide?: TooltipContentSide;
}>;

type Props =
  | (CommonProps &
      Readonly<{
        book: GuidebookItem;
        entity: 'article';
      }>)
  | (CommonProps &
      Readonly<{
        entity: 'question';
        format: QuestionFormat;
      }>);

// https://github.com/greatfrontend/greatfrontend/labels
const QuestionFormatToGitHubIssueLabel: Record<QuestionFormat, string> = {
  algo: 'question-algo',
  javascript: 'question-javascript',
  quiz: 'question-quiz',
  'system-design': 'question-system-design',
  'user-interface': 'question-ui',
};

// https://github.com/greatfrontend/greatfrontend/labels
const GuidebookToGitHubIssueLabel: Record<GuidebookItem, string> = {
  BEHAVIORAL_INTERVIEW_PLAYBOOK: 'guide-behavioral-interview',
  FRONT_END_INTERVIEW_PLAYBOOK: 'guide-front-end-interview',
  FRONT_END_SYSTEM_DESIGN_PLAYBOOK: 'guide-front-end-system-design',
  REACT_INTERVIEW_PLAYBOOK: 'guide-react-interview',
};

export default function QuestionReportIssueButton({
  className,
  isLabelHidden = true,
  showTooltip = true,
  slug,
  tooltipSide = 'top',
  ...props
}: Props) {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const gitHubIssueHref =
    'https://github.com/greatfrontend' +
    (props.entity === 'article'
      ? url.format({
          pathname: '/greatfrontend/issues/new',
          query: {
            labels: GuidebookToGitHubIssueLabel[props.book],
            template: 'article-report.md',
            title: `[Article] ${kebabCase(props.book)}/${slug}`,
          },
        })
      : url.format({
          pathname: '/greatfrontend/issues/new',
          query: {
            labels: QuestionFormatToGitHubIssueLabel[props.format],
            template: 'question-report.md',
            title: `[Question] ${props.format}/${slug}`,
          },
        }));

  return (
    <>
      <Button
        className={clsx(
          'border-none bg-transparent dark:bg-transparent',
          className,
        )}
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
                defaultMessage="Found a bug or have an improvement to suggest? We would prefer if you could create an issue on <link>GitHub</link>."
                description="Reporting a bug on GitHub"
                id="IPWLLl"
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
