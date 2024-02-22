import clsx from 'clsx';
import type { Category } from 'contentlayer/generated';

import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeBorderColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

function LinksList({
  items,
  activeItem,
  onChange,
}: Readonly<{
  activeItem: string;
  items: ReadonlyArray<Category>;
  onChange: (value: string) => void;
}>) {
  return (
    <ul
      className={clsx('flex flex-col gap-y-3 border-l', themeBorderColor)}
      role="list">
      {items.map((link) => (
        <div key={link.href}>
          <div
            className={clsx(
              '-ml-px flex w-full cursor-pointer items-center gap-x-2 border-l text-sm',
              activeItem === link.source
                ? clsx(themeTextBrandColor, 'border-current font-semibold')
                : clsx(
                    themeTextSecondaryColor,
                    'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                  ),
            )}
            onClick={() => onChange(link.source)}>
            <span className="pl-4">{link.title}</span>
          </div>
        </div>
      ))}
    </ul>
  );
}

type BlogExploreSeriesSidebar = Readonly<{
  activeItem: string;
  navigation: ReadonlyArray<Category>;
  onChange: (value: string) => void;
  sticky?: boolean;
}>;

export function BlogExploreSeriesSidebar({
  navigation,
  activeItem,
  onChange,
}: BlogExploreSeriesSidebar) {
  return (
    <nav className={clsx('flex w-[250px] shrink-0 flex-col')}>
      <Section>
        <LinksList
          activeItem={activeItem}
          items={navigation}
          onChange={onChange}
        />
      </Section>
    </nav>
  );
}
