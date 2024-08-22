'use client';

import type { ReactNode } from 'react';

import GuidesLayout from '~/components/guides/GuidesLayout';
import { useSystemDesignNavigation } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

export default function Layout({ children }: { children: ReactNode }) {
  const navigation = useSystemDesignNavigation();

  return <GuidesLayout navigation={navigation}>{children}</GuidesLayout>;
}
