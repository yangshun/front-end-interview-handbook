import clsx from 'clsx';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useLocalStorage } from 'usehooks-ts';

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
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
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
        'relative flex flex-col p-4 gap-3 rounded',
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
    </DropdownMenu.Item>
  );
}

// Increment number whenever the indicator is to be shown again.
const indicatorKey = 'gfe:product-menu-unseen-indicator:0';

export default function ProjectsSidebarProductMenu() {
  const [showUnseenIndicator, setShowUnseenIndicator] = useLocalStorage(
    indicatorKey,
    true,
  );

  return (
    <DropdownMenu.Root
      onOpenChange={() => {
        setShowUnseenIndicator(false);
      }}>
      <DropdownMenu.Trigger asChild={true}>
        <button
          aria-label="Select product"
          className={clsx(
            'flex justify-between items-center',
            'rounded-lg py-4 px-3',
            'group',
            'select-none outline-none',
            ['border', themeBorderElementColor],
            'transition-colors',
            [
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            ],
            themeBackgroundElementEmphasizedStateColor_Hover,
            themeBackgroundElementPressedStateColor_Active,
          )}
          type="button">
          <div className="flex gap-1">
            <ProjectsLogo height={32} />
            {showUnseenIndicator && (
              <span
                className={clsx('size-2 bg-red rounded-full -translate-y-1/2')}
              />
            )}
          </div>
          <RiArrowDownSLine
            className={clsx(
              'size-4 shrink-0',
              'text-neutral-600 dark:text-neutral-200',
              'transition-transform group-data-[state=open]:rotate-180',
            )}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={clsx(
            'flex flex-col gap-2',
            'rounded-lg p-4 w-[360px]',
            themeBackgroundElementColor,
            ['border', themeBorderElementColor],
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
