import clsx from 'clsx';
import { RiArrowRightLine, RiShoppingCart2Line } from 'react-icons/ri';

import IconWrapper from 'src/components/IconWrapper';
import Button from 'src/components/ui/Button';

const EmptyCart = () => {
  return (
    <div
      className={clsx(
        'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
        'gap-x-4 gap-y-8 md:gap-x-8',
      )}>
      <div
        className={clsx(
          'col-span-4 md:col-span-6 lg:col-span-5',
          'h-[372px] md:h-[400px] lg:h-full',
          'flex flex-col items-center justify-center gap-5',
        )}>
        <IconWrapper icon={RiShoppingCart2Line} />
        <div
          className={clsx('flex flex-col items-center gap-2', 'text-center')}>
          <span className="text-xl font-medium">Your cart is empty</span>
          <span>Let's go explore some products</span>
        </div>
        <Button
          size="xl"
          label="Explore products"
          endIcon={RiArrowRightLine}
          href="/products"
        />
      </div>
      <img
        src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/empty-cart.jpg"
        alt="Empty cart"
        className={clsx(
          'w-full object-cover',
          'h-[180px] md:h-80 lg:h-full',
          'col-span-4 md:col-span-6 lg:col-span-7',
        )}
      />
    </div>
  );
};

export default EmptyCart;
