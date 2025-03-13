import clsx from 'clsx';
import { useState } from 'react';
import {
  RiAddLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiPencilLine,
} from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import { FormattedMessage, useIntl } from '~/components/intl';
import { useSponsorsAdFormatData } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import SponsorsAdvertiseRequestFormAdsSectionGlobalBanner from './formats/SponsorsAdvertiseRequestFormAdsSectionGlobalBanner';
import SponsorsAdvertiseRequestFormAdsSectionInContent from './formats/SponsorsAdvertiseRequestFormAdsSectionInContent';
import SponsorsAdvertiseRequestFormAdsSectionSpotlight from './formats/SponsorsAdvertiseRequestFormAdsSectionSpotlight';
import type { SponsorsAdFormatFormItem } from '../types';
import { SponsorAdFormatConfigs } from '../../SponsorsAdFormatConfigs';
import { themeBackgroundElementEmphasizedStateColor_Hover } from '../../../ui/theme';

import type { SponsorsAdFormat } from '@prisma/client';

type Props = Readonly<{
  ads: Array<SponsorsAdFormatFormItem>;
  mode: 'create' | 'edit' | 'readonly';
  onPrevious: () => void;
  onSubmit: () => void;
  sessionId: string;
  setRemoveAssets: (asset: string) => void;
  updateAds(ads: Array<SponsorsAdFormatFormItem>): void;
  updateStepStatus(status: StepsTabItemStatus): void;
}>;

