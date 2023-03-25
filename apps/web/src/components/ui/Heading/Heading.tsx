import type { ForwardedRef, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useHeadingLevel } from './HeadingContext';

type Props = HTMLAttributes<HTMLHeadingElement>;

function Heading(props: Props, ref: ForwardedRef<HTMLHeadingElement>) {
  const { level } = useHeadingLevel();
  const HeadingTag = `h${level}`;

  // @ts-expect-error TS doesn't know the tags are h1/h2.
  return <HeadingTag ref={ref} {...props} />;
}

export default forwardRef(Heading);
