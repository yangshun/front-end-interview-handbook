'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import { basePath as bigBasePath } from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import { basePath as feigBasePath } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import QuestionsSidebar from '~/components/questions/common/QuestionsSidebar';
import { basePath as systemDesignBasePath } from '~/components/questions/content/system-design/SystemDesignNavigation';
import { themeLineColor } from '~/components/ui/theme';

import useI18nPathname from '~/next-i18nostic/src/client/useI18nPathname';

export default function SidebarContainer() {
  const [isCollapsed, setIsCollapsed] = useSessionStorage(
    'gfe:sidebar-collapse',
    false,
  );
  const { pathname } = useI18nPathname();

  useEffect(() => {
    // Close sidebar if visiting a guide path because there's less space.
    if (
      pathname?.startsWith(feigBasePath) ||
      pathname?.startsWith(bigBasePath) ||
      pathname?.startsWith(systemDesignBasePath) ||
      pathname?.startsWith('/questions/system-design') ||
      pathname?.startsWith('/questions/quiz/')
    ) {
      setIsCollapsed(true);
    }
  }, [pathname]);

  return (
    <aside
      className={clsx(
        'sticky z-20 hidden shrink-0 overflow-visible border-r md:block',
        themeLineColor,
        isCollapsed ? 'w-[68px]' : 'w-60',
      )}
      style={{
        height: FooterlessContainerHeight,
        top: `var(--navbar-height)`,
      }}>
      <QuestionsSidebar
        isCollapsed={isCollapsed}
        onCollapseChange={() => setIsCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
