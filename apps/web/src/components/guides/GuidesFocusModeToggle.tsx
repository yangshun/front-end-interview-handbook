import { useIntl } from 'react-intl';

import CheckboxInput from '../ui/CheckboxInput';
import Tooltip from '../ui/Tooltip';

type Props = Readonly<{
  isFocusMode: boolean;
  toggleFocusMode?: () => void;
}>;

export default function GuidesFocusModeToggle({
  isFocusMode,
  toggleFocusMode,
}: Props) {
  const intl = useIntl();

  const toggleButton = (
    <CheckboxInput
      label={
        isFocusMode
          ? ''
          : intl.formatMessage({
              defaultMessage: 'Focus mode',
              description: 'Label for focus mode toggle button',
              id: 'tEaNEQ',
            })
      }
      value={isFocusMode}
      onChange={toggleFocusMode}
    />
  );

  return (
    <div>
      {isFocusMode ? (
        <Tooltip
          label={intl.formatMessage({
            defaultMessage: ' Toggle focus mode off',
            description: 'Label for toggle focus mode off',
            id: 'DEcbCY',
          })}>
          {toggleButton}
        </Tooltip>
      ) : (
        toggleButton
      )}
    </div>
  );
}
