import clsx from 'clsx';
import Image from 'next/image';
import { useId, useMemo } from 'react';
import {
  RiBrushLine,
  RiCheckboxCircleLine,
  RiDashboard3Line,
  RiFacebookFill,
  RiFileList3Line,
  RiFireLine,
  RiGlobalLine,
  RiHtml5Line,
  RiImageLine,
  RiMessage2Line,
  RiPagesLine,
  RiSpeakLine,
  RiTerminalBoxLine,
  RiTerminalWindowLine,
  RiTrophyLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeRadialGlowBackground,
} from '~/components/ui/theme';

import ProjectsMarketingFeaturedIcon from './ProjectsMarketingFeaturedIcon';

type LearningFeature = {
  description: string;
  imgSrc: string;
  key: string;
  subFeatures: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    key: string;
    label: string;
  }>;
  title: string;
};

function useLearningFeatures(): Array<LearningFeature> {
  const intl = useIntl();
  const { appTheme } = useAppThemePreferences();

  return useMemo(
    () => [
      {
        description: intl.formatMessage({
          defaultMessage:
            'Our projects are designed with real world specs meant for professionals, allowing you to hit the ground running with whatever you learn while building them.',
          description:
            "Description of 'Learn by building real world projects for professionals' feature in Projects marketing page",
          id: 'l/ErWd',
        }),
        imgSrc:
          appTheme === 'light'
            ? 'img/marketing/projects/learn-by-building-light.svg'
            : 'img/marketing/projects/learn-by-building-dark.svg',
        key: 'learn-by-building',
        subFeatures: [
          {
            icon: RiFileList3Line,
            key: 'specs-by-product-managers',
            label: intl.formatMessage({
              defaultMessage: 'Specs by product managers',
              description:
                "Title of 'Specs by product managers' sub-feature in Projects marketing page",
              id: '4g93ac',
            }),
          },
          {
            icon: RiBrushLine,
            key: 'designs-by-ui-ux-designers',
            label: intl.formatMessage({
              defaultMessage: 'Designs by UI/UX designers',
              description:
                'Title of "Designs by UI/UX designers" sub-feature in Projects marketing page',
              id: 'PQPdnk',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage:
            'Learn by building real world projects for professionals',
          description:
            "Title of 'Learn by building real world projects for professionals' feature in Projects marketing page",
          id: 'ODRVQi',
        }),
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            'Everything that you need, including professional design, API specs, starter code and image files are all ready for you. Just click "Start project" and we will take care of everything',
          description:
            "Description of 'Start building' feature in Projects marketing page",
          id: 'mlADLk',
        }),
        imgSrc:
          appTheme === 'light'
            ? 'img/marketing/projects/start-building-light.svg'
            : 'img/marketing/projects/start-building-dark.svg',
        key: 'start-building',
        subFeatures: [
          {
            icon: RiImageLine,
            key: 'images-style-guides-design-files',
            label: intl.formatMessage({
              defaultMessage: 'Images, style guides, design files',
              description:
                "Title of 'Images, style guides, design files' sub-feature in Projects marketing page",
              id: 'yhRL5u',
            }),
          },
          {
            icon: RiHtml5Line,
            key: 'html-pre-written-content',
            label: intl.formatMessage({
              defaultMessage: 'HTML pre-written content',
              description:
                "Title of 'HTML pre-written content' sub-feature in Projects marketing page",
              id: '79LK1Q',
            }),
          },
          {
            icon: RiTerminalBoxLine,
            key: 'starter-code-and-apis',
            label: intl.formatMessage({
              defaultMessage: 'Starter code and APIs',
              description:
                "Title of 'Starter code and APIs' sub-feature in Projects marketing page",
              id: '/ujFys',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage:
            'We provide everything you need - just start building!',
          description:
            "Title of 'Start building' feature in Projects marketing page",
          id: 'BOpUAo',
        }),
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            'All our challenges come with at least 1 official solution and step-by-step guide from senior big tech engineers. Learn best practices as early as possible.',
          description:
            "Description of 'Practical foundation' feature in Projects marketing page",
          id: '7WbXyE',
        }),
        imgSrc:
          appTheme === 'light'
            ? 'img/marketing/projects/practical-foundation-light.svg'
            : 'img/marketing/projects/practical-foundation-dark.svg',
        key: 'practical-foundation',
        subFeatures: [
          {
            icon: RiCheckboxCircleLine,
            key: 'official-solutions',
            label: intl.formatMessage({
              defaultMessage: 'Official solutions',
              description:
                "Title of 'Official solutions' sub-feature in Projects marketing page",
              id: '/TtmMj',
            }),
          },
          {
            icon: RiGlobalLine,
            key: 'practical-dev-guides',
            label: intl.formatMessage({
              defaultMessage: 'Practical dev guides',
              description:
                "Title of 'Practical dev guides' sub-feature in Projects marketing page",
              id: 'YuAorn',
            }),
          },
          {
            icon: RiFacebookFill,
            key: 'written-by-ex-faang-senior-devs',
            label: intl.formatMessage({
              defaultMessage: 'Written by ex-FAANG senior devs',
              description:
                "Title of 'Written by ex-FAANG senior devs' sub-feature in Projects marketing page",
              id: 'ZE/21F',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Get the right practical foundation from the get-go',
          description:
            "Title of 'Practical foundation' feature in Projects marketing page",
          id: 'VZ4Yky',
        }),
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            'Whether you are complete beginner or an established engineer looking to fill a modern skill gap, our skills roadmap tell you the exact projects to build to train the skill you need.',
          description:
            "Description of 'Train any front end skill' feature in Projects marketing page",
          id: 'LDJsoJ',
        }),
        imgSrc:
          appTheme === 'light'
            ? 'img/marketing/projects/train-any-front-end-skill-light.svg'
            : 'img/marketing/projects/train-any-front-end-skill-dark.svg',
        key: 'train-any-frontend-skill',
        subFeatures: [
          {
            icon: RiTerminalWindowLine,
            key: 'roadmap-of-front-end-skills',
            label: intl.formatMessage({
              defaultMessage: 'Roadmap of front end skills',
              description:
                "Title of 'Roadmap of front end skills' sub-feature in Projects marketing page",
              id: 'XzL/lN',
            }),
          },
          {
            icon: RiPagesLine,
            key: 'recommended-projects-to-build',
            label: intl.formatMessage({
              defaultMessage: 'Recommended projects to build',
              description:
                "Title of 'Recommended projects to build' sub-feature in Projects marketing page",
              id: 'KlTu61',
            }),
          },
          {
            icon: RiTerminalWindowLine,
            key: 'curated-learning-resources',
            label: intl.formatMessage({
              defaultMessage: 'Curated learning resources',
              description:
                "Title of 'Curated learning resources' sub-feature in Projects marketing page",
              id: 'K/j0Zl',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Train any front end skill from beginner to advanced',
          description:
            "Title of 'Train any front end skill' feature in Projects marketing page",
          id: '/9OFji',
        }),
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            "Don't worry about losing steam. Track your progress and level up as you learn and grow.",
          description:
            "Description of 'Gamify your learning' feature in Projects marketing page",
          id: 'c7uUxL',
        }),
        imgSrc:
          appTheme === 'light'
            ? 'img/marketing/projects/gamify-your-learning-light.svg'
            : 'img/marketing/projects/gamify-your-learning-dark.svg',
        key: 'gamify-your-learning',
        subFeatures: [
          {
            icon: RiTrophyLine,
            key: 'reputation-and-leveling-system',
            label: intl.formatMessage({
              defaultMessage: 'Reputation and leveling system',
              description:
                "Title of 'Reputation and leveling system' sub-feature in Projects marketing page",
              id: 'DIdMCT',
            }),
          },
          {
            icon: RiFireLine,
            key: 'earn-rep-for-productive-tasks',
            label: intl.formatMessage({
              defaultMessage: 'Earn rep for productive tasks',
              description:
                "Title of 'Earn rep for productive tasks' sub-feature in Projects marketing page",
              id: '7XFQoX',
            }),
          },
          {
            icon: RiDashboard3Line,
            key: 'progress-tracking-dashboard',
            label: intl.formatMessage({
              defaultMessage: 'Progress tracking dashboard',
              description:
                "Title of 'Progress tracking dashboard' sub-feature in Projects marketing page",
              id: '/huwbF',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Gamify your learning and track your progress',
          description:
            "Title of 'Gamify your learning' feature in Projects marketing page",
          id: '1BwkZf',
        }),
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            'Our platform was built to support community-driven development. From project discussion to code reviews and approach sharing, you will never feel alone in your learning.',
          description:
            "Description of 'Learn together' feature in Projects marketing page",
          id: 'Ludb5F',
        }),
        imgSrc:
          appTheme === 'light'
            ? 'img/marketing/projects/learn-together-light.svg'
            : 'img/marketing/projects/learn-together-dark.svg',
        key: 'learn-together',
        subFeatures: [
          {
            icon: RiSpeakLine,
            key: 'reference-others-approach',
            label: intl.formatMessage({
              defaultMessage: "Reference other's approach",
              description:
                "Title of 'Reference other's approach' sub-feature in Projects marketing page",
              id: '+JozON',
            }),
          },
          {
            icon: RiTerminalBoxLine,
            key: 'review-others-code-on-platform',
            label: intl.formatMessage({
              defaultMessage: "Review other's code on-platform",
              description:
                "Title of 'Review other's code on-platform' sub-feature in Projects marketing page",
              id: 'jxkuEP',
            }),
          },
          {
            icon: RiMessage2Line,
            key: 'clarify-doubts-in-forums',
            label: intl.formatMessage({
              defaultMessage: 'Clarify doubts in forums',
              description:
                "Title of 'Clarify doubts in forums' sub-feature in Projects marketing page",
              id: '8cguZA',
            }),
          },
        ],
        title: intl.formatMessage({
          defaultMessage: 'Learn together with like-minded others',
          description:
            "Title of 'Learn together' feature in Projects marketing page",
          id: '3nYNbd',
        }),
      },
    ],
    [appTheme, intl],
  );
}

