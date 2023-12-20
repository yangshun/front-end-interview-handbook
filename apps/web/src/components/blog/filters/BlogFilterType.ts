import type { ReactNode } from 'react';

import type { BlogMetadata } from '~/components/blog/BlogTypes';

export type BlogFilter<
  T extends string,
  Q extends BlogMetadata = BlogMetadata,
> = Readonly<{
  id: string;
  matches: (blog: Q) => boolean;
  name: string;
  onChange: (value: T) => void;
  options: ReadonlyArray<{
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: ReactNode;
    tooltip?: string;
    value: T;
  }>;
}>;
