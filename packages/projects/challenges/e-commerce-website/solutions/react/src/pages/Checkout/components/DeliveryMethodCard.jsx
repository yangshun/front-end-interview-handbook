import clsx from 'clsx';
import { useCallback } from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const DELIVERY_METHOD = {
  standard: {
    title: 'Standard',
    days: '4-10',
    price: null,
  },
  express: {
    title: 'Express',
    days: '2-5',
    price: '15.00',
  },
};

const DeliveryMethodCard = ({ method, isSelected, onSelect }) => {
  const { title, days, price } = DELIVERY_METHOD[method];

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        onSelect(method);
      }
    },
    [method, onSelect]
  );

  return (
    <div
      aria-label={title}
      tabIndex={0}
      role="radio"
      aria-checked={isSelected}
      onKeyDown={handleKeyDown}
      onClick={() => onSelect(method)}
      className={clsx(
        'flex flex-col gap-2 grow',
        'min-h-[120px]',
        'bg-white hover:bg-neutral-50',
        'p-[15px] rounded-lg',
        'flex-1',
        isSelected
          ? 'border border-indigo-600'
          : 'border border-neutral-200 hover:border-[#e6e6e6]',
        isSelected && 'outline outline-1 -outline-offset-2 outline-indigo-600',
        'focus:outline-none',
        'focus:ring-4 focus:ring-offset-0 focus:ring-indigo-600/[.12]',
        'cursor-pointer'
      )}>
      <div className="flex gap-2 self-stretch grow">
        <div className="flex flex-col grow">
          <span className="font-medium">{title}</span>
          <span className="text-sm text-neutral-600">{days} business days</span>
        </div>

        {isSelected && (
          <RiCheckboxCircleFill
            className="size-6 text-indigo-500"
            aria-hidden
          />
        )}
      </div>
      <span className="font-medium">{price ? `$${price}` : 'FREE'}</span>
    </div>
  );
};

export default DeliveryMethodCard;
