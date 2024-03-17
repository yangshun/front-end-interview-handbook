import clsx from 'clsx';
import { useMemo } from 'react';
import {
  RiArrowRightLine,
  RiArrowRightSLine,
  RiBardLine,
  RiCheckboxMultipleLine,
  RiDiscussLine,
  RiNodeTree,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import MarketingHeroBackground from '~/components/marketing/MarketingHeroBackground';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextBrandColor, themeTextColor } from '~/components/ui/theme';

import ProjectsMarketingFeaturedIcon from './ProjectsMarketingFeaturedIcon';
import Button from '../../ui/Button';

type ProjectMarketingHeroFeature = {
  content: React.ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
};

export default function ProjectsMarketingHero() {
  const intl = useIntl();

  const heroFeatures: Array<ProjectMarketingHeroFeature> = useMemo(
    () => [
      {
        content: (
          <FormattedMessage
            defaultMessage="Build projects to learn any front end skill using our <link>Skills roadmap</link>"
            description="Caption for Projects marketing hero section skills roadmap feature"
            id="rUKlWg"
            values={{
              // TODO: Update the link href
              link: (chunks) => <Anchor href="#">{chunks}</Anchor>,
            }}
          />
        ),
        icon: RiNodeTree,
        key: 'skills',
      },
      {
        content: (
          <FormattedMessage
            defaultMessage="Every project is part of <link>reusable component libraries</link> for your future projects"
            description="Caption for Projects marketing hero section component libraries feature"
            id="ES78kz"
            values={{
              link: (chunks) => (
                // TODO: Update the link href
                <Anchor href="#">{chunks}</Anchor>
              ),
            }}
          />
        ),
        icon: RiCheckboxMultipleLine,
        key: 'component-libraries',
      },
      {
        content: (
          <FormattedMessage
            defaultMessage="Guides & solutions from Sr. Engineers and code reviews from <link>community</link>"
            description="Caption for Projects marketing hero section community feature"
            id="4uyrtd"
            values={{
              link: (chunks) => (
                // TODO: Update the link href
                <Anchor href="#">{chunks}</Anchor>
              ),
            }}
          />
        ),
        icon: RiDiscussLine,
        key: 'community',
      },
    ],
    [],
  );

  return (
    <div className="relative isolate lg:mx-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -mb-28 -mt-28 flex h-[calc(100%_+_112px)] w-full justify-center overflow-hidden rounded-b-3xl lg:rounded-b-[48px]">
        <MarketingHeroBackground className="h-full min-w-[1200px]" />
      </div>
      <div className="relative pb-32 pt-0">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-24">
          <div className="flex flex-col items-center gap-y-8">
            <div className="flex flex-col items-center">
              <a
                className={clsx(
                  'bg-indigo/10 mb-4 flex items-center gap-1 rounded-full border px-3 py-1',
                  'border-neutral-800/20 dark:border-neutral-200/20',
                  themeTextBrandColor,
                  'dark:hover:border-brand hover:border-brand-dark transition-colors',
                )}
                // TODO: Update the link href
                href="#">
                <RiBardLine />
                <Text color="inherit" size="body2" weight="medium">
                  <FormattedMessage
                    defaultMessage="Just launched Beta"
                    description="Project marketing hero section badge"
                    id="x2Q8mM"
                  />
                </Text>
                <RiArrowRightSLine className={themeTextColor} />
              </a>
              <div className="mb-10 flex flex-col items-center gap-y-6 sm:gap-y-7">
                <Heading className="max-w-3xl text-center" level="heading1">
                  <FormattedMessage
                    defaultMessage="Build real world projects to learn and showcase"
                    description="Title for Projects marketing hero section"
                    id="uyAWFS"
                  />
                </Heading>
              </div>
              <div className="mb-12 grid grid-cols-3">
                {heroFeatures.map(({ content, icon, key }) => (
                  <div key={key} className="flex flex-col items-center gap-y-4">
                    <ProjectsMarketingFeaturedIcon icon={icon} />
                    <Text
                      className="text-balance text-center"
                      color="subtitle"
                      size="body2">
                      {content}
                    </Text>
                  </div>
                ))}
              </div>
              <Text
                className="mx-auto max-w-sm text-center text-base sm:text-base md:max-w-3xl md:text-lg xl:text-xl"
                color="subtitle"
                display="block"
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
                  defaultMessage: 'Explore projects',
                  description:
                    'Label for Explore projects button in Projects marketing hero section',
                  id: 'aplNQq',
                })}
                size="lg"
                variant="primary"
              />
              <Text color="subtitle" size="body3">
                <FormattedMessage
                  defaultMessage="90% of projects are <bold>free to do</bold>"
                  description="Caption for Explore projects button in Projects marketing hero section"
                  id="m9Hj73"
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
