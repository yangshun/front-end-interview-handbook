'use client';

import type { ReactNode } from 'react';

import GuidesLayout from '~/components/guides/GuidesLayout';
import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useBehavioralInterviewGuidebookNavigation();

  return (
    <GuidesLayout guide="BEHAVIORAL_INTERVIEW_PLAYBOOK" navigation={navigation}>
      {children}
    </GuidesLayout>
  );
}
