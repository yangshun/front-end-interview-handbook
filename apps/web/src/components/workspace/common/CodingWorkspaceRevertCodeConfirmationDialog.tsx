import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

type Type = 'attempt' | 'solution';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: Type;
}>;

export default function CodingWorkspaceRevertCodeConfirmationDialog({
  isShown,
  onClose,
  onConfirm,
  type,
}: Props) {
  const intl = useIntl();

  return (
    <ConfirmationDialog
      confirmButtonLabel={intl.formatMessage({
        defaultMessage: 'Revert to my code',
        description: 'Revert code button label',
        id: 'bz5XgE',
      })}
      isShown={isShown}
      title={intl.formatMessage({
        defaultMessage: 'Revert to your code',
        description: 'Dialog title for reverting code in workspace',
        id: 'UFv6qd',
      })}
      onCancel={onClose}
      onClose={onClose}
      onConfirm={onConfirm}>
      <Text>
        {type === 'solution'
          ? intl.formatMessage({
              defaultMessage:
                'Reverting will discard any changes made to this solution. Do you want to continue?',
              description: 'Dialog content for reverting code in workspace',
              id: 'VyuRF6',
            })
          : intl.formatMessage({
              defaultMessage:
                'Reverting will discard any changes made to this attempt. Do you want to continue?',
              description: 'Dialog content for reverting code in workspace',
              id: 'kqqb+v',
            })}
      </Text>
    </ConfirmationDialog>
  );
}
