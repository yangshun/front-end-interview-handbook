'use client';

import { useEffect, useRef, useState } from 'react';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import type { InterviewsQuestionItemUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useI18nRouter } from '~/next-i18nostic/src';
import { staticUpperCase } from '~/utils/typescript/stringTransform';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';

import { useSandpack } from '@codesandbox/sandpack-react';
import type { QuestionUserInterfaceSave } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';

function UpdateSaveButton({
  save,
}: Readonly<{
  save: QuestionUserInterfaceSave;
}>) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();

  const { showToast } = useToast();
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const userInterfaceUpdateSubmissionMutation =
    trpc.questionSave.userInterfaceUpdate.useMutation({
      onSuccess: () => {
        showToast({
          title: `Successfully updated "${save.name}"`,
          variant: 'info',
        });
        trpcUtils.questionSave.userInterfaceGet.invalidate();
        trpcUtils.questionSave.userInterfaceGetAll.invalidate();
      },
    });

  return (
    <Button
      isDisabled={userInterfaceUpdateSubmissionMutation.isLoading}
      isLoading={userInterfaceUpdateSubmissionMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Save',
        description: 'Coding workspace save code button label',
        id: 'LIW1bo',
      })}
      size="xs"
      variant="primary"
      onClick={() => {
        userInterfaceUpdateSubmissionMutation.mutate({
          files: JSON.stringify(files),
          saveId: save!.id,
        });
      }}
    />
  );
}

function NewSaveButton({
  question,
}: Readonly<{
  question: InterviewsQuestionItemUserInterface;
  studyListKey?: string; // TODO(interviews): make save URLs study list-specific
}>) {
  const intl = useIntl();
  const user = useUser();
  const trpcUtils = trpc.useUtils();
  const router = useI18nRouter();
  const { showToast } = useToast();
  const { signInUpHref } = useAuthSignInUp();
  const { data: saves } = trpc.questionSave.userInterfaceGetAll.useQuery({
    slug: question.metadata.slug,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const numberOfSaves: number = saves?.length ?? 0;
  const [saveName, setSaveName] = useState(`Attempt ${numberOfSaves + 1}`);

  const userInterfaceAddSubmissionMutation =
    trpc.questionSave.userInterfaceAdd.useMutation({
      onSuccess: (data) => {
        setIsDialogOpen(false);
        showToast({
          title: intl.formatMessage(
            {
              defaultMessage: '`Saved as "{saveName}"`',
              description: 'Coding workspace save code toast title',
              id: 'rx8kx8',
            },
            { saveName },
          ),
          variant: 'success',
        });
        // TODO(workspace): Add study list parameter if exists.
        router.push(
          `/questions/user-interface/${question.metadata.slug}/v/${data?.id}`,
        );

        trpcUtils.questionSave.userInterfaceGet.invalidate();
        trpcUtils.questionSave.userInterfaceGetAll.invalidate();
      },
    });

  useEffect(() => {
    setSaveName(`Attempt ${numberOfSaves + 1}`);
  }, [numberOfSaves]);

  function saveToServer() {
    userInterfaceAddSubmissionMutation.mutate({
      files: JSON.stringify(files),
      framework: staticUpperCase(question.framework),
      name: saveName || `Attempt ${numberOfSaves + 1}`,
      slug: question.metadata.slug,
    });
  }

  return (
    <>
      <Button
        href={user == null ? signInUpHref() : undefined}
        isDisabled={userInterfaceAddSubmissionMutation.isLoading}
        isLoading={userInterfaceAddSubmissionMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Save to cloud',
          description: 'Coding workspace save code label',
          id: 'VnCFSy',
        })}
        size="xs"
        variant="primary"
        onClick={
          user == null
            ? undefined
            : () => {
                setIsDialogOpen(true);
                setTimeout(() => {
                  inputRef.current?.select();
                }, 17);
              }
        }
      />
      <Dialog
        isShown={isDialogOpen}
        primaryButton={
          <Button
            isDisabled={userInterfaceAddSubmissionMutation.isLoading}
            isLoading={userInterfaceAddSubmissionMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Save',
              description: 'Coding workspace save code button label',
              id: 'LIW1bo',
            })}
            variant="primary"
            onClick={() => {
              saveToServer();
            }}
          />
        }
        secondaryButton={
          <Button
            isDisabled={userInterfaceAddSubmissionMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description: 'Cancel button label',
              id: '0GT0SI',
            })}
            variant="secondary"
            onClick={() => {
              setIsDialogOpen(false);
            }}
          />
        }
        title={intl.formatMessage({
          defaultMessage: 'Save to cloud',
          description: 'Coding workspace save code label',
          id: 'VnCFSy',
        })}
        onClose={() => {
          setIsDialogOpen(false);
        }}>
        <div className="flex flex-col gap-y-3">
          <Text className="block" color="secondary" size="inherit">
            <FormattedMessage
              defaultMessage='Your code will be saved into the database and can be retrieved from the <bold>"Saved versions"</bold> tab.'
              description="Coding workspace save code dialog description"
              id="4IaHW9"
              values={{
                bold: (chunks) => <Text weight="medium">{chunks}</Text>,
              }}
            />
          </Text>
          <Divider />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveToServer();
            }}>
            <TextInput
              ref={inputRef}
              isDisabled={userInterfaceAddSubmissionMutation.isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Name your save',
                description: 'Coding workspace save code input label',
                id: 'CHR6u9',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'My awesome code',
                description: 'Coding workspace save code input placeholder',
                id: 'nqTJbI',
              })}
              value={saveName}
              onChange={setSaveName}
            />
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default function UserInterfaceCodingWorkspaceSaveButton({
  question,
  studyListKey,
}: Readonly<{
  question: InterviewsQuestionItemUserInterface;
  studyListKey?: string;
}>) {
  const { save } = useUserInterfaceCodingWorkspaceSavesContext();
  const hasExistingSave = save != null;
  const user = useUser();

  // Don't allow updating of save file if the current user
  // doesn't own the save.
  if (hasExistingSave && user?.id !== save.userId) {
    return null;
  }

  return (
    <div>
      {hasExistingSave ? (
        <UpdateSaveButton save={save} />
      ) : (
        <NewSaveButton question={question} studyListKey={studyListKey} />
      )}
    </div>
  );
}
