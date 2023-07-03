'use client';

import { useIntl } from 'react-intl';

import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import QuestionsGuidesGrid from '~/components/questions/listings/auxilliary/QuestionsGuidesGrid';

export default function PrepareBehavioralInterviewPage() {
  const intl = useIntl();
  const behavioralInterviewGuidebookNavigation =
    useBehavioralInterviewGuidebookNavigation();

  return (
    <QuestionsGuidesGrid
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
