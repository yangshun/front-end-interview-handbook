import type { ReactNode } from 'react';

import Ticket from '~/components/common/tickets/Ticket';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  height?: number;
  subtitle?: ReactNode;
  title: ReactNode;
  width?: number;
}>;

export function SocialDiscountSpecialTicket({
  title,
  subtitle,
  height,
  width,
}: Props) {
  return (
    <Ticket height={height} padding="md" width={width}>
      <div className="flex flex-col justify-center items-center h-full">
        <Text className="text-2xl" size="custom" weight="bold">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-center" color="secondary" size="body3">
            {subtitle}
          </Text>
        )}
      </div>
    </Ticket>
  );
}
