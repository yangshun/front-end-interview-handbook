'use client';

import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsMainLayoutTabCategory } from '../../common/useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from '../../common/useProjectsMainLayoutTabs';

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
      href: baseUrl + (tab.key === DEFAULT_TAB ? '' : `/progress/${tab.key}`),
      key: tab.key,
      label: tab.label,
      type: tab.type,
      value: tab.key,
    }));

  const value: ProjectsMainLayoutTabCategory = useMemo(() => {
    const tab = progressTabs.find((t) => t.href === pathname);

    return tab?.value ?? DEFAULT_TAB;
  }, [pathname, progressTabs]);

  return (
    <Tabs
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
