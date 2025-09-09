import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useRef, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { QuestionUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { staticUpperCase } from '~/utils/typescript/stringTransform';

type Props = Readonly<{
  currentAttempt: {
    id: string;
    name: string;
  } | null;
  files: SandpackFiles;
  isShown: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  question: QuestionUserInterface;
}>;

export default function UserInterfaceCodingWorkspaceSaveDialog({
  currentAttempt,
  files,
  isShown,
  onClose,
  onSuccess,
  question,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { showToast } = useToast();
  const trpcUtils = trpc.useUtils();
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: saves } = trpc.questionSave.userInterfaceGetAll.useQuery(
    {
      slug: question.metadata.slug,
    },
    {
      enabled: !!user,
    },
  );

  const userInterfaceUpdateSubmissionMutation =
    trpc.questionSave.userInterfaceUpdate.useMutation({
      onSuccess: (data) => {
        onClose();
        onSuccess?.();
        showToast({
          title: intl.formatMessage(
            {
              defaultMessage: 'Successfully updated "{saveName}"',
              description: 'Coding workspace save code toast title',
              id: 'cyhNCa',
            },
            { saveName: data.name },
          ),
          variant: 'info',
        });
        trpcUtils.questionSave.userInterfaceGet.invalidate();
        trpcUtils.questionSave.userInterfaceGetAll.invalidate();
      },
    });
  const userInterfaceAddSubmissionMutation =
    trpc.questionSave.userInterfaceAdd.useMutation({
      onSuccess: (data) => {
        onClose();
        onSuccess?.();
        showToast({
          title: intl.formatMessage(
            {
              defaultMessage: 'Saved as "{saveName}"',
              description: 'Coding workspace save code toast title',
              id: 'mq4G2a',
            },
            { saveName: data.name },
          ),
          variant: 'success',
        });

        trpcUtils.questionSave.userInterfaceGet.invalidate();
        trpcUtils.questionSave.userInterfaceGetAll.invalidate();
      },
    });

  const hasExistingAttempt = currentAttempt != null;
  const [showSaveAsNew, setShowSaveAsNew] = useState(!hasExistingAttempt);
  const numberOfSaves: number = saves?.length ?? 0;

  const [saveName, setSaveName] = useState(`Attempt ${numberOfSaves + 1}`);

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

  const primaryButton = showSaveAsNew ? (
    <Button
      isDisabled={userInterfaceAddSubmissionMutation.isLoading}
      isLoading={userInterfaceAddSubmissionMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Save',
        description: 'Coding workspace save code button label',
        id: 'LIW1bo',
      })}
      size="md"
      variant="primary"
      onClick={() => {
        saveToServer();
      }}
    />
  ) : (
    <Button
      isDisabled={userInterfaceUpdateSubmissionMutation.isLoading}
      isLoading={userInterfaceUpdateSubmissionMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Overwrite existing',
        description: 'Button label to overwrite existing save',
        id: '3n7hDQ',
      })}
      size="md"
      variant="primary"
      onClick={() => {
        userInterfaceUpdateSubmissionMutation.mutate({
          files: JSON.stringify(files),
          saveId: currentAttempt!.id,
        });
      }}
    />
  );
  const secondaryButton = showSaveAsNew ? (
    <Button
      isDisabled={userInterfaceAddSubmissionMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Cancel',
        description: 'Cancel button label',
        id: '0GT0SI',
      })}
      size="md"
      variant="secondary"
      onClick={() => (hasExistingAttempt ? setShowSaveAsNew(false) : onClose())}
    />
  ) : (
    <Button
      label={intl.formatMessage({
        defaultMessage: 'Save as new',
        description: 'Save as new button label',
        id: 'QybPto',
      })}
      size="md"
      variant="secondary"
      onClick={() => {
        setShowSaveAsNew(true);
        setTimeout(() => {
          inputRef.current?.select();
        }, 17);
      }}
    />
  );

  const content = showSaveAsNew
    ? {
        description: (
          <FormattedMessage
            defaultMessage='Your code will be saved into the database and can be retrieved from the <bold>"Saved versions"</bold> tab.'
            description="Coding workspace save code dialog description"
            id="4IaHW9"
            values={{
              bold: (chunks) => <Text weight="medium">{chunks}</Text>,
            }}
          />
        ),
        title: intl.formatMessage({
          defaultMessage: 'Save to cloud',
          description: 'Coding workspace save code label',
          id: 'VnCFSy',
        }),
      }
    : {
        description: (
          <FormattedMessage
            defaultMessage="Would you like to save this as a <bold>new attempt</bold>, or overwrite your existing one?"
            description="Coding workspace save code dialog description"
            id="7A5m56"
            values={{
              bold: (chunks) => <Text weight="medium">{chunks}</Text>,
            }}
          />
        ),
        title: intl.formatMessage({
          defaultMessage: 'Save to current attempt?',
          description: 'Coding workspace save code label',
          id: 'ebi9uh',
        }),
      };
  const { description, title } = content;

  return (
    <Dialog
      isShown={isShown}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      title={title}
      onClose={onClose}>
      <div className="flex flex-col gap-y-3">
        <Text className="block" color="subtitle" size="body2">
          {description}
        </Text>
        {showSaveAsNew && (
          <>
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
          </>
        )}
      </div>
    </Dialog>
  );
}
