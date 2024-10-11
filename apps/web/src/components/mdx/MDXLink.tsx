import type { ComponentProps } from 'react';

import Anchor from '~/components/ui/Anchor';

export default function MDXLink({
  href,
  ref: _ref, // TODO: Ignore for now since MDX won't pass it in.
  ...props
}: ComponentProps<'a'>) {
  const sameWindow = href?.startsWith('#') || href?.startsWith('/');

  return (
    <Anchor
      href={href}
      // Don't open in external page if anchor link within page.
      target={sameWindow ? undefined : '_blank'}
      {...props}
    />
  );
}
