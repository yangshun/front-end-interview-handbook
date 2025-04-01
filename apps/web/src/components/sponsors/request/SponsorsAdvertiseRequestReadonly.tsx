import clsx from 'clsx';
import type { ReactNode } from 'react';

import { urlAddHttpsIfMissing } from '~/lib/urlValidation';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import InterviewsMarketingHeroBrowserWindowFrame from '~/components/interviews/marketing/embed/InterviewsMarketingHeroBrowserWindowFrame';
import { FormattedMessage, useIntl } from '~/components/intl';
import SponsorsAdFormatGlobalBanner from '~/components/sponsors/ads/SponsorsAdFormatGlobalBanner';
import SponsorsAdFormatInContent from '~/components/sponsors/ads/SponsorsAdFormatInContent';
import SponsorsAdFormatInContentBodyRenderer from '~/components/sponsors/ads/SponsorsAdFormatInContentBodyRenderer';
import SponsorsAdFormatSpotlight from '~/components/sponsors/ads/SponsorsAdFormatSpotlight';
import type { SponsorsAdFormatFormItem } from '~/components/sponsors/request/types';
import type { AdvertiseRequestFormValues } from '~/components/sponsors/request/useSponsorsAdvertiseRequestFormData';
import {
  SponsorAdFormatConfigs,
  useSponsorsAdFormatData,
} from '~/components/sponsors/SponsorsAdFormatConfigs';
import {
  sponsorsDateFormatterWithDayAndYear,
  sponsorsWeekDateRange,
} from '~/components/sponsors/SponsorsDatesUtils';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Label from '~/components/ui/Label';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  alertMessage?: ReactNode;
  data: Omit<AdvertiseRequestFormValues, 'sessionId'> &
    Readonly<{
      agreement: string;
      createdAt: Date;
      review: Readonly<{
        comments: string | null;
        createdAt: Date;
        profile: Readonly<{
          name: string | null;
          username: string;
        }>;
      }> | null;
      updatedAt: Date;
    }>;
  onEdit?: () => void;
}>;

