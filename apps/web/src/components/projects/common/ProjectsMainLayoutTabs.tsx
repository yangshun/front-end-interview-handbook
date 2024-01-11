import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsMainLayoutTabCategory } from './useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from './useProjectsMainLayoutTabs';

export default function ProjectsMainLayoutTabs() {
  const { pathname } = useI18nPathname();
  const intl = useIntl();
  const tabs_ = useProjectsMainLayoutTabs();
  const tabs: ReadonlyArray<TabItem<ProjectsMainLayoutTabCategory>> = tabs_.map(
    (tab) => ({
      ...tab,
      value: tab.key,
    }),
  );

  const value = useMemo(() => {
    const tab = tabs.find((t) => t.href === pathname);

    return tab?.value ?? 'projects';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Tabs
      label={intl.formatMessage({
        defaultMessage: 'Select project category',
        description: 'Tab label to select another project category',
        id: 'GcmSpX',
      })}
      size="sm"
      tabs={tabs}
      value={value}
    />
  );
}
