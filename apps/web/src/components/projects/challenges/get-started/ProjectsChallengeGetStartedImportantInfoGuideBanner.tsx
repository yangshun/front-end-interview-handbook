import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_Hover,
  themeTextColor,
} from '~/components/ui/theme';

export default function ProjectsChallengeGetStartedImportantInfoGuideBanner() {
  const intl = useIntl();
  const tabs = [
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description: 'Get started label',
        id: 'yawjvQ',
      }),
      href: '#',
      subtitle: intl.formatMessage({
        defaultMessage: 'Assets',
        description: 'Subtitle for "Assets" tab on Projects project page',
        id: 'qR0ILp',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 2',
        description: 'Title for "Step 2" tab on Projects project page',
        id: 'mjEvFf',
      }),
      value: 'assets',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'While working on project',
        description:
          'Hint for "Tips, Resources and Discussions" tab on Projects project page',
        id: 'KBBRmA',
      }),
      href: '#',
      subtitle: intl.formatMessage({
        defaultMessage: 'Resources & discussions',
        description:
          'Subtitle for "Tips, Resources and Discussions" tab on Projects project page',
        id: 'rGbEEY',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 3',
        description: 'Title for "Step 3" tab on Projects project page',
        id: '+Yk101',
      }),
      value: 'resources',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'After completion',
        description:
          'Hint for "Project Deployment & Completion" tab on Projects project page',
        id: 'QkImfr',
      }),
      href: '#',
      subtitle: intl.formatMessage({
        defaultMessage: 'Project completion',
        description:
          'Subtitle for "Project Deployment & Completion" tab on Projects project page',
        id: 'lMZILF',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 4',
        description: 'Title for "Step 4" tab on Projects project page',
        id: 'G5tU8P',
      }),
      value: 'completion',
    },
  ];

  return (
    <div
      aria-hidden={true}
      className={clsx(
        'pointer-events-none h-[124px] select-none self-stretch overflow-hidden rounded-lg',
        themeGlassyBorder,
        themeBackgroundElementColor,
      )}>
      <div className="sm:-translate-x-28.5 -translate-x-40 md:-translate-x-1/4">
        <div className="w-full max-w-[250px]">
          <div className="flex min-w-fit flex-col items-stretch">
            <div
              className="grid gap-x-6"
              style={{
                gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
              }}>
              {tabs.map(({ value }) => (
                <div
                  key={value}
                  className="mt-3 flex flex-col gap-3"
                  style={{
                    gridColumn: `span 1 / span 1`,
                  }}>
                  <div
                    className={clsx(
                      'h-4 w-full border-l border-r border-t border-dashed',
                      themeBorderElementColor,
                    )}
                  />
                </div>
              ))}
            </div>
            <nav
              aria-label="challenge steps nav"
              className={clsx('-mb-px mt-4', 'relative flex gap-x-6', [
                'border-t',
                themeBorderElementColor,
              ])}>
              {tabs.map(({ subtitle, value, title }) => (
                <div
                  key={value}
                  className={clsx(
                    'group w-[160px] shrink-0 border-t-2 pt-4 md:min-w-[200px] md:grow',
                    value === 'resources'
                      ? 'border-brand'
                      : [
                          themeTextBrandColor_Hover,
                          themeTextColor,
                          'border-transparent',
                        ],
                  )}>
                  <div className="w-[160px]">
                    <Text
                      className="block"
                      color={value === 'resources' ? 'active' : 'inherit'}
                      size="body3"
                      weight="medium">
                      {title}
                    </Text>
                    <Text className="block" color="secondary" size="body3">
                      {subtitle}
                    </Text>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
