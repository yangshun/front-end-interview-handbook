'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import SponsorsAdvertiseRequestForm from './SponsorsAdvertiseRequestForm';
import type {
  SponsorCompanyAddress,
  SponsorsAdFormatFormItem,
  SponsorsCompanyDetails,
} from './types';

import type {
  SponsorsAd,
  SponsorsAdRequest,
  SponsorsAdSlot,
} from '@prisma/client';

type Props = Readonly<{
  adRequest: SponsorsAdRequest & {
    ads: ReadonlyArray<
      SponsorsAd & {
        slots: ReadonlyArray<SponsorsAdSlot>;
      }
    >;
  };
}>;

export default function SponsorsAdvertiseRequestEditPage({ adRequest }: Props) {
  const intl = useIntl();
  const company: SponsorsCompanyDetails = {
    address: adRequest.address as SponsorCompanyAddress,
    legalName: adRequest.legalName,
    signatoryName: adRequest.signatoryName,
    signatoryTitle: adRequest.signatoryTitle,
    taxNumber: adRequest.taxNumber ?? '',
  };
  const ads: Array<SponsorsAdFormatFormItem> = adRequest.ads.map((ad) => {
    const baseAd = {
      id: ad.id,
      sponsorName: ad.sponsorName,
      text: ad.title,
      url: ad.url,
      weeks: ad.slots.map((slot) => `${slot.year}/${slot.week}`),
    };

    switch (ad.format) {
      case 'GLOBAL_BANNER':
        return { ...baseAd, format: 'GLOBAL_BANNER' };

      case 'SPOTLIGHT':
        return { ...baseAd, format: 'SPOTLIGHT', imageUrl: ad.imageUrl ?? '' };

      default:
        return {
          ...baseAd,
          body: ad.body ?? '',
          format: 'IN_CONTENT',
          imageUrl: ad.imageUrl ?? '',
        };
    }
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;

    if (adRequest.emails.includes(email)) {
      setEmailVerified(true);
    } else {
      setErrorMessage(
        intl.formatMessage({
          defaultMessage: 'Email does not match any of the emails provided',
          description: 'Error message for invalid email',
          id: 'apH5pY',
        }),
      );
    }
  }

  return (
    <div>
      <Container
        className={clsx(
          'py-12',
          'lg:py-20',
          !emailVerified && 'flex flex-col items-center',
        )}
        width="marketing">
        {emailVerified ? (
          <>
            <Heading level="heading4">
              <FormattedMessage
                defaultMessage="Advertise on GreatFrontEnd"
                description="Title for advertise request page"
                id="P4PHei"
              />
            </Heading>
            <Text className="mt-4 block max-w-prose" color="subtitle">
              <FormattedMessage
                defaultMessage="Fill this super quick form to start advertising! Upon approval ({approvalDays}
        days), you will receive a confirmation email with the invoice and
        payment link."
                description="Subtitle for advertise request page"
                id="CILeO3"
                values={{
                  approvalDays: '1-2',
                }}
              />
            </Text>
          </>
        ) : (
          <>
            <Heading className="text-center" level="heading4">
              <FormattedMessage
                defaultMessage="Verify to Access Your Request"
                description="Title for advertise request page"
                id="X1OhvD"
              />
            </Heading>
            <Text
              className="mt-4 block max-w-prose text-center"
              color="subtitle">
              <FormattedMessage
                defaultMessage="To access your advertising request on GreatFrontend, please enter any one of the emails you provided during the request creation. This helps us ensure secure and authorized modifications to your request."
                description="Subtitle for advertise request page"
                id="rFIHeM"
                values={{
                  approvalDays: '1-2',
                }}
              />
            </Text>
          </>
        )}

        <Section>
          <div
            className={clsx(
              'mt-12 w-full',
              !emailVerified && 'flex flex-col items-center',
            )}>
            {emailVerified ? (
              <SponsorsAdvertiseRequestForm
                defaultValues={{
                  ads,
                  company,
                  emails: adRequest.emails,
                }}
                mode="edit"
                requestId={adRequest.id}
              />
            ) : (
              <form
                className="flex w-full max-w-sm flex-col items-center"
                onSubmit={(e) => onSubmit(e)}>
                <TextInput
                  classNameOuter="w-full"
                  errorMessage={errorMessage}
                  isLabelHidden={true}
                  label="Email"
                  name="email"
                  placeholder="john.doe@example.com"
                />
                <Button
                  className="mt-8"
                  icon={RiArrowRightLine}
                  label="Verify"
                  size="md"
                  type="submit"
                  variant="primary"
                />
              </form>
            )}
          </div>
        </Section>
      </Container>
    </div>
  );
}
