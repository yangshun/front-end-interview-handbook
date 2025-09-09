// DO NOT make the component a client one otherwise it
// cannot be used by mdx-components.tsx on the server.

import type { ComponentProps } from 'react';

import MDXComponents from '~/components/mdx/MDXComponents';

// This exists just to match the MDX heading size with the design requirement
// without changing the HTML tags in the MDX file.
const CodingWorkspaceMDXComponents = Object.freeze({
  ...MDXComponents,
  h2: (props: ComponentProps<'h2'>) => (
    <MDXComponents.h2 {...props} className="text-base" />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <MDXComponents.h3 {...props} className="text-[15px]" />
  ),
  h4: (props: ComponentProps<'h4'>) => (
    <MDXComponents.h4 {...props} className="text-sm" />
  ),
});

export default CodingWorkspaceMDXComponents;
