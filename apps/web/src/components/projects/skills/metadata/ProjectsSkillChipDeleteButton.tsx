import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

import { themeIconColor } from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  label: string;
  onClick?: () => void;
}>;

export default function ProjectsSkillChipDeleteButton({
  className,
  label,
  onClick,
}: Props) {
  return (
    <button
      aria-label={label}
      className={className}
      type="button"
      onClick={onClick}>
      <RiCloseLine className={clsx('h-4 w-4 shrink-0', themeIconColor)} />
    </button>
  );
}
