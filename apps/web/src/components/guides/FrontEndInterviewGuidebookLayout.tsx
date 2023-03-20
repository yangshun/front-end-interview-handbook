import { useFrontEndInterviewGuidebookNavigation } from './FrontEndInterviewGuidebookNavigation';
import GuidesLayoutContents from './GuidesLayoutContents';
import type { TableOfContents } from './GuidesTableOfContents';

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  tableOfContents?: TableOfContents;
  title: string;
}>;

export default function FrontEndInterviewGuidebookLayout({
  children,
  description,
  tableOfContents,
  title,
}: Props) {
  const navigation = useFrontEndInterviewGuidebookNavigation();

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
