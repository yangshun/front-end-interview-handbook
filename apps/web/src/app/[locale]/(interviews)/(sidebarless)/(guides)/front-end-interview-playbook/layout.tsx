'use client';

import type { ReactNode } from 'react';

import { useFrontEndInterviewGuidebookNavigation } from '~/components/guides/books/useFrontEndInterviewGuidebookNavigation';
import GuidesLayout from '~/components/guides/GuidesLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useFrontEndInterviewGuidebookNavigation();

  return (
    <GuidesLayout guide="FRONT_END_INTERVIEW_PLAYBOOK" navigation={navigation}>
      {children}
    </GuidesLayout>
  );
}
