'use client';

import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiFileCopyLine, RiPercentLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { themeBorderColor, themeDivideColor } from '../ui/theme';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function CopyCodeButton({ code }: { code: string }) {
  const intl = useIntl();

  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  return (
    <Button
      icon={isCopied ? FaCheck : RiFileCopyLine}
      isLabelHidden={true}
      label={
        isCopied
          ? intl.formatMessage({
              defaultMessage: 'Copied',
              description: 'Copied state button label',
              id: '+gYfrY',
            })
          : intl.formatMessage({
              defaultMessage: 'Copy promo code',
              description: 'Copy button label',
              id: '3IiqOd',
            })
      }
      size="xs"
      variant="tertiary"
      onClick={() => onCopy(code)}
    />
  );
}

export default function ProfileCoupons() {
  const intl = useIntl();
  const profilePromoCodes = trpc.marketing.userPromoCodes.useQuery();

  if (profilePromoCodes.isLoading) {
    return (
      <div className="py-10">
        <Spinner display="block" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Coupons"
          description="Screenreader text for account settings."
          id="oy3YYM"
        />
      </Heading>
      <Section>
        {profilePromoCodes.data == null ||
        profilePromoCodes.data?.data.length === 0 ? (
          <EmptyState
            icon={RiPercentLine}
            subtitle={
              <FormattedMessage
                defaultMessage="Check out the available <link>promotions</link>."
                description="Promotional message"
                id="vpXZzv"
                values={{
                  link: (chunks) => (
                    <Anchor href="/promotions">{chunks}</Anchor>
                  ),
                }}
              />
            }
            title={intl.formatMessage({
              defaultMessage: 'No coupons available',
              description: 'Title of empty state on coupons page',
              id: 'QAFkOT',
            })}
          />
        ) : (
          <div className="flex min-w-full flex-col gap-y-4">
            <table
              className={clsx(
                'rounded-sm',
                'border',
                themeBorderColor,
                'divide-y',
                themeDivideColor,
              )}>
              <thead>
                <tr>
                  <th className="py-3 pl-4 pr-3 text-left">
                    <Text size="body2" weight="medium">
                      Promo name
                    </Text>
                  </th>
                  <th className="py-3 pl-4 pr-3 text-left">
                    <Text size="body2" weight="medium">
                      Code
                    </Text>
                  </th>
                  <th className="py-3 pl-4 pr-3 text-left">
                    <Text size="body2" weight="medium">
                      Discount
                    </Text>
                  </th>
                  <th className="py-3 pl-4 pr-3 text-left">
                    <Text size="body2" weight="medium">
                      Expires
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody className={clsx('divide-y', themeDivideColor)}>
                {profilePromoCodes.data?.data.map((promoCode) => (
                  <tr key={promoCode.id} className="py-2">
                    <td className="py-3 pl-4 pr-3">
                      <Text size="body2">{promoCode.coupon.name}</Text>
                    </td>
                    <td className="py-3 pl-4 pr-3">
                      <span className="flex items-center gap-1">
                        <Text size="body2" weight="bold">
                          {promoCode.code}
                        </Text>
                        <CopyCodeButton code={promoCode.code} />
                      </span>
                    </td>
                    <td className="py-3 pl-4 pr-3">
                      <Text color="secondary" size="body2">
                        {promoCode.coupon.percent_off}%
                      </Text>
                    </td>
                    <td className="py-3 pl-4 pr-3">
                      <Text color="secondary" size="body2">
                        {promoCode.expires_at
                          ? dateFormatter.format(promoCode.expires_at * 1000)
                          : 'N/A'}
                      </Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Text className="block" size="body2">
              <FormattedMessage
                defaultMessage="Check out other available <link>promotions</link>."
                description="Promotional message"
                id="ofFMGr"
                values={{
                  link: (chunks) => (
                    <Anchor href="/promotions">{chunks}</Anchor>
                  ),
                }}
              />
            </Text>
          </div>
        )}
      </Section>
    </div>
  );
}
