import clsx from 'clsx';

const CheckoutFormContentSection = ({ className, title, children }) => {
  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <h3 className="font-medium text-lg text-neutral-600">{title}</h3>
      {children}
    </div>
  );
};

export default CheckoutFormContentSection;
