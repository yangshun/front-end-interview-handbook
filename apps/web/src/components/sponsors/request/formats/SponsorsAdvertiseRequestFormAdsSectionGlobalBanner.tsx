import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import type { z } from 'zod';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import InterviewsMarketingHeroBrowserWindowFrame from '~/components/interviews/marketing/embed/InterviewsMarketingHeroBrowserWindowFrame';
import { useIntl } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import TextInput from '~/components/ui/TextInput';

import { useSponsorsGlobalBannerAdSchema } from '../schema/SponsorsAdvertiseRequestAdSchema';
import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';
import SponsorsAdFormatGlobalBanner from '../../ads/SponsorsAdFormatGlobalBanner';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  onCancel?: () => void;
  onSubmit: ({
    format,
    text,
    url,
    weeks,
  }: {
    format: 'GLOBAL_BANNER';
    text: string;
    url: string;
    weeks: Set<string>;
  }) => void;
}>;

export default function SponsorsAdvertiseRequestFormAdsSectionGlobalBanner({
  onCancel,
  onSubmit,
}: Props) {
  const intl = useIntl();
  const adSchema = useSponsorsGlobalBannerAdSchema();

  const methods = useForm<z.infer<typeof adSchema>>({
    defaultValues: {
      format: 'GLOBAL_BANNER',
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
      format: 'GLOBAL_BANNER',
      text: data.text,
      url: data.url,
      weeks: data.weeks,
    });
  }

  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={methods.handleSubmit(handleOnSubmit)}>
      <SponsorsAdvertiseRequestFormAdsSectionAvailability
        adFormat="GLOBAL_BANNER"
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
              'Configure your global banner and upload the required assets',
            description: 'Description for global banner configuration',
            id: 'n7SF/r',
          })}
          label={intl.formatMessage({
            defaultMessage: 'Global banner configuration',
            description: 'Label for global banner configuration',
            id: 'zvqK99',
          })}
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="text"
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                description={intl.formatMessage(
                  {
                    defaultMessage: 'Maximum of {maxLength} characters',
                    description: 'Description for title input',
                    id: 'MpD3WU',
                  },
                  {
                    maxLength:
                      SponsorAdFormatConfigs.GLOBAL_BANNER.placementConstraints
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
                  SponsorAdFormatConfigs.GLOBAL_BANNER.placementConstraints.text
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
      </div>
      <div>
        <div className="flex items-end justify-between gap-4">
          <Label
            description={intl.formatMessage({
              defaultMessage: 'See how your ad looks like when it goes live',
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
              isLoading={false}
              text={title || 'Your ad text here'}
              url="#"
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
    </form>
  );
}
