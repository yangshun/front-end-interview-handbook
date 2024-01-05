import type { ProjectStyleGuide } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import MDXComponents from '~/components/mdx/MDXComponents';
import Prose from '~/components/ui/Prose';

type Props = Readonly<{
  styleGuide: ProjectStyleGuide;
}>;

export default function ProjectsProjectAssetsStyleGuide({ styleGuide }: Props) {
  const MDXContent = useMDXComponent(styleGuide.body.code);

  return (
    <Prose textSize="sm">
      <MDXContent components={MDXComponents} />
    </Prose>
  );
}
