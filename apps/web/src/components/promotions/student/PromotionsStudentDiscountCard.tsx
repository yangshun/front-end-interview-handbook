import clsx from 'clsx';
import { useState } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';
import type Stripe from 'stripe';

import { trpc } from '~/hooks/trpc';
import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { STUDENT_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { FormattedMessage, useIntl } from '~/components/intl';
import PurchaseBlockCard from '~/components/purchase/PurchaseBlockCard';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { isValidStudentEmail } from './studentEmail';
import usePromotionsStudentDiscountLabels from './usePromotionsStudentDiscountLabels';
import { PromotionsEmailUsLink } from '../PromotionsEmailUsLink';

import { useUser } from '@supabase/auth-helpers-react';

export function PromotionsStudentDiscountCard() {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const labels = usePromotionsStudentDiscountLabels();
  const discountPercentage = STUDENT_DISCOUNT_PERCENTAGE;
  const user = useUser();
  const { userProfile } = useUserProfile();
  const [promoCode, setPromoCode] = useState<Stripe.PromotionCode | null>(null);
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);
  const { data: existingPromoCode } =
    trpc.marketing.getStudentDiscountPromoCode.useQuery();
  const {
    isLoading: isGeneratingStudentDiscount,
    mutate: generateStudentDiscountPromoCode,
  } = trpc.marketing.generateStudentDiscountPromoCode.useMutation({
    onSuccess: (data) => {
      setPromoCode(data);
      trpcUtils.marketing.userPromoCodes.invalidate();
    },
  });
  const { signInUpHref } = useAuthSignInUp();

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
            'Your account email contains ".edu", ".ac" or certain other valid institutions. Reach out to us if you believe your school should qualify.',
          description: 'Condition for promotion',
          id: 'sGwT8p',
        }),
      ]}
      footer={
        <Text
          className="flex justify-between gap-x-4"
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
      rightSectionContents={
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
