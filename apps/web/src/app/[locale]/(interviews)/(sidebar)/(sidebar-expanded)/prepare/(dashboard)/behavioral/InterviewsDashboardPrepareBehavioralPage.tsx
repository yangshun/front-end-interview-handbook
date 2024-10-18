'use client';

import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import InterviewsDashboardGuidesGrid from '~/components/interviews/dashboard/InterviewsDashboardGuidesGrid';
import { useIntl } from '~/components/intl';

export default function InterviewsDashboardPrepareBehavioralInterviewPage() {
  const intl = useIntl();
  const behavioralInterviewGuidebookNavigation =
    useBehavioralInterviewGuidebookNavigation();

  return (
    <InterviewsDashboardGuidesGrid
      items={behavioralInterviewGuidebookNavigation.items
        .map((item) => (item.type === 'list' ? item.items : [item]))
        .flat()}
      title={intl.formatMessage({
        defaultMessage: 'Behavioral Interview Study Guides',
        description: 'Behavioral interview study guides',
        id: 's7CwKz',
      })}
    />
  );
}
