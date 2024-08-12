import clsx from 'clsx';

const Tag = ({ label, onAction, actionIcon: Icon }) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center gap-1',
        'bg-gray-200 rounded',
        'px-[7px] py-[3px]',
        'border-[0.5px] border-[#e6e6e6]'
      )}>
      <span className="font-medium text-sm px-0.5">{label}</span>
      {Icon && (
        <Icon
          className={clsx(
            'siz-5 text-black',
            Icon ? 'cursor-pointer' : 'pointer-events-none'
          )}
          onClick={onAction}
        />
      )}
    </div>
  );
};

export default Tag;
