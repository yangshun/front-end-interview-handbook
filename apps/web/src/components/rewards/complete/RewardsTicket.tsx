import type { ReactNode } from 'react';

import Ticket from '~/components/promotions/tickets/Ticket';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Omit<React.ComponentProps<typeof Ticket>, 'children'> &
  Readonly<{
    subtitle?: ReactNode;
    title?: ReactNode;
  }>;

export default function RewardsTicket({
  height,
  padding = 'lg',
  ratio = 'normal',
  subtitle,
  title,
  variant = 'gradient',
  width,
}: Props) {
  return (
    <Ticket
      height={height}
      padding={padding}
      ratio={ratio}
      variant={variant}
      width={width}>
      <div className="m-auto flex size-full flex-col items-center justify-center gap-y-2">
        {title && <Heading level="heading3">{title}</Heading>}
        {subtitle && (
          <Text className="block text-center" color="secondary" size="body1">
            {subtitle}
          </Text>
        )}
      </div>
    </Ticket>
  );
}
