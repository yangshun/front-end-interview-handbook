import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import TextInput from 'src/components/ui/TextInput';
import CheckoutFormContentSection from './CheckoutFormContentSection';
import DeliveryMethodCard from './DeliveryMethodCard';
import { MasterCard } from './PaymentCard';

import { FIELD_NAME } from 'src/constants';

const CheckoutFormSection = ({ className, formData, setFormData }) => {
  const {
    email,
    country,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    deliveryMethod,
    cardNumber,
    nameOnCard,
    cardExpiry,
    cardCvv,
  } = formData;

  const onChange = (value, e) => {
    const { name, required } = e.target;

    if (['cardNumber', 'zip', 'cardCvv'].includes(name) && isNaN(value)) {
      return;
    }
    let errorMessage = '';
    if (name === 'email' && !e.target.validity.valid) {
      errorMessage = 'Please enter a valid email address.';
    }

    if (name === 'cardExpiry') {
      const expiryDatePattern = /^(0[1-9]|1[0-2])\/(\d{2})$/;
      const match = value.match(expiryDatePattern);
      if (!match) {
        errorMessage = 'Invalid expiry date format';
      } else {
        const month = parseInt(match[1], 10);
        const year = parseInt(match[2], 10);

        // check if the month is correct format
        if (month < 1 || month > 12) {
          errorMessage = 'Invalid expiry date format';
        }

        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        // check if th expiry date is in future
        if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          errorMessage = 'Invalid expiry date format';
        }
      }
    }

    if (required && !value) {
      errorMessage = `${FIELD_NAME[name]} is required`;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: {
        value,
        error: errorMessage,
      },
    }));
  };

  const onSelectDeliveryMethod = value => {
    setFormData(prevState => ({
      ...prevState,
      deliveryMethod: { value },
    }));
  };

  return (
    <section
      aria-describedby="checkout-form"
      className={clsx('divide-y divide-neutral-300', className)}>
      <CheckoutFormContentSection title="Contact Information" className="pb-10">
        <TextInput
          placeholder="user@example"
          label="Email"
          type="email"
          name="email"
          value={email.value}
          errorMessage={email.error}
          onChange={onChange}
          required={email.required}
        />
      </CheckoutFormContentSection>

      <CheckoutFormContentSection
        title="Shipping Information"
        className="py-10">
        <TextInput
          value={country.value}
          label="Country / Region"
          name="country"
          onChange={onChange}
          endIcon={RiArrowDownSLine}
          isDisabled={true}
          required={country.required}
        />
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <TextInput
            placeholder="john"
            label="First name"
            name="firstName"
            onChange={onChange}
            value={firstName.value}
            required={firstName.required}
            errorMessage={firstName.error}
          />
          <TextInput
            placeholder="Appleseed"
            label="Last name"
            name="lastName"
            value={lastName.value}
            errorMessage={lastName.error}
            onChange={onChange}
            required={lastName.required}
          />
        </div>

        <div className="flex flex-col gap-4">
          <TextInput
            placeholder="Street address"
            label="Address"
            name="address1"
            onChange={onChange}
            value={address1.value}
            errorMessage={address1.error}
            required={address1.required}
          />
          <TextInput
            placeholder="Apartment, suite, etc (optional)"
            label="optional address"
            name="address2"
            onChange={onChange}
            value={address2.value}
            required={address2.required}
            isLabelHidden
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <TextInput
            placeholder="City"
            label="City"
            name="city"
            onChange={onChange}
            value={city.value}
            errorMessage={city.error}
            required={city.required}
          />
          <TextInput
            endIcon={RiArrowDownSLine}
            placeholder="State"
            label="State"
            name="state"
            onChange={onChange}
            value={state.value}
            errorMessage={state.error}
            required
          />
          <TextInput
            placeholder="12345"
            label="Zip"
            name="zip"
            onChange={onChange}
            value={zip.value}
            errorMessage={zip.error}
            maxLength={9}
            required={zip.required}
          />
        </div>
      </CheckoutFormContentSection>

      <CheckoutFormContentSection title="Delivery Method" className="py-10">
        <div className="flex gap-4 flex-col md:flex-row" role="radiogroup">
          <DeliveryMethodCard
            method="standard"
            isSelected={deliveryMethod.value === 'standard'}
            onSelect={onSelectDeliveryMethod}
          />
          <DeliveryMethodCard
            method="express"
            isSelected={deliveryMethod.value === 'express'}
            onSelect={onSelectDeliveryMethod}
          />
        </div>
      </CheckoutFormContentSection>

      <CheckoutFormContentSection title="Payment Method" className="pt-10">
        <TextInput
          placeholder="1234 1234 1234 1234"
          label="Card number"
          name="cardNumber"
          onChange={onChange}
          value={cardNumber.value}
          errorMessage={cardNumber.error}
          maxLength={12}
          startIcon={MasterCard}
          startIconClassName="!h-6 w-[34px]"
          className="!pl-14 !py-[11px]"
          required={cardNumber.required}
        />
        <TextInput
          placeholder="Full name on card"
          label="Name on card"
          name="nameOnCard"
          onChange={onChange}
          value={nameOnCard.value}
          errorMessage={nameOnCard.error}
          required={nameOnCard.required}
        />

        <div className="flex gap-8">
          <TextInput
            placeholder="MM/YY"
            label="Expiry"
            name="cardExpiry"
            onChange={onChange}
            value={cardExpiry.value}
            errorMessage={cardExpiry.error}
            maxLength={5}
            required={cardExpiry.required}
          />
          <TextInput
            placeholder="123"
            label="CVV"
            name="cardCvv"
            onChange={onChange}
            value={cardCvv.value}
            errorMessage={cardCvv.error}
            maxLength={3}
            required={cardCvv.required}
          />
        </div>
      </CheckoutFormContentSection>
    </section>
  );
};

export default CheckoutFormSection;
