'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useI18nRouter } from '~/next-i18nostic/src';

import SponsorsAdvertiseRequestReadonly from './ads/SponsorsAdvertiseRequestReadonly';
import SponsorsAdvertiseRequestForm from './SponsorsAdvertiseRequestForm';
import type {
  SponsorCompanyAddress,
  SponsorsAdFormatFormItem,
  SponsorsCompanyDetails,
} from './types';
import useSponsorsAdvertiseRequestFormData from './useSponsorsAdvertiseRequestFormData';

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
  const router = useI18nRouter();
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

  const needEmailVerification = adRequest.status === 'PENDING';

  const [emailVerified, setEmailVerified] = useState(!needEmailVerification);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setFormData] = useSponsorsAdvertiseRequestFormData('create');
  const [showEditMode, setShowEditMode] = useState(false);

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
        {adRequest.status === 'APPROVED' && emailVerified && !showEditMode && (
          <Alert
            className="mb-4 lg:mb-6"
            title={intl.formatMessage({
              defaultMessage: 'Request accepted',
              description: 'Title for accepted request alert',
              id: 'GUEj3Y',
            })}
            variant="success">
            <FormattedMessage
              defaultMessage="Your advertising request has been accepted. You can no longer make changes."
              description="Accepted request alert message"
              id="tK/YTk"
            />
          </Alert>
        )}
        {adRequest.status === 'REJECTED' && emailVerified && !showEditMode && (
          <div
            className={clsx(
              'flex flex-col gap-x-4 gap-y-3 md:flex-row lg:gap-x-6',
              'mb-4 flex-1 lg:mb-6',
            )}>
            <Alert
              className="flex-1"
              title={intl.formatMessage({
                defaultMessage: 'Request rejected',
                description: 'Title for rejected request alert',
                id: 'KkezqJ',
              })}
              variant="danger">
              <div>
                <FormattedMessage
                  defaultMessage="Your advertising request has been rejected. You can click edit your request and resubmit for approval."
                  description="Rejected request alert message"
                  id="TxVFaP"
                />
                <br />
                {/* TODO(sponsors): Add actual rejection reason */}
                <b>
                  <FormattedMessage
                    defaultMessage="Rejection reason"
                    description="Rejected request alert message"
                    id="JmBr/f"
                  />
                  :
                </b>{' '}
                Some reason.
              </div>
            </Alert>
            <Button
              className="mt-2"
              label={intl.formatMessage({
                defaultMessage: 'Modify and resubmit',
                description: 'Edit button label',
                id: '7Z0BWc',
              })}
              size="md"
              variant="secondary"
              onClick={() => {
                // Store it in local storage so that the user can access it in the new creation flow
                setFormData((prev) => ({
                  ...prev,
                  ads,
                  company,
                  emails: adRequest.emails,
                }));
                router.push('/advertise-with-us/request');
              }}
            />
          </div>
        )}
        {emailVerified && showEditMode && (
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
                  mode={adRequest.status === 'PENDING' ? 'edit' : 'readonly'}
                  requestId={adRequest.id}
                />
              </div>
            </Section>
          </>
        )}
        {emailVerified && !showEditMode && (
          <SponsorsAdvertiseRequestReadonly
            data={{
              ads,
              agreement: adRequest.agreement,
              company,
              createdAt: adRequest.createdAt,
              emails: adRequest.emails,
              updatedAt: adRequest.updatedAt,
            }}
            onEdit={
              adRequest.status === 'PENDING'
                ? () => setShowEditMode(true)
                : undefined
            }
          />
        )}
        {!emailVerified && (
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
            <Section>
              <div
                className={clsx('mt-12 w-full', 'flex flex-col items-center')}>
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
              </div>
            </Section>
          </>
        )}
      </Container>
    </div>
  );
}
