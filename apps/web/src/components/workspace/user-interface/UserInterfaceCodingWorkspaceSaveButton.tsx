import { trpc } from '~/hooks/trpc';

import type { QuestionUserInterface } from '~/components/questions/common/QuestionsTypes';
import Button from '~/components/ui/Button';

import { useI18nRouter } from '~/next-i18nostic/src';
import { staticUpperCase } from '~/utils/typescript/stringTransform';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function UserInterfaceCodingWorkspaceSaveButton({
  question,
}: Readonly<{
  question: QuestionUserInterface;
}>) {
  const router = useI18nRouter();
  const { save } = useUserInterfaceCodingWorkspaceSavesContext();
  const userInterfaceAddSubmissionMutation =
    trpc.questionSave.userInterfaceAdd.useMutation({
      onSuccess: (data) => {
        router.push(
          `/questions/user-interface/${question.metadata.slug}/s/${data?.id}`,
        );
      },
    });
  const userInterfaceUpdateSubmissionMutation =
    trpc.questionSave.userInterfaceUpdate.useMutation();
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const hasExistingSave = save != null;

  return hasExistingSave ? (
    <Button
      isDisabled={userInterfaceUpdateSubmissionMutation.isLoading}
      isLoading={userInterfaceUpdateSubmissionMutation.isLoading}
      label="Save"
      size="xs"
      variant="primary"
      onClick={() => {
        userInterfaceUpdateSubmissionMutation.mutate({
          files: JSON.stringify(files),
          saveId: save.id,
        });
      }}
    />
  ) : (
    <Button
      isDisabled={userInterfaceAddSubmissionMutation.isLoading}
      isLoading={userInterfaceAddSubmissionMutation.isLoading}
      label="Save to cloud"
      size="xs"
      variant="primary"
      onClick={() => {
        userInterfaceAddSubmissionMutation.mutate({
          files: JSON.stringify(files),
          framework: staticUpperCase(question.framework),
          name: 'Someting',
          slug: question.metadata.slug,
        });
      }}
    />
  );
}
