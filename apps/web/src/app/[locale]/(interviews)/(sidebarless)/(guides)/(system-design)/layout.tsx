'use client';

import type { ReactNode } from 'react';

import SidebarPremiumChip from '~/components/global/sidebar/SidebarPremiumChip';
import GuidesLayout from '~/components/guides/GuidesLayout';
import { useSystemDesignNavigation } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useSystemDesignNavigation();

  const mappedItems = navigation.items.map((navItem) => ({
    ...navItem,
    items:
      navItem.items?.map((navItemItem) => ({
        ...navItemItem,
        addOnElement: navItemItem.premium ? (
          <div className="flex grow justify-end">
            <SidebarPremiumChip />
          </div>
        ) : null,
      })) ?? [],
  }));

  return (
    <GuidesLayout navigation={{ ...navigation, items: mappedItems }}>
      {children}
    </GuidesLayout>
  );
}
