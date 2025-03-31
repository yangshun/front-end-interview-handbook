import clsx from 'clsx';
import type { ReactNode } from 'react';
import { PiPathBold } from 'react-icons/pi';
import { RiAwardLine, RiBriefcaseLine } from 'react-icons/ri';

import { useAnchorClickHandler } from '~/hooks/useAnchorClickHandler';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Divider from '~/components/ui/Divider';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardNoAlphaColor,
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderElementColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import LogoComboMark from '../logos/LogoComboMark';
import SwagOverflowLogo from '../logos/SwagOverflowLogo';
import { useProductMenuUnseenIndicator } from '../product-theme/useProductMenuUnseenIndicator';

import * as PopoverPrimitive from '@radix-ui/react-popover';

type ProductValue = 'interviews' | 'projects';

function NavProductMenuItem({
  beta = false,
  href,
  label,
  product,
  showNewIndicator,
  logo,
  isLabelHidden,
}: Readonly<{
  beta?: boolean;
  href: string;
  isLabelHidden?: boolean;
  label: string;
  logo?: ReactNode;
  product: string;
  showNewIndicator: boolean;
}>) {
  const intl = useIntl();

  return (
    <Anchor
      aria-label={product}
      className={clsx(
        'relative flex flex-col gap-3',
        'rounded',
        'px-3 py-2',
        'select-none outline-none',
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementEmphasizedStateColor_Focus,
      )}
      href={href}
      locale="en-US"
      prefetch={null}
      variant="unstyled">
      <div className="flex h-5 items-center justify-between">
        <div className="relative flex items-center gap-2.5">
          {logo ? logo : <LogoComboMark height={17} />}
          {!isLabelHidden && (
            <>
              <Divider
                className="h-3.5"
                color="emphasized"
                direction="vertical"
              />
              <Text className="text-[13px]" size="inherit" weight="bold">
                {label}
              </Text>
            </>
          )}
          {showNewIndicator && (
            <span
              aria-hidden={true}
              className={clsx(
                'size-1 inline-block',
                'bg-red rounded-full',
                'absolute -right-1.5 top-1',
              )}
            />
          )}
        </div>
        {beta && (
          <span className="flex">
            <Badge
              label={intl.formatMessage({
                defaultMessage: 'Beta',
                description: 'Beta product',
                id: 't1TqnN',
              })}
              size="xs"
              variant="primary"
            />
          </span>
        )}
      </div>
    </Anchor>
  );
}

type Props = PopoverPrimitive.PopoverContentProps &
  Readonly<{
    onClose: () => void;
    product: ProductValue;
  }>;

const roadmapLinks: Record<ProductValue, string> = {
  interviews: '/interviews/roadmap',
  projects: '/projects/roadmap',
};

export default function NavProductPopoverContent({
  product,
  onClose,
  ...props
}: Props) {
  const intl = useIntl();
  const items = useCommonNavItems();
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();

  const { handleAnchorItemClick } = useAnchorClickHandler(onClose);

  return (
    <PopoverPrimitive.Content
      align="start"
      className={clsx(
        'flex flex-col',
        'w-[322px] rounded-lg',
        ['border', themeBorderElementColor],
        themeBackgroundElementColor,
        'z-dropdown',
        'outline-none',
      )}
      sideOffset={8}
      {...props}
      onClick={handleAnchorItemClick}>
      <div className={clsx('flex flex-col gap-3', 'px-5 pb-3 pt-4')}>
        <Text color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="Products"
            description="Products"
            id="VJ7bP6"
          />
        </Text>
        <div className={clsx('flex flex-col gap-1.5')}>
          <NavProductMenuItem
            href="/"
            label="Interviews"
            product="GreatFrontEnd Interviews"
            showNewIndicator={false}
          />
          <NavProductMenuItem
            beta={true}
            href="/projects"
            label="Projects"
            product="GreatFrontEnd Projects"
            showNewIndicator={showUnseenIndicator}
          />
          <NavProductMenuItem
            href="https://swagoverflow.store"
            isLabelHidden={true}
            label="SwagOverflow store"
            logo={<SwagOverflowLogo height={20} width={103} />}
            product="SwagOverflow store"
            showNewIndicator={false}
          />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-col gap-2',
          'px-5 py-4',
          themeBackgroundCardNoAlphaColor,
        )}>
        <Text color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="Others"
            description="Others"
            id="EkxQWy"
          />
        </Text>
        <div className={clsx('flex flex-col gap-0.5')}>
          {[
            {
              href: items.blog.href,
              icon: items.blog.icon,
              label: items.blog.label,
            },
            ...(SPONSORSHIPS_AVAILABLE
              ? [
                  {
                    href: items.advertise.href,
                    icon: items.advertise.icon,
                    label: items.advertise.label,
                    labelAddOn: (
                      <Badge
                        label={intl.formatMessage({
                          defaultMessage: 'New',
                          description: 'Badge label for new',
                          id: 'Aem5n7',
                        })}
                        size="xs"
                        variant="primary"
                      />
                    ),
                  },
                ]
              : []),
            {
              href: '/affiliates',
              icon: RiAwardLine,
              label: intl.formatMessage({
                defaultMessage: 'Become an affiliate',
                description: 'Link label to the affiliates page',
                id: 'OhuJuA',
              }),
            },
            {
              href: roadmapLinks[product],
              icon: PiPathBold,
              label: intl.formatMessage({
                defaultMessage: 'Roadmap',
                description: 'Link label to the roadmap page',
                id: 'Pw5S6B',
              }),
            },
            {
              href: '/jobs',
              icon: RiBriefcaseLine,
              label: intl.formatMessage({
                defaultMessage: "We're hiring",
                description: 'Link label to the jobs page',
                id: '0Rkn1f',
              }),
            },
          ].map(({ label, href, icon: Icon, labelAddOn }) => (
            <div key={href} className="inline-flex items-center gap-2">
              <Anchor
                className={clsx(
                  'inline-flex items-center gap-2 py-2',
                  textVariants({
                    color: 'inherit',
                    size: 'body2',
                  }),
                )}
                href={href}
                variant="flat">
                {Icon && (
                  <Icon
                    aria-hidden={true}
                    className={clsx('size-4 shrink-0', themeTextSubtleColor)}
                  />
                )}
                {label}
              </Anchor>
              {labelAddOn}
            </div>
          ))}
        </div>
      </div>
    </PopoverPrimitive.Content>
  );
}
