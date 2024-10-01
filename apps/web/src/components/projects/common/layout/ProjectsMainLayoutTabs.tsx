import { useMemo } from 'react';

import { useIntl } from '~/components/intl';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsMainLayoutTabCategory } from './useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from './useProjectsMainLayoutTabs';

export default function ProjectsMainLayoutTabs() {
  const { pathname } = useI18nPathname();
  const intl = useIntl();
  const mainLayoutTabs = useProjectsMainLayoutTabs();
  const tabs: ReadonlyArray<TabItem<ProjectsMainLayoutTabCategory>> =
    mainLayoutTabs.map((tab) => ({
      ...tab,
      href: '/projects' + tab.relativePathname,
      value: tab.key,
    }));

  const value: ProjectsMainLayoutTabCategory = useMemo(() => {
    const tab = tabs.find((t) => (pathname ?? '').startsWith(t.href ?? ''));

    return tab?.value ?? 'challenges';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Tabs
      label={intl.formatMessage({
        defaultMessage: 'Select project category',
        description: 'Tab label to select another project category',
        id: 'GcmSpX',
      })}
      scroll={false}
      size="sm"
      tabs={tabs}
      value={value}
    />
  );
}
