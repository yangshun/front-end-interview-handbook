import { RiArrowGoBackLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

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
        defaultMessage: 'Reset to initial code',
        description:
          'Label for button that allows users to reset their coding workspace to the initial code',
        id: 'FInmLy',
      })}
      size="xs"
      tooltip={intl.formatMessage({
        defaultMessage: 'Reset to initial code',
        description:
          'Tooltip for button that allows users to reset their coding workspace to the initial code',
        id: 'SWOTIA',
      })}
      tooltipPosition="start"
      variant="secondary"
      onClick={onClick}
    />
  );
}
