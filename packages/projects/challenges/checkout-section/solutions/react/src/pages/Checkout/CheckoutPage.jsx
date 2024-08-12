import { useState } from 'react';
import clsx from 'clsx';
import { RiArrowLeftSLine } from 'react-icons/ri';

import Button from 'src/components/ui/Button';
import CheckoutFormSection from './components/CheckoutFormSection';
import CheckoutOrderSummary from './components/CheckoutOrderSummary';
import StockChangedModal from '../Cart/components/StockChangedModal';

import { useToast } from 'src/context/ToastContext';
import { useCartContext } from 'src/context/CartContext';

import { FIELD_NAME } from 'src/constants';

const CheckoutPage = () => {
  const { checkForStockChanged, cartItems } = useCartContext();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: { value: '', error: '', required: true },
    country: { value: 'United States', error: '', required: true },
    firstName: { value: '', error: '', required: true },
    lastName: { value: '', error: '', required: true },
    address1: { value: '', error: '', required: true },
    address2: { value: '', error: '', required: false },
    city: { value: '', error: '', required: true },
    state: { value: '', error: '', required: true },
    zip: { value: '', error: '', required: true },
    deliveryMethod: { value: 'standard', error: '', required: true },
    cardNumber: { value: '', error: '', required: true },
    nameOnCard: { value: '', error: '', required: true },
    cardExpiry: { value: '', error: '', required: true },
    cardCvv: { value: '', error: '', required: true },
  });

  const onSubmit = async e => {
    e.preventDefault();
    const hasStockedChanged = await checkForStockChanged(cartItems);
    if (hasStockedChanged) {
      return;
    }
    const newFormData = { ...formData };
    let hasErrors = false;

    // Check for empty fields
    Object.keys(formData).forEach(key => {
      if (!formData[key].value && formData[key].required) {
        newFormData[key].error = `${FIELD_NAME[key]} is required`;
        hasErrors = true;
      }
    });
    console.log(hasErrors);
    toast.error(
      'We faced a problem processing your checkout. Please try again or contact us.'
    );
  };

  return (
    <div
      className={clsx(
        'px-4 py-12 md:py-16 lg:p-24',
        'flex flex-col justify-start gap-8'
      )}>
      <Button
        label="Back to Shopping Cart"
        href="/cart"
        variant="link"
        startIcon={RiArrowLeftSLine}
        className="w-fit"
      />

      <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
        Checkout
      </h2>

      <form
        onSubmit={onSubmit}
        className={clsx(
          'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
          'gap-x-4 md:gap-x-8 gap-y-8'
        )}>
        <CheckoutFormSection
          className="col-span-4 md:col-span-6 lg:col-span-6"
          formData={formData}
          setFormData={setFormData}
        />
        <CheckoutOrderSummary className="col-span-4 md:col-span-6 lg:col-span-6" />
      </form>
      <StockChangedModal />
    </div>
  );
};

export default CheckoutPage;
