import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import SponsorsAdvertiseRequestAgreement from './SponsorsAdvertiseRequestAgreement';
import type { SponsorsAdFormatFormItem, SponsorsCompanyDetails } from './types';
import {
  SponsorAdFormatConfigs,
  useSponsorsAdFormatData,
} from '../SponsorsAdFormatConfigs';

import type { SponsorsAdFormat } from '@prisma/client';

type Props = Readonly<{
  data: {
    ads: Array<SponsorsAdFormatFormItem>;
    company: SponsorsCompanyDetails;
    emails: Array<string>;
  };
  isSubmitting?: boolean;
  onPrevious: () => void;
  onSubmit: ({ agreement }: Readonly<{ agreement: string }>) => void;
  updateStepStatus: (status: StepsTabItemStatus) => void;
}>;

const adFormats: Record<SponsorsAdFormat, SponsorsAdFormat> = {
  GLOBAL_BANNER: 'GLOBAL_BANNER',
  IN_CONTENT: 'IN_CONTENT',
  SPOTLIGHT: 'SPOTLIGHT',
};

export default function SponsorsAdvertiseRequestFormReviewSection({
  onPrevious,
  updateStepStatus,
  data,
  onSubmit,
  isSubmitting,
}: Props) {
  const intl = useIntl();
  const agreementRef = useRef<HTMLDivElement>(null);
  const adsFormatData = useSponsorsAdFormatData();
  const [signedAgreement, setSignedAgreement] = useState(false);
  const { emails, ads, company } = data;
  const {
    address,
    sponsorName,
    legalName,
    taxNumber,
    signatoryName,
    signatoryTitle,
  } = company;
  const addressString = [
    [address.line1, address.line2].filter(Boolean).join(', '),
    address.city,
    [address.state, address.postalCode].filter(Boolean).join(' '),
  ]
    .flatMap((part) => (part ? [part] : []))
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');
  const totalAmount = ads.reduce(
    (acc, curr) =>
      acc +
      curr.weeks.length * SponsorAdFormatConfigs[curr.format].pricePerWeekUSD,
    0,
  );

  useEffect(() => {
    updateStepStatus(signedAgreement ? 'in_progress' : 'not_started');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedAgreement]);

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit({
      agreement: agreementRef.current?.innerHTML ?? '',
    });
  }

  return (
    <form className="mx-auto w-full max-w-xl" onSubmit={handleOnSubmit}>
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Review and sign"
          description="Review and sign"
          id="D9lA4s"
        />
      </Heading>
      <Section>
        <Text className="block" color="secondary">
          <FormattedMessage
            defaultMessage="Review everything and make sure they are in order"
            description="Subtitle for review section"
            id="BGKx/h"
          />
        </Text>
        <div className="mt-8 flex flex-col gap-6">
          <div>
            <Text className="block" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Contact emails"
                description="Contact email addresses"
                id="e/4TCP"
              />
            </Text>
            <Text className="block" color="secondary" size="body2">
              {emails.join('; ')}
            </Text>
          </div>
          <div>
            <Text className="block" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Sponsor name"
                description="Sponsor name input label"
                id="iOm9a5"
              />
            </Text>
            <Text className="block" color="secondary" size="body2">
              {sponsorName}
            </Text>
          </div>
          <div>
            <Text className="block" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Ads"
                description="Label for ads"
                id="aQYg46"
              />
            </Text>
            <div
              className={clsx(
                'mt-2 rounded px-3 py-2',
                themeBorderColor,
                'border',
              )}>
              {Object.values(adFormats).map((adFormat) => {
                const numberOfWeeksForFormat = ads
                  .filter((ad) => ad.format === adFormat)
                  .reduce((acc, curr) => acc + curr.weeks.length, 0);

                if (numberOfWeeksForFormat === 0) {
                  return null;
                }

                const totalPriceForFormat =
                  numberOfWeeksForFormat *
                  SponsorAdFormatConfigs[adFormat].pricePerWeekUSD;

                return (
                  <div key={adFormat} className="flex justify-between">
                    <Text color="secondary" size="body2">
                      {adsFormatData[adFormat].name} &times;{' '}
                      <FormattedMessage
                        defaultMessage="{count, plural, one {# week} other {# weeks}}"
                        description="Number of weeks"
                        id="06WD6D"
                        values={{
                          count: numberOfWeeksForFormat,
                        }}
                      />
                    </Text>
                    <Text color="secondary" size="body2" weight="medium">
                      ${totalPriceForFormat}
                    </Text>
                  </div>
                );
              })}
              <Divider className="my-2" />
              <div className="flex justify-between">
                <Text color="secondary" size="body2">
                  <FormattedMessage
                    defaultMessage="Total"
                    description="Label for total ads amount"
                    id="w6p/Js"
                  />
                </Text>
                <Text color="secondary" size="body2" weight="medium">
                  ${totalAmount}
                </Text>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Text className="block" size="body2" weight="medium">
                <FormattedMessage
                  defaultMessage="Company"
                  description="Label for company"
                  id="TriOQe"
                />
              </Text>
              <Text className="block" color="secondary" size="body2">
                {legalName}
              </Text>
              <Text className="block" color="secondary" size="body2">
                {taxNumber}
              </Text>
            </div>
            <div>
              <Text className="block" size="body2" weight="medium">
                <FormattedMessage
                  defaultMessage="Address"
                  description="Label for address"
                  id="0uKafI"
                />
              </Text>
              <Text className="block" color="secondary" size="body2">
                {addressString}
              </Text>
              <Text className="block" color="secondary" size="body2">
                {address.country}
              </Text>
            </div>
          </div>
          <div>
            <Text className="block" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Authorized signatory"
                description="Label for Authorized signatory"
                id="IaEOEI"
              />
            </Text>
            <Text className="block" color="secondary" size="body2">
              {signatoryName}, {signatoryTitle}
            </Text>
          </div>
          <div>
            <Text className="block" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Agreement"
                description="Label for Agreement"
                id="mgV3k+"
              />
            </Text>
            <Text className="block" color="error" size="body2">
              <FormattedMessage
                defaultMessage="Please accept the agreement by selecting the checkbox at the end of the agreement"
                description="Message for accept agreement checkbox"
                id="fifLMg"
              />
            </Text>
            <div
              ref={agreementRef}
              className={clsx('mt-2 rounded p-5', themeBorderColor, 'border')}>
              <SponsorsAdvertiseRequestAgreement
                address={`${addressString}, ${address.country}`}
                ads={ads}
                advertiserFullLegalName={legalName}
                authorizedSignatoryName={signatoryName}
                authorizedSignatoryTitle={signatoryTitle}
                contactEmails={emails}
                totalAmount={totalAmount}
              />
            </div>
          </div>
          <CheckboxInput
            label="I hereby acknowledge and sign the agreement(s)."
            value={signedAgreement}
            onChange={(value) => {
              setSignedAgreement(value);
            }}
          />
        </div>
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
            isDisabled={!signedAgreement || isSubmitting}
            isLoading={isSubmitting}
            label={intl.formatMessage({
              defaultMessage: 'Submit',
              description: 'Label for submit button',
              id: 'K3opjL',
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
