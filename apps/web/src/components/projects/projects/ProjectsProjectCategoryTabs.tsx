import { useMemo } from 'react';
import {
  RiCheckboxMultipleLine,
  RiNodeTree,
  RiRocketLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

type TabType = 'all-projects' | 'skill-tree' | 'tracks';

const tabs: Array<TabItem<TabType>> = [
  {
    href: '/projects/all',
    icon: RiRocketLine,
    label: 'All projects',
    value: 'all-projects',
  },
  {
    href: '/projects/skill-tree',
    icon: RiNodeTree,
    label: 'Skill tree',
    value: 'skill-tree',
  },
  {
    href: '/projects/tracks',
    icon: RiCheckboxMultipleLine,
    label: 'Component tracks',
    value: 'tracks',
  },
];

export default function ProjectsProjectCategoryTabs() {
  const { pathname } = useI18nPathname();
  const intl = useIntl();

  const value = useMemo(() => {
    const tab = tabs.find((t) => t.href === pathname);

    return tab?.value ?? 'projects';
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
