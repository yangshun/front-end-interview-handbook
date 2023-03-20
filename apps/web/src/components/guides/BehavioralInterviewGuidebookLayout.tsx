'use client';

import GuidesLayoutContents from './GuidesLayoutContents';
import type { TableOfContents } from './GuidesTableOfContents';
import useBehavioralInterviewGuidebookNavigation from './useBehavioralInterviewGuidebookNavigation';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  tableOfContents?: TableOfContents;
  title: string;
}>;

export default function BehavioralInterviewGuidebookLayout({
  children,
  description,
  title,
  tableOfContents,
}: Props) {
  const navigation = useBehavioralInterviewGuidebookNavigation();

  return (
    <GuidesLayoutContents
      description={description}
      navigation={navigation}
      tableOfContents={tableOfContents}
      title={title}>
      {children}
    </GuidesLayoutContents>
  );
}
