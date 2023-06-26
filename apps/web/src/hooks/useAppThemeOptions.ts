import { useIntl } from 'react-intl';

import type { AppThemePreference } from '~/components/global/dark/AppThemePreferencesProvider';
import type { SelectItem } from '~/components/ui/Select';

function useAppThemePreferenceLabel(appThemePreference: AppThemePreference) {
  const intl = useIntl();

  switch (appThemePreference) {
    case 'light':
      return intl.formatMessage({
        defaultMessage: 'Light',
        description: 'Light theme option label',
        id: 'o6ktM9',
      });
    case 'dark':
      return intl.formatMessage({
        defaultMessage: 'Dark',
        description: 'Dark theme option label',
        id: 'lqvY0+',
      });
    case 'system':
      return intl.formatMessage({
        defaultMessage: 'System',
        description: 'System theme option label',
        id: 'UTE1L6',
      });
  }
}

export default function useAppThemeOptions(): Array<
  SelectItem<AppThemePreference>
> {
  return [
    {
      label: useAppThemePreferenceLabel('light'),
      value: 'light',
    },
    {
      label: useAppThemePreferenceLabel('dark'),
      value: 'dark',
    },
    {
      label: useAppThemePreferenceLabel('system'),
      value: 'system',
    },
  ];
}
