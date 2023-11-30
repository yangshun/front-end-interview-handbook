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

type TabType = 'component-track' | 'projects' | 'skill-tree';

const tabs: Array<TabItem<TabType>> = [
  {
    href: '/projects/all',
    icon: RiRocketLine,
    label: 'Projects',
    value: 'projects',
  },
  {
    href: '/projects/skill-tree',
    icon: RiNodeTree,
    label: 'Skill tree',
    value: 'skill-tree',
  },
  {
    href: '/projects/component-track',
    icon: RiCheckboxMultipleLine,
    label: 'Component Track',
    value: 'component-track',
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
      tabs={tabs}
      value={value}
    />
  );
}
