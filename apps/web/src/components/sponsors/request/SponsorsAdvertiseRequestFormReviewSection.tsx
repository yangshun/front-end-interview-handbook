import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import type { StepsTabItemStatus } from '~/components/common/StepsTabs';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Dialog from '~/components/ui/Dialog';
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

  const [agreementDialogShown, setAgreementDialogShown] = useState(false);
  const [signedAgreement, setSignedAgreement] = useState(false);

  const { emails, ads, company } = data;
  const { address, legalName, taxNumber, signatoryName, signatoryTitle } =
    company;
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

  const agreementEl = (
    <SponsorsAdvertiseRequestAgreement
      address={`${addressString}, ${address.country}`}
      ads={ads}
      advertiserFullLegalName={legalName}
      authorizedSignatoryName={signatoryName}
      authorizedSignatoryTitle={signatoryTitle}
      contactEmails={emails}
      totalAmount={totalAmount}
    />
  );

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
        <Text className="mt-1 block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Review everything and make sure they are in order"
            description="Subtitle for review section"
            id="BGKx/h"
          />
        </Text>
        <div
          className={clsx('mt-8 flex flex-col gap-6', 'p-6', 'rounded', [
            themeBorderColor,
            'border',
          ])}>
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
                defaultMessage="Ads"
                description="Label for ads"
                id="aQYg46"
              />
            </Text>
            <div className={clsx('mt-2')}>
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
              <div className="flex justify-end">
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
            <CheckboxInput
              className="block"
              label={
                <FormattedMessage
                  defaultMessage="I represent and warrant that I am authorized to enter this Agreement on behalf of {companyName}, and by checking this box, I agree to the <link>Advertising Agreement</link>."
                  description="Accept agreement checkbox"
                  id="pMtDow"
                  values={{
                    companyName: data.company.legalName,
                    link: (chunks) => (
                      <Anchor onClick={() => setAgreementDialogShown(true)}>
                        {chunks}
                      </Anchor>
                    ),
                  }}
                />
              }
              value={signedAgreement}
              onChange={(value) => {
                setSignedAgreement(value);
              }}
            />
          </div>
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
        <Dialog
          isShown={agreementDialogShown}
          primaryButton={
            <Button
              label={intl.formatMessage({
                defaultMessage: 'I Accept',
                description: 'Accept an agreement',
                id: 'O2nyQ7',
              })}
              size="md"
              variant="primary"
              onClick={() => {
                setSignedAgreement(true);
                setAgreementDialogShown(false);
              }}
            />
          }
          scrollable={true}
          secondaryButton={
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Cancel label',
                id: 'KtshU7',
              })}
              size="md"
              variant="secondary"
              onClick={() => setAgreementDialogShown(false)}
            />
          }
          title=" "
          width="screen-lg"
          onClose={() => setAgreementDialogShown(false)}>
          {agreementEl}
        </Dialog>
        <div ref={agreementRef} className="hidden">
          {agreementEl}
        </div>
      </Section>
    </form>
  );
}
