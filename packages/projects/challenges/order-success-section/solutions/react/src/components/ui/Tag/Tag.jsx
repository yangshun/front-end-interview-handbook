import clsx from 'clsx';

const Tag = ({ label, onAction, actionIcon: Icon }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-1',
        'rounded bg-gray-200',
        'px-[7px] py-[3px]',
        'border-[0.5px] border-[#e6e6e6]',
      )}>
      <span className="px-0.5 text-sm font-medium">{label}</span>
      {Icon && (
        <Icon
          className={clsx(
            'siz-5 text-black',
            Icon ? 'cursor-pointer' : 'pointer-events-none',
          )}
          onClick={onAction}
        />
      )}
    </div>
  );
};

export default Tag;
