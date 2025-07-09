import { useMDXComponent } from 'next-contentlayer2/hooks';

import MDXComponents from '~/components/mdx/MDXComponents';
import Prose from '~/components/ui/Prose';

export default function BlogMdx({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);

  return (
    <Prose>
      <MDXContent components={MDXComponents} />
    </Prose>
  );
}
