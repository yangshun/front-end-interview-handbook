'use client';

import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { themeDivideColor, themeLineColor } from '../ui/theme';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function ProfileCoupons() {
  const intl = useIntl();

  const profilePromoCodes = trpc.marketing.userPromoCodes.useQuery();

  return (
    <div className="flex flex-col gap-y-6">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Coupons"
          description="Screenreader text for account settings."
          id="oy3YYM"
        />
      </Heading>
      <Section>
        {profilePromoCodes.isLoading ? (
          <Spinner label="Loading..." size="md" />
        ) : profilePromoCodes.data?.data.length === 0 ? (
          <EmptyState
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
              defaultMessage: 'No promo codes available',
              description: 'Title of GreatFrontEnd page',
              id: 'uRMJks',
            })}
          />
        ) : (
          <div className="flex flex-col gap-y-4 min-w-full">
            <table
              className={clsx(
                'rounded-sm',
                'border',
                themeLineColor,
                'divide-y',
                themeDivideColor,
              )}>
              <thead>
                <th className="py-3 pl-4 pr-3 text-left">
                  <Text size="body2" weight="medium">
                    Promo code
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
              </thead>
              <tbody className={clsx('divide-y', themeDivideColor)}>
                {profilePromoCodes.data?.data.map((promoCode) => (
                  <tr key={promoCode.id} className="py-2">
                    <td className="py-3 pl-4 pr-3">
                      <Text size="body2" weight="bold">
                        {promoCode.code}
                      </Text>
                    </td>
                    <td className="py-3 pl-4 pr-3">
                      <Text color="secondary" size="body2">
                        {promoCode.coupon.percent_off}%
                      </Text>
                    </td>
                    <td className="py-3 pl-4 pr-3">
                      {promoCode.expires_at && (
                        <Text color="secondary" size="body2">
                          {dateFormatter.format(promoCode.expires_at * 1000)}
                        </Text>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Text display="block" size="body2">
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
