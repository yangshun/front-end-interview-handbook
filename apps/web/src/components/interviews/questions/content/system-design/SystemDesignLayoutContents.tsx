'use client';

import GuidesMainLayout from '~/components/guides/GuidesMainLayout';
import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import useFlattenedNavigationItems from '~/components/guides/useFlattenedNavigationItems';
import { useSystemDesignNavigation } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

import { useI18nPathname } from '~/next-i18nostic/src';

import SystemDesignPaywall from './SystemDesignPaywall';

type Props = Readonly<{
  children?: React.ReactNode;
  isComingSoon?: boolean;
  shouldCheckPremium?: boolean;
  tableOfContents?: TableOfContents;
}>;

export default function SystemDesignLayoutContents({
  children,
  isComingSoon = false,
  shouldCheckPremium = true,
  tableOfContents,
}: Props) {
  const { pathname } = useI18nPathname();
  const navigation = useSystemDesignNavigation();

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  return (
    <GuidesMainLayout navigation={navigation} tableOfContents={tableOfContents}>
      <SystemDesignPaywall
        isComingSoon={isComingSoon}
        isPremium={currentItem.premium}
        shouldCheckPremium={shouldCheckPremium}>
        {children}
      </SystemDesignPaywall>
    </GuidesMainLayout>
  );
}
