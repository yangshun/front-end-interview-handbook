'use client';

import GuidesLayoutSidebar from '~/components/guides/GuidesLayoutSidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function FrontEndInterviewGuidebookLayout({ children }: Props) {
  return <GuidesLayoutSidebar>{children}</GuidesLayoutSidebar>;
}
