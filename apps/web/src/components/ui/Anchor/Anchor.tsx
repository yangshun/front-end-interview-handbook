'use client';

import clsx from 'clsx';
import type { LinkProps } from 'next/link';
import type { ForwardedRef, HTMLAttributeAnchorTarget } from 'react';
import { forwardRef } from 'react';
import React from 'react';

import { useAppContext } from '~/components/global/AppContextProvider';
import { useScrollManagement } from '~/components/global/ScrollManagementProvider';

import { I18nLink } from '~/next-i18nostic/src';

type AnchorVariant = 'default' | 'flat' | 'light' | 'muted' | 'unstyled';
type AnchorFontWeight = 'medium' | 'regular';

type Props = Omit<LinkProps, 'href'> &
  Readonly<{
    children?: React.ReactNode;
    className?: string;
    href?: string;
    locale?: string;
    rel?: string;
    suppressHydrationWarning?: boolean;
    target?: HTMLAttributeAnchorTarget;
    title?: string;
    underline?: boolean;
    variant?: AnchorVariant;
    weight?: AnchorFontWeight;
  }>;

function Anchor(
  {
    children,
    className: classNameProp,
    href,
    rel: relProp,
    target: targetProp,
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
        weight === 'medium' && 'font-medium',
        variant === 'default' &&
          'text-brand-500 hover:text-brand-600 hover:underline',
        variant === 'flat' && 'hover:underline',
        variant === 'light' && 'text-brand-400 hover:text-brand-500',
        variant === 'muted' && 'text-slate-500 hover:text-brand-600',
        underline && 'underline',
      ),
    classNameProp,
  );
  const target = targetProp ?? isExternalURL ? '_blank' : undefined;

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
        href={finalHref}
        rel={rel}
        target={target}
        onClick={onClick}
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
        setShouldScrollToTop(true);
        onClick?.(event);
      }}
      {...props}>
      {children}
    </I18nLink>
  );
}

export default forwardRef(Anchor);
