'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import type { ForwardedRef } from 'react';
import { forwardRef, useRef } from 'react';
import React from 'react';
import url from 'url';

import { useAppContext } from '~/components/global/AppContextProvider';

import type { I18nLinkProps } from '~/next-i18nostic/src';
import { I18nLink, useI18n } from '~/next-i18nostic/src';

import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '../theme';
import {
  type AnchorVariant,
  anchorVariants,
  type AnchorWeight,
} from './AnchorStyles';
import { externalLinkHref } from './ExternalLinkHref';

export type Props = Omit<I18nLinkProps, 'href' | 'prefetch'> &
  Readonly<{
    href?: string;
    locale?: string;
    prefetch?: I18nLinkProps['prefetch'] | 'hover'; // Add custom prefetch-on-hover behavior
    refresh?: boolean; // Hard navigation, uses <a>
    suppressHydrationWarning?: boolean;
    underline?: boolean;
    variant?: AnchorVariant;
    warnAboutExternalLink?: boolean;
    weight?: AnchorWeight;
  }>;

function Anchor(
  {
    children,
    className: classNameProp,
    href = '#',
    prefetch = 'hover',
    refresh = false,
    rel: relProp,
    target: targetProp,
    underline = false,
    variant,
    warnAboutExternalLink = false,
    weight,
    onClick,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const { locale } = useI18n();
  const { serverMismatch } = useAppContext();
  const hasPrefetched = useRef(false);
  const router = useRouter();

  const isExternalURL =
    typeof href === 'string' ? /^(http|mailto)/.test(href ?? '') : false;

  const finalHref = href ?? '#';

  const rel = relProp ?? (isExternalURL ? 'noreferrer noopener' : undefined);
  const className = anchorVariants({
    className: clsx(
      underline && '!underline',
      variant !== 'unstyled' && [
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
      ],
      classNameProp,
    ),
    variant,
    weight,
  });

  const target = targetProp ?? (isExternalURL ? '_blank' : undefined);

  if (
    refresh ||
    // Do a hard navigation when client and server versions mismatch.
    serverMismatch ||
    isExternalURL ||
    // TODO: <Link> when used in app directory with an anchor href causes
    // a redirect to the homepage. Let's use a vanilla <a> for now.
    finalHref.startsWith('#')
  ) {
    const finalHrefString = url.format(finalHref);

    return (
      <a
        ref={ref}
        className={className}
        href={
          warnAboutExternalLink
            ? externalLinkHref({ locale, url: finalHrefString })
            : finalHrefString
        }
        rel={rel}
        target={target}
        onClick={(event) => {
          // Prevent anchor navigation from adding to browser history.
          if (finalHref === '#') {
            event.preventDefault();
          }
          // TODO: add "link" variant to Button and migrate non-href
          // <Anchor>s to <Button variant="link"> instead.
          onClick?.(event);
        }}
        {...props}>
        {children}
      </a>
    );
  }

  return (
    <I18nLink
      ref={ref}
      className={className}
      href={finalHref}
      prefetch={prefetch === 'hover' ? false : prefetch}
      rel={rel}
      target={target}
      onClick={onClick}
      onMouseEnter={
        prefetch === 'hover'
          ? () => {
              if (hasPrefetched.current) {
                return;
              }

              hasPrefetched.current = true;
              router.prefetch(href);
            }
          : undefined
      }
      {...props}>
      {children}
    </I18nLink>
  );
}

export default forwardRef(Anchor);
