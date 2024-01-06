import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';
import type {
  OnboardingProfilePage1Values,
  ProjectsEditProfileValues,
} from '~/components/projects/types';
import CheckboxInput from '~/components/ui/CheckboxInput';
import RadioGroup from '~/components/ui/RadioGroup';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  control: Control<any>;
  errors: FieldErrors<OnboardingProfilePage1Values | ProjectsEditProfileValues>;
  watchHasNotStartedWork: boolean;
  watchYoeReplacementOption: string | undefined;
}>;

export default function ProjectsProfileYOEInput({
  control,
  errors,
  watchHasNotStartedWork,
  watchYoeReplacementOption,
}: Props) {
  const intl = useIntl();
  const yoeReplacementOptions = useProjectsYOEReplacementOptions();

  return (
    <>
      <div className="space-y-4">
        <Controller
          control={control}
          disabled={watchHasNotStartedWork}
          name="monthYearExperience"
          render={({ field }) => (
            <TextInput
              description={intl.formatMessage({
                defaultMessage:
                  'We use this to calculate your YOE and keep it updated',
                description:
                  'Description for "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
                id: 'EjGug0',
              })}
              descriptionStyle="tooltip"
              errorMessage={errors.monthYearExperience?.message}
              isDisabled={field.disabled}
              label={intl.formatMessage({
                defaultMessage:
                  'Month and year you started work as a Front End Engineer',
                description:
                  'Label for "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
                id: '1SKRR/',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'MM/YYYY',
                description:
                  'Placeholder for "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
                id: '/Xai24',
              })}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="hasNotStartedWork"
          render={({ field }) => (
            <CheckboxInput
              label={intl.formatMessage({
                defaultMessage: "I haven't started work yet",
                description:
                  'Label for "I haven\'t started work yet" checkbox on Projects profile onboarding page',
                id: 'b7z86A',
              })}
              {...field}
            />
          )}
        />
      </div>
      {watchHasNotStartedWork && (
        <Text>
          <Controller
            control={control}
            name="yoeReplacement.option"
            render={({ field }) => (
              <RadioGroup
                className="grid md:grid-cols-3 grid-cols-2 gap-x-12 gap-y-2"
                errorMessage={errors.yoeReplacement?.option?.message}
                label={intl.formatMessage({
                  defaultMessage:
                    'Select another status to display in place of your YOE:',
                  description:
                    'Label for "Years of experience replacement status" choices on Projects profile onboarding page',
                  id: '40fcnl',
                })}
                {...field}>
                {yoeReplacementOptions.map((option) => (
                  <RadioGroupItem key={option.value} {...option} />
                ))}
              </RadioGroup>
            )}
          />
          {watchYoeReplacementOption === 'others' && (
            <Controller
              control={control}
              name="yoeReplacement.otherText"
              render={({ field }) => (
                <TextInput
                  className="mt-4"
                  errorMessage={errors.yoeReplacement?.otherText?.message}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Other',
                    description:
                      'Label for "Other" input for "Years of experience replacement status" on Projects profile onboarding page',
                    id: 'WWdQAb',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Write here',
                    description:
                      'Placeholder for "Other" input for "Years of experience replacement status" on Projects profile onboarding page',
                    id: 'WH8fwr',
                  })}
                  {...field}
                />
              )}
            />
          )}
        </Text>
      )}
    </>
  );
}
