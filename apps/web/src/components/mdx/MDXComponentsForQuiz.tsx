// DO NOT make the component a client one otherwise it
// cannot be used by mdx-components.tsx on the server.

import type { ComponentProps } from 'react';

import MDXCodeBlockExecutable from '~/components/mdx/MDXCodeBlockExecutable';

import MDXComponents from './MDXComponents';

const MDXComponentsForQuiz = Object.freeze({
  ...MDXComponents,
  pre: (props: ComponentProps<'pre'>) => <MDXCodeBlockExecutable {...props} />,
});

const MDXComponentsForScrollableQuiz = Object.freeze({
  ...MDXComponentsForQuiz,
  h1: (props: ComponentProps<typeof MDXComponents.h2>) => (
    <MDXComponents.h2 {...props} />
  ),
  h2: (props: ComponentProps<typeof MDXComponents.h3>) => (
    <MDXComponents.h3 {...props} />
  ),
  h3: (props: ComponentProps<typeof MDXComponents.h4>) => (
    <MDXComponents.h4 {...props} />
  ),
  h4: (props: ComponentProps<typeof MDXComponents.h5>) => (
    <MDXComponents.h5 {...props} />
  ),
  h5: (props: ComponentProps<typeof MDXComponents.h6>) => (
    <MDXComponents.h6 {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => <MDXCodeBlockExecutable {...props} />,
});

export { MDXComponentsForQuiz, MDXComponentsForScrollableQuiz };
