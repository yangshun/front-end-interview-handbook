import clsx from 'clsx';
import type { BlogCategory } from 'contentlayer/generated';

import type { SideNavigationItems } from '~/components/common/SideNavigation';
import SideNavigation from '~/components/common/SideNavigation';
import Section from '~/components/ui/Heading/HeadingContext';

function convertToSideNavigationItem(
  tocItems: ReadonlyArray<BlogCategory>,
): SideNavigationItems<string> {
  return tocItems.map((item) => ({
    label: item.title,
    value: item.source,
  }));
}

type BlogExploreSeriesSidebar = Readonly<{
  activeItem: string;
  navigation: ReadonlyArray<BlogCategory>;
  onChange: (value: string) => void;
  sticky?: boolean;
}>;

export function BlogExploreSeriesSidebar({
  activeItem,
  navigation,
  onChange,
}: BlogExploreSeriesSidebar) {
  return (
    <nav className={clsx('flex w-40 shrink-0 flex-col')}>
      <Section>
        <SideNavigation
          activeValue={activeItem}
          items={convertToSideNavigationItem(navigation)}
          onClick={onChange}
        />
      </Section>
    </nav>
  );
}
