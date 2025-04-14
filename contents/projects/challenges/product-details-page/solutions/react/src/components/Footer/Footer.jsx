import clsx from 'clsx';
import {
  RiFacebookBoxLine,
  RiGithubLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from 'react-icons/ri';

import Link from '../ui/Link';
import NewsletterForm from './NewsletterForm';

const shopCategories = [
  {
    title: 'Unisex',
    href: '/products?categoryId=unisex',
  },
  {
    title: 'Women',
    href: '/products?categoryId=women',
  },
  {
    title: 'Men',
    href: '/products?categoryId=men',
  },
];

const shopCollections = [
  {
    title: 'Latest arrivals',
    href: '/products?collectionId=latest',
  },
  {
    title: 'Urban Oasis',
    href: '/products?collectionId=urban',
  },
  {
    title: 'Cozy Comfort',
    href: '/products?collectionId=cozy',
  },
  {
    title: 'Fresh Fusion',
    href: '/products?collectionId=fresh',
  },
];

const footerSocials = [
  {
    icon: RiYoutubeLine,
    url: 'https://youtube.com',
    name: "Link to Stylenest's youtube profile",
  },
  {
    icon: RiInstagramLine,
    url: 'https://instagram.com',
    name: "Link to Stylenest's instagram profile",
  },
  {
    icon: RiFacebookBoxLine,
    url: 'https://facebook.com',
    name: "Link to Stylenest's facebook profile",
  },
  {
    icon: RiGithubLine,
    url: 'https://github.com',
    name: "Link to Stylenest's github profile",
  },
  {
    icon: RiTwitterXLine,
    url: 'https://twitter.com',
    name: "Link to Stylenest's twitter profile",
  },
];

const Footer = () => {
  return (
    <footer
      className={clsx(
        '',
        'flex flex-col gap-12 md:gap-16',
        'px-4 py-12 md:py-16 lg:p-24',
      )}>
      <div className="grid grid-cols-4 gap-x-4 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12 lg:gap-y-[66px]">
        <div
          className={clsx(
            'flex flex-col gap-2',
            'col-span-4 md:col-span-6 lg:col-span-8',
          )}>
          <div className="text-xl font-semibold text-neutral-900">
            Join our newsletter
          </div>
          <div className="text-neutral-600">
            We’ll send you a nice letter once per week. No spam.
          </div>
        </div>

        <div className="col-span-4 mt-8 md:col-span-6 md:mt-5 lg:col-span-4 lg:mt-0">
          <NewsletterForm />
        </div>

        <div
          className={clsx(
            'flex flex-col gap-6 md:gap-8',
            'col-span-4 mt-12 md:col-span-3 md:mt-16 lg:col-span-4 lg:mt-0',
          )}>
          <div>
            <img
              src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg"
              alt="Stylenest's Logo"
              className="block h-8 w-auto"
            />
          </div>
          <div className="text-neutral-600">
            Craft stunning style journeys that weave more joy into every thread.
          </div>
        </div>

        <div className="col-span-3 hidden md:block lg:hidden" />

        <div
          className={clsx(
            'flex flex-col gap-4',
            'col-span-4 mt-8 md:col-span-3 md:mt-12 lg:col-start-7 lg:mt-0',
          )}>
          <div className="text-sm text-neutral-500">SHOP CATEGORIES</div>
          <div className="flex flex-col gap-3">
            {shopCategories.map((category) => (
              <Link to={category.href} key={category.title} variant="gray">
                {category.title}
              </Link>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-col gap-4',
            'col-span-4 mt-8 md:col-span-3 md:mt-12 lg:mt-0',
          )}>
          <div className="text-sm text-neutral-500">SHOP COLLECTIONS</div>
          <div className="flex flex-col gap-3">
            {shopCollections.map((collection) => (
              <Link to={collection.href} key={collection.title} variant="gray">
                {collection.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-col gap-8 md:flex-row md:items-center lg:justify-between',
          'border-t border-neutral-200 pt-[31px]',
        )}>
        <div className="text-neutral-500">
          &copy; {new Date().getFullYear()} StyleNest, Inc. All rights reserved.
        </div>
        <div className="flex gap-6">
          {footerSocials.map(({ icon: Icon, url, name }) => (
            <Link
              key={name}
              to={url}
              target="_blank"
              rel="noopener noreferrer"
              className="!px-0 !text-neutral-400">
              <Icon className="size-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
