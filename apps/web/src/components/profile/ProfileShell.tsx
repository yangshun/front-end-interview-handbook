'use client';

import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  RiCalendarLine,
  RiMailLine,
  RiStarLine,
  RiUserLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import DiscordIcon from '~/components/icons/DiscordIcon';
import GitHubIcon from '~/components/icons/GitHubIcon';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';
import Text from '~/components/ui/Text';
import { themeLineColor } from '~/components/ui/theme';

import type { User } from '@supabase/auth-helpers-nextjs';

type Props = Readonly<{
  children: React.ReactNode;
  user: User;
}>;

type ProfileTabItem = 'account' | 'activity' | 'billing' | 'security';
type ProfileTabItemData = Readonly<{
  href: string;
  label: string;
  value: ProfileTabItem;
}>;

export default function ProfileShell({ user, children }: Props) {
  const intl = useIntl();
  const segment = useSelectedLayoutSegment() ?? 'activity';
  const { userProfile, isUserProfileLoading } = useUserProfile();

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
            <div className="xl:w-64 xl:flex-shrink-0 xl:px-6">
              <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-0">
                <div className="flex items-center justify-between">
                  <div className="w-full flex-1 gap-y-8">
                    <div className="gap-y-8 sm:flex sm:items-center sm:justify-between sm:gap-y-0 xl:block xl:gap-y-8">
                      {/* Profile */}
                      <div className="flex items-center gap-x-3">
                        {user?.user_metadata?.avatar_url && (
                          <div className="h-24 w-24 flex-shrink-0">
                            <img
                              alt={user?.user_metadata?.full_name}
                              className="h-24 w-24 rounded-full"
                              src={user?.user_metadata?.avatar_url}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Meta info */}
                    <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-x-8 xl:flex-col xl:gap-x-0 xl:gap-y-4">
                      {user?.user_metadata?.full_name && (
                        <Text
                          className="truncate"
                          display="block"
                          weight="bold">
                          {user?.user_metadata?.full_name}
                        </Text>
                      )}
                      {!isUserProfileLoading && (
                        <>
                          <div className="flex items-center gap-x-2">
                            {userProfile?.isPremium ? (
                              <span className="to-brand-dark inline-flex items-center gap-x-1 rounded-full bg-gradient-to-r from-pink-500 py-1.5 pl-2 pr-2.5 text-sm font-medium text-white">
                                <RiStarLine
                                  aria-hidden="true"
                                  className="text-white-400 h-5 w-5 shrink-0"
                                />
                                <Text size="body3" weight="bold">
                                  {intl.formatMessage({
                                    defaultMessage: 'PREMIUM',
                                    description:
                                      'Premium badge on profile page',
                                    id: 'fevxJB',
                                  })}
                                </Text>
                              </span>
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
                          <div className="flex items-center gap-x-2">
                            <RiMailLine
                              aria-hidden="true"
                              className="h-5 w-5 shrink-0 text-neutral-500"
                            />
                            <Text
                              className="truncate"
                              color="secondary"
                              size="body2">
                              {user.email}
                            </Text>
                          </div>
                          {process.env.NODE_ENV === 'development' && (
                            <div className="flex items-center gap-x-2">
                              <RiUserLine
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-neutral-500"
                              />
                              <Text color="secondary" size="body2">
                                {user.id}
                              </Text>
                            </div>
                          )}
                          {userProfile?.createdAt && (
                            <div className="flex items-center gap-x-2">
                              <RiCalendarLine
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-neutral-500"
                              />
                              <Text color="secondary" size="body2">
                                {intl.formatMessage(
                                  {
                                    defaultMessage: 'Joined on {date}',
                                    description:
                                      'Date the user joined the service',
                                    id: 'ZHuDIg',
                                  },
                                  {
                                    date: new Date(
                                      userProfile?.createdAt,
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
                                <GitHubIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 shrink-0 text-neutral-500"
                                />
                                <Text color="secondary" size="body2">
                                  <Anchor
                                    href={`https://github.com/${user?.user_metadata.user_name}`}>
                                    {user?.user_metadata.user_name}
                                  </Anchor>
                                </Text>
                              </div>
                            )}
                          <div className="flex items-center gap-x-2">
                            <DiscordIcon
                              aria-hidden="true"
                              className="h-5 w-5 shrink-0 text-neutral-500"
                            />
                            <Text color="secondary" size="body2">
                              <Anchor href="https://discord.gg/NDFx8f6P6B">
                                {intl.formatMessage({
                                  defaultMessage: 'Join Discord',
                                  description: 'Join Discord channel',
                                  id: 'l1ZqoW',
                                })}
                              </Anchor>
                            </Text>
                          </div>
                          {(userProfile?.plan === 'lifetime' ||
                            userProfile?.plan === 'quarter' ||
                            userProfile?.plan === 'year') && (
                            <div className="flex items-center gap-x-2">
                              <DiscordIcon
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-pink-500"
                              />
                              <Text color="secondary" size="body2">
                                <Anchor
                                  className="text-pink-500"
                                  href="https://discord.gg/8suTg77xXz">
                                  {intl.formatMessage({
                                    defaultMessage: 'Join Discord (Premium)',
                                    description: 'Join Discord channel',
                                    id: 'IGPTRv',
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
