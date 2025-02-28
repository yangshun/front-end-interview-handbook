import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import SponsorsAdFormatPlacementListDialog from './SponsorsAdFormatPlacementListDialog';

type Props = Readonly<{
  badgeLabel?: string;
  className?: string;
  img: {
    alt: string;
    srcDark: string;
    srcLight: string;
  };
  showSeeAll?: boolean;
  title: string;
}>;

export default function SponsorsAdFormatPlacementInfo({
  badgeLabel,
  className,
  img,
  title,
  showSeeAll = false,
}: Props) {
  const intl = useIntl();
  const [showPlacementList, setShowPlacementList] = useState(false);

  return (
    <div
      className={clsx('relative', 'w-full', 'flex flex-col gap-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Text
            className="text-base lg:text-sm"
            color="subtitle"
            size="inherit">
            {title}
          </Text>
          {badgeLabel && (
            <Badge label={badgeLabel} size="sm" variant="neutral-active" />
          )}
        </div>
        {showSeeAll && (
          <Button
            className="-my-1"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'See all',
              description: 'Button label for see all',
              id: 'k08xzj',
            })}
            size="xs"
            variant="tertiary"
            onClick={() => setShowPlacementList(true)}
          />
        )}
      </div>
      {/* Light mode image */}
      <img
        alt={img.alt}
        className={clsx('h-auto w-full object-cover', 'block dark:hidden')}
        decoding="async"
        loading="lazy"
        src={img.srcLight}
      />

      {/* Dark mode image */}
      <img
        alt={img.alt}
        className={clsx('h-auto w-full object-cover', 'hidden dark:block')}
        decoding="async"
        loading="lazy"
        src={img.srcDark}
      />

      {showSeeAll && (
        <SponsorsAdFormatPlacementListDialog
          isShown={showPlacementList}
          title={title}
          onClose={() => setShowPlacementList(false)}
        />
      )}
    </div>
  );
}
