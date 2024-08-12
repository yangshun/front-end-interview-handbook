import clsx from 'clsx';
import { useState } from 'react';

import CartControl from 'src/components/CartControl';
import Button from 'src/components/ui/Button';
import Link from 'src/components/ui/Link';
import ConfirmModal from 'src/components/ui/ConfirmModal';

import { useCartContext } from 'src/context/CartContext';

import { COLORS, SIZE } from 'src/constants';
import { formatPrice } from '../../../utils';

const CartItemsSection = ({ className }) => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useCartContext();
  const [removalConfirmation, setRemovalConfirmation] = useState({
    show: false,
    onAction: () => {},
  });

  const closeRemovalConfirmation = () => {
    setRemovalConfirmation({
      show: false,
      onAction: () => {},
    });
  };

  const openRemovalConfirmation = item => {
    setRemovalConfirmation({
      show: true,
      onAction: () => {
        removeFromCart(item);
        closeRemovalConfirmation();
      },
    });
  };

  return (
    <section aria-describedby="cart-items-section" className={clsx(className)}>
      <h2 className="sr-only">Items in your shopping cart</h2>
      <ul
        className={clsx(
          'divide-y divide-dashed divide-neutral-300',
          className
        )}>
        {cartItems.map(item => {
          const productUrl = `/products/${item.product.product_id}`;
          const { unit, product, total_list_price, total_sale_price } = item;
          const hasDiscount =
            !!total_sale_price && total_sale_price !== total_list_price;

          return (
            <li
              key={product.product_id + unit.size + unit.color}
              className={clsx(
                'flex flex-col md:flex-row gap-4 md:gap-8',
                'py-[31.5px] first:pt-0 last:pb-0'
              )}>
              <div className="relative">
                <img
                  src={unit.image_url}
                  alt={`${SIZE[unit.size]?.long ?? unit.size} ${
                    product.name
                  } in ${unit.color}`}
                  className="w-full md:min-w-[280px] h-[200px] object-cover rounded-lg"
                />
                <Link
                  to={productUrl}
                  variant="unstyled"
                  className="absolute inset-0"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  to={productUrl}
                  className="font-medium text-2xl"
                  variant="unstyled">
                  {product.name}
                </Link>
                <span className="font-medium text-neutral-600">
                  {COLORS[unit.color].label}
                  {unit.size && (
                    <>
                      {' • '}
                      {SIZE[unit.size]?.long ?? unit.size}
                    </>
                  )}
                </span>
                <span className="text-sm text-neutral-600">
                  {product.description}
                </span>
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-4">
                    <CartControl
                      quantity={item.quantity}
                      increment={() => incrementQuantity(item)}
                      decrement={() => decrementQuantity(item)}
                      availableStock={unit.stock}
                    />
                    <Button
                      label="Remove"
                      variant="gray-link"
                      onClick={() => openRemovalConfirmation(item)}
                    />
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <span className="font-medium text-lg text-right text-neutral-900">
                      $
                      {hasDiscount
                        ? formatPrice(total_sale_price)
                        : formatPrice(total_list_price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs line-through text-neutral-600">
                        ${formatPrice(total_list_price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {removalConfirmation.show && (
        <ConfirmModal
          isOpen={removalConfirmation.show}
          title="Confirm Item Removal"
          description="Are you sure you want to remove this item from your shopping cart?"
          primaryActionLabel="Yes"
          secondaryActionLabel="Cancel"
          onClose={closeRemovalConfirmation}
          onAction={removalConfirmation.onAction}
        />
      )}
    </section>
  );
};

export default CartItemsSection;
