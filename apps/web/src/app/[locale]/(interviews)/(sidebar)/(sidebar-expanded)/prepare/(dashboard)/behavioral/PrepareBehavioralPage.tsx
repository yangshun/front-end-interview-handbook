'use client';

import { useIntl } from 'react-intl';

import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import DashboardGuidesGrid from '~/components/interviews/dashboard/DashboardGuidesGrid';

export default function PrepareBehavioralInterviewPage() {
  const intl = useIntl();
  const behavioralInterviewGuidebookNavigation =
    useBehavioralInterviewGuidebookNavigation();

  return (
    <DashboardGuidesGrid
      items={behavioralInterviewGuidebookNavigation.items
        .map((item) => item.links)
        .flat()}
      title={intl.formatMessage({
        defaultMessage: 'Behavioral Interview Study Guides',
        description: 'Behavioral interview study guides',
        id: 's7CwKz',
      })}
    />
  );
}
