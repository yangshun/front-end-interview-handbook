'use client';

import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  RiCalendarLine,
  RiDiscordFill,
  RiDiscordLine,
  RiGithubFill,
  RiMailLine,
  RiShieldUserLine,
  RiUserLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { hasProjectsBetaAccess } from '~/data/PromotionConfig';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';
import Text from '~/components/ui/Text';
import { themeLineColor } from '~/components/ui/theme';

import ExclusiveTicket from '../common/tickets/ExclusiveTicket';
import Badge from '../ui/Badge';
import Tooltip from '../ui/Tooltip';

import type { User } from '@supabase/auth-helpers-nextjs';

type Props = Readonly<{
  children: React.ReactNode;
  user: User;
}>;

type ProfileTabItem =
  | 'account'
  | 'activity'
  | 'billing'
  | 'coupons'
  | 'security';
type ProfileTabItemData = Readonly<{
  href: string;
  label: string;
  value: ProfileTabItem;
}>;

export default function ProfileShell({ user, children }: Props) {
  const intl = useIntl();
  const segment: ProfileTabItem =
    (useSelectedLayoutSegment() as ProfileTabItem) ?? 'activity';
  const profileDataQuery = trpc.profile.getProfile.useQuery();

  const tabsData: Record<ProfileTabItem, ProfileTabItemData> = {
    account: {
      href: '/profile/account',
      label: intl.formatMessage({
        defaultMessage: 'Account',
        description: 'Profile account tab title',
        id: 'XuVGsX',
      }),
      value: 'account',
    },
    activity: {
      href: '/profile',
      label: intl.formatMessage({
        defaultMessage: 'Activity',
        description: 'Profile activity tab title',
        id: 'Rdi3ic',
      }),
      value: 'activity',
    },
    billing: {
      href: '/profile/billing',
      label: intl.formatMessage({
        defaultMessage: 'Billing',
        description: 'Profile billing tab title',
        id: 'MHO54p',
      }),
      value: 'billing',
    },
    coupons: {
      href: '/profile/coupons',
      label: intl.formatMessage({
        defaultMessage: 'Coupons',
        description: 'Profile coupons tab title',
        id: 'uyXFhu',
      }),
      value: 'coupons',
    },
    security: {
      href: '/profile/security',
      label: intl.formatMessage({
        defaultMessage: 'Security',
        description: 'Profile security tab title',
        id: 'xsLz0P',
      }),
      value: 'security',
    },
  };

  const tabsList: ReadonlyArray<ProfileTabItemData> = [
    tabsData.activity,
    tabsData.account,
    tabsData.billing,
    tabsData.security,
    tabsData.coupons,
  ];

  return (
    <>
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage: 'Profile',
          description: 'Profile page title',
          id: '81i+95',
        })}
      </Heading>
      <Section>
        {/* 3 column wrapper */}
        <div
          className={clsx(
            'mx-auto w-full max-w-6xl flex-grow lg:flex lg:border-x',
            themeLineColor,
          )}>
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 xl:flex">
            {/* Account profile */}
            <div className="xl:w-72 xl:flex-shrink-0 xl:px-6">
              <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-0">
                <div className="flex items-center justify-between">
                  <div className="w-full flex flex-col flex-1 gap-y-4">
                    <div className="gap-y-8 sm:flex sm:items-center sm:justify-between sm:gap-y-0 xl:block xl:gap-y-8">
                      {/* Profile */}
                      <div className="flex items-center gap-x-3">
                        {profileDataQuery.data?.avatarUrl && (
                          <div className="h-32 w-32 flex-shrink-0">
                            <img
                              alt={profileDataQuery.data?.name ?? ''}
                              className="h-32 w-32 rounded-full"
                              src={profileDataQuery.data?.avatarUrl}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Meta info */}
                    <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-x-8 xl:flex-col xl:gap-x-0 xl:gap-y-4">
                      {!profileDataQuery.isLoading && (
                        <>
                          {profileDataQuery.data?.name && (
                            <Text
                              className="truncate"
                              display="block"
                              size="body0"
                              weight="bold">
                              {profileDataQuery.data?.name}
                            </Text>
                          )}
                          <div className="flex items-center gap-x-2">
                            {profileDataQuery.data?.premium ? (
                              <Badge
                                label={intl.formatMessage({
                                  defaultMessage: 'Premium',
                                  description: 'Premium badge on profile page',
                                  id: 'RBB42Z',
                                })}
                                variant="special"
                              />
                            ) : (
                              <Button
                                display="block"
                                href="/pricing"
                                label={intl.formatMessage({
                                  defaultMessage: 'Get Full Access',
                                  description: 'Get full access button label',
                                  id: '7P0wF0',
                                })}
                                size="xs"
                                variant="primary"
                              />
                            )}
                          </div>
                          {profileDataQuery.data?.premium &&
                            hasProjectsBetaAccess(
                              new Date(
                                profileDataQuery.data?.createdAt,
                              ).getTime(),
                            ) && (
                              <ExclusiveTicket
                                addOnElement={
                                  <Tooltip label="Arriving Jan – Feb 2024">
                                    <Badge
                                      label="Coming soon"
                                      size="sm"
                                      variant="warning"
                                    />
                                  </Tooltip>
                                }
                                padding="sm"
                                ratio="wide"
                                subtitle="2 months free"
                                tooltip="Ticket for exclusive beta access to our new mystery product dropping in Jan – Feb 2024"
                                width={240}
                              />
                            )}
                          <div className="flex items-center gap-x-2">
                            <RiMailLine
                              aria-hidden="true"
                              className="h-5 w-5 shrink-0 text-neutral-500"
                            />
                            <Text className="truncate" size="body2">
                              {user.email}
                            </Text>
                          </div>
                          {profileDataQuery.data?.username && (
                            <div className="flex items-center gap-x-2">
                              <RiUserLine
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-neutral-500"
                              />
                              <Text className="truncate" size="body2">
                                {profileDataQuery.data?.username}
                              </Text>
                            </div>
                          )}
                          {process.env.NODE_ENV === 'development' && (
                            <div className="flex items-center gap-x-2">
                              <RiShieldUserLine
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-neutral-500"
                              />
                              <Text size="body2">{user.id}</Text>
                            </div>
                          )}
                          {profileDataQuery.data?.createdAt && (
                            <div className="flex items-center gap-x-2">
                              <RiCalendarLine
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-neutral-500"
                              />
                              <Text size="body2">
                                {intl.formatMessage(
                                  {
                                    defaultMessage: 'Joined on {date}',
                                    description:
                                      'Date the user joined the service',
                                    id: 'ZHuDIg',
                                  },
                                  {
                                    date: new Date(
                                      profileDataQuery.data?.createdAt,
                                    ).toLocaleDateString(),
                                  },
                                )}
                              </Text>
                            </div>
                          )}
                          {/* Signed in via GitHub  */}
                          {user?.user_metadata.user_name &&
                            user?.user_metadata.iss.includes('github.com') && (
                              <div className="flex items-center gap-x-2">
                                <RiGithubFill
                                  aria-hidden="true"
                                  className="h-5 w-5 shrink-0 text-neutral-500"
                                />
                                <Text size="body2">
                                  <Anchor
                                    href={`https://github.com/${user?.user_metadata.user_name}`}>
                                    {user?.user_metadata.user_name}
                                  </Anchor>
                                </Text>
                              </div>
                            )}
                          {profileDataQuery.data?.premium ? (
                            <Button
                              addonPosition="start"
                              display="block"
                              href="https://discord.gg/8suTg77xXz"
                              icon={RiDiscordFill}
                              label={intl.formatMessage({
                                defaultMessage: 'Join Premium Discord',
                                description: 'Join Discord channel',
                                id: '8XVsRJ',
                              })}
                              variant="primary"
                            />
                          ) : (
                            <div className="flex items-center gap-x-2">
                              <RiDiscordLine
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-neutral-500"
                              />
                              <Text size="body2">
                                <Anchor href="https://discord.gg/NDFx8f6P6B">
                                  {intl.formatMessage({
                                    defaultMessage: 'Join Discord',
                                    description: 'Join Discord channel',
                                    id: 'l1ZqoW',
                                  })}
                                </Anchor>
                              </Text>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'lg:min-w-0 lg:flex-1 lg:border-l',
                themeLineColor,
              )}>
              <div
                className={clsx(
                  'border-t pb-4 pl-4 pr-4 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6',
                  themeLineColor,
                )}>
                <div className="flex items-center">
                  <Tabs
                    label="Select navigation item"
                    size="sm"
                    tabs={tabsList}
                    value={segment}
                  />
                </div>
              </div>
              <div className="px-4 py-8 sm:px-6 lg:px-8 xl:px-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
