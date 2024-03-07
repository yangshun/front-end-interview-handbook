import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogo from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import MarketingHeroBackground from '~/components/marketing/MarketingHeroBackground';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import Button from '../../ui/Button';

type ProjectMarketingHeroMode =
  | 'beginner'
  | 'experienced'
  | 'portfolio'
  | 'sideProject';

function ProjectMarketingComponentLibraryDetails() {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Text color="secondary" size="body1">
        <FormattedMessage
          defaultMessage="Build entire design systems, component libraries or full stack apps"
          description="Caption for component library showcase in Projects marketing hero section"
          id="rOzSWN"
        />
      </Text>
      {/* TODO(projects): Add component examples */}
    </div>
  );
}

function ProjectMarketingSkillsDetails() {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Text color="secondary" size="body1">
        <FormattedMessage
          defaultMessage="Advance more than 20 core skills"
          description="Caption for skills showcase in Projects marketing hero section"
          id="t1sNnD"
        />
      </Text>
      <div className="flex gap-2">
        <HTML5LogoMonochrome className="size-10" />
        <ReactLogo className="size-10" />
        <JavaScriptLogo className="size-10" />
      </div>
    </div>
  );
}

export default function ProjectsMarketingHero() {
  const intl = useIntl();

  const heroContent: Record<
    ProjectMarketingHeroMode,
    {
      ctaButtonCaption: ReturnType<typeof defineMessage>;
      details: React.ReactNode;
      subtitle: string;
      tabButtonLabel: string;
      title: string;
    }
  > = {
    beginner: {
      ctaButtonCaption: defineMessage({
        defaultMessage: 'Pick from <bold>skills roadmap</bold>',
        description:
          'Caption for Start a Project button in Projects marketing hero section for beginners',
        id: 'xLVqYR',
      }),
      details: <ProjectMarketingSkillsDetails />,
      subtitle: intl.formatMessage({
        defaultMessage:
          'Learn practical front end skills by building projects guided by a skills progression roadmap',
        description:
          'Subtitle for Projects marketing hero section for beginners',
        id: 'Mm+ZFo',
      }),
      tabButtonLabel: intl.formatMessage({
        defaultMessage: 'For Beginners',
        description:
          'Button label for Projects marketing hero section for beginners',
        id: 'rbjUFF',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Build to learn from beginner to advanced',
        description: 'Title for Projects hero section for beginners',
        id: 'ruGZIH',
      }),
    },
    experienced: {
      ctaButtonCaption: defineMessage({
        defaultMessage: 'Pick from <bold>skills roadmap</bold>',
        description:
          'Caption for Start a Project button in Projects marketing hero section for experienced users',
        id: 'MOOnVA',
      }),
      details: <ProjectMarketingSkillsDetails />,
      subtitle: intl.formatMessage({
        defaultMessage:
          'Keep up with modern skills and frameworks by building hands-on projects',
        description:
          'Subtitle for Projects marketing hero section for experienced users',
        id: 'QsA5iS',
      }),
      tabButtonLabel: intl.formatMessage({
        defaultMessage: 'For Experienced',
        description:
          'Button label for Projects marketing hero section for experienced users',
        id: 'c2bsgM',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Build to cover skill gaps in up-and-coming skills',
        description:
          'Title for Projects marketing hero section for experienced users',
        id: 'a3a9Yq',
      }),
    },
    portfolio: {
      ctaButtonCaption: defineMessage({
        defaultMessage: 'Pick from <bold>component tracks</bold>',
        description:
          'Caption for Start a Project button in Projects marketing hero section for portfolio projects',
        id: 'XfFYoy',
      }),
      details: <ProjectMarketingComponentLibraryDetails />,
      subtitle: intl.formatMessage({
        defaultMessage:
          'Build projects that showcase skills that matter - like your own design system, component libraries, or full stack AI projects',
        description:
          'Subtitle for Projects marketing hero section for portfolio projects',
        id: '+Vxpl1',
      }),
      tabButtonLabel: intl.formatMessage({
        defaultMessage: 'For Portfolios',
        description:
          'Button label for Projects marketing hero section for portfolio projects',
        id: '1qu2NT',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Build to impress with unique portfolio projects',
        description:
          'Title for Projects marketing hero section for portfolio projects',
        id: 'PV4w5n',
      }),
    },
    sideProject: {
      ctaButtonCaption: defineMessage({
        defaultMessage: 'Pick from <bold>component tracks</bold>',
        description:
          'Caption for Start a Project button in Projects marketing hero section for side projects',
        id: 'zaJkwz',
      }),
      details: <ProjectMarketingComponentLibraryDetails />,
      subtitle: intl.formatMessage({
        defaultMessage:
          'Browse component libraries and even design systems you can build to support your next project',
        description:
          'Subtitle for Projects marketing hero section for side projects',
        id: 'dGtm/R',
      }),
      tabButtonLabel: intl.formatMessage({
        defaultMessage: 'For Side Projects',
        description:
          'Button label for Projects marketing hero section for side projects',
        id: '63ddzp',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Build great projects faster with libraries and design systems',
        description:
          'Title for Projects marketing hero section for side projects',
        id: 'imwtWL',
      }),
    },
  };

  const [selectedMode, setSelectedMode] =
    useState<ProjectMarketingHeroMode>('beginner');

  const modes: Array<ProjectMarketingHeroMode> = [
    'beginner',
    'experienced',
    'portfolio',
    'sideProject',
  ];

  const { title, subtitle, ctaButtonCaption, details } =
    heroContent[selectedMode];

  return (
    <div className="relative isolate lg:mx-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -mb-28 -mt-28 flex h-[calc(100%_+_112px)] w-full justify-center overflow-hidden rounded-b-3xl lg:rounded-b-[48px]">
        <MarketingHeroBackground className="h-full min-w-[1200px]" />
      </div>
      <div className="relative pb-8 pt-0 sm:pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-24">
          <div className="flex flex-col items-center gap-y-8">
            <div className="flex flex-col items-center gap-y-16">
              <div className="flex flex-col items-center gap-y-6 sm:gap-y-7">
                <div className="flex gap-2">
                  {modes.map((mode) => {
                    return (
                      <div key={mode}>
                        <Button
                          className={clsx(
                            mode === selectedMode && '!text-brand',
                          )}
                          label={heroContent[mode].tabButtonLabel}
                          size="lg"
                          variant="tertiary"
                          onClick={() => {
                            setSelectedMode(mode);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <Heading className="max-w-3xl text-center" level="heading1">
                  {title}
                </Heading>
              </div>
              <Text
                className="mx-auto max-w-sm text-center text-base sm:text-base md:max-w-3xl md:text-lg xl:text-xl"
                color="subtitle"
                display="block"
                size="inherit">
                {subtitle}
              </Text>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Button
                className="self-stretch sm:self-auto"
                href="/projects/challenges"
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'Start a project',
                  description:
                    'Label for Start a Project button in Hero section of HomePage.',
                  id: 'sxu/UG',
                })}
                size="lg"
                variant="primary"
              />
              <Text color="subtitle" size="body3">
                <FormattedMessage
                  {...ctaButtonCaption}
                  values={{
                    bold: (chunks) => (
                      <span className="font-bold">{chunks}</span>
                    ),
                  }}
                />
              </Text>
            </div>
            {details}
          </div>
        </div>
      </div>
    </div>
  );
}
