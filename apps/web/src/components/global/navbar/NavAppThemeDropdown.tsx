import { RiMoonLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useAppThemeOptions from '~/components/global/dark/useAppThemeOptions';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { useAppThemePreferences } from '../dark/AppThemePreferencesProvider';

export default function NavAppThemeDropdown() {
  const intl = useIntl();
  const { appThemePreference, appTheme, setAppThemePreference } =
    useAppThemePreferences();

  const appThemeOptions = useAppThemeOptions();
  const Icon =
    appThemeOptions.filter((option) => option.value === appTheme)?.[0].icon ??
    RiMoonLine;

  return (
    <DropdownMenu
      align="end"
      icon={Icon}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Theme',
        description: 'Change site theme button label',
        id: 'n4aKYo',
      })}
      showChevron={false}
      size="sm">
      {appThemeOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
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
