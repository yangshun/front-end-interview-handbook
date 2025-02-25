'use client';

import clsx from 'clsx';
import { useMediaQuery } from 'usehooks-ts';

import LogoComboMark from '~/components/global/logos/LogoComboMark';
import { FormattedMessage } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBackgroundCardWhiteOnLightColor,
  themeGlassyBorder,
  themeGradientHeading,
} from '~/components/ui/theme';

export default function SponsorsAudienceProfileSection() {
  return (
    <div
      className={clsx('flex flex-col gap-y-12 lg:gap-y-16', 'py-16 sm:py-20')}>
      <div className="flex flex-col gap-6">
        <Heading
          className={clsx(themeGradientHeading, 'max-w-3xl pb-1')}
          level="heading2"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="Ultra-sticky & highly engaged—far beyond industry benchmarks"
            description="Advertise with us section title"
            id="7QoNzs"
          />
        </Heading>
        <div
          className={clsx(
            'flex flex-col gap-4',
            'max-w-[634px]',
            'text-base lg:text-lg',
          )}>
          <Text color="secondary" size="inherit" weight="medium">
            <FormattedMessage
              defaultMessage="Unlike the fleeting attention from a quick email scan or brief banner glance, users <bold>stay on our platform much longer</bold> - actively learning and coding."
              description="Advertise with us section subtitle"
              id="pnwnko"
              values={{
                bold: (chunks) => (
                  <Text color="default" size="inherit" weight="bold">
                    {chunks}
                  </Text>
                ),
              }}
            />
          </Text>

          <Text color="secondary" size="inherit" weight="medium">
            <FormattedMessage
              defaultMessage="Last year, our average session duration was a whole <bold>{duration} minutes</bold> - across all {activeUsersCount} active users. "
              description="Advertise with us section subtitle"
              id="nLjOlf"
              values={{
                activeUsersCount: '600,000',
                bold: (chunks) => (
                  <Text color="default" size="inherit" weight="bold">
                    {chunks}
                  </Text>
                ),
                duration: 13,
              }}
            />
          </Text>
        </div>
      </div>
      <Asset />
    </div>
  );
}

