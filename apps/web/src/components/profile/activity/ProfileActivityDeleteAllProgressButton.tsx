import { useState } from 'react';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

import { useMutationQuestionProgressDeleteAll } from '~/db/QuestionsProgressClient';

export default function ProfileActivityDeleteAllProgressButton() {
  const intl = useIntl();

  const { showToast } = useToast();
  const [isResetProgressDialogShown, setIsResetProgressDialogShown] =
    useState(false);

  const resetProgressMutation = useMutationQuestionProgressDeleteAll();

  const resetProgress = () => {
    resetProgressMutation.mutate(undefined, {
      onError: () => {
        showToast({
          title: intl.formatMessage({
            defaultMessage: 'Failed to reset progress. Please try again.',
            description:
              'Message shown when question reset progress action fails.',
            id: 'GM9dpG',
          }),
          variant: 'danger',
        });
      },
      onSuccess: () => {
        setIsResetProgressDialogShown(false);
        showToast({
          title: intl.formatMessage({
            defaultMessage: 'All question progress has been reset.',
            description:
              'Message shown when question reset progress action succeeds.',
            id: 'FonVOb',
          }),
          variant: 'success',
        });
      },
    });
  };

  return (
    <>
      <Button
        label={intl.formatMessage({
          defaultMessage: 'Reset all progress',
          description: 'Label for button to delete all progress',
          id: 'K8TgFg',
        })}
        size="xs"
        variant="danger"
        onClick={() => setIsResetProgressDialogShown(true)}
      />
      <Dialog
        isShown={isResetProgressDialogShown}
        primaryButton={
          <Button
            isDisabled={resetProgressMutation.isLoading}
            isLoading={resetProgressMutation.isLoading}
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
          defaultMessage: 'Reset all progress',
          description: 'Title for reset progress confirmation dialog',
          id: 'zPB/q7',
        })}
        onClose={() => setIsResetProgressDialogShown(false)}>
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="All your question progress will be reset. This is an irreversible action, are you sure you want to proceed?"
            description="Warning message in reset progress confirmation dialog"
            id="yhHx9e"
          />
        </Text>
      </Dialog>
    </>
  );
}
