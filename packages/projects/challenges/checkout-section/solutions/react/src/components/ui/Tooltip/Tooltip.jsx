import clsx from 'clsx';
import { useState } from 'react';

const Tooltip = ({ children, content, position = 'top', show = true }) => {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowPositions = {
    top: 'bottom-[-4px] left-1/2 transform -translate-x-1/2 border-t-neutral-950 border-t-8 border-x-8 border-x-transparent',
    bottom:
      'top-[-4px] left-1/2 transform -translate-x-1/2 border-b-neutral-950 border-b-8 border-x-8 border-x-transparent',
    left: 'right-[-4px] top-1/2 transform -translate-y-1/2 border-l-neutral-950 border-l-8 border-y-8 border-y-transparent',
    right:
      'left-[-4px] top-1/2 transform -translate-y-1/2 border-r-neutral-950 border-r-8 border-y-8 border-y-transparent',
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => show && setVisible(true)}
      onMouseLeave={() => show && setVisible(false)}>
      {children}
      {visible && (
        <div
          className={clsx(
            'absolute py-2 px-3 rounded-lg shadow-lg min-w-max max-w-xs',
            'bg-neutral-950',
            'text-white text-xs font-medium',
            positions[position]
          )}>
          {content}
          <div className={clsx('absolute', arrowPositions[position])} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
