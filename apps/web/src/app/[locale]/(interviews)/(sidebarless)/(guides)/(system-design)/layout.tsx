'use client';

import type { ReactNode } from 'react';
import { RiLockLine } from 'react-icons/ri';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import GuidesLayout from '~/components/guides/GuidesLayout';
import { useSystemDesignNavigation } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useSystemDesignNavigation();
  const { userProfile } = useUserProfile();

  const isInterviewsPremium = userProfile?.isInterviewsPremium ?? false;

  const mappedItems = navigation.items.map((navItem) => ({
    ...navItem,
    items:
      navItem.items?.map((navItemItem) => ({
        ...navItemItem,
        addOnElement:
          isInterviewsPremium && navItemItem.premium ? (
            <RiLockLine className="size-4 shrink-0" />
          ) : null,
      })) ?? [],
  }));

  return (
    <GuidesLayout navigation={{ ...navigation, items: mappedItems }}>
      {children}
    </GuidesLayout>
  );
}
