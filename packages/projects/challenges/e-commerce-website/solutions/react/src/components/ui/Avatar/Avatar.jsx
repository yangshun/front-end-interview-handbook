import clsx from 'clsx';

import { getNameInitials } from 'src/utils';

const Avatar = ({ src, name, className }) => {
  const nameInitials = name ? getNameInitials(name) : '';

  const commonClasses = clsx('size-12 shrink-0 rounded-full', className);
  return src ? (
    <img
      src={src}
      alt={`${name}'s avatar`}
      loading="lazy"
      className={clsx('object-cover', commonClasses)}
    />
  ) : (
    <div
      className={clsx(
        'bg-gray-200',
        'font-medium text-xl text-center text-neutral-600',
        'flex items-center justify-center',
        commonClasses
      )}>
      {nameInitials}
    </div>
  );
};

export default Avatar;
