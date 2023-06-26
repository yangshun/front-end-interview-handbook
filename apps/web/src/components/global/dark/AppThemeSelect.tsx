import { useIntl } from 'react-intl';

import useAppThemeOptions from '~/hooks/useAppThemeOptions';

import type { SelectDisplay } from '~/components/ui/Select';
import Select from '~/components/ui/Select';

import type { AppThemePreference } from './AppThemePreferencesProvider';

type Props = Readonly<{
  colorScheme: AppThemePreference;
  display?: SelectDisplay;
  onChange: (appThemePreference: AppThemePreference) => void;
}>;

export default function AppThemeSelect({
  display,
  colorScheme,
  onChange,
}: Props) {
  const intl = useIntl();

  const appThemeOptions = useAppThemeOptions();

  return (
    <Select
      display={display}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Theme',
        description: 'Change site theme button label',
        id: 'n4aKYo',
      })}
      options={appThemeOptions}
      size="sm"
      value={colorScheme}
      onChange={onChange}
    />
  );
}
