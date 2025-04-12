'use client';

import type { ReactNode } from 'react';

import SidebarPremiumChip from '~/components/global/sidebar/SidebarPremiumChip';
import { useFrontEndSystemDesignPlaybookNavigation } from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookNavigation';
import GuidesLayout from '~/components/guides/GuidesLayout';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

type Props = Readonly<{
  children: ReactNode;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function FrontEndSystemDesignPlaybookSidebar({
  questions,
  children,
}: Props) {
  const navigation = useFrontEndSystemDesignPlaybookNavigation(questions);

  const mappedItems = navigation.navigation.items.map((navItem) => ({
    ...navItem,
    items:
      navItem.type === 'list'
        ? navItem.items?.map((navItemItem) => ({
            ...navItemItem,
            addOnElement: navItemItem.premium ? (
              <div className="flex grow justify-end">
                <SidebarPremiumChip />
              </div>
            ) : null,
          }))
        : [],
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
