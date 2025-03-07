import clsx from 'clsx';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import InterviewsMarketingHeroBrowserWindowFrame from '~/components/interviews/marketing/embed/InterviewsMarketingHeroBrowserWindowFrame';
import { useIntl } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Label from '~/components/ui/Label';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import SponsorsAdvertiseRequestFormAdsSectionTitle from './SponsorsAdvertiseRequestFormAdsSectionTitle';
import { useSponsorsGlobalBannerAdSchema } from '../schema/SponsorsAdvertiseRequestAdSchema';
import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';
import type { SponsorsAdFormatGlobalBannerItem } from '../types';
import SponsorsAdFormatGlobalBanner from '../../ads/SponsorsAdFormatGlobalBanner';

import { zodResolver } from '@hookform/resolvers/zod';

const AD_FORMAT = 'GLOBAL_BANNER';

type Props = Readonly<{
  defaultValues?: Omit<SponsorsAdFormatGlobalBannerItem, 'id'>;
  onCancel?: () => void;
  onSubmit: ({
    text,
    url,
    weeks,
  }: Omit<SponsorsAdFormatGlobalBannerItem, 'format' | 'id'>) => void;
  unavailableWeeks: ReadonlyArray<string>;
  updateStepStatus: (status: StepsTabItemStatus) => void;
}>;

export default function SponsorsAdvertiseRequestFormAdsSectionGlobalBanner({
  onCancel,
  onSubmit,
  updateStepStatus,
  unavailableWeeks,
  defaultValues,
}: Props) {
  const intl = useIntl();
  const adSchema = useSponsorsGlobalBannerAdSchema();

  const methods = useForm<z.infer<typeof adSchema>>({
    defaultValues: defaultValues || {
      format: AD_FORMAT,
      text: '',
      url: '',
      weeks: [],
    },
    mode: 'onTouched',
    resolver: zodResolver(adSchema),
  });
  const {
    control,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = methods;

  const selectedWeeks = watch('weeks');
  const title = watch('text');

  function handleOnSubmit(data: z.infer<typeof adSchema>) {
    onSubmit({
      sponsorName: data.sponsorName,
      text: data.text,
      url: data.url,
      weeks: data.weeks,
    });
  }

  useEffect(() => {
    if (isDirty) {
      updateStepStatus('in_progress');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={methods.handleSubmit(handleOnSubmit)}>
      <SponsorsAdvertiseRequestFormAdsSectionAvailability
        adFormat={AD_FORMAT}
        selectedWeeks={selectedWeeks}
        unavailableWeeks={unavailableWeeks}
        onAddWeek={(week: string) => {
          return setValue(
            'weeks',
            Array.from(new Set([...Array.from(selectedWeeks), week])),
            {
              shouldValidate: true,
            },
          );
        }}
        onRemoveWeek={(week: string) =>
          setValue(
            'weeks',
            selectedWeeks.filter((week_) => week_ !== week),
            {
              shouldValidate: true,
            },
          )
        }
      />
      {selectedWeeks.length > 0 && (
        <>
          <Divider />
          <div>
            <SponsorsAdvertiseRequestFormAdsSectionTitle format={AD_FORMAT} />
            <div
              className={clsx('mt-8', 'grid gap-x-4 gap-y-6 md:grid-cols-2')}>
              <Controller
                control={control}
                name="text"
                render={({ field, fieldState: { error } }) => (
                  <TextArea
                    {...field}
                    description={intl.formatMessage(
                      {
                        defaultMessage: 'Maximum of {maxLength} characters',
                        description: 'Description for title input',
                        id: 'MpD3WU',
                      },
                      {
                        maxLength:
                          SponsorAdFormatConfigs[AD_FORMAT].placementConstraints
                            .text,
                      },
                    )}
                    errorMessage={error?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'Banner text',
                      description: 'Text within global banner',
                      id: '05tlPb',
                    })}
                    maxLength={
                      SponsorAdFormatConfigs[AD_FORMAT].placementConstraints
                        .text
                    }
                    required={true}
                  />
                )}
              />
              <Controller
                control={control}
                name="url"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    description={intl.formatMessage({
                      defaultMessage:
                        'The URL the user will be led to when they click on any part of the Ad',
                      description: 'Description for URL input',
                      id: 'mHYOpA',
                    })}
                    errorMessage={error?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'Destination URL',
                      description: 'Ad destination URL',
                      id: 'DWvf03',
                    })}
                    placeholder="https://www.example.com"
                    required={true}
                  />
                )}
              />
              <Controller
                control={control}
                name="sponsorName"
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    description={intl.formatMessage({
                      defaultMessage: 'Either product or company name',
                      description: 'Advertisement sponsor',
                      id: 'FavPnY',
                    })}
                    errorMessage={error?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'Sponsor name',
                      description: 'Advertisement sponsor name',
                      id: 'jh37Pg',
                    })}
                    required={true}
                  />
                )}
              />
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <Label
                description={intl.formatMessage({
                  defaultMessage:
                    'See how your ad looks like when it goes live',
                  description: 'Description for preview',
                  id: 'lHuGip',
                })}
                label={intl.formatMessage({
                  defaultMessage: 'Preview',
                  description: 'Label for preview',
                  id: 'JAQf3o',
                })}
              />
              <NavColorSchemeDropdown includeSystem={false} size="xs" />
            </div>
            <div className="mt-4">
              <InterviewsMarketingHeroBrowserWindowFrame>
                <SponsorsAdFormatGlobalBanner
                  adId="test-global-banner"
                  isLoading={false}
                  text={title || 'Your ad text here'}
                  tracking={false}
                  url="https://greatfrontend.com"
                />
                <div className="flex h-[300px] w-full items-stretch justify-stretch p-3">
                  <div
                    className={clsx(
                      'size-full rounded-md',
                      'border-2 border-dashed border-neutral-500',
                      'bg-neutral-200/25 dark:bg-neutral-700/25',
                    )}
                  />
                </div>
              </InterviewsMarketingHeroBrowserWindowFrame>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description: 'Label for cancel button',
              id: 'KZOa5l',
            })}
            size="md"
            variant="secondary"
            onClick={() => {
              onCancel();
            }}
          />
        )}
        <Button
          icon={RiArrowRightLine}
          isDisabled={!isValid}
          label={
            defaultValues
              ? intl.formatMessage({
                  defaultMessage: 'Update',
                  description: 'Label for update button',
                  id: 'xw+bqB',
                })
              : intl.formatMessage({
                  defaultMessage: 'Next',
                  description: 'Label for next button',
                  id: 'uSMCBJ',
                })
          }
          size="md"
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
