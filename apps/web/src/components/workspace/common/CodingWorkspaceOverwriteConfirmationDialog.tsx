import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useIntl } from '~/components/intl';

type Type = 'attempt' | 'solution';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: Type;
}>;

export default function CodingWorkspaceOverwriteConfirmationDialog({
  isShown,
  onClose,
  onConfirm,
  type,
}: Props) {
  const intl = useIntl();

  const content: Record<
    Type,
    {
      description: string;
      title: string;
    }
  > = {
    attempt: {
      description: intl.formatMessage({
        defaultMessage:
          'Permanently overwrite your code with this attempt. Changes made to the solution will then be saved locally',
        description: 'Dialog content for overwriting code in workspace',
        id: 'GWqOMJ',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Overwrite your code with this attempt',
        description: 'Dialog title for overwriting code in workspace',
        id: 'ub+gSX',
      }),
    },
    solution: {
      description: intl.formatMessage({
        defaultMessage:
          'Permanently overwrite your code with this solution. Changes made to the solution will then be saved locally',
        description: 'Dialog content for overwriting code in workspace',
        id: 'UFcqJO',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Overwrite your code with this solution',
        description: 'Dialog title for overwriting code in workspace',
        id: 'g7S4IJ',
      }),
    },
  };

  const { description, title } = content[type];

  return (
    <ConfirmationDialog
      confirmButtonLabel={intl.formatMessage({
        defaultMessage: 'Overwrite',
        description: 'Overwrite code button label',
        id: 'uvm0O2',
      })}
      isShown={isShown}
      title={title}
      onCancel={onClose}
      onClose={onClose}
      onConfirm={onConfirm}>
      {description}
    </ConfirmationDialog>
  );
}
