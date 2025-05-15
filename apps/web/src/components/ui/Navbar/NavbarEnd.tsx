import clsx from 'clsx';

import NavbarItem from './NavbarItem';
import type { NavbarTopLevelItem } from './NavTypes';

type Props = Readonly<{
  addOnItems?: React.ReactNode;
  className: string;
  isLoading: boolean;
  links: ReadonlyArray<NavbarTopLevelItem>;
}>;

export default function NavbarEnd({
  addOnItems,
  className,
  isLoading,
  links,
}: Props) {
  return (
    <div
      className={clsx(
        className,
        'transition-opacity duration-500',
        isLoading ? 'opacity-0' : 'opacity-100',
      )}>
      {links.length > 0 && (
        <div className="hidden items-center gap-x-4 md:flex md:gap-x-8">
          {links.map((navItem) => (
            <NavbarItem key={navItem.id} {...navItem} />
          ))}
        </div>
      )}
      {addOnItems}
    </div>
  );
}
