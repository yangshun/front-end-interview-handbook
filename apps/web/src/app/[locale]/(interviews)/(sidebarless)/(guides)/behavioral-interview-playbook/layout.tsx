'use client';

import type { ReactNode } from 'react';

import { useBehavioralInterviewPlaybookNavigation } from '~/components/guides/books/BehavioralInterviewPlaybookNavigation';
import GuidesLayout from '~/components/guides/GuidesLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useBehavioralInterviewPlaybookNavigation();

  return (
    <GuidesLayout guide="BEHAVIORAL_INTERVIEW_PLAYBOOK" navigation={navigation}>
      {children}
    </GuidesLayout>
  );
}
