import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from 'src/context/CartContext';
import CartItemsSection from './components/CartItemsSection';
import OrderSummarySection from './components/OrderSummarySection';
import EmptyCart from './components/EmptyCart';

const CartPage = () => {
  const navigate = useNavigate();
  const { isFetching, checkForStockChanged, cartItems } = useCartContext();

  const onSubmitCart = async e => {
    e.preventDefault();
    const hasStockChanged = await checkForStockChanged(cartItems);

    if (!hasStockChanged) {
      navigate('/checkout');
    }
  };

  return (
    <div
      className={clsx('px-4 py-12 md:py-16 lg:p-24', 'flex flex-col gap-16')}>
      <h2 className="font-semibold text-3xl md:text-5xl">Shopping Cart</h2>

      {isFetching ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <form
          onSubmit={onSubmitCart}
          className={clsx(
            'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
            'gap-x-4 md:gap-x-8 gap-y-16'
          )}>
          <CartItemsSection className="col-span-4 md:col-span-6 lg:col-span-8" />
          <OrderSummarySection className="col-span-4 md:col-span-6 lg:col-span-4" />
        </form>
      )}
    </div>
  );
};

export default CartPage;
