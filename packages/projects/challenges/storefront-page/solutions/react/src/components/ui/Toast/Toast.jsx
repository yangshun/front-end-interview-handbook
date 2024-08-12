import clsx from 'clsx';
import React from 'react';

const Toast = ({ type, message }) => {
  const badge = (
    <div
      className={clsx(
        'flex items-center',
        'px-2.5 py-0.5',
        'h-6',
        'bg-white',
        'shadow',
        'rounded-full',
        'text-sm',
        type === 'error' && 'text-red-800',
        type === 'success' && 'text-green-700'
      )}>
      {type === 'error' ? 'Error' : 'Success'}
    </div>
  );

  return (
    <div className={clsx('z-toast fixed inset-x-0 top-10')}>
      <div
        className={clsx(
          'mx-4 md:mx-auto md:w-max',
          'flex items-center gap-3',
          'p-1 pr-2.5',
          'rounded-full',
          'text-sm font-medium',
          type === 'success' && 'bg-green-50 text-green-700',
          type === 'error' && 'bg-red-50 text-red-600'
        )}>
        {badge}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
