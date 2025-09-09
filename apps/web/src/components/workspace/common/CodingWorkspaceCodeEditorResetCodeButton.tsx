import { RiArrowGoBackLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

type Props = Readonly<{
  onResetFile: () => void;
  type?: 'attempt' | 'skeleton' | 'solution';
}>;

export default function CodingWorkspaceCodeEditorResetCodeButton({
  onResetFile,
  type = 'skeleton',
}: Props) {
  const intl = useIntl();

  function resetCode() {
    const shouldDiscard = window.confirm(
      intl.formatMessage({
        defaultMessage: 'Your existing code will be discarded, are you sure?',
        description:
          'Text on browser confirmation pop-up when user attempts to use the reset button to reset their code',
        id: '8aQEL8',
      }),
    );

    if (!shouldDiscard) {
      return;
    }
    onResetFile();
  }

  const label =
    type === 'skeleton'
      ? intl.formatMessage({
          defaultMessage: 'Revert file to default',
          description: 'Revert file to default button label',
          id: 'yHSENd',
        })
      : type === 'solution'
        ? intl.formatMessage({
            defaultMessage: 'Revert solution file to default',
            description: 'Revert file to default button label',
            id: 'iOgIcR',
          })
        : intl.formatMessage({
            defaultMessage: 'Revert attempt file to default',
            description: 'Revert file to default button label',
            id: 'q2D/p5',
          });

  return (
    <Button
      icon={RiArrowGoBackLine}
      isLabelHidden={true}
      label={label}
      size="xs"
      tooltip={label}
      variant="secondary"
      onClick={resetCode}
    />
  );
}