function Asset() {
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  const items = [
    {
      key: 'average-session',
      title: (
        <FormattedMessage
          defaultMessage="Average Session"
          description="Label for average session"
          id="KENLYd"
        />
      ),
      values: {
        gfe: {
          label: (
            <FormattedMessage
              defaultMessage="{duration} minutes"
              description="Average session duration"
              id="fFvImN"
              values={{
                duration: 13,
              }}
            />
          ),
          value: 100, // Percentage value for mobile screen chart
        },
        other: {
          label: (
            <FormattedMessage
              defaultMessage="{seconds} seconds - {minutes} minutes"
              description="Average session duration"
              id="Rbwncn"
              values={{
                minutes: 4,
                seconds: 30,
              }}
            />
          ),
          value: 10, // Percentage value for mobile screen chart
        },
      },
    },
    {
      key: 'engagement-rate',
      title: (
        <FormattedMessage
          defaultMessage="Engagement / Open Rate"
          description="Label for engagement rate"
          id="QLHqwW"
        />
      ),
      values: {
        gfe: {
          label: '85%',
          value: 85,
        },
        other: {
          label: '35 - 60%',
          value: 35,
        },
      },
    },
    {
      key: 'active-user',
      title: (
        <FormattedMessage
          defaultMessage="Pages per Active User"
          description="Label for pages per active user"
          id="+zHK+N"
        />
      ),
      values: {
        gfe: {
          label: (
            <FormattedMessage
              defaultMessage="{count} pages"
              description="Pages per active user"
              id="bhXbj4"
              values={{
                count: 18,
              }}
            />
          ),
          value: 80,
        },
        other: {
          label: (
            <FormattedMessage
              defaultMessage="{count} pages"
              description="Pages per active user"
              id="bhXbj4"
              values={{
                count: '2 - 3',
              }}
            />
          ),
          value: 10,
        },
      },
    },
  ];

  return (
    <>
      <div className="hidden sm:block" inert="">
        <div className="flex gap-6 lg:gap-7">
          <div
            className={clsx(
              'flex flex-1 flex-col items-end gap-[18px] lg:gap-5',
            )}>
            <LogoComboMark className="shrink-0" height={isDesktop ? 28 : 22} />
            <Text className="text-xs lg:text-sm" color="subtle" size="inherit">
              <FormattedMessage
                defaultMessage="Average metrics per week"
                description="Subtitle for GreatFrontEnd"
                id="B8kokj"
              />
            </Text>
          </div>
          <div
            className={clsx(
              'flex flex-col items-center',
              'w-full max-w-[240px] lg:max-w-[351px]',
            )}>
            <div
              className={clsx(
                'mt-5 h-7 w-[1px] lg:h-[35px]',
                'bg-neutral-300 dark:bg-neutral-700',
              )}
            />
          </div>
          <div className={clsx('flex flex-1 flex-col gap-2.5 lg:gap-2')}>
            <Heading
              className="max-w-[300px] text-base lg:text-xl"
              level="custom">
              <FormattedMessage
                defaultMessage="Other media (e.g. Newsletters, Websites)"
                description="Title for other media"
                id="Qj8iGG"
              />
            </Heading>
            <Text className="text-xs lg:text-sm" color="subtle" size="inherit">
              <FormattedMessage
                defaultMessage="Industry benchmarks from SimilarWeb"
                description="Subtitle for other media"
                id="/ZYBru"
              />
            </Text>
          </div>
        </div>

        <div className={clsx('mt-4 lg:mt-[22px]')}>
          {items.map(({ key, title, values }, index) => (
            <div
              key={key}
              className={clsx(
                'w-full',
                'flex flex-col items-center gap-1.5',
                index < items.length - 1 && 'mb-1.5',
              )}>
              <div className="flex w-full items-center gap-6 lg:gap-7">
                <div className={clsx('flex-1')}>
                  <Text
                    className="float-right text-lg lg:text-2xl"
                    color="active"
                    size="inherit"
                    weight="bold">
                    {values.gfe.label}
                  </Text>
                </div>
                <div
                  className={clsx(
                    'flex flex-col',
                    'w-full max-w-[240px] lg:max-w-[351px]',
                  )}>
                  <Text
                    className={clsx(
                      'w-full py-3 lg:py-4',
                      'rounded-md',
                      themeBackgroundCardWhiteOnLightColor,
                      themeGlassyBorder,
                      'text-sm lg:text-lg',
                      'text-center',
                    )}
                    size="inherit"
                    weight="medium">
                    {title}
                  </Text>
                </div>
                <div className={clsx('flex-1')}>
                  <Text
                    className="text-lg lg:text-2xl"
                    color="subtle"
                    size="inherit"
                    weight="bold">
                    {values.other.label}
                  </Text>
                </div>
              </div>
              {index < items.length - 1 && (
                <div
                  className={clsx(
                    'h-[22px] w-[1px] lg:h-[29px]',
                    'bg-neutral-300 dark:bg-neutral-700',
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={clsx('sm:hidden', 'px-4 pt-5')} inert="">
        <div className="flex items-center">
          <div className={clsx('flex flex-1 justify-center')}>
            <LogoComboMark className="shrink-0" height={18} />
          </div>
          <Text
            className={clsx(
              'rounded-sm',
              'px-3 py-1',
              'bg-neutral-900 dark:bg-neutral-100',
            )}
            color="invert"
            size="body3"
            weight="bold">
            VS
          </Text>
          <div className={clsx('flex flex-1 flex-col items-center')}>
            <Text size="body2" weight="bold">
              <FormattedMessage
                defaultMessage="Other Media"
                description="Title for other media"
                id="LzrO5R"
              />
            </Text>
            <Text className="text-[9px]" color="subtle" size="inherit">
              <FormattedMessage
                defaultMessage="(e.g. Newsletter, Website)"
                description="Medium for other media"
                id="wD01Al"
              />
            </Text>
          </div>
        </div>
        <Divider className="my-5" />
        {items.map(({ key, title, values }) => (
          <div key={key} className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <Text className={clsx('w-[20%]')} size="body3" weight="medium">
                {title}
              </Text>
              <div className={clsx('flex w-[70%] flex-col gap-1.5')}>
                <div className={clsx('flex w-full items-center gap-2.5')}>
                  <div
                    className={clsx(
                      key === 'average-session'
                        ? 'w-full'
                        : key === 'engagement-rate'
                          ? 'w-[60%]'
                          : 'w-[70%]',
                      'h-4',
                      'rounded-sm',
                      themeBackgroundBrandColor,
                    )}
                  />

                  <Text
                    className="whitespace-nowrap"
                    color="active"
                    size="body2"
                    weight="bold">
                    {values.gfe.label}
                  </Text>
                </div>
                <div className={clsx('flex w-full items-center gap-2.5')}>
                  <div
                    className={clsx(
                      'h-4',
                      'rounded-sm',
                      'bg-neutral-400 dark:bg-neutral-600',
                    )}
                    style={{
                      width: `${values.other.value}%`,
                    }}
                  />
                  <Text
                    className="whitespace-nowrap"
                    color="subtle"
                    size="body2"
                    weight="medium">
                    {values.other.label}
                  </Text>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ))}

        <div className={clsx('flex items-center gap-4', 'mb-[26px] mt-4')}>
          {[
            {
              label: 'GreatFrontEnd',
              value: 'gfe',
            },
            {
              label: (
                <FormattedMessage
                  defaultMessage="Other Media"
                  description="Title for other media"
                  id="LzrO5R"
                />
              ),
              value: 'other',
            },
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center gap-1.5">
              <div
                className={clsx(
                  'size-[13px] rounded-sm',
                  value === 'gfe'
                    ? themeBackgroundBrandColor
                    : 'bg-neutral-400 dark:bg-neutral-600',
                )}
              />
              <Text className="text-[10px]" size="inherit" weight="bold">
                {label}
              </Text>
            </div>
          ))}
        </div>
        <Text className="text-[10px]" color="subtle" size="inherit">
          <FormattedMessage
            defaultMessage="Industry benchmarks for “Other Media” taken from SimilarWeb"
            description="Subtitle for other media"
            id="i+QiBQ"
          />
        </Text>
      </div>
    </>
  );
}
