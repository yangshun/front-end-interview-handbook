'use client';

import clsx from 'clsx';
import {
  RiBookOpenLine,
  RiCheckboxMultipleLine,
  RiCodeSSlashLine,
  RiContractLeftLine,
  RiDiscordLine,
  RiGraduationCapLine,
  RiHome3Line,
  RiLogoutBoxLine,
  RiMoreLine,
  RiNodeTree,
  RiNotification3Line,
  RiPriceTag3Line,
  RiRocketLine,
  RiSettings4Line,
  RiShiningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Popover from '~/components/ui/Popover';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBackgroundLayerEmphasizedHover,
  themeElementBorderColor,
  themeTextBrandColor,
  themeTextBrandHoverColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import { ProjectsSidebarFreePlanCTACard } from './ProjectsSidebarFreePlanCTACard';
import { ProjectsSidebarMonthlyPlanCTACard } from './ProjectsSidebarMonthlyPlanCTACard';
import { ProjectsSidebarNotSignedInHeader } from './ProjectsSidebarNotSignedInHeader';
import { ProjectsSidebarProfileHeader } from './ProjectsSidebarProfileHeader';
import { ProjectsSidebarStartProjectCTACard } from './ProjectsSidebarStartProjectCTACard';
import { ProjectsSidebarYearlyPlanCTACard } from './ProjectsSidebarYearlyPlanCTACard';

type SidebarItem = SidebarDivider | SidebarGroup | SidebarLink;

export type SidebarLink = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type: 'link';
}>;

export type SidebarGroup = Readonly<{
  items: ReadonlyArray<SidebarItem>;
  key: string;
  label?: string;
  type: 'group';
}>;

export type SidebarDivider = Readonly<{
  key: string;
  type: 'divider';
}>;

function useSidebarItems() {
  const intl = useIntl();

  return [
    {
      items: [
        {
          href: '/projects/dashboard',
          icon: RiHome3Line,
          key: 'dashboard',
          label: intl.formatMessage({
            defaultMessage: 'Dashboard',
            description: 'Label for Dashboard sidebar item in Projects sidebar',
            id: '50s+NV',
          }),
          type: 'link',
        },
      ],
      key: 'main',
      type: 'group',
    },
    {
      items: [
        {
          href: '/projects/all',
          icon: RiRocketLine,
          key: 'all-projects',
          label: intl.formatMessage({
            defaultMessage: 'All projects',
            description:
              'Label for All projects sidebar item in Projects sidebar',
            id: 'm8b+T6',
          }),
          type: 'link',
        },
        {
          href: '/projects/skill-tree',
          icon: RiNodeTree,
          key: 'skill-tree',
          label: intl.formatMessage({
            defaultMessage: 'Skill tree',
            description:
              'Label for Skill Tree sidebar item in Projects sidebar',
            id: 'FC61kC',
          }),
          type: 'link',
        },
        {
          href: '/projects/tracks',
          icon: RiCheckboxMultipleLine,
          key: 'component-tracks',
          label: intl.formatMessage({
            defaultMessage: 'Component tracks',
            description:
              'Label for Component Tracks sidebar item in Projects sidebar',
            id: 'bdjVW4',
          }),
          type: 'link',
        },
      ],
      key: 'projects',
      label: intl.formatMessage({
        defaultMessage: 'Projects',
        description: 'Label for Projects sidebar group in Projects sidebar',
        id: '3efYzQ',
      }),
      type: 'group',
    },
    {
      items: [
        {
          href: '/projects/submissions',
          icon: RiCodeSSlashLine,
          key: 'all-submissions',
          label: intl.formatMessage({
            defaultMessage: 'All submissions',
            description:
              'Label for All submissions sidebar item in Projects sidebar',
            id: 'ujBJq7',
          }),
          type: 'link',
        },
        {
          href: '/projects/submissions/learn-from-others',
          icon: RiBookOpenLine,
          key: 'learn-from-others',
          label: intl.formatMessage({
            defaultMessage: 'Learn from others',
            description:
              'Label for Learn from others sidebar item in Projects sidebar',
            id: 'e1ohyq',
          }),
          type: 'link',
        },
        {
          href: '/projects/submissions/mentor-others',
          icon: RiGraduationCapLine,
          key: 'mentor-others',
          label: intl.formatMessage({
            defaultMessage: 'Mentor others',
            description:
              'Label for Mentor others sidebar item in Projects sidebar',
            id: 'HEV8y4',
          }),
          type: 'link',
        },
      ],
      key: 'submissions',
      label: intl.formatMessage({
        defaultMessage: 'Submissions',
        description: 'Label for Submissions sidebar group in Projects sidebar',
        id: 'cj9Pen',
      }),
      type: 'group',
    },
    {
      key: 'divider-1',
      type: 'divider',
    },
    {
      items: [
        {
          href: '/projects/features',
          icon: RiShiningLine,
          key: 'features',
          label: intl.formatMessage({
            defaultMessage: 'Features',
            description: 'Label for Features sidebar item in Projects sidebar',
            id: 'J6IHpl',
          }),
          type: 'link',
        },
        {
          href: '/projects/pricing',
          icon: RiPriceTag3Line,
          key: 'pricing',
          label: intl.formatMessage({
            defaultMessage: 'Pricing',
            description: 'Label for Pricing sidebar item in Projects sidebar',
            id: 'VbvRHt',
          }),
          type: 'link',
        },
      ],
      key: 'features-pricing',
      type: 'group',
    },
  ] as const satisfies ReadonlyArray<SidebarDivider | SidebarGroup>;
}

