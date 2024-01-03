import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';
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
    <div className="flex flex-col gap-[6px]">
      <div className="flex gap-1 items-center">
        <Text size="body2" weight="bold">
          {heading}
        </Text>
        {showTooltip && (
          <Tooltip label={tooltipMessage}>
            <RiInformationLine
              className={clsx('h-[18px] w-[18px]', themeTextSecondaryColor)}
            />
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}
