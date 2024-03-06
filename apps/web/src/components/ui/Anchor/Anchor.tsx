'use client';

import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import React from 'react';
import url from 'url';

import { useAppContext } from '~/components/global/AppContextProvider';
import { useScrollManagement } from '~/components/global/ScrollManagementProvider';

import type { I18nLinkProps } from '~/next-i18nostic/src';
import { i18nHref, I18nLink, useI18n } from '~/next-i18nostic/src';

import {
  anchorCVA,
  type AnchorVariant,
  type AnchorWeight,
} from './AnchorStyles';

export type Props = Omit<I18nLinkProps, 'href'> &
  Readonly<{
    href?: I18nLinkProps['href'];
    locale?: string;
    scrollToTop?: boolean;
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
    rel: relProp,
    target: targetProp,
    scrollToTop = true,
    underline = false,
    variant = 'default',
    warnAboutExternalLink = false,
    weight = 'medium',
    onClick,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const { locale } = useI18n();
  const { serverMismatch } = useAppContext();
  const { setShouldScrollToTop } = useScrollManagement();
  const isExternalURL =
    typeof href === 'string' ? /^(http|mailto)/.test(href ?? '') : false;

  const finalHref = href ?? '#';
  const rel = relProp ?? (isExternalURL ? 'noreferrer noopener' : undefined);
  const className = clsx(
    anchorCVA({ className: classNameProp, variant, weight }),
    underline && 'underline',
  );
  const target = targetProp ?? (isExternalURL ? '_blank' : undefined);

  if (
    // Do a hard navigation when client and server versions mismatch.
    serverMismatch ||
    isExternalURL ||
    // TODO: <Link> when used in app directory with an anchor href causes
    // a redirect to the homepage. Let's use a vanilla <a> for now.
    (typeof finalHref === 'string' && finalHref.startsWith('#'))
  ) {
    const finalHrefString = finalHref.toString();

    return (
      <a
        ref={ref}
        className={className}
        href={
          warnAboutExternalLink
            ? url.format(
                i18nHref(
                  {
                    pathname: '/link',
                    query: {
                      u: encodeURI(finalHrefString),
                    },
                  },
                  locale,
                ),
              )
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
    // eslint-disable-next-line react/jsx-no-target-blank
    <I18nLink
      ref={ref}
      className={className}
      href={finalHref}
      rel={rel}
      target={target}
      onClick={(event) => {
        if (scrollToTop) {
          setShouldScrollToTop(true);
        }
        onClick?.(event);
      }}
      {...props}>
      {children}
    </I18nLink>
  );
}

export default forwardRef(Anchor);
