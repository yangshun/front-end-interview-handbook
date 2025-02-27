import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatSpotlight from '~/components/sponsors/ads/SponsorsAdFormatSpotlight';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

import { useSponsorsSpotlightAdSchema } from '../schema/SponsorsAdvertiseRequestAdSchema';
import SponsorsAdvertiseRequestFormAdsImageUpload from '../SponsorsAdvertiseRequestFormAdsImageUpload';
import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  onCancel?: () => void;
  onSubmit: ({
    text,
    url,
    weeks,
    imageUrl,
  }: Readonly<{
    imageUrl: string;
    text: string;
    url: string;
    weeks: Set<string>;
  }>) => void;
}>;

export default function SponsorsAdvertiseRequestFormAdsSectionSpotlight({
  onCancel,
  onSubmit,
}: Props) {
  const intl = useIntl();
  const adSchema = useSponsorsSpotlightAdSchema();

  const methods = useForm<z.infer<typeof adSchema>>({
    defaultValues: {
      format: 'SPOTLIGHT',
      text: '',
      url: '',
      weeks: new Set(''),
    },
    mode: 'onTouched',
    resolver: zodResolver(adSchema),
  });
  const {
    control,
    watch,
    setValue,
    formState: { isValid },
  } = methods;

  const selectedWeeks = watch('weeks');
  const title = watch('text');

  function handleOnSubmit(data: z.infer<typeof adSchema>) {
    onSubmit({
      imageUrl: data.imageUrl,
      text: data.text,
      url: data.url,
      weeks: data.weeks,
    });
  }

  return (
    <div
      className="flex flex-col gap-12"
      onSubmit={methods.handleSubmit(handleOnSubmit)}>
      <SponsorsAdvertiseRequestFormAdsSectionAvailability
        adFormat="SPOTLIGHT"
        selectedWeeks={selectedWeeks}
        selectedWeeksActions={{
          add: (week: string) =>
            setValue('weeks', new Set([...Array.from(selectedWeeks), week]), {
              shouldValidate: true,
            }),
          remove: (week: string) =>
            setValue(
              'weeks',
              new Set([...Array.from(selectedWeeks)].filter((w) => w !== week)),
              {
                shouldValidate: true,
              },
            ),
        }}
      />
      <div>
        <Label
          description={intl.formatMessage({
            defaultMessage:
              'Configure your spotlight ad and upload the required assets',
            description: 'Description for spotlight ad configuration',
            id: 'TPtepX',
          })}
          label={intl.formatMessage({
            defaultMessage: 'Spotlight ad configuration',
            description: 'Label for ad configuration',
            id: 'SqCCTt',
          })}
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
                        SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints
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
                    SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.text
                  }
                  required={true}
                />
              )}
            />
            <SponsorsAdvertiseRequestFormAdsImageUpload
              heightConstraint={
                SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                  ?.height ?? 1
              }
              widthConstraint={
                SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                  ?.width ?? 1
              }
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
                'mt-2 h-[200px] w-full',
                'flex items-center justify-center',
                'py-10',
                ['border-2', 'border-dashed', themeBorderEmphasizeColor],
                'rounded-md',
                themeBackgroundColor,
              )}>
              <div className="max-w-[260px]">
                <SponsorsAdFormatSpotlight
                  external={true}
                  id="short-form"
                  imageUrl=""
                  sponsorName="Your product / company name"
                  text={title || 'Your short form ad text here'}
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
          isDisabled={!isValid}
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
    </div>
  );
}
