'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsMainLayoutTabCategory } from '../../common/layout/useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from '../../common/layout/useProjectsMainLayoutTabs';

type Props = Readonly<{
  baseUrl: string;
}>;

export default function ProjectsProfileProgressTabs({ baseUrl }: Props) {
  const { pathname } = useI18nPathname();
  const intl = useIntl();
  const mainLayoutTabs = useProjectsMainLayoutTabs();
  const DEFAULT_TAB = 'challenges';
  const progressTabs: ReadonlyArray<TabItem<ProjectsMainLayoutTabCategory>> =
    mainLayoutTabs.map((tab) => ({
      href:
        baseUrl +
        (tab.key === DEFAULT_TAB ? '/progress' : `/progress/${tab.key}`),
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
    if (progressTabs.some((t) => t.href === pathname)) {
      // User accessed a specific URL
      tabsRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
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
      scrollToTop={false}
      size="sm"
      tabs={progressTabs}
      value={value}
    />
  );
}
