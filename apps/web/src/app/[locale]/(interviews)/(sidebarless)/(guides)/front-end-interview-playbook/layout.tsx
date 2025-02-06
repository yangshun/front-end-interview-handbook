'use client';

import type { ReactNode } from 'react';

import { useFrontEndInterviewPlaybookNavigation } from '~/components/guides/books/FrontEndInterviewPlaybookNavigation';
import GuidesLayout from '~/components/guides/GuidesLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useFrontEndInterviewPlaybookNavigation();

  return (
    <GuidesLayout guide="FRONT_END_INTERVIEW_PLAYBOOK" navigation={navigation}>
      {children}
    </GuidesLayout>
  );
}
