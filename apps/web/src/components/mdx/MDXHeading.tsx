import type { ComponentProps } from 'react';

import Anchor from '~/components/ui/Anchor';

type Props = ComponentProps<'h1'> &
  Readonly<{
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }>;

export default function MDXHeading({ as: Tag, id, children, ...props }: Props) {
  return (
    <Tag className="group scroll-mt-28" id={id} {...props}>
      {children}
      {id &&
        (() => {
          const anchorTitle = `Direct link to ${
            typeof children === 'string' ? children : id
          }`;

          return (
            <Anchor
              aria-hidden={true}
              aria-label={anchorTitle}
              className="ml-2 select-none !no-underline opacity-0 before:content-['#'] hover:!underline focus:opacity-100 group-hover:opacity-100"
              href={`#${id}`}
              title={anchorTitle}
              underline={false}>
              {/* Hide from crawlers and use pseudo element content instead */}
              &#8203;
            </Anchor>
          );
        })()}
    </Tag>
  );
}
