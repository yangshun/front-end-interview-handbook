'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import type {
  SponsorCompanyAddress,
  SponsorsAdFormatFormItem,
  SponsorsCompanyDetails,
} from '~/components/sponsors/request/types';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import SponsorsAdminAdRequestMessage from './SponsorsAdminAdRequestMessage';
import SponsorsAdvertiseRequestForm from '../request/SponsorsAdvertiseRequestForm';
import SponsorsAdvertiseRequestReadonly from '../request/SponsorsAdvertiseRequestReadonly';

type Props = Readonly<{
  requestId: string;
}>;

export default function SponsorsAdminAdRequestPage({ requestId }: Props) {
  const { data: adRequest, isLoading } = trpc.sponsors.adRequest.useQuery({
    id: requestId,
  });

  const [showEditMode, setShowEditMode] = useState(false);

  if (isLoading || !adRequest) {
    return (
      <Container
        className={clsx(
          'py-12',
          'lg:py-20',
          'flex flex-col items-center justify-center',
        )}
        width="app">
        <Spinner />
      </Container>
    );
  }

  const { review } = adRequest;
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

  return (
    <div>
      <Container className={clsx('py-12', 'lg:py-20')} width="app">
        {showEditMode && (
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
            <Section>
              <div className={clsx('mt-12 w-full')}>
                <SponsorsAdvertiseRequestForm
                  defaultValues={{
                    ads,
                    company,
                    emails: adRequest.emails,
                  }}
                  mode="edit"
                  requestId={adRequest.id}
                />
              </div>
            </Section>
          </>
        )}
        {!showEditMode && (
          <SponsorsAdvertiseRequestReadonly
            alertMessage={
              <SponsorsAdminAdRequestMessage
                requestId={requestId}
                review={review}
                status={adRequest.status}
              />
            }
            data={{
              ads,
              agreement: adRequest.agreement,
              company,
              createdAt: adRequest.createdAt,
              emails: adRequest.emails,
              updatedAt: adRequest.updatedAt,
            }}
            mode="review"
            onEdit={() => setShowEditMode(true)}
          />
        )}
      </Container>
    </div>
  );
}
