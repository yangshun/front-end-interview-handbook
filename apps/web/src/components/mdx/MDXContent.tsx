import { useMDXComponent } from 'next-contentlayer/hooks';
import type { ComponentType } from 'react';

import MDXComponents from '~/components/mdx/MDXComponents';
import Prose from '~/components/ui/Prose';

type Props = Readonly<{
  components?: Record<string, ComponentType<AnyIntentional>>;
  fontSize?: 'custom' | 'md' | 'sm';
  mdxCode: string;
  proseClassName?: string;
}>;

export default function MDXContent({
  components,
  fontSize = 'sm',
  mdxCode,
  proseClassName,
}: Props) {
  const Content = useMDXComponent(mdxCode);

  return (
    <Prose className={proseClassName} textSize={fontSize}>
      <Content components={{ ...MDXComponents, ...components }} />
    </Prose>
  );
}
