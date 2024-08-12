import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import ConfirmModal from 'src/components/ui/ConfirmModal';

import { useCartContext } from 'src/context/CartContext';

import { COLORS, SIZE } from 'src/constants';

const StockChangedModal = () => {
  const {
    stockChangedItems,
    cartItems,
    showStockChangedModal,
    acknowledgeStockChanged,
    isCartEmptyAfterStockChanged,
  } = useCartContext();

  if (!showStockChangedModal) {
    return null;
  }

  return (
    <ConfirmModal
      isOpen={showStockChangedModal}
      className={clsx('p-8', 'w-[592px]')}
      actionBtnSize="xl"
      primaryActionLabel={
        isCartEmptyAfterStockChanged ? 'Go back to cart' : 'Ok'
      }
      onAction={() =>
        acknowledgeStockChanged(
          cartItems,
          stockChangedItems,
          isCartEmptyAfterStockChanged
        )
      }>
      <div className="flex flex-col gap-8">
        <div className={clsx('flex flex-col gap-2')}>
          <h2 className="font-semibold text-xl">Change of stock</h2>
          <span className="text-sm text-neutral-600">
            While you were browsing, certain stocks have become unavailable:
          </span>
        </div>
        <ul
          className={clsx(
            'divide-y divide-dashed divide-neutral-300',
            'max-h-[500px] overflow-y-auto'
          )}>
          {stockChangedItems.map(item => {
            const { unit, product, stock, cartQuantity } = item;
            return (
              <li
                key={unit.sku}
                className={clsx(
                  'flex gap-6',
                  'py-[31.5px] first:pt-0 last:pb-0'
                )}>
                <img
                  src={unit.image_url}
                  className="size-20 rounded-lg object-cover"
                  alt={`${SIZE[unit.size]?.long ?? unit.size} ${
                    product.name
                  } in ${unit.color}`}
                />
                <div className={clsx('flex flex-col gap-2', 'font-medium')}>
                  <span className="text-xl">{product.name}</span>
                  <span className="text-neutral-600">
                    {COLORS[unit.color].label}
                    {unit.size && (
                      <>
                        {' • '}
                        {SIZE[unit.size]?.long ?? unit.size}
                      </>
                    )}
                  </span>
                  <div
                    className={clsx(
                      'flex items-center gap-2',
                      'text-neutral-600'
                    )}>
                    <span>Quantity: {cartQuantity}</span>
                    <RiArrowRightLine className="size-3" />
                    <span>{stock}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {isCartEmptyAfterStockChanged && (
          <span className="text-sm">
            Since there are no more items in your order, you will be brought
            back to cart.
          </span>
        )}
      </div>
    </ConfirmModal>
  );
};

export default StockChangedModal;
