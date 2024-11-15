import clsx from 'clsx';
import { RiStarSmileFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Tooltip from '~/components/ui/Tooltip';

export default function SidebarPremiumChip() {
  const intl = useIntl();

  return (
    <Tooltip
      asChild={true}
      delayDuration={10}
      label={intl.formatMessage({
        defaultMessage: 'Premium',
        description: 'Tooltip label for premium badge',
        id: 'sAA7bn',
      })}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'h-4 w-6',
          'rounded-full',
          'bg-brand-dark dark:bg-brand',
          'shrink-0',
        )}>
        <RiStarSmileFill className={clsx('size-3', 'text-neutral-900')} />
      </div>
    </Tooltip>
  );
}
