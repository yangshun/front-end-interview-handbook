'use client';

import GuidesLayoutSidebar from '~/components/guides/GuidesLayoutSidebar';
import useBehavioralInterviewGuidebookNavigation from '~/components/guides/useBehavioralInterviewGuidebookNavigation';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function BehavioralInterviewGuidebookLayout({
  children,
}: Props) {
  const navigation = useBehavioralInterviewGuidebookNavigation();

  return (
    <GuidesLayoutSidebar navigation={navigation}>
      {children}
    </GuidesLayoutSidebar>
  );
}
