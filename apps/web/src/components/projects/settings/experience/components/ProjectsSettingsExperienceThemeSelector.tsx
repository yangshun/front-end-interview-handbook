import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import type { AppThemePreference } from '~/components/global/dark/AppThemePreferencesProvider';
import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import useAppThemeOptions from '~/components/global/dark/useAppThemeOptions';
import ProjectsSettingsExperienceThemeItemSkeleton from '~/components/projects/settings/experience/components/PrjectsSettingsExperienceThemeItemSkeleton';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';

export default function ProjectsSettingsExperienceThemeSelector() {
  const { appThemePreference, setAppThemePreference, resolvedSystemAppTheme } =
    useAppThemePreferences();

  const appThemeOptions = useAppThemeOptions();

  return (
    <Section>
      <div className="flex flex-col gap-4">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Theme preferences"
            description="Title for Theme preferences in projects settings page"
            id="hBwVFF"
          />
        </Heading>
        <RadixRadioGroup.Root
          className={clsx('flex flex-wrap gap-x-6 gap-y-6')}
          value={appThemePreference}
          onValueChange={(val) => {
            setAppThemePreference(val as AppThemePreference);
          }}>
          {appThemeOptions.map((option) => (
            <div
              key={option.value}
              className={clsx(
                'flex h-[244px] w-[344px] cursor-pointer justify-center rounded-3xl p-2',
                themeBackgroundCardColor,
                themeGlassyBorder,
              )}
              onClick={() =>
                setAppThemePreference(option.value as AppThemePreference)
              }>
              <div className="mt-4 flex flex-col gap-2">
                <ProjectsSettingsExperienceThemeItemSkeleton
                  theme={
                    option.value === 'system'
                      ? resolvedSystemAppTheme
                      : option.value
                  }
                />
                <RadioGroupItem {...option} />
              </div>
            </div>
          ))}
        </RadixRadioGroup.Root>
      </div>
    </Section>
  );
}
