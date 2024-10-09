import clsx from 'clsx';
import { PiPathBold } from 'react-icons/pi';
import { RiAwardLine, RiBriefcaseLine } from 'react-icons/ri';

import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import InterviewsLogo from '~/components/global/logos/InterviewsLogo';
import ProjectsLogo from '~/components/global/logos/ProjectsLogo';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderElementColor,
} from '~/components/ui/theme';

import { useProductMenuUnseenIndicator } from '../product-theme/useProductMenuUnseenIndicator';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type ProductValue = 'interviews' | 'projects';

function NavProductDropdownMenuItem({
  beta = false,
  href,
  theme,
  logo: Logo,
  label,
  showNewIndicator,
  subtitle,
}: Readonly<{
  beta?: boolean;
  href: string;
  label: string;
  logo: (props: Readonly<{ height?: number }>) => JSX.Element;
  showNewIndicator: boolean;
  subtitle: string;
  theme: 'interviews' | 'projects';
}>) {
  return (
    <DropdownMenuPrimitive.Item
      asChild={true}
      className={clsx(
        'relative flex flex-col gap-3 rounded p-4',
        'select-none outline-none',
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementEmphasizedStateColor_Focus,
      )}>
      <Anchor
        aria-label={label}
        data-theme={theme}
        href={href}
        locale="en-US"
        prefetch={null}
        variant="unstyled">
        <div className="flex justify-between">
          <div className="relative">
            <Logo height={32} />
            {showNewIndicator && (
              <span
                aria-hidden={true}
                className={clsx(
                  'size-1.5 inline-block',
                  'bg-red rounded-full',
                  'absolute -right-1.5 -top-0.5',
                )}
              />
            )}
          </div>
          {beta && (
            <span>
              <Badge label="Beta" size="sm" variant="primary" />
            </span>
          )}
        </div>
        <Text color="secondary" size="body2">
          {subtitle}
        </Text>
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
      <div className={clsx('flex flex-col gap-2', 'p-4')}>
        <NavProductDropdownMenuItem
          href="/"
          label="GreatFrontEnd Interviews"
          logo={InterviewsLogo}
          showNewIndicator={false}
          subtitle="Learn and train for your front end interviews"
          theme="interviews"
        />
        <NavProductDropdownMenuItem
          beta={true}
          href="/projects"
          label="GreatFrontEnd Projects"
          logo={ProjectsLogo}
          showNewIndicator={showUnseenIndicator}
          subtitle="Build real-world projects to learn skills or for portfolio"
          theme="projects"
        />
      </div>
      <div
        className={clsx(
          'flex flex-col gap-1',
          'px-4 py-2',
          themeBackgroundElementEmphasizedStateColor,
        )}>
        <Anchor
          className={clsx(
            'inline-flex items-center gap-2 p-3',
            textVariants({
              color: 'inherit',
              size: 'body2',
              weight: 'medium',
            }),
          )}
          href={items.blog.href}
          variant="secondary">
          {items.blog.icon != null && (
            <items.blog.icon aria-hidden={true} className="size-4 shrink-0" />
          )}
          {items.blog.label}
        </Anchor>
        <Anchor
          className={clsx(
            'inline-flex items-center gap-2 p-3',
            textVariants({
              color: 'inherit',
              size: 'body2',
              weight: 'medium',
            }),
          )}
          href="/affiliates"
          variant="secondary">
          <RiAwardLine className="size-4 shrink-0" />
          Become an affiliate
        </Anchor>
        <Anchor
          className={clsx(
            'inline-flex items-center gap-2 p-3',
            textVariants({
              color: 'inherit',
              size: 'body2',
              weight: 'medium',
            }),
          )}
          href={roadmapLinks[product]}
          variant="secondary">
          <PiPathBold className="size-4 shrink-0" />
          Roadmap
        </Anchor>
        <Anchor
          className={clsx(
            'inline-flex items-center gap-2 p-3',
            textVariants({
              color: 'inherit',
              size: 'body2',
              weight: 'medium',
            }),
          )}
          href="/jobs"
          variant="secondary">
          <RiBriefcaseLine className="size-4 shrink-0" />
          We're hiring
        </Anchor>
      </div>
    </DropdownMenuPrimitive.Content>
  );
}
