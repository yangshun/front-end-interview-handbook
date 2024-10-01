import clsx from 'clsx';
import { RiLockLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

export default function QuestionPaywallSmall({
  title: titleProp,
  subtitle: subtitleProp,
}: Readonly<{
  subtitle?: string;
  title?: string;
}>) {
  const intl = useIntl();

  const title =
    titleProp ??
    intl.formatMessage({
      defaultMessage: 'Premium Feature',
      description:
        'Title on question paywall appearing on the question pages of premium questions',
      id: 'GVHds/',
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
      className={clsx(
        'flex items-center space-x-2 rounded border p-3',
        themeBorderColor,
      )}>
      <RiLockLine className="size-8 text-neutral-500" />
      <div className="grow space-y-1">
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
