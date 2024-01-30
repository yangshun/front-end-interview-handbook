'use client';

import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import Tabs from '~/components/ui/Tabs';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { ProjectsProfileTabCategory } from './useProjectsProfileCategoryTabs';
import useProjectsProfileCategoryTabs from './useProjectsProfileCategoryTabs';

type Props = Readonly<{
  baseUrl: string;
}>;

export default function ProjectsProgressAndContributionsTabs({
  baseUrl,
}: Props) {
  const { pathname } = useI18nPathname();
  const intl = useIntl();

  const categoryTabs = useProjectsProfileCategoryTabs();

  const tabs = categoryTabs.map((tab) => {
    const { href: relativeHref, ...tabWithoutHref } = tab;

    return {
      ...tabWithoutHref,
      href: baseUrl + relativeHref,
    };
  });

  const value: ProjectsProfileTabCategory = useMemo(() => {
    const tab = tabs.find((t) => t.href === pathname);

    return tab?.value ?? 'progress';
  }, [pathname, tabs]);

  return (
    <Tabs
      label={intl.formatMessage({
        defaultMessage: 'Select dashboard category',
        description: 'Tab label to select another dashboard category',
        id: '1O3xR8',
      })}
      scrollToTop={false}
      size="md"
      tabs={tabs}
      value={value}
    />
  );
}
