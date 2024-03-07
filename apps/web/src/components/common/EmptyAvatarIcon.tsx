import clsx from 'clsx';
import { FaCircleUser } from 'react-icons/fa6';

export default function EmptyAvatarIcon({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'size-full overflow-hidden rounded-full',
        'text-neutral-50 dark:text-neutral-800',
        'bg-neutral-400 dark:bg-neutral-600',
        className,
      )}>
      <FaCircleUser className="size-full scale-150 rounded-full" />
    </div>
  );
}
