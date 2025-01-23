'use client';

import type { ReactNode } from 'react';

import useBehavioralInterviewGuidebookNavigation from '~/components/guides/books/useBehavioralInterviewGuidebookNavigation';
import GuidesLayout from '~/components/guides/GuidesLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useBehavioralInterviewGuidebookNavigation();

  return (
    <GuidesLayout guide="BEHAVIORAL_INTERVIEW_PLAYBOOK" navigation={navigation}>
      {children}
    </GuidesLayout>
  );
}
