import useColorSchemeOptions from '~/components/global/color-scheme/useColorSchemeOptions';
import { useIntl } from '~/components/intl';
import type { SelectDisplay } from '~/components/ui/Select';
import Select from '~/components/ui/Select';

import type { ColorSchemePreference } from './ColorSchemePreferencesProvider';

type Props = Readonly<{
  colorScheme: ColorSchemePreference;
  display?: SelectDisplay;
  onChange: (colorSchemePreference: ColorSchemePreference) => void;
}>;

export default function ColorSchemeSelect({
  display,
  colorScheme,
  onChange,
}: Props) {
  const intl = useIntl();

  const colorSchemeOptions = useColorSchemeOptions();

  return (
    <Select
      display={display}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Theme',
        description: 'Change site theme button label',
        id: 'n4aKYo',
      })}
      options={colorSchemeOptions}
      size="sm"
      value={colorScheme}
      onChange={onChange}
    />
  );
}
