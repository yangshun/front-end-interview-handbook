import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import { textVariants } from '~/components/ui/Text';

type Type = 'attempt' | 'solution';
type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  onProceed: () => void;
  onSave?: () => void;
  type: Type;
  workspaceType: 'js' | 'ui';
}>;

export default function CodingWorkspaceSolutionUnsavedChangesDialog({
  isShown,
  onClose,
  onProceed,
  onSave,
  type,
  workspaceType,
}: Props) {
  const intl = useIntl();

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Proceed',
            description: 'Confirmation button label',
            id: '/Fu42K',
          })}
          size="md"
          variant="primary"
          onClick={onProceed}
        />
      }
      secondaryButton={
        <Button
          label={
            onSave
              ? workspaceType === 'js'
                ? intl.formatMessage({
                    defaultMessage: 'Save as submission first',
                    description: 'Cancel button label in confirmation dialog',
                    id: 'fLrQo7',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Save to cloud first',
                    description: 'Save button label in confirmation dialog',
                    id: 'uGFfcx',
                  })
              : intl.formatMessage({
                  defaultMessage: 'Cancel',
                  description: 'Cancel button label in confirmation dialog',
                  id: 'ldxi7D',
                })
          }
          size="md"
          variant="secondary"
          onClick={() => (onSave ? onSave() : onClose())}
        />
      }
      title={intl.formatMessage({
        defaultMessage: 'Unsaved changes',
        description: 'Confirmation model title',
        id: 'suLGue',
      })}
      onClose={onClose}>
      <div className={textVariants({ color: 'subtitle', size: 'body2' })}>
        {type === 'solution'
          ? intl.formatMessage({
              defaultMessage:
                'Changes to the currently opened solution will be discarded. Proceed?',
              description: 'Dialog content for unsaved changes in solution',
              id: 'Y9i87T',
            })
          : intl.formatMessage({
              defaultMessage:
                'Changes to the currently opened attempt will be discarded. Proceed?',
              description: 'Dialog content for unsaved changes in workspace',
              id: 'xanXX3',
            })}
      </div>
    </Dialog>
  );
}
