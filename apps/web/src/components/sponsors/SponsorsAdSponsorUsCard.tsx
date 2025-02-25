import clsx from 'clsx';
import { RiAdvertisementLine } from 'react-icons/ri';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeTextColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
}>;

export default function SponsorsAdSponsorUsCard({ className }: Props) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <Text color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="Sponsor us"
          description="Label for sponsor us"
          id="QpcLiL"
        />
      </Text>
      <div className="flex items-center justify-between gap-2">
        <div
          className={clsx(
            'h-20 w-[60px] shrink-0',
            'rounded-[3px]',
            'flex items-center justify-center',
            themeBackgroundBrandColor,
          )}>
          <RiAdvertisementLine
            aria-hidden={true}
            className={clsx('size-6', 'text-neutral-900')}
          />
        </div>
        <Text color="subtitle" size="body3">
          <FormattedMessage
            defaultMessage="Got a dev product? <anchor>Reach 500K+ front end engineers! -></anchor>"
            description="Description for sponsor us"
            id="lMEBKr"
            values={{
              anchor: (chunks) => (
                <Anchor
                  className={themeTextColor}
                  href="/advertise-with-us"
                  variant="flat">
                  {chunks}
                </Anchor>
              ),
            }}
          />
        </Text>
      </div>
    </div>
  );
}
