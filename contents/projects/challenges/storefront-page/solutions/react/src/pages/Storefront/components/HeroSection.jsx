import clsx from 'clsx';
import Button from 'src/components/ui/Button';
import { useMediaQuery } from 'usehooks-ts';

const HeroSection = () => {
  const isMobileAndBelow = useMediaQuery('(max-width: 767px)');

  return (
    <section
      aria-describedby="hero-section"
      className={clsx(
        'px-4 py-12 md:py-16 lg:p-24',
        'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
        'gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-8',
      )}>
      <div
        className={clsx(
          'col-span-4 md:col-span-6 lg:col-span-5',
          'flex flex-col justify-center gap-8 md:gap-16',
        )}>
        <div className="flex flex-col justify-center gap-4 md:gap-6">
          <span className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Summer styles are finally here
          </span>
          <span className="text-xl text-neutral-600">
            This year, our new summer collection will be your haven from the
            world's harsh elements.
          </span>
        </div>
        <div className="w-[151.5px] md:w-[213px] lg:w-[175.5px]">
          <Button
            href="/products"
            label="Shop now"
            size={isMobileAndBelow ? 'xl' : '2xl'}
            className="w-full"
          />
        </div>
      </div>
      <img
        src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/banner.jpg"
        alt="Storefront hero banner"
        className={clsx(
          'object-cover',
          'rounded-lg',
          'col-span-4 md:col-span-6 lg:col-span-7',
          'h-[264px] w-full md:h-[526px]',
        )}
      />
    </section>
  );
};

export default HeroSection;
