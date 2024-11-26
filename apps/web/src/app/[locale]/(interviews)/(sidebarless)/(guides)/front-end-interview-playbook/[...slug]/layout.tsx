'use client';

import type { ReactNode } from 'react';

import GuidesLayout from '~/components/guides/GuidesLayout';
import { useFrontEndInterviewGuidebookNavigation } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useFrontEndInterviewGuidebookNavigation();

  return (
    <GuidesLayout guide="FRONT_END_INTERVIEW_PLAYBOOK" navigation={navigation}>
      {children}
    </GuidesLayout>
  );
}
