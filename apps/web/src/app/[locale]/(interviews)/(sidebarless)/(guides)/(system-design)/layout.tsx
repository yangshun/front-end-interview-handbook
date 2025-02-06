'use client';

import type { ReactNode } from 'react';

import SidebarPremiumChip from '~/components/global/sidebar/SidebarPremiumChip';
import { useFrontEndSystemDesignPlaybookNavigation } from '~/components/guides/books/FrontEndSystemDesignPlaybookNavigation';
import GuidesLayout from '~/components/guides/GuidesLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useFrontEndSystemDesignPlaybookNavigation();

  const mappedItems = navigation.navigation.items.map((navItem) => ({
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
    <GuidesLayout
      guide="FRONT_END_SYSTEM_DESIGN_PLAYBOOK"
      navigation={{
        ...navigation,
        navigation: { ...navigation.navigation, items: mappedItems },
      }}>
      {children}
    </GuidesLayout>
  );
}