export default function SponsorsAdvertiseRequestReadonly({
  data,
  onEdit,
  alertMessage,
}: Props) {
  const intl = useIntl();
  const { ads, company, emails, agreement, createdAt, review, updatedAt } =
    data;
  const { address, signatoryName, signatoryTitle } = company!;
  const addressString = [
    [address.line1, address.line2].filter(Boolean).join(', '),
    address.city,
    [address.state, address.postalCode].filter(Boolean).join(' '),
  ]
    .flatMap((part) => (part ? [part] : []))
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <Heading level="heading4">
              <FormattedMessage
                defaultMessage="Advertisement Request"
                description="Title for advertise request page"
                id="4gasot"
              />
            </Heading>
            <div className="flex items-center gap-2">
              <Text color="secondary" size="body3">
                <FormattedMessage
                  defaultMessage="Created {time}"
                  description="Label for created time"
                  id="PKpZA5"
                  values={{
                    time: <RelativeTimestamp timestamp={createdAt} />,
                  }}
                />
              </Text>
              {createdAt.getTime() !== updatedAt.getTime() && (
                <>
                  &middot;
                  <Text color="secondary" size="body3">
                    <FormattedMessage
                      defaultMessage="Updated {time}"
                      description="Label for updated time"
                      id="dE5S0I"
                      values={{
                        time: <RelativeTimestamp timestamp={updatedAt} />,
                      }}
                    />
                  </Text>
                </>
              )}
              {review && (
                <>
                  &middot;
                  <Text className="block" color="secondary" size="body3">
                    {intl.formatMessage({
                      defaultMessage: 'Reviewed by',
                      description: 'Ad request reviewed by',
                      id: 'YGMPkH',
                    })}{' '}
                    {review?.profile.name || review?.profile.username}
                    {review?.createdAt && (
                      <>
                        {' '}
                        <RelativeTimestamp timestamp={review.createdAt} />
                      </>
                    )}
                  </Text>
                </>
              )}
            </div>
          </div>
          {onEdit && (
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Edit request',
                description: 'Edit button label',
                id: 'daJxDM',
              })}
              size="md"
              variant="secondary"
              onClick={onEdit}
            />
          )}
        </div>
        {alertMessage}
      </div>
      <div className="flex flex-col gap-8">
        <Section>
          <div className="flex flex-col gap-3">
            <Heading level="heading5">
              {intl.formatMessage({
                defaultMessage: 'Contact details',
                description: 'Title for contact details',
                id: 'a8I10Q',
              })}
            </Heading>
            {emails.length === 1 ? (
              <Text color="secondary" size="body2">
                {emails[0]}
              </Text>
            ) : (
              <ul className="list-inside list-disc pl-1.5">
                {emails.map((email) => (
                  <li key={email} className="list-item">
                    <Text color="secondary" size="body2">
                      {email}
                    </Text>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
        <Divider />
        <Section>
          <div className="flex flex-col gap-3">
            <Heading level="heading5">
              {intl.formatMessage({
                defaultMessage: 'Ads',
                description: 'Label for ads',
                id: 'aQYg46',
              })}
            </Heading>
            <div>
              {ads.length > 0 && (
                <div className="flex flex-col items-start">
                  <ul className="flex w-full flex-col gap-4">
                    {ads.map((ad) => (
                      <AdFormatCard key={ad.id} ad={ad} />
                    ))}
                  </ul>
                  <div className="mt-4 flex w-full justify-end gap-4">
                    <Text size="body0" weight="bold">
                      <FormattedMessage
                        defaultMessage="Total: ${total}"
                        description="Total price label"
                        id="0kDCAp"
                        values={{
                          total: ads.reduce(
                            (acc, curr) =>
                              acc +
                              curr.weeks.length *
                                SponsorAdFormatConfigs[curr.format]
                                  .pricePerWeekUSD,
                            0,
                          ),
                        }}
                      />
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
        <Divider />
        <Section>
          <div className="flex flex-col gap-3">
            <Heading level="heading5">
              {intl.formatMessage({
                defaultMessage: 'Company details',
                description: 'Company details section heading',
                id: 'g6ZUKV',
              })}
            </Heading>
            <div
              className={clsx(
                'grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:gap-6',
              )}>
              <div>
                <Label
                  label={intl.formatMessage({
                    defaultMessage: 'Company full legal name',
                    description: 'Legal name input label',
                    id: 'CxiBL1',
                  })}
                />
                <Text color="secondary" size="body2">
                  {company?.legalName ?? '-'}
                </Text>
              </div>
              <div>
                <Label
                  label={intl.formatMessage({
                    defaultMessage: 'VAT / Tax number',
                    description: 'Tax number input label',
                    id: '49TDbW',
                  })}
                />
                <Text color="secondary" size="body2">
                  {company?.taxNumber || '–'}
                </Text>
              </div>
              <div>
                <Label
                  label={intl.formatMessage({
                    defaultMessage: 'Authorized signatory',
                    description: 'Label for Authorized signatory',
                    id: 'IaEOEI',
                  })}
                />
                <Text className="block" color="secondary" size="body2">
                  {signatoryName}, {signatoryTitle}
                </Text>
              </div>
              <div>
                <Label
                  label={intl.formatMessage({
                    defaultMessage: 'Address',
                    description: 'Label for address',
                    id: '0uKafI',
                  })}
                />
                <div>
                  <Text className="block" color="secondary" size="body2">
                    {addressString}
                  </Text>
                  <Text className="block" color="secondary" size="body2">
                    {address.country}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Divider />
        <Section>
          <div className="flex flex-col gap-3">
            <Heading level="heading5">
              {intl.formatMessage({
                defaultMessage: 'Agreement',
                description: 'Agreement section heading',
                id: 'OMYreh',
              })}
            </Heading>
            <div className="flex flex-col items-start gap-2">
              <Text className="block" color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="You have agreed to GreatFrontEnd's advertising agreement."
                  description="Agreement section subtitle"
                  id="V+8Zql"
                />
              </Text>
              <Dialog
                scrollable={true}
                title=" "
                trigger={
                  <Button
                    label={intl.formatMessage({
                      defaultMessage: 'View advertising agreement',
                      description: 'View ad agreement button label',
                      id: 'w5AUKD',
                    })}
                    variant="secondary"
                  />
                }
                width="screen-lg">
                <div dangerouslySetInnerHTML={{ __html: agreement }} />
              </Dialog>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function AdFormatCard({ ad }: Readonly<{ ad: SponsorsAdFormatFormItem }>) {
  const intl = useIntl();
  const adFormatData = useSponsorsAdFormatData();

  return (
    <li
      className={clsx(
        'flex flex-col gap-4',
        'p-4',
        ['border', themeBorderColor],
        'rounded-md',
      )}>
      <Heading level="heading6">{adFormatData[ad.format].name}</Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={clsx('flex flex-col gap-4')}>
          <AdDetailRow
            label={intl.formatMessage({
              defaultMessage: 'Sponsor name',
              description: 'Advertisement sponsor name',
              id: 'jh37Pg',
            })}>
            <Text color="secondary" size="body2">
              {ad.sponsorName}
            </Text>
          </AdDetailRow>
          {'imageUrl' in ad && (
            <AdDetailRow
              label={intl.formatMessage({
                defaultMessage: 'Image',
                description: 'Label for image',
                id: 'nw9bBh',
              })}>
              <img
                alt={intl.formatMessage({
                  defaultMessage: 'Ad banner image',
                  description: 'Alt text for ad banner image',
                  id: 'jK0/93',
                })}
                className="mt-1 h-40"
                src={ad.imageUrl}
              />
            </AdDetailRow>
          )}
          <AdDetailRow
            label={intl.formatMessage({
              defaultMessage: 'Title',
              description: 'Label for title input',
              id: 'hF+MYj',
            })}>
            <Text color="secondary" size="body2">
              {ad.text}
            </Text>
          </AdDetailRow>
          {'body' in ad && (
            <AdDetailRow
              label={intl.formatMessage({
                defaultMessage: 'Body',
                description: 'Label for body input',
                id: 'qWP6XC',
              })}>
              <SponsorsAdFormatInContentBodyRenderer
                adId={ad.id}
                size="sm"
                tracking={false}
                value={ad.body}
              />
            </AdDetailRow>
          )}
          <AdDetailRow
            label={intl.formatMessage({
              defaultMessage: 'Destination URL',
              description: 'Ad destination URL',
              id: 'DWvf03',
            })}>
            <Anchor
              className={textVariants({
                color: 'inherit',
                size: 'body2',
              })}
              href={ad.url}>
              {ad.url}
            </Anchor>
          </AdDetailRow>
          <AdDetailRow
            label={intl.formatMessage({
              defaultMessage: 'Weeks',
              description: 'Label for weeks',
              id: 'oU0tf/',
            })}>
            <Text color="secondary" size="body2">
              <ul>
                {ad.weeks.map((week) => {
                  const parts = week.split('/').map(Number);

                  const { start, end } = sponsorsWeekDateRange(
                    parts[0],
                    parts[1],
                  );

                  const startDate = sponsorsDateFormatterWithDayAndYear.format(
                    new Date(start),
                  );
                  const endDate = sponsorsDateFormatterWithDayAndYear.format(
                    new Date(end),
                  );

                  return <li key={week}>{[startDate, endDate].join(' – ')}</li>;
                })}
              </ul>
            </Text>
          </AdDetailRow>
          <AdDetailRow
            label={intl.formatMessage({
              defaultMessage: 'Total',
              description: 'Total price label',
              id: 'AM2aM4',
            })}>
            <Text color="secondary" size="body2">
              $
              {ad.weeks.length *
                SponsorAdFormatConfigs[ad.format].pricePerWeekUSD}
            </Text>
          </AdDetailRow>
        </div>
        <div>
          {ad.format === 'GLOBAL_BANNER' && (
            <InterviewsMarketingHeroBrowserWindowFrame>
              <SponsorsAdFormatGlobalBanner
                adId="test-global-banner"
                isLoading={false}
                text={ad.text}
                tracking={false}
                url={urlAddHttpsIfMissing(ad.url)}
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
          )}
          {ad.format === 'SPOTLIGHT' && (
            <div
              className={clsx(
                'h-[150px] w-full',
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
                  imageUrl={ad.imageUrl}
                  sponsorName={ad.sponsorName}
                  text={ad.text}
                  tracking={false}
                  url={urlAddHttpsIfMissing(ad.url)}
                />
              </div>
            </div>
          )}
          {ad.format === 'IN_CONTENT' && (
            <div
              className={clsx(
                'flex w-full items-center justify-center',
                'px-4 py-4',
                ['border-2', 'border-dashed', themeBorderEmphasizeColor],
                'rounded-md',
                themeBackgroundColor,
              )}>
              <div className="w-full max-w-xl">
                <SponsorsAdFormatInContent
                  adId="test-short-form"
                  adPlacement="preview"
                  body={ad.body}
                  imageUrl={ad.imageUrl}
                  size="md"
                  sponsorName={ad.sponsorName}
                  title={ad.text}
                  tracking={false}
                  url={urlAddHttpsIfMissing(ad.url)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function AdDetailRow({
  label,
  children,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <Text
        className="block shrink-0 md:w-[150px]"
        size="body2"
        weight="medium">
        {label}
      </Text>
      {children}
    </div>
  );
}
