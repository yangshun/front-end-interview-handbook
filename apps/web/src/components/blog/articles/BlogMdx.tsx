import { useMDXComponent } from 'next-contentlayer/hooks';

import MDXComponents from '~/components/mdx/MDXComponents';
import Prose from '~/components/ui/Prose';

export default function BlogMdx({
  code,
  textSize,
}: {
  code: string;
  textSize?: React.ComponentProps<typeof Prose>['textSize'];
}) {
  const MDXContent = useMDXComponent(code);

  return (
    <Prose textSize={textSize}>
      <MDXContent components={MDXComponents} />
    </Prose>
  );
}
