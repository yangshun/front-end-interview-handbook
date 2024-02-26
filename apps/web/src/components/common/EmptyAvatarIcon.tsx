import clsx from 'clsx';
import { RiUserFill } from 'react-icons/ri';

export default function EmptyAvatarIcon({ className }: { className?: string }) {
  return (
    <div className={clsx('size-full overflow-hidden rounded-full', className)}>
      <RiUserFill className="size-full mt-[20%] rounded-full" />
    </div>
  );
}