function SidebarLinkButton({
  label,
  icon: Icon,
  href,
  onClick,
}: {
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  label: string;
  onClick?: () => void;
}) {
  const { pathname } = useI18nPathname();
  const isSelected = pathname === href;

  return (
    <Anchor
      aria-current={isSelected ? 'page' : undefined}
      className={clsx(
        'flex w-full items-center gap-3 rounded px-3 py-2',
        themeBackgroundLayerEmphasizedHover,
        themeTextBrandHoverColor,
        isSelected && [themeTextBrandColor, themeBackgroundEmphasized],
        !isSelected && themeTextSecondaryColor,
      )}
      href={href}
      variant="unstyled"
      onClick={onClick}>
      <Icon className="h-4 w-4" />
      <Text color="inherit" size="body2" weight="bold">
        {label}
      </Text>
    </Anchor>
  );
}

function SidebarDivider() {
  return (
    <li
      className={clsx(
        'h-px w-full',
        'bg-[radial-gradient(100%_45405.26%_at_100%_0%,_rgba(33,_19,_52,_2e-05)_0%,_rgba(33,_19,_52,_2e-05)_0%,_rgba(255,_255,_255,_0.2)_48.96%,_rgba(33,_19,_52,_2e-05)_100%)]',
      )}
    />
  );
}

export default function ProjectsSideBar() {
  const { profile } = useProfile();
  const intl = useIntl();
  const sideBarItems = useSidebarItems();
  const endAddOnItems = (
    <ul className="flex flex-col gap-6">
      {profile == null && <ProjectsSidebarStartProjectCTACard />}
      {profile != null && (
        <>
          {/* TODO(projects): Show only one of these depending on subscription status */}
          <ProjectsSidebarFreePlanCTACard />
          <ProjectsSidebarMonthlyPlanCTACard />
          <ProjectsSidebarYearlyPlanCTACard />
        </>
      )}
      <SidebarDivider />
      <li className="flex justify-between gap-4">
        <div className="flex gap-4">
          <Button
            icon={RiNotification3Line}
            isLabelHidden={true}
            label="Notifications"
            size="sm"
            variant="secondary"
          />
          <Button
            icon={RiDiscordLine}
            isLabelHidden={true}
            label="Discord"
            size="sm"
            variant="special"
          />
          <Popover
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            size="sm">
            <div>
              <SidebarLinkButton
                href="#"
                icon={RiSettings4Line}
                label={intl.formatMessage({
                  defaultMessage: 'Settings',
                  description:
                    'Label for Settings sidebar item in Projects sidebar',
                  id: 'c9QTag',
                })}
              />
              <SidebarLinkButton
                href="#"
                icon={RiLogoutBoxLine}
                label={intl.formatMessage({
                  defaultMessage: 'Log out',
                  description:
                    'Label for Log out sidebar item in Projects sidebar',
                  id: 'd+eqOa',
                })}
              />
            </div>
          </Popover>
        </div>
        <Button
          icon={RiContractLeftLine}
          isLabelHidden={true}
          label="Collapse"
          size="sm"
          variant="secondary"
        />
      </li>
    </ul>
  );

  return (
    <div
      className={clsx(
        'relative flex h-full flex-col overflow-y-auto border-e',
        themeElementBorderColor,
      )}>
      {profile !== null ? (
        <ProjectsSidebarProfileHeader points={1800} />
      ) : (
        <ProjectsSidebarNotSignedInHeader />
      )}
      <nav className="-mt-2 flex flex-1 flex-col justify-between">
        <ul className="flex flex-col gap-5 p-4">
          {sideBarItems.map((item) => {
            switch (item.type) {
              case 'divider':
                return <SidebarDivider key={item.key} />;
              case 'group':
                return (
                  <li key={item.key} className="flex flex-col gap-2">
                    {'label' in item && (
                      <Text
                        className="px-2"
                        color="secondary"
                        size="body3"
                        weight="bold">
                        {item.label}
                      </Text>
                    )}
                    <ul className="flex flex-col">
                      {item.items.map(({ key: _key, ...link }) => (
                        <li key={item.key}>
                          <SidebarLinkButton {...link} />
                        </li>
                      ))}
                    </ul>
                  </li>
                );
            }
          })}
        </ul>
      </nav>
      <div className="sticky bottom-0 p-4">{endAddOnItems}</div>
    </div>
  );
}
