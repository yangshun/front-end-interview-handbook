import { useState } from 'react';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

import { useMutationQuestionProgressDelete } from '~/db/QuestionsProgressClient';

import type { QuestionHash } from '../interviews/questions/common/QuestionsTypes';

type Props = Readonly<{
  clearSelectedQuestions: () => void;
  qnHashes: Array<QuestionHash>;
}>;

export default function ProfileActivitySelectivelyDeleteProgressButton({
  qnHashes,
  clearSelectedQuestions,
}: Props) {
  const intl = useIntl();

  const { showToast } = useToast();
  const [isResetProgressDialogShown, setIsResetProgressDialogShown] =
    useState(false);

  const selectivelyDeleteProgressMutation = useMutationQuestionProgressDelete();

  const resetProgress = () => {
    selectivelyDeleteProgressMutation.mutate(
      {
        qnHashes,
      },
      {
        onError: () => {
          showToast({
            title: intl.formatMessage({
              defaultMessage: 'Failed to reset progress. Please try again.',
              description:
                'Message shown when selective questions reset progress action fails.',
              id: '3fQKhq',
            }),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          clearSelectedQuestions();
          setIsResetProgressDialogShown(false);
          showToast({
            title: intl.formatMessage({
              defaultMessage: 'Selected questions progress has been reset.',
              description:
                'Message shown when selective questions reset progress action succeeds.',
              id: '7HQs3a',
            }),
            variant: 'success',
          });
        },
      },
    );
  };

  return (
    <>
      <Button
        label={intl.formatMessage(
          {
            defaultMessage: `Delete selected progress ({selectedQnsCount})`,
            description:
              'Label for button to reset progress for selected questions',
            id: 'rV/aK9',
          },
          {
            selectedQnsCount: qnHashes.length,
          },
        )}
        size="sm"
        variant="secondary"
        onClick={() => setIsResetProgressDialogShown(true)}
      />
      <Dialog
        isShown={isResetProgressDialogShown}
        primaryButton={
          <Button
            isDisabled={selectivelyDeleteProgressMutation.isLoading}
            isLoading={selectivelyDeleteProgressMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Reset',
              description: 'Label for button to confirm progress reset',
              id: 'dFz30c',
            })}
            variant="primary"
            onClick={() => {
              resetProgress();
            }}
          />
        }
        secondaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description: 'Label for button to cancel action',
              id: 'rfI2w+',
            })}
            variant="secondary"
            onClick={() => setIsResetProgressDialogShown(false)}
          />
        }
        title={intl.formatMessage({
          defaultMessage: 'Reset Progress',
          description: 'Title for reset progress confirmation dialog',
          id: 'eBp6vh',
        })}
        onClose={() => setIsResetProgressDialogShown(false)}>
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="The selected questions progress will be reset. This is an irreversible action, are you sure you want to proceed?"
            description="Warning message in selective questions reset progress confirmation dialog"
            id="3Eov45"
          />
        </Text>
      </Dialog>
    </>
  );
}