export default function SponsorsAdvertiseRequestFormAdsSection({
  onSubmit,
  onPrevious,
  ads,
  updateAds,
  sessionId,
  updateStepStatus,
  setRemoveAssets,
  mode,
}: Props) {
  const intl = useIntl();
  const isReadonly = mode === 'readonly';
  const [selectedFormat, setSelectedFormat] = useState<SponsorsAdFormat | null>(
    ads.length > 0 ? null : 'GLOBAL_BANNER',
  );
  const [editAdData, setEditAdData] = useState<SponsorsAdFormatFormItem | null>(
    null,
  );
  const [deleteAdDialog, setDeleteAdDialog] = useState<
    Readonly<{
      data: SponsorsAdFormatFormItem | null;
      show: boolean;
    }>
  >({
    data: null,
    show: false,
  });
  const adFormatData = useSponsorsAdFormatData();

  const selectedWeeks = ads
    .filter((ad) => ad.id !== editAdData?.id)
    .flatMap((ad) => (ad.format === selectedFormat ? ad.weeks : []))
    .flat();

  const isEditFlow = editAdData != null;

  function removeAdAsset(imageUrl: string) {
    const sessionIdFromImage = imageUrl.split('/').slice(-2)[0];

    // This is to prevent removing the original assets when advertiser duplicate the rejected request
    // to modify the request in the rejected request workflow
    if (sessionId !== sessionIdFromImage) {
      return;
    }
    // Save the assets to remove at the end of the form submission
    setRemoveAssets(imageUrl);
  }

  function onDeleteAd(ad: SponsorsAdFormatFormItem) {
    const remainingAds = ads.filter((adItem) => adItem.id !== ad.id);

    // Remove uploaded ad asset
    if ('imageUrl' in ad) {
      removeAdAsset(ad.imageUrl);
    }
    updateAds(ads.filter((adItem) => adItem.id !== ad.id));
    if (editAdData?.id === ad.id) {
      setEditAdData(null);
      setSelectedFormat(null);
    }
    if (remainingAds.length === 0) {
      setSelectedFormat('GLOBAL_BANNER');
    }

    setDeleteAdDialog({
      data: null,
      show: false,
    });
  }

  return (
    <div>
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Ads"
          description="Advertise request form ads section title"
          id="BjmcJ4"
        />
      </Heading>
      <Section>
        <Text className="mt-1 block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Choose your ad formats, go live schedule, and upload assets"
            description="Advertise request form ads section description"
            id="fTD+AB"
          />
        </Text>
        {ads.length > 0 && (
          <div className="mt-8 flex flex-col items-start">
            <ul className="flex w-full flex-col gap-2">
              {ads.map((ad) => (
                <li
                  key={ad.id}
                  className={clsx(
                    'flex flex-wrap items-center gap-x-4 gap-y-1',
                    'px-3 py-3',
                    ['border', themeBorderElementColor],
                    'rounded-md',
                  )}>
                  <Badge
                    className="max-md:order-2 max-md:-ml-1"
                    label={adFormatData[ad.format].name}
                    size="sm"
                    variant="neutral-active"
                  />
                  <Text
                    className="max-md:order-1 max-md:w-full md:truncate"
                    size="body2"
                    weight="medium">
                    {ad.text}
                  </Text>
                  <Text
                    className="grow max-md:order-3"
                    color="secondary"
                    size="body3">
                    <FormattedMessage
                      defaultMessage="{count, plural, one {# week} other {# weeks}}"
                      description="Number of weeks"
                      id="06WD6D"
                      values={{ count: ad.weeks.length }}
                    />
                  </Text>
                  <div className="flex items-center gap-2 max-md:order-4 max-md:-mb-0.5 max-md:-mr-1">
                    <Text size="body2" weight="bold">
                      $
                      {ad.weeks.length *
                        SponsorAdFormatConfigs[ad.format].pricePerWeekUSD}
                    </Text>
                    <div className="flex items-center">
                      {isReadonly ? (
                        <Button
                          icon={RiEyeLine}
                          isLabelHidden={true}
                          label="View ad"
                          tooltip={intl.formatMessage({
                            defaultMessage: 'View ad',
                            description: 'View ad tooltip',
                            id: '7DZuAL',
                          })}
                          variant="tertiary"
                          onClick={() => {
                            setSelectedFormat(ad.format);
                            setEditAdData(ad);
                          }}
                        />
                      ) : (
                        <>
                          <Button
                            icon={RiPencilLine}
                            isLabelHidden={true}
                            label="Edit ad"
                            tooltip={intl.formatMessage({
                              defaultMessage: 'Edit ad',
                              description: 'Edit ad tooltip',
                              id: 'IDhOlR',
                            })}
                            variant="tertiary"
                            onClick={() => {
                              setSelectedFormat(ad.format);
                              setEditAdData(ad);
                            }}
                          />
                          <Button
                            icon={RiDeleteBinLine}
                            isLabelHidden={true}
                            label="Delete ad"
                            tooltip={intl.formatMessage({
                              defaultMessage: 'Delete ad',
                              description: 'Delete ad tooltip',
                              id: 'zzToik',
                            })}
                            variant="tertiary"
                            onClick={() => {
                              setDeleteAdDialog({
                                data: ad,
                                show: true,
                              });
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex w-full flex-row-reverse justify-between gap-4">
              <Text size="body2" weight="bold">
                <FormattedMessage
                  defaultMessage="Total: ${total}"
                  description="Total price label"
                  id="0kDCAp"
                  values={{
                    total: ads.reduce(
                      (acc, curr) =>
                        acc +
                        curr.weeks.length *
                          SponsorAdFormatConfigs[curr.format].pricePerWeekUSD,
                      0,
                    ),
                  }}
                />
              </Text>
              {selectedFormat == null && !isReadonly && (
                <Button
                  addonPosition="start"
                  icon={RiAddLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Add another ad',
                    description: 'Label for add another ad button',
                    id: 'huxjqQ',
                  })}
                  size="md"
                  variant="secondary"
                  onClick={() => {
                    setSelectedFormat('GLOBAL_BANNER');
                  }}
                />
              )}
            </div>
            <Divider className="mt-8" />
          </div>
        )}
        {selectedFormat != null && (
          <>
            <div className="mt-12">
              <Label
                description={intl.formatMessage({
                  defaultMessage:
                    'Select an ad format to display, you can create multiple ads',
                  description: 'Ad format selection description',
                  id: '+3r4Ek',
                })}
                label={intl.formatMessage({
                  defaultMessage: 'Ad format',
                  description: 'Label for ad format selection',
                  id: 'ZpNg6A',
                })}
              />
              <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    {
                      description: adFormatData.GLOBAL_BANNER.shortDescription,
                      format: 'GLOBAL_BANNER',
                      label: adFormatData.GLOBAL_BANNER.name,
                      price:
                        SponsorAdFormatConfigs.GLOBAL_BANNER.pricePerWeekUSD,
                    },
                    {
                      description: adFormatData.SPOTLIGHT.shortDescription,
                      format: 'SPOTLIGHT',
                      label: adFormatData.SPOTLIGHT.name,
                      price: SponsorAdFormatConfigs.SPOTLIGHT.pricePerWeekUSD,
                    },
                    {
                      description: adFormatData.IN_CONTENT.shortDescription,
                      format: 'IN_CONTENT',
                      label: adFormatData.IN_CONTENT.name,
                      price: SponsorAdFormatConfigs.IN_CONTENT.pricePerWeekUSD,
                    },
                  ] as const
                ).map(({ description, label, format, price }) => {
                  const selected = selectedFormat === format;

                  return (
                    <button
                      key={format}
                      className={clsx(
                        'flex items-center justify-between gap-3',
                        'flex-1',
                        [
                          'border',
                          selected
                            ? themeBorderBrandColor
                            : themeBorderElementColor,
                        ],
                        themeOutlineElement_FocusVisible,
                        themeOutlineElementBrandColor_FocusVisible,
                        themeBackgroundElementEmphasizedStateColor_Hover,
                        'rounded-lg',
                        'transition-colors',
                        'px-4 py-4',
                        'text-left',
                        'disabled:bg-neutral-300 dark:disabled:bg-neutral-700',
                        'disabled:opacity-75',
                      )}
                      disabled={isReadonly}
                      type="button"
                      onClick={() => setSelectedFormat(format)}>
                      <div className="flex w-full grow flex-col items-start">
                        <Text size="body2" weight="bold">
                          {label}
                        </Text>
                        <Text
                          className="mt-1 block"
                          color="secondary"
                          size="body3">
                          {description}
                        </Text>
                      </div>
                      <Text size="body2" weight="bold">
                        ${price}/week
                      </Text>
                    </button>
                  );
                })}
              </div>
            </div>
            <Divider className="mt-12" />
            <div className="mt-12">
              {selectedFormat === 'GLOBAL_BANNER' && (
                <SponsorsAdvertiseRequestFormAdsSectionGlobalBanner
                  key={editAdData?.id}
                  defaultValues={
                    editAdData?.format === 'GLOBAL_BANNER'
                      ? editAdData
                      : undefined
                  }
                  mode={mode}
                  unavailableWeeks={selectedWeeks}
                  updateStepStatus={updateStepStatus}
                  onCancel={
                    ads.length > 0
                      ? () => {
                          setSelectedFormat(null);
                          updateStepStatus('completed');
                          setEditAdData(null);
                        }
                      : undefined
                  }
                  onSubmit={({ text, url, weeks, sponsorName }) => {
                    if (isEditFlow) {
                      const updatedAds = ads.map((ad) => {
                        if (ad.id === editAdData.id) {
                          return {
                            ...ad,
                            format: selectedFormat,
                            sponsorName,
                            text,
                            url,
                            weeks,
                          };
                        }

                        return ad;
                      });

                      // Remove uploaded ad asset if ad format change to global banner
                      if ('imageUrl' in editAdData) {
                        removeAdAsset(editAdData.imageUrl);
                      }
                      setEditAdData(null);
                      updateAds(updatedAds);
                    } else {
                      updateAds([
                        ...ads,
                        {
                          format: 'GLOBAL_BANNER',
                          id: uuidv4(),
                          sponsorName,
                          text,
                          url,
                          weeks,
                        },
                      ]);
                    }
                    updateStepStatus('completed');
                    setSelectedFormat(null);
                  }}
                />
              )}
              {selectedFormat === 'IN_CONTENT' && (
                <SponsorsAdvertiseRequestFormAdsSectionInContent
                  key={editAdData?.id}
                  defaultValues={
                    editAdData?.format === 'IN_CONTENT' ? editAdData : undefined
                  }
                  mode={mode}
                  sessionId={sessionId}
                  unavailableWeeks={selectedWeeks}
                  updateStepStatus={updateStepStatus}
                  onCancel={
                    ads.length > 0
                      ? () => {
                          setSelectedFormat(null);
                          updateStepStatus('completed');
                          setEditAdData(null);
                        }
                      : undefined
                  }
                  onSubmit={({
                    text,
                    url,
                    weeks,
                    imageUrl,
                    body,
                    sponsorName,
                  }) => {
                    if (isEditFlow) {
                      const updatedAds = ads.map((ad) => {
                        if (ad.id === editAdData.id) {
                          return {
                            ...ad,
                            body,
                            format: selectedFormat,
                            imageUrl,
                            sponsorName,
                            text,
                            url,
                            weeks,
                          };
                        }

                        return ad;
                      });

                      // Remove old uploaded ad asset if url change
                      if (
                        'imageUrl' in editAdData &&
                        imageUrl !== editAdData.imageUrl
                      ) {
                        removeAdAsset(editAdData.imageUrl);
                      }
                      setEditAdData(null);
                      updateAds(updatedAds);
                    } else {
                      updateAds([
                        ...ads,
                        {
                          body,
                          format: 'IN_CONTENT',
                          id: uuidv4(),
                          imageUrl,
                          sponsorName,
                          text,
                          url,
                          weeks,
                        },
                      ]);
                    }
                    updateStepStatus('completed');
                    setSelectedFormat(null);
                  }}
                />
              )}
              {selectedFormat === 'SPOTLIGHT' && (
                <SponsorsAdvertiseRequestFormAdsSectionSpotlight
                  key={editAdData?.id}
                  defaultValues={
                    editAdData?.format === 'SPOTLIGHT' ? editAdData : undefined
                  }
                  mode={mode}
                  sessionId={sessionId}
                  unavailableWeeks={selectedWeeks}
                  updateStepStatus={updateStepStatus}
                  onCancel={
                    ads.length > 0
                      ? () => {
                          setSelectedFormat(null);
                          updateStepStatus('completed');
                          setEditAdData(null);
                        }
                      : undefined
                  }
                  onSubmit={({ text, url, weeks, imageUrl, sponsorName }) => {
                    if (isEditFlow) {
                      const updatedAds = ads.map((ad) => {
                        if (ad.id === editAdData.id) {
                          return {
                            ...ad,
                            format: selectedFormat,
                            imageUrl,
                            sponsorName,
                            text,
                            url,
                            weeks,
                          };
                        }

                        return ad;
                      });

                      // Remove old uploaded ad asset if url change
                      if (
                        'imageUrl' in editAdData &&
                        imageUrl !== editAdData.imageUrl
                      ) {
                        removeAdAsset(editAdData.imageUrl);
                      }

                      setEditAdData(null);
                      updateAds(updatedAds);
                    } else {
                      updateAds([
                        ...ads,
                        {
                          format: 'SPOTLIGHT',
                          id: uuidv4(),
                          imageUrl,
                          sponsorName,
                          text,
                          url,
                          weeks,
                        },
                      ]);
                    }
                    updateStepStatus('completed');
                    setSelectedFormat(null);
                  }}
                />
              )}
            </div>
          </>
        )}
        {ads.length > 0 && selectedFormat == null && (
          <div className="mt-8 flex justify-between">
            <Button
              addonPosition="start"
              icon={RiArrowLeftLine}
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
              isDisabled={ads.length === 0}
              label={intl.formatMessage({
                defaultMessage: 'Company details',
                description: 'Label for company details button',
                id: 'OY0i/0',
              })}
              size="md"
              variant="primary"
              onClick={() => {
                onSubmit();
              }}
            />
          </div>
        )}
      </Section>
      <ConfirmationDialog
        confirmButtonLabel={intl.formatMessage({
          defaultMessage: 'Delete',
          description: 'Delete button label',
          id: 'WodcPq',
        })}
        confirmButtonVariant="danger"
        isShown={deleteAdDialog.show}
        title={intl.formatMessage({
          defaultMessage: 'Delete ad?',
          description: 'Delete ad confirmation dialog title',
          id: 'R0htzY',
        })}
        onCancel={() => {
          setDeleteAdDialog({
            data: null,
            show: false,
          });
        }}
        onConfirm={() => onDeleteAd(deleteAdDialog.data!)}>
        <FormattedMessage
          defaultMessage="Are you sure you want to delete this ad?"
          description="Confirmation text for deleting an ad"
          id="puxZIs"
        />
      </ConfirmationDialog>
    </div>
  );
}
