import clsx from 'clsx';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import ProjectsLogo from '~/components/global/logos/ProjectsLogo';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
} from '~/components/ui/theme';

import InterviewsLogo from '../../../global/logos/InterviewsLogo';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function ProjectsSidebarProductMenuItem({
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
    <DropdownMenu.Item
      asChild={true}
      className={clsx(
        'relative flex flex-col p-4 gap-3 rounded select-none outline-none',
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementEmphasizedStateColor_Focus,
      )}>
      <Anchor aria-label={label} href={href} variant="unstyled">
        <div className="flex justify-between">
          <Logo height={28} />
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
    </DropdownMenu.Item>
  );
}

export default function ProjectsSidebarProductMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild={true}>
        <button
          aria-label="Select product"
          className={clsx(
            'flex justify-between items-center',
            'rounded-lg py-4 px-3',
            'select-none outline-none',
            ['border', themeBorderElementColor],
            'transition-colors',
            [
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
            ],
            themeBackgroundElementEmphasizedStateColor_Hover,
            themeBackgroundElementPressedStateColor_Active,
          )}
          type="button">
          <ProjectsLogo height={32} />
          <RiArrowDownSLine
            className={clsx(
              'size-4 shrink-0',
              'text-neutral-600 dark:text-neutral-200',
              'data-[state=open]:rotate-180',
            )}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={clsx(
            'flex flex-col gap-2',
            'rounded-lg p-4 glassbox w-[360px]',
            themeBackgroundElementColor,
          )}
          sideOffset={8}>
          <ProjectsSidebarProductMenuItem
            href="/prepare"
            label="GreatFrontEnd Interviews"
            logo={InterviewsLogo}
            subtitle="Learn and train for your front end interviews"
          />
          <ProjectsSidebarProductMenuItem
            beta={true}
            href="/projects"
            label="GreatFrontEnd Projects"
            logo={ProjectsLogo}
            subtitle="Build real-world projects to learn skills or for portfolio"
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
