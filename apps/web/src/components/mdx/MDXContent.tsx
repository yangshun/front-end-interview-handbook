import { useMDXComponent } from 'next-contentlayer/hooks';

import MDXComponents from '~/components/mdx/MDXComponents';
import Prose from '~/components/ui/Prose';

type Props = Readonly<{
  components?: Record<string, () => JSX.Element>;
  mdxCode: string;
}>;

export default function MDXContent({ mdxCode, components }: Props) {
  const Content = useMDXComponent(mdxCode);

  return (
    <Prose textSize="sm">
      <Content components={{ ...MDXComponents, ...components }} />
    </Prose>
  );
}
