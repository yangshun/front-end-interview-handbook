'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useIntl } from '~/components/intl';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsMainLayoutTabCategory } from '../../common/layout/useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from '../../common/layout/useProjectsMainLayoutTabs';

type Props = Readonly<{
  baseUrl: string;
}>;

const DEFAULT_TAB: ProjectsMainLayoutTabCategory = 'challenges';

export default function ProjectsProfileProgressTabs({ baseUrl }: Props) {
  const { pathname } = useI18nPathname();
  const intl = useIntl();
  const mainLayoutTabs = useProjectsMainLayoutTabs();
  const progressTabs: ReadonlyArray<TabItem<ProjectsMainLayoutTabCategory>> =
    mainLayoutTabs.map((tab) => ({
      href: baseUrl + '/progress' + tab.relativePathname,
      key: tab.key,
      label: tab.label,
      type: tab.type,
      value: tab.key,
    }));

  const value: ProjectsMainLayoutTabCategory = useMemo(() => {
    const tab = progressTabs.find((t) => t.href === pathname);

    return tab?.value ?? DEFAULT_TAB;
  }, [pathname, progressTabs]);

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressTabs.some((tab) => tab.href === pathname)) {
      if (
        tabsRef?.current?.offsetTop &&
        // Only scroll if tab contents are not clearly in view.
        Math.abs(window.scrollY - tabsRef?.current?.offsetTop) < 300
      ) {
        return;
      }

      // TODO(projects): hack to let data load first and scroll only
      // when the page layout is not likely to be still loading.
      setTimeout(() => {
        tabsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 1000);
    }
  }, [progressTabs, pathname]);

  return (
    <Tabs
      ref={tabsRef}
      hasBorder={false}
      label={intl.formatMessage({
        defaultMessage: 'Select project category',
        description: 'Tab label to select another project category',
        id: 'GcmSpX',
      })}
      scroll={false}
      size="sm"
      tabs={progressTabs}
      value={value}
    />
  );
}
