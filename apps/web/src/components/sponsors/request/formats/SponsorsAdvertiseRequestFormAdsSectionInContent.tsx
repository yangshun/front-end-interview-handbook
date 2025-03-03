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

import { useSponsorsInContentAdSchema } from '../schema/SponsorsAdvertiseRequestAdSchema';
import SponsorsAdvertiseRequestFormAdsImageUpload from '../SponsorsAdvertiseRequestFormAdsImageUpload';
import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';

const editor = createHeadlessEditor(RichTextEditorConfig);

import { useEffect } from 'react';

import { objectUrlToBase64 } from '~/lib/imageUtils';
import { trpc } from '~/hooks/trpc';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';

import type { SponsorsAdFormatInContentItem } from '../types';

import { zodResolver } from '@hookform/resolvers/zod';
import { createHeadlessEditor } from '@lexical/headless';

type Props = Readonly<{
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
}: Props) {
  const intl = useIntl();
  const uploadAsset = trpc.sponsorships.uploadAdAsset.useMutation();
  const adSchema = useSponsorsInContentAdSchema();
  const methods = useForm<z.infer<typeof adSchema>>({
    defaultValues: {
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

  const editorState = editor.parseEditorState(body);
  const bodyText = editorState.read(() => $getRoot().getTextContent());

  async function handleOnSubmit(data: z.infer<typeof adSchema>) {
    const base64 = await objectUrlToBase64(data.imageUrl);
    const storageImageUrl = await uploadAsset.mutateAsync(
      {
        format: AD_FORMAT,
        imageFile: base64,
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

    onSubmit({
      body: data.body,
      imageUrl: storageImageUrl,
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
      <div>
        <Label
          description="Configure your ad and upload the required assets"
          label="In-content ad configuration"
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
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
                    defaultMessage: 'Title',
                    description: 'Label for title input',
                    id: 'hF+MYj',
                  })}
                  maxLength={
                    SponsorAdFormatConfigs[AD_FORMAT].placementConstraints.text
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
                  classNameOuter="mt-4"
                  description={intl.formatMessage(
                    {
                      defaultMessage: 'Maximum of {maxLinks} links allowed',
                      description: 'Description for body input',
                      id: 'RTTAsr',
                    },
                    {
                      maxLinks:
                        SponsorAdFormatConfigs[AD_FORMAT].placementConstraints
                          .body?.links,
                    },
                  )}
                  errorMessage={error?.message}
                  label={intl.formatMessage({
                    defaultMessage: 'Body',
                    description: 'Label for body input',
                    id: 'qWP6XC',
                  })}
                  maxLength={
                    SponsorAdFormatConfigs[AD_FORMAT].placementConstraints.body
                      ?.length
                  }
                  minHeight="200px"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter something here...',
                    description: 'Placeholder for body input',
                    id: 'xaoljh',
                  })}
                  required={true}
                  {...field}
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange({
                      target: {
                        value: newValue,
                      },
                    });
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="imageUrl"
              render={({ field, fieldState: { error } }) => (
                <SponsorsAdvertiseRequestFormAdsImageUpload
                  className="mt-4"
                  errorMessage={error?.message}
                  heightConstraint={
                    SponsorAdFormatConfigs[AD_FORMAT].placementConstraints.image
                      ?.height ?? 1
                  }
                  imageUrl={imageUrl}
                  setError={(message) => setError('imageUrl', { message })}
                  setImageUrl={(url) => {
                    field.onChange(url);
                  }}
                  widthConstraint={
                    SponsorAdFormatConfigs[AD_FORMAT].placementConstraints.image
                      ?.width ?? 1
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="url"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  classNameOuter="mt-4"
                  description={intl.formatMessage({
                    defaultMessage: 'Destination for banner clicks',
                    description: 'Description for URL input',
                    id: 'Es4JKW',
                  })}
                  errorMessage={error?.message}
                  label="URL"
                  placeholder="https://www.example.com"
                  required={true}
                  type="url"
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
              <div className="max-w-xl">
                <SponsorsAdFormatInContent
                  body={
                    bodyText.length > 0
                      ? body
                      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  }
                  external={true}
                  id="short-form"
                  imageUrl={imageUrl}
                  size="md"
                  sponsorName="Your product / company name"
                  title={
                    title || 'The quick brown fox jumped over the lazy fox'
                  }
                  url="#"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
          isDisabled={!isValid || uploadAsset.isLoading}
          isLoading={uploadAsset.isLoading}
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
    </form>
  );
}
