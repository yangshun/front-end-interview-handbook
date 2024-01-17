'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import type { ProjectsMainTabCategory } from './useProjectsCategoryTabs';
import useProjectsCategoryTabs from './useProjectsCategoryTabs';
import type { ProjectsMainLayoutTabCategory } from './useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from './useProjectsMainLayoutTabs';

export default function ProjectsProgressAndContributionsSection() {
  const intl = useIntl();
  const mainTabs = useProjectsCategoryTabs();
  const tabs_ = useProjectsMainLayoutTabs();
  const progressTabs: ReadonlyArray<TabItem<ProjectsMainLayoutTabCategory>> =
    tabs_.map((tab) => ({
      ...tab,
      href: '#',
      value: tab.key,
    }));
  const [currentDashboardTab, setCurrentDashboardTab] =
    useState<ProjectsMainTabCategory>('progress');
  const [currentProgressTab, setCurrentProgressTab] =
    useState<ProjectsMainLayoutTabCategory>('challenges');

  return (
    <div className="flex flex-col gap-8">
      <Tabs
        label={intl.formatMessage({
          defaultMessage: 'Select dashboard category',
          description: 'Tab label to select another dashboard category',
          id: '1O3xR8',
        })}
        size="md"
        tabs={mainTabs}
        value={currentDashboardTab}
        onSelect={setCurrentDashboardTab}
      />
      {currentDashboardTab === 'progress' && (
        <Tabs
          hasBorder={false}
          label={intl.formatMessage({
            defaultMessage: 'Select project category',
            description: 'Tab label to select another project category',
            id: 'GcmSpX',
          })}
          size="sm"
          tabs={progressTabs}
          value={currentProgressTab}
          onSelect={setCurrentProgressTab}
        />
      )}
    </div>
  );
}
