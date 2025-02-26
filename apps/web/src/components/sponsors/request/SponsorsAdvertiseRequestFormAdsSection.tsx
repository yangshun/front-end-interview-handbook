import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  RiAddLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import { useList } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

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
import type { SponsorsAdFormatFormItem } from './types';
import { SponsorAdFormatConfigs } from '../SponsorsAdFormatConfigs';
import { themeBackgroundElementEmphasizedStateColor_Hover } from '../../ui/theme';

import type { SponsorsAdFormat } from '@prisma/client';

type Props = Readonly<{
  defaultValues: Array<SponsorsAdFormatFormItem>;
  onPrevious: () => void;
  onSubmit: () => void;
  updateFormData(ads: Array<SponsorsAdFormatFormItem>): void;
}>;

export default function SponsorsAdvertiseRequestFormAdsSection({
  onSubmit,
  onPrevious,
  defaultValues,
  updateFormData,
}: Props) {
  const intl = useIntl();
  const [selectedFormat, setSelectedFormat] = useState<SponsorsAdFormat | null>(
    defaultValues.length > 0 ? null : 'GLOBAL_BANNER',
  );
  const adFormatData = useSponsorsAdFormatData();
  const [ads, adsActions] = useList<SponsorsAdFormatFormItem>(defaultValues);

  useEffect(() => {
    updateFormData(ads);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ads]);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Ads"
          description="Advertise request form ads section title"
          id="BjmcJ4"
        />
      </Heading>
      <Section>
        <Text className="block" color="secondary">
          <FormattedMessage
            defaultMessage="Choose your ad formats, go live schedule, and upload assets"
            description="Advertise request form ads section description"
            id="fTD+AB"
          />
        </Text>
        {ads.length > 0 && (
          <div className="mt-12 flex flex-col items-start">
            <ul className="flex w-full flex-col gap-2">
              {ads.map((ad) => (
                <li
                  key={ad.id}
                  className={clsx(
                    'flex items-center justify-between gap-2',
                    'px-3 py-2',
                    'rounded-md',
                    'border',
                    themeBorderElementColor,
                  )}>
                  <div className="flex items-center gap-2">
                    <Badge label={ad.format} variant="neutral-active" />
                    <Text size="body2" weight="medium">
                      {ad.text}
                    </Text>{' '}
                    &middot;
                    <Text color="secondary" size="body3">
                      {ad.weeks.size} week(s)
                    </Text>
                    <Button
                      icon={RiDeleteBinLine}
                      isLabelHidden={true}
                      label="Delete ad"
                      tooltip="Delete ad"
                      variant="tertiary"
                      onClick={() => {
                        const remainingAds = ads.filter(
                          (adItem) => adItem.id !== ad.id,
                        );

                        adsActions.filter((adItem) => adItem.id !== ad.id);
                        if (remainingAds.length === 0) {
                          setSelectedFormat('GLOBAL_BANNER');
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Text size="body2" weight="bold">
                      $
                      {ad.weeks.size *
                        SponsorAdFormatConfigs[ad.format].pricePerWeekUSD}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex w-full flex-row-reverse justify-between gap-4">
              <Text className="mr-3" size="body2" weight="bold">
                <FormattedMessage
                  defaultMessage="Total: ${total}"
                  description="Total price label"
                  id="0kDCAp"
                  values={{
                    total: ads.reduce(
                      (acc, curr) =>
                        acc +
                        curr.weeks.size *
                          SponsorAdFormatConfigs[curr.format].pricePerWeekUSD,
                      0,
                    ),
                  }}
                />
              </Text>
              {selectedFormat == null && (
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
                      )}
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
            <div className="mt-12">
              {selectedFormat === 'GLOBAL_BANNER' && (
                <SponsorsAdvertiseRequestFormAdsSectionGlobalBanner
                  onCancel={
                    ads.length > 0
                      ? () => {
                          setSelectedFormat(null);
                        }
                      : undefined
                  }
                  onSubmit={({ text, url, weeks }) => {
                    adsActions.push({
                      format: 'GLOBAL_BANNER',
                      id: uuidv4(),
                      text,
                      url,
                      weeks,
                    });
                    setSelectedFormat(null);
                  }}
                />
              )}
              {selectedFormat === 'IN_CONTENT' && (
                <SponsorsAdvertiseRequestFormAdsSectionInContent
                  onCancel={
                    ads.length > 0
                      ? () => {
                          setSelectedFormat(null);
                        }
                      : undefined
                  }
                  onSubmit={({ text, url, weeks }) => {
                    adsActions.push({
                      format: 'IN_CONTENT',
                      id: uuidv4(),
                      text,
                      url,
                      weeks,
                    });
                    setSelectedFormat(null);
                  }}
                />
              )}
              {selectedFormat === 'SPOTLIGHT' && (
                <SponsorsAdvertiseRequestFormAdsSectionSpotlight
                  onCancel={
                    ads.length > 0
                      ? () => {
                          setSelectedFormat(null);
                        }
                      : undefined
                  }
                  onSubmit={({ text, url, weeks }) => {
                    adsActions.push({
                      format: 'SPOTLIGHT',
                      id: uuidv4(),
                      text,
                      url,
                      weeks,
                    });
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
    </div>
  );
}
