'use client';

import { useState } from 'react';
import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiFileCopyLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import RewardsTicket from '~/components/rewards/RewardsTicket';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import Button from '../ui/Button';
import Dialog from '../ui/Dialog';

const PROMO_CODE = 'GENCODE';
const EXPIRY_DATE = '14/01/24';
const DISCOUNT_PERCENTAGE = 20;

export default function RewardsComplete() {
  const intl = useIntl();
  const toast = useToast();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);
  const [isShown, setIsShown] = useState(false);

  function handleCopy() {
    onCopy(PROMO_CODE);
    toast.showToast({
      title: intl.formatMessage({
        defaultMessage: 'Promo code copied!',
        description: 'Success message shown when promo code is copied',
        id: 'TvPbBZ',
      }),
      variant: 'success',
    });
  }

  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 pt-8 sm:px-4 lg:pt-12 gap-y-2 sm:gap-y-4">
      <RiCheckboxCircleLine className="text-success h-16 w-16" />
      <div className="flex flex-col items-center">
        <Heading level="heading3">
          <FormattedMessage
            defaultMessage="All tasks completed!"
            description="Title for rewards complete page"
            id="4s0hMm"
          />
        </Heading>
        <Heading level="heading3">
          <FormattedMessage
            defaultMessage="Enjoy your exclusive promo code"
            description="Title for rewards complete page"
            id="tMvSIc"
          />
        </Heading>
      </div>
      <div>
        <Text
          className="text-center"
          color="secondary"
          display="block"
          size="body1">
          <FormattedMessage
            defaultMessage="This is a one-time use promo code exclusive to your account."
            description="Subtext for rewards complete page"
            id="Wx0nGc"
          />
        </Text>
        <Text
          className="text-center"
          color="secondary"
          display="block"
          size="body1">
          <FormattedMessage
            defaultMessage="We also send the promo code to your email."
            description="Subtext for rewards complete page"
            id="TGDIEP"
          />
        </Text>
      </div>
      <div className="pt-8">
        <RewardsTicket
          ratio="wide"
          subtitle={intl.formatMessage(
            {
              defaultMessage:
                'Exp on {EXPIRY_DATE} • {DISCOUNT_PERCENTAGE}% off all plans',
              description: 'Subtext for rewards complete page',
              id: 'd15liP',
            },
            {
              DISCOUNT_PERCENTAGE,
              EXPIRY_DATE,
            },
          )}
          title={PROMO_CODE}
          width={400}
        />
      </div>
      <div className="pb-8 pt-4 flex flex-col gap-x-24 gap-y-4 self-stretch max-w-2xl sm:mt-0 sm:flex-row sm:self-auto">
        <Button
          className="self-stretch sm:self-auto"
          icon={RiFileCopyLine}
          label={intl.formatMessage({
            defaultMessage: 'Copy to clipboard',
            description: 'Button label for copy button',
            id: 'QrikGf',
          })}
          size="md"
          variant="secondary"
          onClick={() => handleCopy()}
        />
        <Button
          className="self-stretch sm:self-auto"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Use now',
            description: 'Button label for use now button',
            id: 'RfVhtP',
          })}
          size="md"
          variant="primary"
          onClick={() => setIsShown(true)}
        />
      </div>

      <Dialog
        isShown={isShown}
        primaryButton={
          <Button
            label="Primary Action"
            size="md"
            variant="primary"
            onClick={() => setIsShown(false)}
          />
        }
        secondaryButton={
          <Button
            label="Secondary Action"
            size="md"
            variant="secondary"
            onClick={() => setIsShown(false)}
          />
        }
        title="Pricing plans"
        onClose={() => setIsShown(false)}>
        <div>TODO: Add pricing plans here</div>
      </Dialog>
    </div>
  );
}
