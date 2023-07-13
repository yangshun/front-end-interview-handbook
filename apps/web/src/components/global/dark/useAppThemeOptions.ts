import { useIntl } from 'react-intl';

import type { AppThemePreference } from '~/components/global/dark/AppThemePreferencesProvider';
import type { SelectItem } from '~/components/ui/Select';

export default function useAppThemeOptions(): Array<
  SelectItem<AppThemePreference>
> {
  const intl = useIntl();

  return [
    {
      label: intl.formatMessage({
        defaultMessage: 'Light',
        description: 'Light theme option label',
        id: 'o6ktM9',
      }),
      value: 'light',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Dark',
        description: 'Dark theme option label',
        id: 'lqvY0+',
      }),
      value: 'dark',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'System',
        description: 'System theme option label',
        id: 'UTE1L6',
      }),
      value: 'system',
    },
  ];
}
