import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { RiCheckboxCircleFill } from 'react-icons/ri';

import type {
  ProjectsMotivationReasonOption,
  ProjectsMotivationReasonType,
  ProjectsMotivationReasonValue,
  ProjectsProfileEditFormValues,
} from '~/components/projects/types';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import {
  themeBackgroundCardColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextBrandColor,
  themeTextDisabledColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export default function ProjectsProfileMotivationReasonList({
  name,
  reasonOptions,
  previousValue,
  onChange,
}: {
  name: ProjectsMotivationReasonType;
  onChange: (value: ProjectsMotivationReasonValue | null) => void;
  previousValue?: ProjectsMotivationReasonValue | null;
  reasonOptions: Array<ProjectsMotivationReasonOption>;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectsProfileEditFormValues>();
  const valueKey = `motivationReasons.${name}.type` as const;
  const value = watch(valueKey);

  return (
    <div className="grid md:grid-cols-6 grid-cols-1 gap-6">
      {reasonOptions.map(({ id, icon: Icon, content }, index) => {
        const isPreviousValue = previousValue === id;
        const disabled = isPreviousValue && id !== 'other';
        const selected = value === id;

        return (
          <button
            key={id}
            aria-checked={selected}
            className={clsx(
              'relative rounded-lg border px-6 py-4',
              themeBackgroundCardColor,
              selected
                ? 'border-brand'
                : ['glassbox hover:border-brand/50 border-transparent'],
              'focus:outline-brand outline-offset-8',
              disabled && themeBorderElementColor,
              {
                'md:col-span-2': index >= 2 && index < 5,
                'md:col-span-3': index < 2 || index >= 5,
              },
            )}
            disabled={disabled}
            role="checkbox"
            type="button"
            onClick={() => {
              setValue(valueKey, selected ? null : id, { shouldDirty: true });
              onChange(selected ? null : id);
            }}>
            <div className="flex items-start gap-4 rounded-md">
              <div
                className={clsx(
                  'rounded-md p-1',
                  themeBackgroundLayerEmphasized,
                )}>
                <Icon
                  className={clsx(
                    'h-4 w-4',
                    disabled ? themeTextDisabledColor : themeTextSecondaryColor,
                  )}
                />
              </div>
              <Text
                className={clsx('flex-1 text-start', disabled && 'opacity-30')}
                color="secondary"
                size="body2">
                {content}
              </Text>
              {selected && (
                <RiCheckboxCircleFill
                  aria-hidden={true}
                  className={clsx(
                    'absolute end-1 top-1 h-4 w-4',
                    themeTextBrandColor,
                  )}
                />
              )}
              {!selected && isPreviousValue && (
                <RiCheckboxCircleFill
                  aria-hidden={true}
                  className={clsx(
                    'absolute end-1 top-1 h-4 w-4',
                    themeTextDisabledColor,
                  )}
                />
              )}
            </div>
          </button>
        );
      })}
      {value === 'other' && (
        <Controller
          control={control}
          name={`motivationReasons.${name}.otherValue` as const}
          render={({ field }) => (
            <TextArea
              autoFocus={true}
              classNameOuter="md:col-span-3"
              errorMessage={
                errors.motivationReasons?.[name]?.otherValue?.message
              }
              isLabelHidden={true}
              label="Your motivations"
              placeholder="Tell us about your motivations"
              {...field}
            />
          )}
        />
      )}
    </div>
  );
}
