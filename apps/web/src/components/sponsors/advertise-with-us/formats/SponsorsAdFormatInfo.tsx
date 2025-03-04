import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

type Props = Readonly<{
  addOnItem?: ReactNode;
  className?: string;
  items: Array<{
    key: string;
    label: ReactNode;
  }>;
  title: string;
  type: 'impressions' | 'pages' | 'slot';
}>;

export default function SponsorsAdFormatInfo({
  items,
  title,
  className,
  type,
  addOnItem,
}: Props) {
  const subtitle =
    type === 'impressions' ? (
      <FormattedMessage
        defaultMessage="Estimated impressions per week"
        description="Label for impressions"
        id="Xq97/V"
      />
    ) : type === 'pages' ? (
      <FormattedMessage
        defaultMessage="Pages the ad will be shown"
        description="Label for pages"
        id="KU6vxj"
      />
    ) : (
      <FormattedMessage
        defaultMessage="Next available slot(s)"
        description="Next available timeslot"
        id="o/N/F1"
      />
    );

  return (
    <div className={className}>
      <Heading className="font-semibold" level="heading4">
        {title}
      </Heading>
      <Text className="mt-2.5" color="secondary" size="body2">
        {subtitle}
      </Text>
      <div className="mt-6 flex flex-col gap-4">
        {items.length === 0 ? (
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="No slots available"
              description="No slots available"
              id="Z1NAxi"
            />
          </Text>
        ) : (
          <ul className="flex flex-col gap-4" role="list">
            {items.map((item) => (
              <li key={item.key} className="flex gap-x-2">
                <RiCheckLine
                  aria-hidden="true"
                  className={clsx('size-4 shrink-0', themeTextSuccessColor)}
                />
                <Text color="secondary" size="body3">
                  {item.label}
                </Text>
              </li>
            ))}
          </ul>
        )}
        {addOnItem}
      </div>
    </div>
  );
}
