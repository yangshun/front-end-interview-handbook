import type { ComponentProps } from 'react';

import Anchor from '~/components/ui/Anchor';

export default function MDXLink({
  href,
  ref: _ref, // TODO: Ignore for now since MDX won't pass it in.
  ...props
}: ComponentProps<'a'>) {
  return <Anchor href={href} target="_blank" {...props} />;
}
