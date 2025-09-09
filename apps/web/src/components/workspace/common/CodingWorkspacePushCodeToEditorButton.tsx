'use client';

import { useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { useCodingWorkspaceUnsavedSolutionContext } from './context/CodingWorkspaceUnsavedSolutionContext';
import { useCodingWorkspaceSelector } from './store/hooks';

type Variant = 'attempt' | 'solution';

type Props = Readonly<{
  onProceed: () => void;
  type: Variant;
}>;

export default function CodingWorkspacePushCodeToEditorButton({
  onProceed,
  type,
}: Props) {
  const intl = useIntl();
  const { setUnsavedChangesDialog } =
    useCodingWorkspaceUnsavedSolutionContext();
  const hasUnsavedSolutionChanges = useCodingWorkspaceSelector(
    (state) => state.solution.hasUnsavedSolutionChanges,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onProceedConfirm() {
    setIsDialogOpen(false);
    if (!hasUnsavedSolutionChanges) {
      onProceed();

      return;
    }
    setUnsavedChangesDialog({
      onAction: () => {
        onProceed();
        setUnsavedChangesDialog({
          show: false,
        });
      },
      show: true,
    });
  }

  const dialogContent: Record<
    Variant,
    {
      buttonTooltip: string;
      confirmButtonLabel: string;
      content: string;
      title: string;
    }
  > = {
    attempt: {
      buttonTooltip: intl.formatMessage({
        defaultMessage:
          "Open this attempt's code in the workspace, replacing your current code. You can always revert to your previous code if needed. Ideal for exploring or experimenting with the attempt.",
        description: 'Tooltip for opening attempt in workspace',
        id: 'l2/VeQ',
      }),
      confirmButtonLabel: intl.formatMessage({
        defaultMessage: 'Open attempt',
        description: 'Confirm button to open solution in workspace',
        id: 'qJvX+m',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Opening this attempt will replace your code in the editor. You can revert back if needed. Proceed?',
        description: 'Dialog content for opening solution in workspace',
        id: 'SXLeRI',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Open attempt in workspace?',
        description: 'Dialog title for opening solution in workspace',
        id: '3ZmbwR',
      }),
    },
    solution: {
      buttonTooltip: intl.formatMessage({
        defaultMessage:
          "Open this solution's code in the workspace, replacing your current code. You can always revert to your previous code if needed. Ideal for exploring or experimenting with the solution.",
        description: 'Tooltip for opening solution in workspace',
        id: '9Myxlt',
      }),
      confirmButtonLabel: intl.formatMessage({
        defaultMessage: 'Open solution',
        description: 'Confirm button to open solution in workspace',
        id: 'M6U+gd',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Opening this solution will replace your code in the editor. You can revert back if needed. Proceed?',
        description: 'Dialog content for opening solution in workspace',
        id: 'v95SRd',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Open solution in workspace?',
        description: 'Dialog title for opening solution in workspace',
        id: 'qYkkOP',
      }),
    },
  };

  const { buttonTooltip, confirmButtonLabel, content, title } =
    dialogContent[type];

  return (
    <>
      <Button
        icon={MdOpenInNew}
        label={intl.formatMessage({
          defaultMessage: 'Open in workspace',
          description: 'Open in workspace button label',
          id: 'KimNHi',
        })}
        size="xs"
        tooltip={buttonTooltip}
        variant="secondary"
        onClick={() => setIsDialogOpen(true)}
      />
      <ConfirmationDialog
        confirmButtonLabel={confirmButtonLabel}
        isShown={isDialogOpen}
        title={title}
        onCancel={() => setIsDialogOpen(false)}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onProceedConfirm}>
        {content}
      </ConfirmationDialog>
    </>
  );
}
