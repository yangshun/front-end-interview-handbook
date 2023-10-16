'use client';

import GuidesLayoutSidebar from '~/components/guides/GuidesLayoutSidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function BehavioralInterviewGuidebookLayout({
  children,
}: Props) {
  return <GuidesLayoutSidebar>{children}</GuidesLayoutSidebar>;
}
