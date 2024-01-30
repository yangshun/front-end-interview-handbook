'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import Tabs from '~/components/ui/Tabs';

import type { ProjectsMainTabCategory } from './useProjectsCategoryTabs';
import useProjectsCategoryTabs from './useProjectsCategoryTabs';

type Props = Readonly<{
  baseUrl: string;
  currentTab: ProjectsMainTabCategory;
}>;

export default function ProjectsProgressAndContributionsTabs({
  baseUrl,
  currentTab,
}: Props) {
  const intl = useIntl();
  const categoryTabs = useProjectsCategoryTabs().map((tab) => {
    const { href: relativeHref, ...tabWithoutHref } = tab;

    return {
      ...tabWithoutHref,
      href: baseUrl + relativeHref,
    };
  });
  const [currentDashboardTab, setCurrentDashboardTab] =
    useState<ProjectsMainTabCategory>(currentTab);

  return (
    <Tabs
      label={intl.formatMessage({
        defaultMessage: 'Select dashboard category',
        description: 'Tab label to select another dashboard category',
        id: '1O3xR8',
      })}
      size="md"
      tabs={categoryTabs}
      value={currentDashboardTab}
      onSelect={setCurrentDashboardTab}
    />
  );
}
