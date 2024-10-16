import clsx from 'clsx';
import { PiPathBold } from 'react-icons/pi';
import { RiAwardLine, RiBriefcaseLine } from 'react-icons/ri';

import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Divider from '~/components/ui/Divider';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderElementColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import LogoComboMark from '../logos/LogoComboMark';
import { useProductMenuUnseenIndicator } from '../product-theme/useProductMenuUnseenIndicator';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type ProductValue = 'interviews' | 'projects';

function NavProductDropdownMenuItem({
  beta = false,
  href,
  label,
  product,
  showNewIndicator,
}: Readonly<{
  beta?: boolean;
  href: string;
  label: string;
  product: string;
  showNewIndicator: boolean;
}>) {
  return (
    <DropdownMenuPrimitive.Item
      asChild={true}
      className={clsx(
        'relative flex flex-col gap-3',
        'rounded',
        'px-3 py-2',
        'select-none outline-none',
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementEmphasizedStateColor_Focus,
      )}>
      <Anchor
        aria-label={product}
        href={href}
        locale="en-US"
        prefetch={null}
        variant="unstyled">
        <div className="flex h-5 items-center justify-between">
          <div className="relative flex items-center gap-2.5">
            <LogoComboMark height={17} />
            <Divider
              className="h-3.5"
              color="emphasized"
              direction="vertical"
            />
            <Text className="text-[13px]" size="inherit" weight="bold">
              {label}
            </Text>
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
              <Badge label="Beta" size="xs" variant="primary" />
            </span>
          )}
        </div>
      </Anchor>
    </DropdownMenuPrimitive.Item>
  );
}

type Props = Readonly<{ product: ProductValue }>;

const roadmapLinks: Record<ProductValue, string> = {
  interviews: '/interviews/roadmap',
  projects: '/projects/roadmap',
};

export default function NavProductDropdownMenuContent({ product }: Props) {
  const items = useCommonNavItems();
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();

  return (
    <DropdownMenuPrimitive.Content
      align="start"
      className={clsx(
        'flex flex-col',
        'w-[360px] rounded-lg',
        ['border', themeBorderElementColor],
        themeBackgroundElementColor,
        'z-dropdown',
      )}
      sideOffset={8}>
      <div className={clsx('flex flex-col gap-3', 'px-5 pb-3 pt-4')}>
        <Text color="secondary" size="body3">
          Products
        </Text>
        <div className={clsx('flex flex-col gap-1.5')}>
          <NavProductDropdownMenuItem
            href="/"
            label="Interviews"
            product="GreatFrontEnd Interviews"
            showNewIndicator={false}
          />
          <NavProductDropdownMenuItem
            beta={true}
            href="/projects"
            label="Projects"
            product="GreatFrontEnd Projects"
            showNewIndicator={showUnseenIndicator}
          />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-col gap-2',
          'px-5 py-4',
          themeBackgroundElementEmphasizedStateColor,
        )}>
        <Text color="secondary" size="body3">
          Others
        </Text>
        <div className={clsx('flex flex-col gap-0.5')}>
          {[
            {
              href: items.blog.href,
              icon: items.blog.icon,
              label: items.blog.label,
            },
            {
              href: '/affiliates',
              icon: RiAwardLine,
              label: 'Become an affiliate',
            },
            {
              href: roadmapLinks[product],
              icon: PiPathBold,
              label: 'Roadmap',
            },
            {
              href: '/jobs',
              icon: RiBriefcaseLine,
              label: "We're hiring",
            },
          ].map(({ label, href, icon: Icon }) => (
            <Anchor
              key={href}
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
          ))}
        </div>
      </div>
    </DropdownMenuPrimitive.Content>
  );
}
