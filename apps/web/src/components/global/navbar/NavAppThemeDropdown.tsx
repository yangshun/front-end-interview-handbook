import { useMemo } from 'react';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useAppThemeOptions from '~/hooks/useAppThemeOptions';

import DropdownMenu from '~/components/ui/DropdownMenu';

import { useAppThemePreferences } from '../dark/AppThemePreferencesProvider';

export default function NavAppThemeDropdown() {
  const intl = useIntl();
  const { appThemePreference, appTheme, setAppThemePreference } =
    useAppThemePreferences();

  const icon = useMemo(() => {
    switch (appTheme) {
      case 'light':
        return RiSunLine;
      case 'dark':
        return RiMoonLine;
    }
  }, [appTheme]);

  const appThemeOptions = useAppThemeOptions();

  return (
    <DropdownMenu
      align="end"
      icon={icon}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Theme',
        description: 'Change site theme button label',
        id: 'n4aKYo',
      })}
      showChevron={false}
      size="sm">
      {appThemeOptions.map(({ label, value }) => (
        <DropdownMenu.Item
          key={value}
          isSelected={appThemePreference === value}
          label={label}
          onClick={() => {
            setAppThemePreference(value);
          }}
        />
      ))}
    </DropdownMenu>
  );
}
