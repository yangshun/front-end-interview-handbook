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
  className,
  isLoading,
  links,
  addOnItems,
}: Props) {
  return (
    <div
      className={clsx(
        className,
        'transition-opacity duration-500',
        isLoading ? 'opacity-0' : 'opacity-100',
      )}>
      <div className="flex items-center gap-x-3">
        {links.map((navItem) => (
          <NavbarItem key={navItem.itemKey} {...navItem} />
        ))}
      </div>
      {addOnItems}
    </div>
  );
}
