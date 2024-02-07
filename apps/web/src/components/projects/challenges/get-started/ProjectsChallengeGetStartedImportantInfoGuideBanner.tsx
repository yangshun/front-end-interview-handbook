import clsx from 'clsx';
import { useIntl } from 'react-intl';

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
        description:
          'Hint for "Project Brief" and "Assets" tab on Projects project page',
        id: '01jNoZ',
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
        defaultMessage: 'Tips, Resources and Discussions',
        description:
          'Subtitle for "Tips, Resources and Discussions" tab on Projects project page',
        id: 'U10C4D',
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
        defaultMessage: 'Project Deployment & Completion',
        description:
          'Subtitle for "Project Deployment & Completion" tab on Projects project page',
        id: '/dWN/a',
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
        'h-[124px] rounded-lg self-stretch overflow-hidden pointer-events-none select-none',
        themeGlassyBorder,
        themeBackgroundElementColor,
      )}>
      <div className="md:-translate-x-1/4 -translate-x-2/4">
        <div className="w-[310px]">
          <div className="flex flex-col items-stretch min-w-fit">
            <div
              className="grid gap-x-6"
              style={{
                gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
              }}>
              {tabs.map(({ value }) => (
                <div
                  key={value}
                  className="flex flex-col gap-3 mt-3"
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
                    'group w-[160px] md:min-w-[200px] md:flex-grow shrink-0 border-t-2 pt-4',
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
                      color={value === 'resources' ? 'active' : 'inherit'}
                      display="block"
                      size="body3"
                      weight="medium">
                      {title}
                    </Text>
                    <Text color="secondary" display="block" size="body3">
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
