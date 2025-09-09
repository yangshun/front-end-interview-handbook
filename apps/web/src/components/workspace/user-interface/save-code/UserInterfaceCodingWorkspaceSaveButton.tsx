'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { RiDownloadCloud2Line } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import type { QuestionUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import { resetHasUnsavedSolutionChanges } from '~/components/workspace/common/store/solution-slice';

import {
  useUserInterfaceCodingWorkspaceDispatch,
  useUserInterfaceCodingWorkspaceSelector,
} from '../store/hooks';
import UserInterfaceCodingWorkspaceSaveDialog from './UserInterfaceCodingWorkspaceSaveDialog';

type Props = Readonly<{
  device?: 'desktop' | 'mobile' | 'tablet';
  question: QuestionUserInterface;
  studyListKey?: string; // TODO(interviews): make save URLs study list-specific
}>;

export default function UserInterfaceCodingWorkspaceSaveButton({
  device = 'desktop',
  question,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { signInUpHref } = useAuthSignInUp();
  const [showDialog, setShowDialog] = useState(false);
  const workspaceDispatch = useUserInterfaceCodingWorkspaceDispatch();
  const files = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );
  const currentOpenedSolution = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );

  return (
    <div>
      <Button
        addonPosition="start"
        href={user == null ? signInUpHref() : undefined}
        icon={device === 'desktop' ? undefined : RiDownloadCloud2Line}
        label={intl.formatMessage(
          device === 'desktop'
            ? {
                defaultMessage: 'Save to cloud',
                description: 'Coding workspace save code label',
                id: 'VnCFSy',
              }
            : {
                defaultMessage: 'Save',
                description: 'Coding workspace save code button label',
                id: 'LIW1bo',
              },
        )}
        size="xs"
        variant="primary"
        onClick={() => (user == null ? undefined : setShowDialog(true))}
      />

      {/* Needed to reinitialize the dialog state when the current opened solution changes */}
      {showDialog && (
        <UserInterfaceCodingWorkspaceSaveDialog
          currentAttempt={
            currentOpenedSolution?.attemptId
              ? {
                  id: currentOpenedSolution.attemptId,
                  name: currentOpenedSolution.name,
                }
              : null
          }
          files={files}
          isShown={showDialog}
          question={question}
          onClose={() => setShowDialog(false)}
          onSuccess={() => workspaceDispatch(resetHasUnsavedSolutionChanges())}
        />
      )}
    </div>
  );
}
