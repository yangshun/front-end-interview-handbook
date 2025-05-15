import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import clsx from 'clsx';

import type { ColorSchemePreference } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import useColorSchemeOptions from '~/components/global/color-scheme/useColorSchemeOptions';
import { FormattedMessage } from '~/components/intl';
import ProjectsSettingsExperienceThemeItemSkeleton from '~/components/projects/settings/experience/components/PrjectsSettingsExperienceThemeItemSkeleton';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

export default function ProjectsSettingsExperienceThemeSelector() {
  const { colorSchemePreference, setColorSchemePreference, systemColorScheme } =
    useColorSchemePreferences();

  const colorSchemeOptions = useColorSchemeOptions();

  return (
    <Section>
      <div className="flex flex-col gap-4">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Theme preferences"
            description="Title for Theme preferences in projects settings page"
            id="hBwVFF"
          />
        </Heading>
        <RadioGroupPrimitive.Root
          className={clsx('flex flex-wrap gap-x-6 gap-y-6')}
          value={colorSchemePreference}
          onValueChange={(val) => {
            setColorSchemePreference(val as ColorSchemePreference);
          }}>
          {colorSchemeOptions.map((option) => (
            <div
              key={option.value}
              className={clsx(
                'flex h-[244px] w-[344px] cursor-pointer justify-center rounded-3xl p-2',
                themeBackgroundCardColor,
                themeGlassyBorder,
              )}
              onClick={() =>
                setColorSchemePreference(option.value as ColorSchemePreference)
              }>
              <div className="mt-4 flex flex-col gap-2">
                <ProjectsSettingsExperienceThemeItemSkeleton
                  theme={
                    option.value === 'system' ? systemColorScheme : option.value
                  }
                />
                <RadioGroupItem {...option} />
              </div>
            </div>
          ))}
        </RadioGroupPrimitive.Root>
      </div>
    </Section>
  );
}
