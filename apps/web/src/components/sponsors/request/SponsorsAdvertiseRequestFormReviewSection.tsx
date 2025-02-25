import clsx from 'clsx';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import SponsorsAdvertiseRequestAgreement from './SponsorsAdvertiseRequestAgreement';
import CheckboxInput from '~/components/ui/CheckboxInput';
import { useState } from 'react';

type Props = Readonly<{
  onPrevious: () => void;
  onSubmit: () => void;
}>;

export default function SponsorsAdvertiseRequestFormReviewSection({
  onSubmit,
  onPrevious,
}: Props) {
  const [signedAgreement, setSignedAgreement] = useState(false);
  const contactEmails = [
    'yangshun@greatfrontend.com',
    'nitesh@greatfrontend.com',
  ];
  const sponsorName = 'Facebook Reels';
  const advertiserFullLegalName = 'Meta Platforms, Inc.';
  const advertiserTaxNumber = 'UEN123456';
  const authorizedSignatoryName = 'Mark Zuckerberg';
  const authorizedSignatoryTitle = 'Co-founder, CEO';
  const address = {
    city: 'Menlo Park',
    country: 'US',
    line1: '1 Hacker Way',
    line2: '',
    postalCode: '94025',
    state: 'CA',
  };
  const addressString = [
    [address.line1, address.line2].filter(Boolean).join(', '),
    address.city,
    `${address.state} ${address.postalCode}`,
  ]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');
  const totalAmount = 6100;

  return (
    <div className="mx-auto w-full max-w-xl">
      <Heading level="heading6">Review and sign</Heading>
      <Section>
        <Text className="block" color="secondary">
          Review everything and make sure they are in order
        </Text>
        <div className="mt-8 flex flex-col gap-6">
          <div>
            <Text className="block" size="body2" weight="medium">
              Contact emails
            </Text>
            <Text className="block" color="secondary" size="body2">
              {contactEmails.join('; ')}
            </Text>
          </div>
          <div>
            <Text className="block" size="body2" weight="medium">
              Sponsor name
            </Text>
            <Text className="block" color="secondary" size="body2">
              {sponsorName}
            </Text>
          </div>
          <div>
            <Text className="block" size="body2" weight="medium">
              Ads
            </Text>
            <div
              className={clsx(
                'mt-1 rounded px-3 py-2',
                themeBorderColor,
                'border',
              )}>
              <div className="flex justify-between">
                <Text color="secondary" size="body2">
                  Global banner x 2 weeks
                </Text>
                <Text color="secondary" size="body2" weight="medium">
                  $2500
                </Text>
              </div>
              <div className="flex justify-between">
                <Text color="secondary" size="body2">
                  In-content x 3 weeks
                </Text>
                <Text color="secondary" size="body2" weight="medium">
                  $3600
                </Text>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between">
                <Text color="secondary" size="body2">
                  Total
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
                Company
              </Text>
              <Text className="block" color="secondary" size="body2">
                {advertiserFullLegalName}
              </Text>
              <Text className="block" color="secondary" size="body2">
                {advertiserTaxNumber}
              </Text>
            </div>
            <div>
              <Text className="block" size="body2" weight="medium">
                Address
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
              Authorized signatory
            </Text>
            <Text className="block" color="secondary" size="body2">
              {authorizedSignatoryName}, {authorizedSignatoryTitle}
            </Text>
          </div>
          <div>
            <Text className="block" size="body2" weight="medium">
              Agreement
            </Text>
            <Text className="block" color="error" size="body2">
              Please accept the agreement by selecting the checkbox at the end
              of the agreement
            </Text>
            <div
              className={clsx('mt-2 rounded p-5', themeBorderColor, 'border')}>
              <SponsorsAdvertiseRequestAgreement
                address={`${addressString}, ${address.country}`}
                advertiserFullLegalName={advertiserFullLegalName}
                authorizedSignatoryName={authorizedSignatoryName}
                authorizedSignatoryTitle={authorizedSignatoryTitle}
                contactEmails={contactEmails}
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
            label="Previous"
            size="md"
            variant="secondary"
            onClick={() => {
              onPrevious();
            }}
          />
          <Button
            icon={RiArrowRightLine}
            label="Submit"
            size="md"
            isDisabled={!signedAgreement}
            variant="primary"
            onClick={() => {
              onSubmit();
            }}
          />
        </div>
      </Section>
    </div>
  );
}
