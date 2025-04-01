'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';

type Props = Readonly<{
  children: React.ReactNode;
}>;

type ProfileTabItem =
  | 'activity'
  | 'billing'
  | 'coupons'
  | 'experience'
  | 'general';

type ProfileTabItemData = Readonly<{
  href: string;
  label: string;
  value: ProfileTabItem;
}>;

export default function ProjectsSettingsLayout({ children }: Props) {
  const intl = useIntl();
  const segment: ProfileTabItem =
    (useSelectedLayoutSegment() as ProfileTabItem) ?? 'general';

  const tabsData: Record<ProfileTabItem, ProfileTabItemData> = {
    activity: {
      href: '/projects/settings/activity',
      label: intl.formatMessage({
        defaultMessage: 'Activity',
        description: 'Profile settings tab title',
        id: 'UeYQmR',
      }),
      value: 'activity',
    },
    billing: {
      href: '/projects/settings/billing',
      label: intl.formatMessage({
        defaultMessage: 'Billing',
        description: 'Profile settings tab title',
        id: 'E9Yr6B',
      }),
      value: 'billing',
    },
    coupons: {
      href: '/projects/settings/coupons',
      label: intl.formatMessage({
        defaultMessage: 'Coupons',
        description: 'Profile settings tab title',
        id: 'OpdWAI',
      }),
      value: 'coupons',
    },
    experience: {
      href: '/projects/settings/experience',
      label: intl.formatMessage({
        defaultMessage: 'Experience',
        description: 'Profile settings tab title',
        id: 'QNqh1P',
      }),
      value: 'experience',
    },
    general: {
      href: '/projects/settings',
      label: intl.formatMessage({
        defaultMessage: 'General',
        description: 'Profile settings tab title',
        id: 'nivf5h',
      }),
      value: 'general',
    },
  };

  const tabsList: ReadonlyArray<ProfileTabItemData> = [
    tabsData.general,
    tabsData.activity,
    tabsData.billing,
    tabsData.experience,
    tabsData.coupons,
  ];

  return (
    <>
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage: 'Settings',
          description: 'Settings page title',
          id: 'wRV8PN',
        })}
      </Heading>
      <Section>
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
        <div className="pt-12">{children}</div>
      </Section>
    </>
  );
}
