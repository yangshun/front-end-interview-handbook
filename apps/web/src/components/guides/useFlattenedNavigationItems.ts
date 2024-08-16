import { useMemo } from 'react';

import type {
  BaseGuideNavigationLink,
  GuideNavigation,
  GuideNavigationLinks,
} from './types';

type GuideNavigationLinkFlat<T> = T & {
  breadcrumbs: Array<string>;
};

function flattenNavigationItems<Link extends BaseGuideNavigationLink>({
  title,
  items,
}: GuideNavigation<Link>) {
  const flatItems: Array<GuideNavigationLinkFlat<Link>> = [];
  const crumbs: Array<string> = [title];

  function flatten(
    links: GuideNavigationLinks<Link> | null | undefined,
    breadcrumbs: Array<string>,
  ) {
    if (links == null || links.length === 0) {
      return;
    }

    links.forEach((link) => {
      const newBreadcrumbs = [...breadcrumbs, link.title];

      flatItems.push({ ...link, breadcrumbs: newBreadcrumbs });
      flatten(
        link.items as GuideNavigationLinks<Link> | null | undefined,
        newBreadcrumbs,
      );
    });
  }
  items.forEach((item) => flatten(item.links, [...crumbs, item.title]));

  return flatItems;
}

export default function useFlattenedNavigationItems<
  Link extends BaseGuideNavigationLink,
>(navigation: GuideNavigation<Link>) {
  return useMemo(() => {
    return flattenNavigationItems(navigation);
  }, [navigation]);
}
