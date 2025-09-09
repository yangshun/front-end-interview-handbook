'use client';

import themeList from 'monaco-themes/themes/themelist.json';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import { useIntl } from '~/components/intl';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  isLabelHidden?: boolean;
}>;

export default function CodingWorkspaceThemeSelect({ isLabelHidden }: Props) {
  const intl = useIntl();
  const { setThemeKey, themeKey } = useCodingPreferences();

  return (
    <div className="flex flex-col gap-y-2">
      {!isLabelHidden && (
        <Text className="p-1" color="secondary" size="body3" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Editor Theme',
            description:
              'Label for select that changes the theme of the editor',
            id: 'sq1nR/',
          })}
        </Text>
      )}
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
    </div>
  );
}
