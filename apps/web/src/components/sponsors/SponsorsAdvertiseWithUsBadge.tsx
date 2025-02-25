import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardNoAlphaColor,
  themeTextColor,
} from '~/components/ui/theme';

export default function SponsorsAdvertiseWithUsBadge() {
  const intl = useIntl();

  return (
    <Anchor
      className={clsx(
        'inline-flex items-center gap-1.5',
        'rounded-full',
        'px-1.5 py-0.5',
        themeBackgroundCardNoAlphaColor,
        themeTextColor,
      )}
      href="/advertise-with-us"
      variant="unstyled">
      <Badge
        label={intl.formatMessage({
          defaultMessage: 'New',
          description: 'Badge label for new',
          id: 'Aem5n7',
        })}
        size="xs"
        variant="primary"
      />
      <Text size="body3">
        {intl.formatMessage({
          defaultMessage: 'Advertise with us',
          description: 'Link to advertise with us',
          id: '9OVmVF',
        })}
        {' ->'}
      </Text>
    </Anchor>
  );
}
