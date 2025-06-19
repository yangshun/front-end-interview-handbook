import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiFileCopyLine,
  RiInformationLine,
} from 'react-icons/ri';
import type Stripe from 'stripe';
import url from 'url';

import { trpc } from '~/hooks/trpc';
import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import { SCROLL_HASH_PROMOTIONS_STUDENT_DISCOUNT } from '~/hooks/useScrollToHash';

import { PROMO_STUDENT_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { FormattedMessage, useIntl } from '~/components/intl';
import PurchaseBlockCard from '~/components/purchase/PurchaseBlockCard';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import PromotionCard from '../PromotionCard';
import { PromotionsEmailUsLink } from '../PromotionsEmailUsLink';
import { isValidStudentEmail } from './studentEmail';
import usePromotionsStudentDiscountLabels from './usePromotionsStudentDiscountLabels';

type Props = Readonly<{
  variant?: 'compact' | 'full';
}>;

export function PromotionsStudentDiscountCard({ variant = 'full' }: Props) {
  const intl = useIntl();
  const user = useUser();
  const trpcUtils = trpc.useUtils();
  const labels = usePromotionsStudentDiscountLabels();
  const discountPercentage = PROMO_STUDENT_DISCOUNT_PERCENTAGE;
  const { userProfile } = useUserProfile();
  const [promoCode, setPromoCode] = useState<Stripe.PromotionCode | null>(null);
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);
  const { data: existingPromoCode } =
    trpc.promotions.getStudentDiscountPromoCode.useQuery(undefined, {
      enabled: user != null,
    });
  const {
    isLoading: isGeneratingStudentDiscount,
    mutate: generateStudentDiscountPromoCode,
  } = trpc.promotions.generateStudentDiscountPromoCode.useMutation({
    onSuccess: (data) => {
      setPromoCode(data);
      trpcUtils.promotions.userPromoCodes.invalidate();
    },
  });
  const { signInUpHref } = useAuthSignInUp();

  if (variant === 'compact') {
    return (
      <PromotionCard
        addOnLabel={
          <Text className="text-sm lg:text-xs" color="secondary" size="inherit">
            <FormattedMessage
              defaultMessage="OFF"
              description="Amount cashback/discount"
              id="piqimi"
            />
          </Text>
        }
        discountLabel={`${discountPercentage}%`}
        footer={
          <div className="ms:mr-0 -mb-1.5 -mr-3 sm:-ml-3 sm:mb-0 sm:w-full">
            {(() => {
              const promoCodeToDisplay = promoCode ?? existingPromoCode ?? null;

              if (promoCodeToDisplay) {
                return (
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      icon={RiFileCopyLine}
                      label={
                        isCopied
                          ? intl.formatMessage({
                              defaultMessage: 'Copied!',
                              description:
                                'Indication that text has been copied',
                              id: 'EHngws',
                            })
                          : promoCodeToDisplay.code
                      }
                      size="md"
                      variant="tertiary"
                      onClick={() => {
                        onCopy(promoCodeToDisplay.code);
                      }}
                    />
                    <Tooltip
                      label={
                        <FormattedMessage
                          defaultMessage="Code expires on {expiryDate}."
                          description="Instruction to apply discount"
                          id="fKjzxf"
                          values={{
                            expiryDate: new Intl.DateTimeFormat(undefined, {
                              dateStyle: 'medium',
                            }).format(promoCodeToDisplay.expires_at! * 1000),
                          }}
                        />
                      }>
                      <RiInformationLine
                        className={clsx(
                          'size-4 relative z-[1] shrink-0',
                          themeTextSubtleColor,
                        )}
                      />
                    </Tooltip>
                  </div>
                );
              }

              return (
                <Button
                  href={url.format({
                    hash: SCROLL_HASH_PROMOTIONS_STUDENT_DISCOUNT,
                    pathname: '/promotions',
                  })}
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'For existing students',
                    description: 'Button label for student discount',
                    id: 'uaC2ny',
                  })}
                  size="md"
                  variant="tertiary"
                />
              );
            })()}
          </div>
        }
        header={
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'Student',
              description: 'Badge label for student promotion',
              id: 'zmCysL',
            })}
            size="sm"
            variant="neutral-active"
          />
        }
      />
    );
  }

  return (
    <PurchaseBlockCard
      features={[
        intl.formatMessage({
          defaultMessage:
            'Exclusive to currently enrolled students at accredited educational institutions.',
          description: 'Condition for promotion',
          id: '4kQ6Kr',
        }),
        intl.formatMessage({
          defaultMessage:
            'Your account email contains ".edu", ".ac", or other institutional second-level domains. Reach out to us if you believe your school should qualify.',
          description: 'Condition for promotion',
          id: 'hhuG8E',
        }),
      ]}
      footer={
        <Text
          className="flex flex-wrap justify-between gap-4"
          color="secondary"
          size="body3">
          <span>
            <FormattedMessage
              defaultMessage="More on <link>Students Discount Terms and Conditions</link>"
              description="Link for discount terms and conditions"
              id="t+g7fF"
              values={{
                link: (chunks) => (
                  <Anchor
                    className="mx-auto justify-center whitespace-nowrap font-medium"
                    href="/legal/student-discount">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </span>
          <PromotionsEmailUsLink />
        </Text>
      }
      leftSectionContents={
        <>
          <div className="mt-4 flex items-end gap-1">
            <Text
              className={clsx('inline-flex items-center text-5xl font-bold')}>
              {discountPercentage}%
            </Text>
            <Text className="text-xl font-medium" color="label" weight="bold">
              <FormattedMessage
                defaultMessage="OFF"
                description="Amount cashback/discount"
                id="piqimi"
              />
            </Text>
          </div>
          <Text
            className="mt-4 block"
            color="secondary"
            size="body2"
            weight="medium">
            <FormattedMessage
              defaultMessage="GreatFrontEnd Annual"
              description="GFE annual plan"
              id="GDgFZ0"
            />
          </Text>
          <div className="mt-4">
            {(() => {
              if (user == null) {
                return (
                  <Button
                    display="block"
                    href={signInUpHref({
                      query: { source: 'student_discount' },
                    })}
                    label={intl.formatMessage({
                      defaultMessage: 'Sign up with school email',
                      description: 'Button label',
                      id: 'z1Offf',
                    })}
                    size="md"
                    type="button"
                    variant="primary"
                  />
                );
              }

              if (userProfile?.isInterviewsPremium) {
                return (
                  <Button
                    display="block"
                    isDisabled={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Premium accounts are not eligible',
                      description: 'Button label for student discount',
                      id: 'r/YoFx',
                    })}
                    size="md"
                    type="button"
                    variant="secondary"
                  />
                );
              }

              if (
                user.email != null &&
                !isValidStudentEmail(user.email).valid
              ) {
                return (
                  <Button
                    display="block"
                    isDisabled={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Invalid student email',
                      description: 'Button label for student discount',
                      id: 'cx8XeF',
                    })}
                    size="md"
                    type="button"
                    variant="primary"
                  />
                );
              }

              const promoCodeToDisplay = promoCode ?? existingPromoCode ?? null;

              if (promoCodeToDisplay) {
                return (
                  <div>
                    <Button
                      display="block"
                      icon={RiFileCopyLine}
                      label={
                        isCopied
                          ? intl.formatMessage({
                              defaultMessage: 'Copied!',
                              description:
                                'Indication that text has been copied',
                              id: 'EHngws',
                            })
                          : promoCodeToDisplay.code
                      }
                      size="md"
                      type="button"
                      variant="primary"
                      onClick={() => {
                        onCopy(promoCodeToDisplay.code);
                      }}
                    />
                    <Text className="mt-2 block" color="secondary" size="body3">
                      <FormattedMessage
                        defaultMessage="Use code at checkout. Code expires on {expiryDate}."
                        description="Instruction to apply discount"
                        id="UxRVYP"
                        values={{
                          expiryDate: new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'medium',
                          }).format(promoCodeToDisplay.expires_at! * 1000),
                        }}
                      />
                    </Text>
                  </div>
                );
              }

              return (
                <Button
                  display="block"
                  isDisabled={isGeneratingStudentDiscount}
                  isLoading={isGeneratingStudentDiscount}
                  label={intl.formatMessage({
                    defaultMessage: 'Get promo code',
                    description: 'Button label for student discount',
                    id: 'IQ9qW7',
                  })}
                  size="md"
                  type="button"
                  variant="primary"
                  onClick={() => {
                    generateStudentDiscountPromoCode();
                  }}
                />
              );
            })()}
          </div>
        </>
      }
      subtitle={labels.subtitle}
      title={labels.title}
    />
  );
}
