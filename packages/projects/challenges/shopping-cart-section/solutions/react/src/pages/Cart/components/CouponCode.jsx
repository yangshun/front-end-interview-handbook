import { useState } from 'react';
import { RiCloseFill, RiCouponLine } from 'react-icons/ri';
import Badge from 'src/components/ui/Badge';

import Button from 'src/components/ui/Button';
import Tag from 'src/components/ui/Tag';
import TextInput from 'src/components/ui/TextInput';

import { useCartContext } from 'src/context/CartContext';

const CouponCode = () => {
  const { setDiscount, discount } = useCartContext();
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const checkCoupon = async () => {
    if (!couponCode) {
      setErrorMessage('Please enter a valid code.');
      return;
    }
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        coupon_code: couponCode,
      }),
    };

    setIsChecking(true);
    const response = await fetch(
      'https://www.greatfrontend.com/api/projects/challenges/e-commerce/coupons/apply',
      requestOptions
    );
    const result = await response.json();
    if (result.error) {
      setErrorMessage("Sorry, but this coupon doesn't exist.");
    } else {
      setDiscount(result);
      setCouponCode('');
      setErrorMessage('');
    }
    setIsChecking(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {discount && (
        <div className="flex items-center gap-2 justify-between">
          <Badge label={discount.coupon_code} variant="brand" size="lg" />
          <span className="font-semibold text-lg text-right text-neutral-900">
            -
            {discount.discount_amount
              ? `$${discount.discount_amount}`
              : `${discount.discount_percentage}%`}
          </span>
        </div>
      )}
      {showAddCoupon ? (
        <div className="flex flex-col gap-2 items-start py-1">
          <div className="flex gap-2 w-full">
            <TextInput
              placeholder="Enter coupon code"
              label="Coupon Code"
              value={couponCode}
              errorMessage={errorMessage}
              onChange={value => setCouponCode(value)}
            />
            <Button
              label="Apply"
              variant="secondary"
              className="w-20 shrink-0 mt-[26px]"
              onClick={checkCoupon}
              isDisabled={isChecking}
            />
          </div>
          {discount && (
            <Tag
              label={discount.coupon_code}
              actionIcon={RiCloseFill}
              onAction={() => setDiscount(null)}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowAddCoupon(true)}
            label="Add coupon code"
            variant="link"
            size="lg"
            startIcon={RiCouponLine}
          />
        </div>
      )}
    </div>
  );
};

export default CouponCode;
