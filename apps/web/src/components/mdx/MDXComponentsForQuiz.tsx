// DO NOT make the component a client one otherwise it
// cannot be used by mdx-components.tsx on the server.

import type { ComponentProps } from 'react';

import MDXCodeBlockExecutable from '~/components/mdx/MDXCodeBlockExecutable';

import MDXComponents from './MDXComponents';

const MDXComponentsForQuiz = Object.freeze({
  ...MDXComponents,
  pre: (props: ComponentProps<'pre'>) => <MDXCodeBlockExecutable {...props} />,
});

export default MDXComponentsForQuiz;
