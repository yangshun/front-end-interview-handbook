import clsx from 'clsx';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import { urlAddHttpsIfMissing } from '~/lib/urlValidation';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatSpotlight from '~/components/sponsors/ads/SponsorsAdFormatSpotlight';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Label from '~/components/ui/Label';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

import SponsorsAdvertiseRequestFormAdsSectionTitle from './SponsorsAdvertiseRequestFormAdsSectionTitle';
import { useSponsorsSpotlightAdSchema } from '../SponsorsAdvertiseRequestAdSchema';
import SponsorsAdvertiseRequestFormAdsImageUpload from '../SponsorsAdvertiseRequestFormAdsImageUpload';
import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';
import useSponsorsAdvertiseRequestAdsImageUploader from '../useSponsorsAdvertiseRequestAdsImageUploader';
import type { SponsorsAdFormatSpotlightItem } from '../../types';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  defaultValues?: Omit<SponsorsAdFormatSpotlightItem, 'id'>;
  mode: 'create' | 'edit' | 'readonly';
  onCancel?: () => void;
  onSubmit: ({
    text,
    url,
    weeks,
    imageUrl,
  }: Omit<SponsorsAdFormatSpotlightItem, 'format' | 'id'>) => void;
  sessionId: string;
  unavailableWeeks: ReadonlyArray<string>;
  updateStepStatus: (status: StepsTabItemStatus) => void;
}>;

const AD_FORMAT = 'SPOTLIGHT';

export default function SponsorsAdvertiseRequestFormAdsSectionSpotlight({
  onCancel,
  onSubmit,
  sessionId,
  updateStepStatus,
  unavailableWeeks,
  defaultValues,
  mode,
}: Props) {
  const intl = useIntl();
  const isReadonly = mode === 'readonly';
  const adSchema = useSponsorsSpotlightAdSchema();
  const { uploadAdAsset, loading: uploadingAsset } =
    useSponsorsAdvertiseRequestAdsImageUploader({
      format: AD_FORMAT,
      sessionId,
    });

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
    setError,
  } = methods;

  const selectedWeeks = watch('weeks');
  const title = watch('text');
  const url = watch('url');
  const imageUrl = watch('imageUrl');
  const sponsorName = watch('sponsorName');

  async function handleOnSubmit(data: z.infer<typeof adSchema>) {
    let storageImageUrl = null;

    // If not blob url, don't reupload the asset
    if (data.imageUrl.startsWith('blob:')) {
      const { imageUrl: storageImagePath, error } = await uploadAdAsset(
        data.imageUrl,
      );

      if (error || !storageImagePath) {
        setError('imageUrl', {
          message:
            error ??
            intl.formatMessage({
              defaultMessage: 'Failed to upload image',
              description: 'Error message for image upload',
              id: '9xAfBQ',
            }),
        });

        return;
      }
      storageImageUrl = storageImagePath;
    } else {
      storageImageUrl = data.imageUrl;
    }

    onSubmit({
      imageUrl: storageImageUrl,
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
        mode={mode}
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
              className={clsx(
                'mt-8',
                'grid gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-6',
              )}>
              <div className="flex flex-col gap-y-8 md:gap-y-6">
                <Controller
                  control={control}
                  name="imageUrl"
                  render={({ field, fieldState: { error } }) => (
                    <SponsorsAdvertiseRequestFormAdsImageUpload
                      errorMessage={error?.message}
                      heightConstraint={
                        SponsorAdFormatConfigs[AD_FORMAT].placementConstraints
                          .image?.height ?? 1
                      }
                      imageUrl={imageUrl}
                      mode={mode}
                      setError={(message) => setError('imageUrl', { message })}
                      setImageUrl={(newImageUrl) => {
                        field.onChange(newImageUrl);
                      }}
                      widthConstraint={
                        SponsorAdFormatConfigs[AD_FORMAT].placementConstraints
                          .image?.width ?? 1
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  disabled={isReadonly}
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
                <Controller
                  control={control}
                  disabled={isReadonly}
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
                            SponsorAdFormatConfigs[AD_FORMAT]
                              .placementConstraints.text,
                        },
                      )}
                      errorMessage={error?.message}
                      label={intl.formatMessage({
                        defaultMessage: 'Title',
                        description: 'Label for title input',
                        id: 'hF+MYj',
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
                  disabled={isReadonly}
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
              </div>
              <div>
                <div className="flex items-end justify-between gap-4">
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
                <div
                  className={clsx(
                    'mt-2 h-[200px] w-full',
                    'flex items-center justify-center',
                    'py-10',
                    ['border-2', 'border-dashed', themeBorderEmphasizeColor],
                    'rounded-md',
                    themeBackgroundColor,
                  )}>
                  <div className="max-w-[260px]">
                    <SponsorsAdFormatSpotlight
                      adId="test-spotlight"
                      adPlacement="preview"
                      imageUrl={imageUrl}
                      sponsorName={
                        sponsorName || 'Your product or company name'
                      }
                      text={title || 'Your short form ad text here'}
                      tracking={false}
                      url={urlAddHttpsIfMissing(url) || '#'}
                    />
                  </div>
                </div>
              </div>
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
        {!isReadonly && (
          <Button
            icon={RiArrowRightLine}
            isDisabled={!isValid || uploadingAsset}
            isLoading={uploadingAsset}
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
        )}
      </div>
    </form>
  );
}
