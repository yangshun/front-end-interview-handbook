import clsx from 'clsx';
import { RiExchangeLine, RiShieldCheckLine, RiTruckLine } from 'react-icons/ri';

const FEATURES = [
  {
    title: 'Complimentary Shipping',
    description:
      'Enjoy the convenience of free shipping for all orders. We believe in transparent pricing, and the price you see is the price you pay—no surprise fees',
    icon: RiTruckLine,
  },
  {
    title: '2-Year Quality Promise',
    description:
      "Shop with confidence knowing that we stand behind our products. Should any issue arise within the first two years, rest assured we're here to help with a hassle-free replacement.",
    icon: RiShieldCheckLine,
  },
  {
    title: 'Easy Exchanges',
    description:
      "If your purchase isn't quite right, pass it on to a friend who might love it, and let us know. We're happy to facilitate an exchange to ensure you have the perfect item to complement your lifestyle.",
    icon: RiExchangeLine,
  },
];

const FeaturesGridSection = () => {
  return (
    <section
      aria-describedby="features-section"
      className={clsx(
        'px-4 py-12 md:py-16 lg:p-24',
        'flex flex-col gap-12 md:gap-16'
      )}>
      <header className={clsx('flex flex-col gap-5 lg:px-40', 'text-center')}>
        <div className="flex flex-col justify-center gap-3 lg:px-10">
          <span className="font-semibold text-indigo-700">
            Elevate Your Experience
          </span>
          <h2 className="font-semibold text-3xl md:text-5xl">
            Our Commitment to Exceptional Service
          </h2>
        </div>
        <p className="text-xl text-neutral-600">
          We pride ourselves on a foundation of exceptional customer service,
          where every interaction is a testament to our dedication to
          excellence.
        </p>
      </header>
      <ul
        className={clsx(
          'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
          'gap-x-4 gap-y-8 md:gap-x-8'
        )}>
        {FEATURES.map(({ title, description, icon: Icon }) => (
          <li
            key={title}
            className={clsx(
              'col-span-4 md:col-span-6 lg:col-span-4',
              'flex flex-col justify-center items-center gap-5'
            )}>
            <div
              aria-hidden="true"
              className={clsx(
                'w-12 h-12 bg-white rounded-full shadow-custom',
                'flex items-center justify-center'
              )}>
              <Icon className="size-6 text-indigo-700" />
            </div>
            <div className="flex flex-col justify-center gap-2 self-stretch">
              <span className="font-semibold text-xl text-center text-neutral-900">
                {title}
              </span>
              <span className="font-normal text-base text-center text-neutral-600">
                {description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturesGridSection;
