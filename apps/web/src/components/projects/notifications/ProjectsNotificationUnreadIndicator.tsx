import clsx from 'clsx';

import { themeBackgroundBrandColor } from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
}>;

export default function ProjectsNotificationUnreadIndicator({
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'size-2 shrink-0 rounded-full',
        themeBackgroundBrandColor,
        className,
      )}
    />
  );
}
