import type { HTMLAttributes } from 'react';

import { useHeadingLevel } from './HeadingContext';

type Props = HTMLAttributes<HTMLHeadingElement>;

export default function Heading(props: Props) {
  const { level } = useHeadingLevel();
  const HeadingTag = `h${level}`;

  return <HeadingTag {...props} />;
}
