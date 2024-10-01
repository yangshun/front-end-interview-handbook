import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';

import type { ColorSchemePreference } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import { useIntl } from '~/components/intl';

export default function useColorSchemeOptions(): Array<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  value: ColorSchemePreference;
}> {
  const intl = useIntl();

  return [
    {
      icon: RiSunLine,
      label: intl.formatMessage({
        defaultMessage: 'Light',
        description: 'Light color scheme option label',
        id: 'IYc+7l',
      }),
      value: 'light',
    },
    {
      icon: RiMoonLine,
      label: intl.formatMessage({
        defaultMessage: 'Dark',
        description: 'Dark color scheme option label',
        id: 'Zm3csd',
      }),
      value: 'dark',
    },
    {
      icon: RiComputerLine,
      label: intl.formatMessage({
        defaultMessage: 'System',
        description: 'System color scheme option label',
        id: 'GR83Ca',
      }),
      value: 'system',
    },
  ];
}
