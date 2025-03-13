import clsx from 'clsx';
import jsCookie from 'js-cookie';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import countryCodesToNames from '~/data/countryCodesToNames.json';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Label from '~/components/ui/Label';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useSponsorsCompanySchema } from './SponsorsAdvertiseRequestCompanySchema';
import type { SponsorsCompanyDetails } from '../types';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  defaultValues: SponsorsCompanyDetails | null;
  mode: 'create' | 'edit' | 'readonly';
  onPrevious: () => void;
  onSubmit: (company: SponsorsCompanyDetails) => void;
  updateStepStatus(status: StepsTabItemStatus): void;
}>;

const countryOptions = Object.entries(countryCodesToNames).map(
  ([value, label]) => ({ label, value }),
);
const countryOptionsSorted = countryOptions.sort((a, b) =>
  a.label.localeCompare(b.label),
);

export default function SponsorsAdvertiseRequestFormCompanyDetailsSection({
  onSubmit,
  onPrevious,
  defaultValues,
  updateStepStatus,
  mode = 'create',
}: Props) {
  const intl = useIntl();
  const companySchema = useSponsorsCompanySchema();
  const isReadonly = mode === 'readonly';

  const methods = useForm<z.infer<typeof companySchema>>({
    defaultValues: {
      address: {
        city: defaultValues?.address.city ?? '',
        country:
          defaultValues?.address.country ?? jsCookie.get('country') ?? 'US',
        line1: defaultValues?.address.line1 ?? '',
        line2: defaultValues?.address.line2 ?? '',
        postalCode: defaultValues?.address.postalCode ?? '',
        state: defaultValues?.address.state ?? '',
      },
      legalName: defaultValues?.legalName ?? '',
      signatoryName: defaultValues?.signatoryName ?? '',
      signatoryTitle: defaultValues?.signatoryTitle ?? '',
      taxNumber: defaultValues?.taxNumber ?? '',
    },
    mode: 'onTouched',
    resolver: isReadonly ? undefined : zodResolver(companySchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = methods;

  useEffect(() => {
    if (isDirty) {
      updateStepStatus('in_progress');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return (
    <form className="mx-auto w-full max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Company details"
          description="Company details section heading"
          id="g6ZUKV"
        />
      </Heading>
      <Section>
        <Text className="mt-1 block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Provide the company details for invoicing and agreement purposes"
            description="Company details section description"
            id="T+XVje"
          />
        </Text>
        <div className={clsx('mt-8 flex flex-col gap-6')}>
          <div className="flex gap-x-2 gap-y-6 max-sm:flex-col">
            <div className="flex-1">
              <Controller
                control={control}
                disabled={isReadonly}
                name="legalName"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    errorMessage={error?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'Company full legal name',
                      description: 'Legal name input label',
                      id: 'CxiBL1',
                    })}
                    placeholder="ACME Inc"
                    required={true}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                control={control}
                disabled={isReadonly}
                name="taxNumber"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    errorMessage={error?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'VAT / Tax number',
                      description: 'Tax number input label',
                      id: '49TDbW',
                    })}
                  />
                )}
              />
            </div>
          </div>
          <fieldset className="flex flex-col gap-2">
            <div>
              <legend className="block">
                <Label
                  description={intl.formatMessage({
                    defaultMessage: 'The address is used in the agreement',
                    description: 'Address section description',
                    id: 'n1Wo2N',
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'Address',
                    description: 'Address section label',
                    id: 'ThjDJa',
                  })}
                  required={true}
                />
              </legend>
            </div>
            <Controller
              control={control}
              disabled={isReadonly}
              name="address.country"
              render={({ field }) => (
                <Select
                  {...field}
                  display="block"
                  isDisabled={isReadonly}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Country',
                    description: 'Country input label',
                    id: 'iV+56f',
                  })}
                  options={countryOptionsSorted}
                  rounded="normal"
                />
              )}
            />
            <Controller
              control={control}
              disabled={isReadonly}
              name="address.line1"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  autoComplete="billing address-line1"
                  autoCorrect="off"
                  errorMessage={error?.message}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Street address',
                    description: 'Street address input label',
                    id: 'nkdi2x',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Street address',
                    description: 'Street address input label',
                    id: 'nkdi2x',
                  })}
                  required={true}
                  spellCheck={false}
                />
              )}
            />
            <Controller
              control={control}
              disabled={isReadonly}
              name="address.line2"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  autoComplete="billing address-line2"
                  autoCorrect="off"
                  errorMessage={error?.message}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Apartment, unit, or other',
                    description: 'Apartment, unit, or other input label',
                    id: 'jTWrRY',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Apartment, unit, or other',
                    description: 'Apartment, unit, or other input label',
                    id: 'jTWrRY',
                  })}
                  spellCheck={false}
                />
              )}
            />
            <Controller
              control={control}
              disabled={isReadonly}
              name="address.city"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  autoComplete="billing address-level2"
                  autoCorrect="off"
                  errorMessage={error?.message}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'City / Town',
                    description: 'City / Town input label',
                    id: '+sDMju',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'City / Town',
                    description: 'City / Town input label',
                    id: '+sDMju',
                  })}
                  spellCheck={false}
                />
              )}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <Controller
                  control={control}
                  disabled={isReadonly}
                  name="address.state"
                  render={({ field, fieldState: { error } }) => (
                    <TextInput
                      {...field}
                      autoComplete="billing address-level1"
                      autoCorrect="off"
                      errorMessage={error?.message}
                      isLabelHidden={true}
                      label={intl.formatMessage({
                        defaultMessage: 'State / Province / Region',
                        description: 'State / Province / Region input label',
                        id: 'ymIkds',
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'State / Province / Region',
                        description: 'State / Province / Region input label',
                        id: 'ymIkds',
                      })}
                      spellCheck={false}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  control={control}
                  disabled={isReadonly}
                  name="address.postalCode"
                  render={({ field, fieldState: { error } }) => (
                    <TextInput
                      {...field}
                      autoComplete="billing postal-code"
                      autoCorrect="off"
                      errorMessage={error?.message}
                      isLabelHidden={true}
                      label={intl.formatMessage({
                        defaultMessage: 'ZIP / Postal code',
                        description: 'ZIP / Postal code input label',
                        id: '+wUGiM',
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'ZIP / Postal code',
                        description: 'ZIP / Postal code input label',
                        id: '+wUGiM',
                      })}
                      required={true}
                      spellCheck={false}
                    />
                  )}
                />
              </div>
            </div>
          </fieldset>
          <div className="flex gap-x-2 gap-y-6 max-sm:flex-col">
            <div className="flex-1">
              <Controller
                control={control}
                disabled={isReadonly}
                name="signatoryName"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    errorMessage={error?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'Name of authorized signatory',
                      description: 'Signatory name input label',
                      id: 'LRxWVH',
                    })}
                    placeholder="John Doe"
                    required={true}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                control={control}
                disabled={isReadonly}
                name="signatoryTitle"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    errorMessage={error?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'Title of authorized signatory',
                      description: 'Signatory title input label',
                      id: 'A/BZd2',
                    })}
                    placeholder="CEO, Co-founder"
                    required={true}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <Button
            addonPosition="start"
            icon={RiArrowLeftLine}
            isDisabled={isDirty}
            label={intl.formatMessage({
              defaultMessage: 'Previous',
              description: 'Label for previous button',
              id: 'd2w71C',
            })}
            size="md"
            variant="secondary"
            onClick={() => {
              onPrevious();
            }}
          />
          <Button
            icon={RiArrowRightLine}
            isDisabled={!isValid && !isReadonly}
            label={intl.formatMessage({
              defaultMessage: 'Next',
              description: 'Label for next button',
              id: 'uSMCBJ',
            })}
            size="md"
            type="submit"
            variant="primary"
          />
        </div>
      </Section>
    </form>
  );
}
