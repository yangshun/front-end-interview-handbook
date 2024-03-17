import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { RiCheckboxCircleFill } from 'react-icons/ri';

import type {
  FieldView,
  ProjectsMotivationReasonFormValues,
  ProjectsProfileEditFormValues,
} from '~/components/projects/types';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import {
  themeBackgroundCardColor,
  themeBackgroundChipColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderBrandColor,
  themeBorderColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import useProjectsMotivationReasonOptions from '../../hooks/useProjectsMotivationReasonOptions';
import { MOTIVATION_OTHER_REASON_CHAR_LIMIT } from '../../hooks/useProjectsMotivationReasonSchema';

type Values =
  | ProjectsMotivationReasonFormValues
  | ProjectsProfileEditFormValues;

export default function ProjectsProfileMotivationsField({
  view,
}: {
  view: FieldView;
}) {
  const reasonOptions = useProjectsMotivationReasonOptions((chunks) => (
    <Text weight="bold">{chunks}</Text>
  ));

  const {
    control,
    formState: { errors },
  } = useFormContext<Values>();

  return (
    <Controller
      control={control}
      name="motivations"
      render={({ field }) => {
        const otherFieldIndex = field.value.findIndex(
          (choice) => choice.value === 'other',
        );

        const reasons = (
          <div
            className={clsx(
              'grid items-stretch gap-6 md:grid-cols-2 ',
              view === 'onboarding' && 'lg:grid-cols-3',
            )}>
            {reasonOptions.map(({ id, icon: Icon, label }) => {
              const selected = field.value
                .map(({ value }) => value)
                .includes(id);
              const disabled = !selected && field.value.length >= 2;

              return (
                <button
                  key={id}
                  aria-checked={selected}
                  className={clsx(
                    'rounded-lg px-6 py-4',
                    themeBackgroundCardColor,
                    [
                      'border',
                      selected ? themeBorderBrandColor : themeBorderColor,
                    ],
                    !disabled && [
                      themeBackgroundElementEmphasizedStateColor_Hover,
                      themeBackgroundElementPressedStateColor_Active,
                    ],
                    themeOutlineElement_FocusVisible,
                    themeOutlineElementBrandColor_FocusVisible,
                    'disabled:touch-none disabled:select-none',
                  )}
                  disabled={disabled}
                  role="checkbox"
                  type="button"
                  onClick={() => {
                    if (!selected) {
                      if (id === 'other') {
                        field.onChange(
                          field.value.concat({
                            otherValue: '',
                            value: id,
                          }),
                        );
                      } else {
                        field.onChange(field.value.concat({ value: id }));
                      }
                    } else {
                      field.onChange(
                        field.value.filter(({ value }) => value !== id),
                      );
                    }
                  }}>
                  <div className="flex items-center gap-4 rounded-md">
                    <div
                      className={clsx(
                        'flex shrink-0 items-center justify-center',
                        'size-6 rounded-md',
                        themeBackgroundChipColor,
                      )}>
                      <Icon
                        className={clsx(
                          'size-4',
                          selected
                            ? themeTextBrandColor
                            : themeTextSecondaryColor,
                        )}
                      />
                    </div>
                    <Text
                      className={clsx(
                        'flex-1 text-start',
                        disabled && 'opacity-30',
                      )}
                      color="secondary"
                      size="body2">
                      {label}
                    </Text>
                    <RiCheckboxCircleFill
                      aria-hidden={true}
                      className={clsx(
                        'size-5 shrink-0',
                        !selected && 'invisible',
                        themeTextBrandColor,
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        );

        if (otherFieldIndex === -1) {
          return (
            <div className="flex flex-col gap-2">
              {reasons}
              {errors.motivations?.message && (
                <Text color="error" display="block" size="body3">
                  {errors.motivations?.message}
                </Text>
              )}
            </div>
          );
        }

        const choice = field.value[otherFieldIndex];

        return (
          <div className="flex flex-col gap-4">
            {reasons}
            <TextArea
              autoFocus={true}
              errorMessage={errors.motivations?.[otherFieldIndex]?.message}
              isLabelHidden={true}
              label="Your motivations"
              maxLength={MOTIVATION_OTHER_REASON_CHAR_LIMIT}
              placeholder="Tell us about your motivations"
              rows={3}
              value={choice.value === 'other' ? choice.otherValue : undefined}
              onChange={(newOtherValue) => {
                const choices = [...field.value];
                const choiceItem = choices[otherFieldIndex];

                if (choiceItem.value === 'other') {
                  choiceItem.otherValue = newOtherValue;
                }

                field.onChange(choices);
              }}
            />
          </div>
        );
      }}
    />
  );
}
