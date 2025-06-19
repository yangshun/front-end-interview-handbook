'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { useEffectOnce } from 'usehooks-ts';

import { SPONSORS_SPONSOR_MANAGER_EMAIL } from '~/data/SponsorsConfig';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

import useSponsorsAdvertiseRequestFormData from './useSponsorsAdvertiseRequestFormData';

type Props = Readonly<{
  mode: 'create' | 'update';
}>;

export default function SponsorsAdvertiseRequestSuccessPage({ mode }: Props) {
  const intl = useIntl();
  const [, , removeFormData] = useSponsorsAdvertiseRequestFormData();

  useEffectOnce(() => {
    // Clear the saved data
    removeFormData();
  });

  return (
    <Container className="py-16" width="marketing">
      <div className="flex flex-col items-center space-y-6">
        <RiCheckboxCircleLine
          aria-hidden={true}
          className={clsx('size-16 shrink-0', themeTextSuccessColor)}
        />
        <div className="flex flex-col gap-y-2">
          <Heading level="heading4">
            {mode === 'create' && (
              <FormattedMessage
                defaultMessage="Your request has been received"
                description="Title for advertise request page"
                id="EGDkQQ"
              />
            )}
            {mode === 'update' && (
              <FormattedMessage
                defaultMessage="Your changes have been saved"
                description="Title for advertise request page"
                id="/qIzgw"
              />
            )}
          </Heading>
        </div>
        <Text
          className="text-pretty block max-w-md text-center"
          color="secondary"
          size="body1">
          <FormattedMessage
            defaultMessage="We will review your advertising request and get back to you with the confirmation and payment in {approvalDays} business days."
            description="Advertise request success message"
            id="Mai1gI"
            values={{
              approvalDays: '1-2',
            }}
          />
        </Text>
        <Text
          className="text-pretty block max-w-md text-center"
          color="secondary"
          size="body1">
          <FormattedMessage
            defaultMessage="Meanwhile, if you have any questions, feel free to reach out to us at <link>{email}</link>."
            description="Advertise request success message"
            id="DqzUW4"
            values={{
              email: SPONSORS_SPONSOR_MANAGER_EMAIL,
              link: (chunks) => (
                <Anchor href={`mailto:${SPONSORS_SPONSOR_MANAGER_EMAIL}`}>
                  {chunks}
                </Anchor>
              ),
            }}
          />
        </Text>
        <Button
          className="mt-10"
          href="/advertise-with-us"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Go back',
            description: 'Go back button label',
            id: 'Ie6Nzu',
          })}
          size="md"
          variant="primary"
        />
      </div>
    </Container>
  );
}
