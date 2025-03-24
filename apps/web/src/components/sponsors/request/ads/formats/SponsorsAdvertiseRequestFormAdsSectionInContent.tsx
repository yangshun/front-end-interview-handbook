import clsx from 'clsx';
import { $getRoot } from 'lexical';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatInContent from '~/components/sponsors/ads/SponsorsAdFormatInContent';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import RichTextEditor from '~/components/ui/RichTextEditor';
import { RichTextEditorConfig } from '~/components/ui/RichTextEditor/RichTextEditorConfig';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

const editor = createHeadlessEditor(RichTextEditorConfig);

import { useEffect } from 'react';

import { objectUrlToFile } from '~/lib/imageUtils';
import { urlAddHttpsIfMissing } from '~/lib/urlValidation';
import { trpc } from '~/hooks/trpc';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import Divider from '~/components/ui/Divider';

import SponsorsAdvertiseRequestFormAdsSectionTitle from './SponsorsAdvertiseRequestFormAdsSectionTitle';
import { useSponsorsInContentAdSchema } from '../SponsorsAdvertiseRequestAdSchema';
import SponsorsAdvertiseRequestFormAdsImageUpload from '../SponsorsAdvertiseRequestFormAdsImageUpload';
import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';
import type { SponsorsAdFormatInContentItem } from '../../types';

import { zodResolver } from '@hookform/resolvers/zod';
import { createHeadlessEditor } from '@lexical/headless';

type Props = Readonly<{
  defaultValues?: Omit<SponsorsAdFormatInContentItem, 'id'>;
  mode: 'create' | 'edit' | 'readonly';
  onCancel?: () => void;
  onSubmit: ({
    text,
    url,
    weeks,
    imageUrl,
    body,
  }: Omit<SponsorsAdFormatInContentItem, 'format' | 'id'>) => void;
  sessionId: string;
  unavailableWeeks: ReadonlyArray<string>;
  updateStepStatus: (status: StepsTabItemStatus) => void;
}>;

const AD_FORMAT = 'IN_CONTENT';

export default function SponsorsAdvertiseRequestFormAdsSectionInContent({
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
  const uploadAssetUrl = trpc.sponsors.adAssetUploadUrl.useMutation();
  const adSchema = useSponsorsInContentAdSchema();
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
    setError,
    formState: { isValid, isDirty },
  } = methods;

  const selectedWeeks = watch('weeks');
  const title = watch('text');
  const body = watch('body');
  const imageUrl = watch('imageUrl');
  const sponsorName = watch('sponsorName');
  const url = watch('url');

  const editorState = editor.parseEditorState(body);
  const bodyText = editorState.read(() => $getRoot().getTextContent());

  async function handleOnSubmit(data: z.infer<typeof adSchema>) {
    let storageImageUrl = null;

    // If not blob url, don't reupload the asset
    if (data.imageUrl.startsWith('blob:')) {
      const blob = await objectUrlToFile(data.imageUrl);

      const {
        url: signedUrl,
        path: imagePath,
        success,
      } = await uploadAssetUrl.mutateAsync(
        {
          format: AD_FORMAT,
          sessionId,
        },
        {
          onError: (error) => {
            setError('imageUrl', {
              message: error.message,
            });
          },
        },
      );

      if (!success) {
        return;
      }

      const uploadImage = await fetch(signedUrl, {
        body: blob,
        headers: { 'Content-Type': blob.type },
        method: 'PUT',
      });

      if (!uploadImage.ok) {
        setError('imageUrl', {
          message: intl.formatMessage({
            defaultMessage: 'Failed to upload image',
            description: 'Error message for image upload',
            id: '9xAfBQ',
          }),
        });

        return;
      }
      storageImageUrl = imagePath;
    } else {
      storageImageUrl = data.imageUrl;
    }

    onSubmit({
      body: data.body,
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
                  name="url"
                  render={({ field, fieldState: { error } }) => (
                    <TextInput
                      {...field}
                      description={intl.formatMessage({
                        defaultMessage:
                          'The URL the user will be led to when they click on the Ad image or sponsor',
                        description: 'Description for URL input',
                        id: 'p7t7FQ',
                      })}
                      errorMessage={error?.message}
                      label={intl.formatMessage({
                        defaultMessage: 'Sponsor URL',
                        description: 'Ad sponsor URL',
                        id: 'IdOpAt',
                      })}
                      placeholder="https://www.example.com"
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
                  name="body"
                  render={({ field, fieldState: { error } }) => (
                    <RichTextEditor
                      description={intl.formatMessage(
                        {
                          defaultMessage: 'Maximum of {maxLinks} links allowed',
                          description: 'Description for body input',
                          id: 'RTTAsr',
                        },
                        {
                          maxLinks:
                            SponsorAdFormatConfigs[AD_FORMAT]
                              .placementConstraints.body?.links,
                        },
                      )}
                      editorConfig={RichTextEditorConfig}
                      errorMessage={error?.message}
                      label={intl.formatMessage({
                        defaultMessage: 'Body',
                        description: 'Label for body input',
                        id: 'qWP6XC',
                      })}
                      maxLength={
                        SponsorAdFormatConfigs[AD_FORMAT].placementConstraints
                          .body?.length
                      }
                      minHeight="200px"
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Enter something here...',
                        description: 'Placeholder for body input',
                        id: 'xaoljh',
                      })}
                      required={true}
                      {...field}
                      disabled={isReadonly}
                      value={field.value}
                      onChange={(newValue) => {
                        if (isReadonly) {
                          return;
                        }
                        field.onChange({
                          target: {
                            value: newValue,
                          },
                        });
                      }}
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
                    'mt-2 flex w-full items-center justify-center',
                    'px-4 py-4',
                    ['border-2', 'border-dashed', themeBorderEmphasizeColor],
                    'rounded-md',
                    themeBackgroundColor,
                  )}>
                  <div className="w-full max-w-xl">
                    <SponsorsAdFormatInContent
                      adId="test-short-form"
                      adPlacement="preview"
                      body={
                        bodyText.length > 0
                          ? body
                          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                      }
                      imageUrl={imageUrl}
                      size="md"
                      sponsorName={
                        sponsorName || 'Your product or company name'
                      }
                      title={
                        title || 'The quick brown fox jumped over the lazy fox'
                      }
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
            isDisabled={!isValid || uploadAssetUrl.isLoading}
            isLoading={uploadAssetUrl.isLoading}
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
