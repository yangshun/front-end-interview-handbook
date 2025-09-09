import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { TbReplace } from 'react-icons/tb';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text, { textVariants } from '~/components/ui/Text';
import { themeBackgroundColor } from '~/components/ui/theme';
import { useCodingWorkspaceUnsavedSolutionContext } from '~/components/workspace/common/context/CodingWorkspaceUnsavedSolutionContext';
import CodingWorkspaceOverwriteConfirmationDialog from '~/components/workspace/common/solution/CodingWorkspaceOverwriteConfirmationDialog';
import CodingWorkspaceRevertCodeConfirmationDialog from '~/components/workspace/common/solution/CodingWorkspaceRevertCodeConfirmationDialog';
import CodingWorkspaceSolutionUnsavedChangesDialog from '~/components/workspace/common/solution/CodingWorkspaceSolutionUnsavedChangesDialog';
import {
  useCodingWorkspaceDispatch,
  useCodingWorkspaceSelector,
} from '~/components/workspace/common/store/hooks';
import { updateCurrentOpenedSolution } from '~/components/workspace/common/store/solution-slice';

type Props = Readonly<{
  isMobile: boolean;
  onOpenSolution: (solutionId: string | null, name: string) => void;
  onOverwriteWithSolutionCode: () => void;
  onRevertToSavedCode: () => void;
  onSave: () => void;
  workspaceType: ComponentProps<
    typeof CodingWorkspaceSolutionUnsavedChangesDialog
  >['workspaceType'];
}>;

export default function CodingWorkspaceSolutionBanner({
  isMobile,
  onOpenSolution,
  onOverwriteWithSolutionCode,
  onRevertToSavedCode,
  onSave,
  workspaceType,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const isLoggedIn = user != null;
  const { setUnsavedChangesDialog, unsavedChangesDialog } =
    useCodingWorkspaceUnsavedSolutionContext();
  const workspaceDispatch = useCodingWorkspaceDispatch();
  const hasUnsavedSolutionChanges = useCodingWorkspaceSelector(
    (state) => state.solution.hasUnsavedSolutionChanges,
  );
  const currentOpenedSolution = useCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );
  const [overwriteConfirmationShown, setOverwriteConfirmationShown] =
    useState(false);
  const [revertConfirmationShown, setRevertConfirmationShown] = useState(false);
  const type = currentOpenedSolution?.attemptId ? 'attempt' : 'solution';

  function onRevert() {
    onRevertToSavedCode();
    workspaceDispatch(updateCurrentOpenedSolution(null));
  }

  function handleOpenSolution() {
    if (!currentOpenedSolution) {
      return;
    }
    onOpenSolution(
      currentOpenedSolution.attemptId ?? null,
      currentOpenedSolution.name,
    );
  }

  function onCloseUnsavedChangesDialog() {
    if (unsavedChangesDialog.show) {
      unsavedChangesDialog.onCancel?.();
    }
    setUnsavedChangesDialog({ show: false });
  }

  function handleRevert() {
    if (!hasUnsavedSolutionChanges) {
      onRevert();

      return;
    }

    if (isMobile) {
      setRevertConfirmationShown(true);

      return;
    }

    setUnsavedChangesDialog({
      onAction: () => {
        onRevert();
        onCloseUnsavedChangesDialog();
      },
      show: true,
    });
  }

  function handleOnSave() {
    onSave();
    onCloseUnsavedChangesDialog();
  }

  if (!currentOpenedSolution) {
    return null;
  }

  return (
    <div
      className={clsx(
        'z-sticky sticky bottom-0',
        'px-3 py-1.5',
        'flex items-center gap-2',
        themeBackgroundColor,
      )}>
      <div className="flex-1">
        <Text className="line-clamp-1" size="body3">
          <FormattedMessage
            defaultMessage="From <button>{name}</button>"
            description="Label for the solution name"
            id="uOuP05"
            values={{
              button: (chunks) => (
                <span
                  className={clsx(
                    textVariants({
                      color: 'active',
                      size: 'inherit',
                      weight: 'medium',
                    }),
                    'cursor-pointer underline dark:no-underline dark:hover:underline',
                  )}
                  onClick={handleOpenSolution}>
                  {chunks}
                </span>
              ),
              name: currentOpenedSolution?.name,
            }}
          />
        </Text>
      </div>
      <Button
        label={intl.formatMessage({
          defaultMessage: 'Revert to your code',
          description: 'Label for the revert button in the solution banner',
          id: 'J5CHN5',
        })}
        size="xs"
        variant="secondary"
        onClick={handleRevert}
      />
      <Button
        icon={TbReplace}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Overwrite',
          description: 'Label for the overwrite button in the solution banner',
          id: 'Y735Gk',
        })}
        size="xs"
        tooltip={
          type === 'solution'
            ? intl.formatMessage({
                defaultMessage:
                  'Overwrite your code with this solution. Changes made to the solution will then be saved locally',
                description:
                  'Tooltip for the overwrite button in the solution banner',
                id: 'L5rbBy',
              })
            : intl.formatMessage({
                defaultMessage:
                  'Overwrite your code with this attempt. Changes made to the attempt will then be saved locally',
                description:
                  'Tooltip for the overwrite button in the solution banner',
                id: '/oPXLd',
              })
        }
        variant="secondary"
        onClick={() => setOverwriteConfirmationShown(true)}
      />
      <CodingWorkspaceOverwriteConfirmationDialog
        isShown={overwriteConfirmationShown}
        type={type}
        onClose={() => setOverwriteConfirmationShown(false)}
        onConfirm={() => {
          onOverwriteWithSolutionCode();
          workspaceDispatch(updateCurrentOpenedSolution(null));
          setOverwriteConfirmationShown(false);
        }}
      />
      <CodingWorkspaceRevertCodeConfirmationDialog
        isShown={revertConfirmationShown}
        type={type}
        onClose={() => setRevertConfirmationShown(false)}
        onConfirm={() => {
          onRevert();
          setRevertConfirmationShown(false);
        }}
      />
      <CodingWorkspaceSolutionUnsavedChangesDialog
        isShown={unsavedChangesDialog.show}
        type={type}
        workspaceType={workspaceType}
        onClose={onCloseUnsavedChangesDialog}
        onProceed={
          unsavedChangesDialog.show ? unsavedChangesDialog.onAction : () => {}
        }
        // Don't show Save as submission first/Save to cloud first button
        // if the user is not logged in or on mobile
        onSave={isLoggedIn && !isMobile ? handleOnSave : undefined}
      />
    </div>
  );
}
