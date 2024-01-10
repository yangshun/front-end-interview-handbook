import { useMDXComponent } from 'next-contentlayer/hooks';

import MDXComponents from '~/components/mdx/MDXComponents';
import Prose from '~/components/ui/Prose';

type Props = Readonly<{
  mdxCode: string;
}>;

export default function ProjectsChallengeMdxContent({ mdxCode }: Props) {
  const MDXContent = useMDXComponent(mdxCode);

  return (
    <Prose textSize="sm">
      <MDXContent components={MDXComponents} />
    </Prose>
  );
}
