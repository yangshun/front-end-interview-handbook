'use client';

import type { User } from '@supabase/auth-helpers-nextjs';
import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  RiCalendarLine,
  RiGithubFill,
  RiMailLine,
  RiShieldUserLine,
  RiUserLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { SocialLinks } from '~/data/SocialLinks';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

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

export default function ProfileShell({ children, user }: Props) {
  const intl = useIntl();
  const segment: ProfileTabItem =
    (useSelectedLayoutSegment() as ProfileTabItem) ?? 'activity';
  const profileDataQuery = trpc.profile.viewer.useQuery();

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
            'mx-auto w-full max-w-6xl grow lg:flex lg:border-x',
            themeBorderColor,
          )}>
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 lg:flex">
            {/* Account profile */}
            <div className="lg:w-72 lg:shrink-0 lg:px-6">
              <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-0">
                <div className="flex items-center justify-between">
                  <div className="flex w-full flex-1 flex-col gap-y-4">
                    <div className="gap-y-8 sm:flex sm:items-center sm:justify-between sm:gap-y-0 xl:block xl:gap-y-8">
                      {/* Profile */}
                      <Avatar
                        alt={profileDataQuery.data?.name ?? ''}
                        size="3xl"
                        src={profileDataQuery.data?.avatarUrl ?? ''}
                      />
                    </div>
                    {/* Meta info */}
                    <div
                      className={clsx(
                        'flex flex-col flex-wrap sm:flex-row xl:flex-col xl:flex-nowrap',
                        'gap-4 sm:gap-x-8 xl:gap-x-0 xl:gap-y-4',
                      )}>
                      {!profileDataQuery.isLoading && (
                        <>
                          {profileDataQuery.data?.name && (
                            <Text
                              className="block truncate"
                              size="body0"
                              weight="bold">
                              {profileDataQuery.data?.name}
                            </Text>
                          )}
                          <div className="flex items-center gap-x-2">
                            {profileDataQuery.data?.premium ? (
                              <div className="flex items-center gap-2">
                                <InterviewsPremiumBadge />
                                <Text color="secondary" size="body3">
                                  <FormattedMessage
                                    defaultMessage="for Interviews"
                                    description="GreatFrontEnd product vertical"
                                    id="u/s8vM"
                                  />
                                </Text>
                              </div>
                            ) : (
                              <Button
                                display="block"
                                href="/interviews/pricing"
                                label={intl.formatMessage({
                                  defaultMessage: 'Get full access',
                                  description: 'Get full access button label',
                                  id: '4B5GBU',
                                })}
                                size="xs"
                                variant="primary"
                              />
                            )}
                          </div>
                          <div className="flex w-full grow items-center gap-x-2">
                            <RiMailLine
                              aria-hidden="true"
                              className="size-5 shrink-0 text-neutral-500"
                            />
                            <Text className="w-0 grow truncate" size="body2">
                              {user.email}
                            </Text>
                          </div>
                          {profileDataQuery.data?.username && (
                            <div className="flex w-full items-center gap-x-2">
                              <RiUserLine
                                aria-hidden="true"
                                className="size-5 shrink-0 text-neutral-500"
                              />
                              <Text className="truncate" size="body2">
                                {profileDataQuery.data?.username}
                              </Text>
                            </div>
                          )}
                          {process.env.NEXT_PUBLIC_VERCEL_ENV !==
                            'production' && (
                            <div className="flex w-full items-center gap-x-2">
                              <RiShieldUserLine
                                aria-hidden="true"
                                className="size-5 shrink-0 text-neutral-500"
                              />
                              <Text size="body2">{user.id}</Text>
                            </div>
                          )}
                          {profileDataQuery.data?.createdAt && (
                            <div className="flex w-full items-center gap-x-2">
                              <RiCalendarLine
                                aria-hidden="true"
                                className="size-5 shrink-0 text-neutral-500"
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
                              <div className="flex w-full items-center gap-x-2">
                                <RiGithubFill
                                  aria-hidden="true"
                                  className="size-5 shrink-0 text-neutral-500"
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
                              href={SocialLinks.discordPremium.href}
                              icon={SocialLinks.discordPremium.icon}
                              label={intl.formatMessage({
                                defaultMessage: 'Join Premium Discord',
                                description: 'Join Discord channel',
                                id: '8XVsRJ',
                              })}
                              variant="primary"
                            />
                          ) : (
                            <div className="flex w-full items-center gap-x-2">
                              <SocialLinks.discordPremium.icon
                                aria-hidden="true"
                                className="size-5 shrink-0 text-neutral-500"
                              />
                              <Text size="body2">
                                <Anchor href={SocialLinks.discord.href}>
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
                themeBorderColor,
              )}>
              <div
                className={clsx(
                  'border-t pb-4 pl-4 pr-4 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6',
                  themeBorderColor,
                )}>
                <div className="flex items-center">
                  <Tabs
                    label={intl.formatMessage({
                      defaultMessage: 'Select navigation item',
                      description: 'Select navigation item label',
                      id: '94sK60',
                    })}
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
