import { RiMoonLine } from 'react-icons/ri';

import useColorSchemeOptions from '~/components/global/color-scheme/useColorSchemeOptions';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { useColorSchemePreferences } from '../color-scheme/ColorSchemePreferencesProvider';

type Props = Readonly<{
  includeSystem?: boolean;
  size?: 'md' | 'sm' | 'xs';
}>;

export default function NavColorSchemeDropdown({
  includeSystem = true,
  size,
}: Props) {
  const intl = useIntl();
  const { colorSchemePreference, colorScheme, setColorSchemePreference } =
    useColorSchemePreferences();

  const colorSchemeOptions = useColorSchemeOptions();
  const Icon =
    colorSchemeOptions.filter((option) => option.value === colorScheme)?.[0]
      .icon ?? RiMoonLine;

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
      size={size}
      tooltip={intl.formatMessage({
        defaultMessage: 'Theme',
        description: 'Tooltip for theme selector',
        id: '41uq3N',
      })}>
      {colorSchemeOptions
        .filter(({ value }) => value !== 'system' || includeSystem)
        .map(({ label, value, icon }) => (
          <DropdownMenu.Item
            key={value}
            icon={icon}
            isSelected={colorSchemePreference === value}
            label={label}
            onClick={() => {
              setColorSchemePreference(value);
            }}
          />
        ))}
    </DropdownMenu>
  );
}
