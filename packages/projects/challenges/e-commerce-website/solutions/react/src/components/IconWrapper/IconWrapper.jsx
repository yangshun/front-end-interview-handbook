import clsx from 'clsx';

const IconWrapper = ({ icon: Icon }) => {
  return (
    <div
      className={clsx(
        'size-12 bg-white rounded-full shadow-custom',
        'flex items-center justify-center',
        'shrink-0'
      )}>
      <Icon className="size-6 text-indigo-700" />
    </div>
  );
};

export default IconWrapper;
