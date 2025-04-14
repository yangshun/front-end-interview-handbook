import clsx from 'clsx';

const ProgressBar = ({ value, color, className }) => {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax={100}
      className={clsx('h-2 grow rounded-lg bg-gray-200', className)}>
      <div
        className="h-full rounded-lg"
        style={{
          width: `${value}%`,
          backgroundColor: color || 'bg-orange-500',
        }}
      />
    </div>
  );
};

export default ProgressBar;
