import clsx from 'clsx';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Card from '~/components/ui/Card';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeRadialGlowBackground,
} from '~/components/ui/theme';

function FeatureSectionHeader({
  description,
  title,
}: {
  description: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Heading className="text-center" level="heading3">
        {title}
      </Heading>
      <Text className="text-center" color="secondary" size="body2">
        {description}
      </Text>
    </div>
  );
}

function FeatureSection({ feature }: { feature: ProjectMarketingFeature }) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'flex-col items-center gap-12',
        feature.hideOnMobile ? 'hidden lg:flex' : 'flex',
      )}>
      <div className="mx-auto hidden md:max-w-screen-sm lg:block lg:max-w-4xl">
        <FeatureSectionHeader
          description={feature.description}
          title={feature.title}
        />
      </div>
      {!feature.hideOnMobile && (
        <div className="mx-auto md:max-w-screen-sm lg:hidden lg:max-w-4xl">
          <MarketingSectionHeader
            heading={feature.shortTitle}
            title={intl.formatMessage({
              defaultMessage: 'Features',
              description:
                "Title of the 'The fastest way to learn and build something useful' marketing section on Projects home page",
              id: 'sWyGax',
            })}
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {feature.items.map((item) => {
          function isItemVisibleOnMobile(
            i: ProjectMarketingFeature['items'][number],
          ): i is (typeof feature & {
            hideOnMobile: false;
          })['items'][number] {
            return !feature.hideOnMobile;
          }

          return (
            <Card
              key={item.key}
              className={themeBackgroundCardColor}
              disableBackground={true}
              disableSpotlight={true}
              padding={false}>
              {isItemVisibleOnMobile(item) && (
                <div className="flex flex-col gap-2.5 p-4 lg:hidden">
                  <Text size="body2" weight="bold">
                    {item.title}
                  </Text>
                  <Text color="secondary" size="body2">
                    {item.shortDescription}
                  </Text>
                </div>
              )}
              <img
                alt={'title' in item ? item.title : ''}
                decoding="async"
                loading="lazy"
                src={item.imgSrc}
              />
              <div className="hidden p-4 lg:block">
                <Text color="secondary" size="body2">
                  {item.description}
                </Text>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

type ProjectMarketingFeature =
  | {
      description: string;
      hideOnMobile: true;
      items: Array<{
        description: string;
        imgSrc: string;
        key: string;
      }>;
      key: string;
      title: string;
    }
  | {
      description: string;
      hideOnMobile?: false;
      items: Array<{
        description: string;
        imgSrc: string;
        key: string;
        shortDescription: string;
        title: string;
      }>;
      key: string;
      shortTitle: string;
      title: string;
    };

function useFeatures() {
  const intl = useIntl();

  const features: Array<ProjectMarketingFeature> = [
    {
      description: intl.formatMessage({
        defaultMessage:
          'Worry about a shaky foundation? Harness curated tools from senior engineers at big tech and learn the best practices for practical development',
        description:
          'Description for "Get the right foundation for practical development" feature marketing section on Projects home page',
        id: 'RJ4spU',
      }),
      items: [
        {
          description: intl.formatMessage({
            defaultMessage:
              'Supercharge your growth with concise step-by-step guides for practical development',
            description:
              'Description for "Official guides" feature on Projects home page',
            id: 'pZq6+F',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'official-guides',
          shortDescription: intl.formatMessage({
            defaultMessage: 'Сoncise step by step practical guides',
            description:
              'Short description for "Official guides" feature on Projects home page',
            id: 'xYKCsE',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Official guides',
            description:
              'Title for "Official guides" feature on Projects home page',
            id: 'HtFDkf',
          }),
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Learn to work with specifications mimicking projects you will encounter as a full-time engineer',
            description:
              'Description for "Real world specs" feature on Projects home page',
            id: 'VWGWik',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'real-world-specs',
          shortDescription: intl.formatMessage({
            defaultMessage:
              'Specs mimicking projects encountered as a full-timer',
            description:
              'Short description for "Real world specs" feature on Projects home page',
            id: 'pXuTMr',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Real world specs',
            description:
              'Title for "Real world specs" feature on Projects home page',
            id: 'U4YjHx',
          }),
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Know the recommended projects to do to progress from beginner to advanced with the skills roadmap',
            description:
              'Description for "Skills roadmap" feature on Projects home page',
            id: '9FUDxZ',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'skills-roadmap',
          shortDescription: intl.formatMessage({
            defaultMessage: 'Сoncise step by step practical guides',
            description:
              'Short description for "Skills roadmap" feature on Projects home page',
            id: '+hNsjW',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Skills roadmap',
            description:
              'Title for "Skills roadmap" feature on Projects home page',
            id: 'wO0zga',
          }),
        },
      ],
      key: 'get-the-right-foundation',
      shortTitle: intl.formatMessage({
        defaultMessage: 'Get the right foundation',
        description:
          'Short title for "Get the right foundation for practical development" feature marketing section on Projects home page',
        id: 'UwT84H',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Get the right foundation for practical development',
        description:
          'Title for "Get the right foundation for practical development" feature marketing section on Projects home page',
        id: 'k84jl+',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Our projects are never one-off - they always fit into some component library or design system which can be composed into your very own toolset to build future projects',
        description:
          'Description for "Never waste your time building one-off projects" feature marketing section on Projects home page',
        id: 'F4esBf',
      }),
      items: [
        {
          description: intl.formatMessage({
            defaultMessage:
              'Every project belongs to 1 of 7 tracks comprising of common components used in the industry / use case',
            description:
              'Description for "Component libraries" feature on Projects home page',
            id: 'ntAmll',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'component-libraries',
          shortDescription: intl.formatMessage({
            defaultMessage:
              'Every project belongs to 1 of 7 reusable components libraries',
            description:
              'Short description for "Component libraries" feature on Projects home page',
            id: 'msvqkR',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Component libraries',
            description:
              'Title for "Component libraries" feature on Projects home page',
            id: 'y4v8AZ',
          }),
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Complete your own library of components for E-commerce, Games, AI apps, and even a design system',
            description:
              'Description for "Composable themes" feature on Projects home page',
            id: 'uieBjf',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'composable-themes',
          shortDescription: intl.formatMessage({
            defaultMessage: 'Choose your component and pick any theme',
            description:
              'Short description for "Composable themes" feature on Projects home page',
            id: 'kwHN0l',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Composable themes',
            description:
              'Title for "Composable themes" feature on Projects home page',
            id: 'bSq02B',
          }),
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Our projects are composable with different themes - choose the theme you want to personalize your project',
            description:
              'Description for "Design systems" feature on Projects home page',
            id: 'fG/W54',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'design-systems',
          shortDescription: intl.formatMessage({
            defaultMessage: 'Build the foundation from ground up for reuse',
            description:
              'Short description for "Design systems" feature on Projects home page',
            id: 'xmK6tB',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Design systems',
            description:
              'Title for "Design systems" feature on Projects home page',
            id: '+u6zX0',
          }),
        },
      ],
      key: 'never-waste-your-time',
      shortTitle: intl.formatMessage({
        defaultMessage: 'Only build useful projects',
        description:
          'Short title for "Never waste your time building one-off projects" feature marketing section on Projects home page',
        id: 'c9D1tn',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Never waste your time building one-off projects',
        description:
          'Title for "Never waste your time building one-off projects" feature marketing section on Projects home page',
        id: '3KGbuG',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Our platform is built to support community-driven development',
        description:
          'Description for "Build together with other like-minded individuals" feature marketing section on Projects home page',
        id: 'gHIBZl',
      }),
      items: [
        {
          description: intl.formatMessage({
            defaultMessage:
              'Code from submissions are pulled directly on the platform for convenient reference and feedback',
            description:
              'Description for "Easy code reviews" feature on Projects home page',
            id: 'k9iwXD',
          }),

          imgSrc: 'https://source.unsplash.com/random/640x360',

          key: 'easy-code-reviews',

          shortDescription: intl.formatMessage({
            defaultMessage: 'Receive feedback from a vibrant community',
            description:
              'Short description for "Easy code reviews" feature on Projects home page',
            id: 'xXWABp',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Easy code reviews',
            description:
              'Title for "Easy code reviews" feature on Projects home page',
            id: 'qMWBqm',
          }),
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Clarify any doubts on a project in project-specific forums',
            description:
              'Description for "Learn from others" feature on Projects home page',
            id: 'vbwUYs',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'learn-from-others',
          shortDescription: intl.formatMessage({
            defaultMessage: 'Clarify doubts in project-specific forums',
            description:
              'Short description for "Learn from others" feature on Projects home page',
            id: '3c9VZh',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Learn from others',
            description:
              'Title for "Learn from others" feature on Projects home page',
            id: 'zgj9Pd',
          }),
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Refer to tips and code from top submissions endorsed by the team and community',
            description:
              'Description for "Gamified learning" feature on Projects home page',
            id: 'aGGNiW',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'gamified-learning',
          shortDescription: intl.formatMessage({
            defaultMessage:
              'Gain reputation and level up for productive actions',
            description:
              'Short description for "Gamified learning" feature on Projects home page',
            id: 'NUrxUb',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Gamified learning',
            description:
              'Title for "Gamified learning" feature on Projects home page',
            id: 'LGHLf5',
          }),
        },
      ],
      key: 'build-together-with-other-like-minded-individuals',
      shortTitle: intl.formatMessage({
        defaultMessage: 'Gamified and socialized',
        description:
          'Short title for "Build together with other like-minded individuals" feature marketing section on Projects home page',
        id: 'RYUQWi',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Build together with other like-minded individuals',
        description:
          'Title for "Build together with other like-minded individuals" feature marketing section on Projects home page',
        id: 'CxfPVD',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Don’t worry about losing steam. Track your progress and level up as you',
        description:
          'Description for "Gamified learning and building" feature marketing section on Projects home page',
        id: '8YgB5f',
      }),
      hideOnMobile: true,
      items: [
        {
          description: intl.formatMessage({
            defaultMessage: 'Complete projects, with rep awarded by difficulty',
            description:
              'Description for "Complete projects, with rep awarded by difficulty" feature on Projects home page',
            id: 'Wq6liX',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'complete-projects',
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Help others review their code and answer questions',
            description:
              'Description for "Help others review their code and answer questions" feature on Projects home page',
            id: 'HRk5Ic',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'help-others-review',
        },
        {
          description: intl.formatMessage({
            defaultMessage:
              'Level up in your skills or complete component track',
            description:
              'Description for "Level up in your skills or complete component track" feature on Projects home page',
            id: 'Yezbh0',
          }),
          imgSrc: 'https://source.unsplash.com/random/640x360',
          key: 'level-up',
        },
      ],
      key: 'gamified-learning-and-building',
      title: intl.formatMessage({
        defaultMessage: 'Gamified learning and building',
        description:
          'Title for "Gamified learning and building" feature marketing section on Projects home page',
        id: 'OklFdI',
      }),
    },
  ];

  return features;
}

export default function ProjectsMarketingFeatures() {
  const features = useFeatures();

  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-24 py-24 lg:gap-y-32 lg:py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            heading={
              <FormattedMessage
                defaultMessage="The fastest way to learn and build something useful"
                description="Heading of the 'The fastest way to learn and build something useful' marketing section on Projects home page"
                id="pP8Sa9"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="Features"
                description="Title of the 'The fastest way to learn and build something useful' marketing section on Projects home page"
                id="sWyGax"
              />
            }
          />
        </div>
        <Section>
          {features.map((feature) => (
            <FeatureSection key={feature.key} feature={feature} />
          ))}
        </Section>
      </Container>
    </div>
  );
}