export default function ProjectsMarketingLearningFeatures() {
  const features = useLearningFeatures();
  const intl = useIntl();
  const id = useId();

  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-16 py-16 lg:gap-y-32 lg:py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            heading={
              <FormattedMessage
                defaultMessage="We help you learn through building - without tutorial hell"
                description="Heading of the 'We help you learn through building - without tutorial hell' marketing section on Projects home page"
                id="gIvdNL"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="For learning"
                description="Title of the 'We help you learn through building - without tutorial hell' marketing section on Projects home page"
                id="J/UPQZ"
              />
            }
          />
        </div>
        <Section>
          <ul
            aria-label={intl.formatMessage({
              defaultMessage: 'Learning features',
              description:
                'Learning features of the product in Projects marketing page',
              id: '6H0D7u',
            })}
            className="flex flex-col gap-y-16 lg:gap-y-32">
            {features.map((feature) => (
              <li
                key={feature.key}
                aria-labelledby={`${id}-${feature.key}`}
                className="flex flex-col items-center gap-x-28 gap-y-12 lg:flex-row lg:items-start lg:even:flex-row-reverse">
                <div
                  className={clsx(
                    'aspect-[453/328] h-fit w-full max-w-[453px] shrink-0 rounded-lg lg:w-auto',
                    themeBackgroundCardColor,
                    themeGlassyBorder,
                  )}>
                  <Image
                    alt=""
                    className="size-full"
                    height={328}
                    src={feature.imgSrc}
                    width={453}
                  />
                </div>
                <div className="flex flex-col">
                  <Heading
                    className="mb-4"
                    id={`${id}-${feature.key}`}
                    level="heading4">
                    {feature.title}
                  </Heading>
                  <Section>
                    <Text color="secondary">{feature.description}</Text>
                    <ul
                      aria-label={intl.formatMessage({
                        defaultMessage: 'Subfeatures',
                        description:
                          'Subfeatures of a feature in Projects marketing page',
                        id: 'tvsV5d',
                      })}
                      className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3">
                      {feature.subFeatures.map((subFeature) => (
                        <li
                          key={subFeature.key}
                          className="flex flex-col items-start gap-y-4 xl:gap-y-6">
                          <ProjectsMarketingFeaturedIcon
                            icon={subFeature.icon}
                          />
                          <Text color="secondary" size="body1">
                            {subFeature.label}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </Section>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </div>
  );
}