// DO NOT make the component a client one otherwise it
// cannot be used by mdx-components.tsx on the server.

import type { ComponentProps } from 'react';

import MDXAlert from './MDXAlert';
import MDXCodeBlock from './MDXCodeBlock';
import MDXHeading from './MDXHeading';
import MDXImage from './MDXImage';
import MDXLink from './MDXLink';
import MDXTable from './MDXTable';

const MDXComponents = Object.freeze({
  MDXAlert,
  a: MDXLink,
  h1: (props: ComponentProps<'h1'>) => <MDXHeading as="h1" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <MDXHeading as="h2" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <MDXHeading as="h3" {...props} />,
  h4: (props: ComponentProps<'h4'>) => <MDXHeading as="h4" {...props} />,
  h5: (props: ComponentProps<'h5'>) => <MDXHeading as="h5" {...props} />,
  h6: (props: ComponentProps<'h6'>) => <MDXHeading as="h6" {...props} />,
  img: MDXImage,
  pre: MDXCodeBlock,
  table: MDXTable,
});

export default MDXComponents;
