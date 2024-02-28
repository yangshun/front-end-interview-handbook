'use client';

import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import React from 'react';

import { useAppContext } from '~/components/global/AppContextProvider';
import { useScrollManagement } from '~/components/global/ScrollManagementProvider';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { I18nLinkProps } from '~/next-i18nostic/src';
import { I18nLink } from '~/next-i18nostic/src';

import { themeTextBrandColor, themeTextBrandColor_Hover } from '../theme';

type AnchorVariant =
  | 'blend' // Same color as text, brand color on hover.
  | 'default' // Brand color, emphasized and underline on hover.
  | 'flat' // Same color as text, underline on hover.
  | 'light' // Lighter brand color, emphasized on hover.
  | 'muted' // Secondary color, brand color on hover.
  | 'unstyled';
type AnchorFontWeight = 'medium' | 'regular';

const anchorStyles: Record<AnchorVariant, string> = {
  blend: themeTextBrandColor_Hover,
  default: clsx(
    themeTextBrandColor,
    themeTextBrandColor_Hover,
    'hover:underline',
  ),
  flat: 'hover:underline',
  light: 'text-brand-light hover:text-brand',
  muted: clsx(themeTextSecondaryColor, themeTextBrandColor_Hover),
  unstyled: '',
};

export type Props = Omit<I18nLinkProps, 'href'> &
  Readonly<{
    href?: I18nLinkProps['href'];
    locale?: string;
    scrollToTop?: boolean;
    suppressHydrationWarning?: boolean;
    underline?: boolean;
    variant?: AnchorVariant;
    weight?: AnchorFontWeight;
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
    weight = 'medium',
    onClick,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const { serverMismatch } = useAppContext();
  const { setShouldScrollToTop } = useScrollManagement();
  const isExternalURL =
    typeof href === 'string' ? /^(http|mailto)/.test(href ?? '') : false;

  const finalHref = href ?? '#';
  const rel = relProp ?? (isExternalURL ? 'noreferrer noopener' : undefined);
  const className = clsx(
    'transition-colors',
    variant !== 'unstyled' &&
      clsx(
        anchorStyles[variant],
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
        weight === 'medium' && 'font-medium',
        underline && 'underline',
      ),
    classNameProp,
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
    return (
      <a
        ref={ref}
        className={className}
        href={finalHref.toString()}
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
