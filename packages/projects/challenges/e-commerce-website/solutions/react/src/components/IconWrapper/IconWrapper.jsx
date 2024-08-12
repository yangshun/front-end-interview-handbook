import clsx from 'clsx';

const IconWrapper = ({ icon: Icon }) => {
  return (
    <div
      className={clsx(
        'shadow-custom size-12 rounded-full bg-white',
        'flex items-center justify-center',
        'shrink-0',
      )}>
      <Icon className="size-6 text-indigo-700" />
    </div>
  );
};

export default IconWrapper;
