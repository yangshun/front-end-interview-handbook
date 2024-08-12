import clsx from 'clsx';

import Link from '../ui/Link';
import CartButton from '../CartButton';
import MobileNavMenu from './MobileNavMenu';

const links = [
  {
    name: 'Shop all',
    href: '/products',
  },
  {
    name: 'Latest arrivals',
    href: '/latest',
  },
];

const Navbar = ({ className }) => {
  return (
    <div
      className={clsx(
        'z-sticky sticky top-0',
        'mx-auto max-w-[1216px]',
        'h-[68px] lg:h-[60px]',
        'px-4 py-3 md:px-8 xl:px-0',
        'flex items-center justify-between gap-4 lg:gap-20',
        className,
      )}>
      <Link className="w-[163px]" variant="unstyled" to="/">
        <img
          src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg"
          alt="Stylenest's Logo"
        />
      </Link>
      <nav className={clsx('hidden flex-1 gap-8', 'lg:flex')}>
        {links.map((link) => (
          <Link to={link.href} variant="gray" type="nav" end>
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <CartButton />
        <MobileNavMenu links={links} />
      </div>
    </div>
  );
};

export default Navbar;
