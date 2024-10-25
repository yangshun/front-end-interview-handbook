// DO NOT make the component a client one otherwise it
// cannot be used by mdx-components.tsx on the server.

import type { ComponentProps } from 'react';

import MDXCodeBlockWrapper from '~/components/mdx/MDXCodeBlockWrapper';

import MDXComponents from './MDXComponents';

const MDXComponentsForQuiz = Object.freeze({
  ...MDXComponents,
  pre: (props: ComponentProps<'pre'>) => <MDXCodeBlockWrapper {...props} />,
});

export default MDXComponentsForQuiz;
