import clsx from 'clsx';
import { RiLockLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

export default function InterviewsPurchasePaywallSmall({
  subtitle: subtitleProp,
  title: titleProp,
}: Readonly<{
  subtitle?: string;
  title?: string;
}>) {
  const intl = useIntl();

  const title =
    titleProp ??
    intl.formatMessage({
      defaultMessage: 'Premium feature',
      description:
        'Title on question paywall appearing on the question pages of premium questions',
      id: 'DSAK89',
    });

  const subtitle =
    subtitleProp ??
    intl.formatMessage({
      defaultMessage: 'Purchase premium to unlock full access to the question.',
      description:
        'Subtitle on question paywall appearing on the question pages of premium questions',
      id: 'jVSwXw',
    });

  return (
    <div
      className={clsx('flex items-center gap-x-2 rounded p-3', [
        'border',
        themeBorderColor,
      ])}>
      <RiLockLine
        aria-hidden={true}
        className="size-8 shrink-0 text-neutral-500"
      />
      <div className="flex grow flex-col gap-y-1">
        <Text className="block" size="body3" weight="bold">
          {title}
        </Text>
        <Text className="block" color="secondary" size="body3">
          {subtitle}
        </Text>
      </div>
      <Button
        href="/interviews/pricing"
        label={intl.formatMessage({
          defaultMessage: 'View plans',
          description:
            'Button displayed on paywall on premium question pages, leading to our pricing plans',
          id: 'pRCMpc',
        })}
        size="xs"
        variant="primary"
      />
    </div>
  );
}
