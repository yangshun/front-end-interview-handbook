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
  heading,
  children,
  showTooltip = false,
  tooltipMessage = '',
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 items-center">
        <Text size="body2" weight="bold">
          {heading}
        </Text>
        {showTooltip && (
          <Tooltip label={tooltipMessage}>
            <RiInformationLine className={clsx('h-5 w-5', themeIconColor)} />
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}
