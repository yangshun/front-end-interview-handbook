'use client';

import type { ReactNode } from 'react';

import { useReactInterviewPlaybookNavigation } from '~/components/guides/books/ReactInterviewPlaybookNavigation';
import GuidesLayout from '~/components/guides/GuidesLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useReactInterviewPlaybookNavigation();

  return (
    <GuidesLayout guide="REACT_INTERVIEW_PLAYBOOK" navigation={navigation}>
      {children}
    </GuidesLayout>
  );
}
