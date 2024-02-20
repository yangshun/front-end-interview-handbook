'use client';

import type { AppThemePreference } from '~/components/global/dark/AppThemePreferencesProvider';
import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import useAppThemeOptions from '~/components/global/dark/useAppThemeOptions';
import RadioGroup from '~/components/ui/RadioGroup';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';

export default function ProjectsSettingsExperiencePage() {
  const { appThemePreference, setAppThemePreference } =
    useAppThemePreferences();

  const appThemeOptions = useAppThemeOptions();

  return (
    <RadioGroup
      label="Theme"
      value={appThemePreference}
      onChange={(val) => {
        setAppThemePreference(val as AppThemePreference);
      }}>
      {appThemeOptions.map((option) => (
        <RadioGroupItem key={option.value} {...option} />
      ))}
    </RadioGroup>
  );
}
