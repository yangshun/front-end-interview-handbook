import clsx from 'clsx';
import { RiArrowRightLine, RiBardLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingHeroBackground from '~/components/marketing/MarketingHeroBackground';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextBrandColor, themeTextColor } from '~/components/ui/theme';

export default function ProjectsMarketingHero() {
  const intl = useIntl();

  return (
    <div className="relative isolate lg:mx-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -my-28 flex h-[calc(100%_+_112px)] w-full justify-center overflow-hidden rounded-b-3xl lg:rounded-b-[48px]">
        <MarketingHeroBackground className="h-full min-w-[1200px]" />
      </div>
      <div className="relative pb-32 pt-0">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-24">
          <div className="flex flex-col items-center gap-y-8">
            <div className="flex flex-col items-center">
              <Anchor
                className={clsx(
                  'flex items-center gap-1 px-3 py-1',
                  'rounded-full',
                  'mb-4',
                  themeTextBrandColor,
                  [
                    'border',
                    'border-neutral-800/20 dark:border-neutral-200/20',
                    'hover:border-brand-dark dark:hover:border-brand',
                  ],
                  'bg-[#2fbc78]/10 dark:bg-[#36d387]/10',
                  'transition-colors',
                )}
                href="/blog/a-real-world-projects-platform-for-front-end-engineers"
                prefetch={null}
                variant="unstyled">
                <RiBardLine className={themeTextColor} />
                <Text size="body2" weight="medium">
                  <FormattedMessage
                    defaultMessage="Now in BETA."
                    description="Project marketing hero section badge"
                    id="bVOC6y"
                  />
                </Text>
                <Text color="inherit" size="body2" weight="medium">
                  <FormattedMessage
                    defaultMessage="Read more"
                    description="Project marketing hero Read more section badge"
                    id="1b+8YV"
                  />
                </Text>
                <RiArrowRightLine className="text-inherit" />
              </Anchor>
              <div className="mb-10 flex flex-col items-center gap-y-6 sm:gap-y-7">
                <Heading className="max-w-3xl text-center" level="heading1">
                  <FormattedMessage
                    defaultMessage="Build real world projects to learn and showcase"
                    description="Title for Projects marketing hero section"
                    id="uyAWFS"
                  />
                </Heading>
              </div>
              <Text
                className="mx-auto block max-w-sm text-center text-base md:max-w-3xl md:text-lg xl:text-xl"
                color="subtitle"
                size="inherit">
                <FormattedMessage
                  defaultMessage="A platform to build high quality project challenges with beautiful & modular designs, guided by ex-FAANG senior engineers and an active community"
                  description="Subtitle for Projects marketing hero section"
                  id="R2VqzE"
                />
              </Text>
            </div>
            <div className="flex flex-col items-center gap-y-3">
              <Button
                className="self-stretch sm:self-auto"
                href="/projects/challenges"
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'Explore challenges',
                  description:
                    'Label for Explore projects button in Projects marketing hero section',
                  id: '731FKz',
                })}
                prefetch={null}
                size="lg"
                variant="primary"
              />
              <Text color="subtitle" size="body3">
                <FormattedMessage
                  defaultMessage="80% of challenges are <bold>free to do</bold>"
                  description="Caption for Explore projects button in Projects marketing hero section"
                  id="zYh2Tl"
                  values={{
                    bold: (chunks) => (
                      <span className="font-bold">{chunks}</span>
                    ),
                  }}
                />
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
