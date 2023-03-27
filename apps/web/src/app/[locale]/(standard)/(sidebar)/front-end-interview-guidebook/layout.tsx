'use client';

import GuidesLayoutSidebar from '~/components/guides/GuidesLayoutSidebar';
import { useFrontEndInterviewGuidebookNavigation } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';

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
