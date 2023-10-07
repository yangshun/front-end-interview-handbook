import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { AppThemePreference } from '~/components/global/dark/AppThemePreferencesProvider';

export default function useAppThemeOptions(): Array<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  value: AppThemePreference;
}> {
  const intl = useIntl();

  return [
    {
      icon: RiSunLine,
      label: intl.formatMessage({
        defaultMessage: 'Light',
        description: 'Light theme option label',
        id: 'o6ktM9',
      }),
      value: 'light',
    },
    {
      icon: RiMoonLine,
      label: intl.formatMessage({
        defaultMessage: 'Dark',
        description: 'Dark theme option label',
        id: 'lqvY0+',
      }),
      value: 'dark',
    },
    {
      icon: RiComputerLine,
      label: intl.formatMessage({
        defaultMessage: 'System',
        description: 'System theme option label',
        id: 'UTE1L6',
      }),
      value: 'system',
    },
  ];
}
