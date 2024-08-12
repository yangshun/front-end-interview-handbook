import { useState } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { RiCloseLine, RiMenuLine } from 'react-icons/ri';

import Link from 'src/components/ui/Link';

const MobileNavMenu = ({ links }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenMenu(!openMenu)}
        aria-label="Open mobile menu"
        aria-expanded={openMenu ? 'true' : 'false'}
        aria-controls="nav-slideout-menu"
        type="button"
        className={clsx(
          'block rounded text-neutral-600 lg:hidden',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        )}>
        <RiMenuLine className="size-5" aria-hidden="true" />
      </button>

      {/* Mobile nav menu */}
      {openMenu &&
        createPortal(
          <nav
            id="nav-slideout-menu"
            className={clsx(
              'z-fixed fixed inset-0 max-w-[400px] bg-white px-4 py-6 lg:hidden',
              'flex flex-col gap-6',
              'animate-slideout',
            )}>
            <div className="flex items-center justify-between">
              <img
                src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg"
                alt="StyleNest's logo"
              />
              <button
                onClick={() => setOpenMenu(false)}
                aria-label="Close mobile menu"
                type="button"
                className={clsx(
                  'rounded text-neutral-600',
                  'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
                )}>
                <RiCloseLine className="size-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpenMenu(false)}
                  className="px-3 py-2 text-sm"
                  variant="gray"
                  type="nav">
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>,
          document.body,
        )}
    </>
  );
};

export default MobileNavMenu;
