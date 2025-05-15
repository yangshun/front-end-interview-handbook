'use client';

import themeList from 'monaco-themes/themes/themelist.json';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import { useIntl } from '~/components/intl';
import Select from '~/components/ui/Select';

export default function CodingWorkspaceThemeSelect() {
  const intl = useIntl();
  const { setThemeKey, themeKey } = useCodingPreferences();

  return (
    <Select
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Theme',
        description: 'Label for select that changes the theme of the editor',
        id: 'dAHBqv',
      })}
      options={Object.keys(themeList).map((id) => ({
        label: themeList[id as keyof typeof themeList],
        value: id,
      }))}
      size="xs"
      value={themeKey}
      onChange={(value) => {
        setThemeKey(value as keyof typeof themeList);
      }}
    />
  );
}
