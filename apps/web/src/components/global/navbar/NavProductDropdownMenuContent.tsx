import clsx from 'clsx';
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

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

function NavProductDropdownMenuItem({
  beta = false,
  href,
  logo: Logo,
  label,
  subtitle,
}: Readonly<{
  beta?: boolean;
  href: string;
  label: string;
  logo: (props: Readonly<{ height?: number }>) => JSX.Element;
  subtitle: string;
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
      <Anchor aria-label={label} href={href} variant="unstyled">
        <div className="flex justify-between">
          <Logo height={32} />
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

export default function NavProductDropdownMenuContent() {
  const items = useCommonNavItems();

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
          subtitle="Learn and train for your front end interviews"
        />
        <NavProductDropdownMenuItem
          beta={true}
          href="/projects"
          label="GreatFrontEnd Projects"
          logo={ProjectsLogo}
          subtitle="Build real-world projects to learn skills or for portfolio"
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
          href="/jobs"
          variant="secondary">
          <RiBriefcaseLine className="size-4 shrink-0" />
          We're hiring
        </Anchor>
      </div>
    </DropdownMenuPrimitive.Content>
  );
}
