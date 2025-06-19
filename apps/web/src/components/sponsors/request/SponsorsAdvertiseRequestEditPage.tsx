'use client';

import type {
  SponsorsAd,
  SponsorsAdRequest,
  SponsorsAdRequestStatus,
  SponsorsAdSlot,
} from '@prisma/client';
import clsx from 'clsx';
import { useQueryState } from 'nuqs';
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

import SponsorsAdvertiseRequestForm from './SponsorsAdvertiseRequestForm';
import SponsorsAdvertiseRequestReadonly from './SponsorsAdvertiseRequestReadonly';
import type {
  SponsorCompanyAddress,
  SponsorsAdFormatFormItem,
  SponsorsCompanyDetails,
} from './types';
import useSponsorsAdvertiseRequestFormData from './useSponsorsAdvertiseRequestFormData';

type Props = Readonly<{
  adRequest: SponsorsAdRequest & {
    ads: ReadonlyArray<
      SponsorsAd & {
        slots: ReadonlyArray<SponsorsAdSlot>;
      }
    >;
    review: Readonly<{
      comments: string | null;
    }> | null;
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

  const [emailVerified, setEmailVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setFormData] = useSponsorsAdvertiseRequestFormData('create');
  const [showEditMode, setShowEditMode] = useQueryState<boolean>('edit', {
    defaultValue: false,
    history: 'push',
    parse: (value) => value === 'true',
  });
  const [advertiserEmail, setAdvertiserEmail] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (adRequest.emails.includes(advertiserEmail)) {
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
                  advertiserEmail={advertiserEmail}
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
        {!showEditMode && (
          <SponsorsAdvertiseRequestReadonly
            alertMessage={
              <RequestAlertMessage
                reviewComments={adRequest.review?.comments}
                status={adRequest.status}
                onModify={() => {
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
            }
            data={{
              ads,
              agreement: adRequest.agreement,
              company,
              createdAt: adRequest.createdAt,
              emails: adRequest.emails,
              review: null,
              updatedAt: adRequest.updatedAt,
            }}
            onEdit={
              adRequest.status === 'PENDING'
                ? () => setShowEditMode(true)
                : undefined
            }
          />
        )}
        {!emailVerified && showEditMode && (
          <>
            <Heading className="text-center" level="heading4">
              <FormattedMessage
                defaultMessage="Verify to access your request"
                description="Title for advertise request page"
                id="5euXel"
              />
            </Heading>
            <Text
              className="mt-4 block max-w-prose text-center"
              color="subtitle">
              <FormattedMessage
                defaultMessage="To access your advertising request on GreatFrontEnd, please enter any one of the emails you provided during the request creation. This helps us ensure secure and authorized modifications to your request."
                description="Subtitle for advertise request page"
                id="jxT+kI"
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
                    label={intl.formatMessage({
                      defaultMessage: 'Email',
                      description: 'Label for email field',
                      id: 'bGKAyO',
                    })}
                    name="email"
                    placeholder="john.doe@example.com"
                    value={advertiserEmail}
                    onChange={setAdvertiserEmail}
                  />
                  <Button
                    className="mt-8"
                    icon={RiArrowRightLine}
                    label={intl.formatMessage({
                      defaultMessage: 'Verify',
                      description: 'Verify button label',
                      id: '5udMqb',
                    })}
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

function RequestAlertMessage({
  onModify,
  reviewComments,
  status,
}: Readonly<{
  onModify: () => void;
  reviewComments?: string | null;
  status: SponsorsAdRequestStatus;
}>) {
  const intl = useIntl();

  return (
    <>
      {status === 'APPROVED' && (
        <Alert
          className="mb-4 lg:mb-6"
          title={intl.formatMessage({
            defaultMessage: 'Request approved',
            description: 'Title for accepted request alert',
            id: 'VoVHwh',
          })}
          variant="info">
          <FormattedMessage
            defaultMessage="Your advertising request has been approved. You can no longer make changes."
            description="Accepted request alert message"
            id="0YqU5d"
          />
        </Alert>
      )}
      {status === 'PUBLISHED' && (
        <Alert
          className="mb-4 lg:mb-6"
          title={intl.formatMessage({
            defaultMessage: 'Request confirmed',
            description: 'Title for accepted request alert',
            id: 'OZ9+0K',
          })}
          variant="success">
          <FormattedMessage
            defaultMessage="Your advertising request has been accepted, payment has been received, and your booking is confirmed. Please note that no further changes can be made."
            description="Accepted confirmed alert message"
            id="H+ByKq"
          />
        </Alert>
      )}
      {status === 'REJECTED' && (
        <Alert
          className="mb-4 flex-1 lg:mb-6"
          title={intl.formatMessage({
            defaultMessage: 'Request rejected',
            description: 'Title for rejected request alert',
            id: 'KkezqJ',
          })}
          variant="danger">
          <div className="flex flex-col items-start gap-x-4 gap-y-2 md:flex-row lg:gap-x-6">
            <div className="flex-1">
              <FormattedMessage
                defaultMessage="Your advertising request has been rejected. You can click edit your request and resubmit for approval."
                description="Rejected request alert message"
                id="TxVFaP"
              />
              {reviewComments && (
                <>
                  <br />
                  <strong>
                    <FormattedMessage
                      defaultMessage="Rejection reason"
                      description="Rejected request alert message"
                      id="JmBr/f"
                    />
                    :
                  </strong>{' '}
                  {reviewComments}
                </>
              )}
            </div>
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Modify and resubmit',
                description: 'Edit button label',
                id: '7Z0BWc',
              })}
              size="md"
              variant="secondary"
              onClick={onModify}
            />
          </div>
        </Alert>
      )}
    </>
  );
}
