import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { LockClosedIcon } from '@heroicons/react/24/outline';

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
    <div className="flex items-center space-x-2 rounded border border-slate-200 p-3">
      <LockClosedIcon className="h-8 w-8 text-slate-500" />
      <div className="grow space-y-1">
        <Text display="block" variant="body3" weight="bold">
          {title}
        </Text>
        <Text color="secondary" display="block" variant="body3">
          {subtitle}
        </Text>
      </div>
      <Button
        href="/pricing"
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
