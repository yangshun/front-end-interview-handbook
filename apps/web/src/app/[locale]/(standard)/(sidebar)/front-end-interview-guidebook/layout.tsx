'use client';

import { useFrontEndInterviewGuidebookNavigation } from '~/components/guides/FrontEndInterviewGuidebookNavigation';
import GuidesLayoutSidebar from '~/components/guides/GuidesLayoutSidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function FrontEndInterviewGuidebookLayout({ children }: Props) {
  const navigation = useFrontEndInterviewGuidebookNavigation();

  return (
    <GuidesLayoutSidebar navigation={navigation}>
      {children}
    </GuidesLayoutSidebar>
  );
}
