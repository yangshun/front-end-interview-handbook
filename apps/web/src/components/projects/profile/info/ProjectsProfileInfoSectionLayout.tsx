import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  children: React.ReactNode;
  heading: string;
  showTooltip?: boolean;
  tooltipMessage?: string;
}>;

export default function ProjectsProfileInfoSectionLayout({
  children,
  heading,
  showTooltip = false,
  tooltipMessage = '',
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <Text size="body2" weight="bold">
          {heading}
        </Text>
        {showTooltip && (
          <Tooltip label={tooltipMessage}>
            <RiInformationLine className={clsx('size-5', themeIconColor)} />
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}
