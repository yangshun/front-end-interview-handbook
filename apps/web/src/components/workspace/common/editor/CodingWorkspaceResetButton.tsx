import { RiArrowGoBackLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
type Props = Readonly<{
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function CodingWorkspaceResetButton({ onClick }: Props) {
  const intl = useIntl();

  return (
    <Button
      icon={RiArrowGoBackLine}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Reset this file',
        description:
          'Label for button that allows users to reset their coding workspace to the initial code',
        id: 'k79xTX',
      })}
      size="xs"
      tooltip={intl.formatMessage({
        defaultMessage: 'Reset this file',
        description:
          'Tooltip for button that allows users to reset their coding workspace to the initial code',
        id: 'gopXdP',
      })}
      variant="tertiary"
      onClick={onClick}
    />
  );
}
