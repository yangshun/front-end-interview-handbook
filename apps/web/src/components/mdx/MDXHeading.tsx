'use client';

import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { RiLink } from 'react-icons/ri';
import url from 'url';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

import { useToast } from '../global/toasts/useToast';
import { themeTextSubtleColor } from '../ui/theme';

type Props = ComponentProps<'h1'> &
  Readonly<{
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }>;

export default function MDXHeading({ as: Tag, id, children, ...props }: Props) {
  const intl = useIntl();
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);
  const { showToast } = useToast();

  return (
    <Tag {...props}>
      {(() => {
        if (id == null) {
          return children;
        }

        return (
          <Anchor
            className="group cursor-pointer scroll-mt-28"
            href={`#${id}`}
            id={id}
            variant="unstyled"
            onClick={async () => {
              const fullUrl = new URL(
                url.format({ hash: id, pathname: window.location.pathname }),
                window.location.href,
              ).toString();

              await onCopy(fullUrl);
              showToast({
                duration: 3000,
                title: intl.formatMessage({
                  defaultMessage: 'URL copied to clipboard',
                  description: 'Copied heading URL',
                  id: 'MoV/nU',
                }),
                variant: 'success',
              });
            }}>
            {children}
            <RiLink
              aria-hidden={true}
              className={clsx(
                'shrink-0',
                'size-5 ml-2 inline-block',
                'transition-all duration-300',
                isCopied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                isCopied
                  ? 'translate-x-0'
                  : '-translate-x-1/2 group-hover:translate-x-0',
                themeTextSubtleColor,
              )}
            />
          </Anchor>
        );
      })()}
    </Tag>
  );
}
