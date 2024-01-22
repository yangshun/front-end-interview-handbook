import type { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import type { ButtonVariant } from '~/components/ui/Button';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';

type Props = Readonly<{
  children?: ReactNode;
  confirmButtonLabel?: string;
  confirmButtonVariant?: ButtonVariant;
  isConfirming?: boolean;
  isShown: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
  title?: string;
}>;

export default function ConfirmationDialog({
  children,
  confirmButtonVariant = 'primary',
  isConfirming = false,
  isShown,
  onCancel,
  onConfirm,
  title,
  confirmButtonLabel,
}: Props) {
  const intl = useIntl();

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          isDisabled={isConfirming}
          isLoading={isConfirming}
          label={
            confirmButtonLabel ??
            intl.formatMessage({
              defaultMessage: 'Confirm',
              description: 'Confirmation button label',
              id: '3t00jq',
            })
          }
          size="md"
          variant={confirmButtonVariant}
          onClick={() => onConfirm()}
        />
      }
      secondaryButton={
        <Button
          isDisabled={isConfirming}
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Cancel button label in confirmation dialog',
            id: 'ldxi7D',
          })}
          size="md"
          variant="secondary"
          onClick={() => onCancel?.()}
        />
      }
      title={
        title ??
        intl.formatMessage({
          defaultMessage: 'Confirm action?',
          description: 'Confirmation model title',
          id: '6Us9sa',
        })
      }
      onClose={() => onCancel?.()}>
      <div>{children}</div>
    </Dialog>
  );
}
