import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import MarketingSectionHeader from '~/components/common/marketing/MarketingSectionHeader';
import MarketingSectionItemHeader from '~/components/common/marketing/MarketingSectionItemHeader';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogo from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import ProjectsMarketingComponentTrackAccordion from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordion';
import type { ProjectsTrack } from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordionItem';
import ProjectsMarketingComponentTrackAccordionItem from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordionItem';
import ProjectsProjectGridList from '~/components/projects/projects/ProjectsProjectGridList';
import ProjectsProjectGridListWithFilters from '~/components/projects/projects/ProjectsProjectGridListWithFilters';
import type { ProjectsProject } from '~/components/projects/projects/types';
import ProjectsSkillTree from '~/components/projects/skills/ProjectsSkillTree';
import type { ProjectSkillTree } from '~/components/projects/skills/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeRadialGlowBackground } from '~/components/ui/theme';

const foundationalSkillTree: ProjectSkillTree = [
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'semantic',
        label: 'Semantic',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'forms',
        label: 'Forms',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'a11y',
        label: 'A11y',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'html',
    label: 'HTML',
    totalProjectCount: 11,
    type: 'group',
  },

  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'layout',
        label: 'Layout',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'flex',
        label: 'Flex',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'grid',
        label: 'Grid',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'css',
    label: 'CSS',
    totalProjectCount: 11,
    type: 'group',
  },
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'basics',
        label: 'Basics',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'dom',
        label: 'DOM',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'fetch',
        label: 'Fetch',
        totalProjectCount: 11,
        type: 'item',
      },
      {
        completedProjectCount: 5,
        key: 'storage',
        label: 'Storage',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'javascript',
    label: 'JavaScript',
    totalProjectCount: 11,
    type: 'group',
  },
];

const intermediateSkillTree: ProjectSkillTree = [
  {
    completedProjectCount: 5,
    items: [
      {
        completedProjectCount: 5,
        key: 'placeholder-item-1',
        label: 'Placeholder',
        totalProjectCount: 11,
        type: 'item',
      },
    ],
    key: 'placeholder-group-1',
    label: 'Placeholder',
    totalProjectCount: 11,
    type: 'group',
  },
];

const skills = [
  {
    icon: HTML5LogoMonochrome,
    key: 'html',
  },
  { icon: JavaScriptLogo, key: 'javascript' },
  { icon: ReactLogo, key: 'react' },
];

const tracks: Array<ProjectsTrack> = [
  {
    completedProjectCount: 3,
    description: 'Learn how to build a whole design system from scratch',
    isPremium: false,
    key: 'design-system',
    projects: [
      {
        key: 'button',
        title: 'Button',
      },
      {
        key: 'text-input',
        title: 'Button',
      },
      {
        key: 'alert',
        title: 'Alert',
      },
    ],
    repCount: 1000,
    title: 'Design system track',
    totalProjectCount: 11,
  },
  {
    completedProjectCount: 3,
    description: 'Learn how to build a whole design system from scratch',
    isPremium: true,
    key: 'portfolio',
    projects: [
      {
        key: 'button',
        title: 'Button',
      },
      {
        key: 'text-input',
        title: 'Button',
      },
      {
        key: 'alert',
        title: 'Alert',
      },
    ],
    repCount: 1000,
    title: 'Portfolio track',
    totalProjectCount: 11,
  },
];

const hiddenTracks: Array<ProjectsTrack> = [
  {
    completedProjectCount: 3,
    description: 'Learn how to build a whole design system from scratch',
    isPremium: false,
    key: 'design-system',
    projects: [
      {
        key: 'button',
        title: 'Button',
      },
      {
        key: 'text-input',
        title: 'Button',
      },
      {
        key: 'alert',
        title: 'Alert',
      },
    ],
    repCount: 1000,
    title: 'Design system track',
    totalProjectCount: 11,
  },
];

const projects: Array<ProjectsProject> = [
  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-1',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-2',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },

  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-3',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
];

const hiddenProjects: Array<ProjectsProject> = [
  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-1',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-2',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
  {
    completedCount: 21,
    completedUsers: [
      {
        id: 'user1',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
      {
        id: 'user2',
        imageSrc: 'https://source.unsplash.com/random/48×48',
        userName: 'Hello',
      },
    ],
    description: 'This is a short description for the newsletter section',
    imgSrc: 'https://source.unsplash.com/random/960×360',
    isStarter: true,
    key: 'newsletter-section-3',
    projectHref: '#',
    repCount: 1000,
    skills: ['React', 'HTML', 'JS'],
    title: 'Newsletter section',
    trackName: 'Design System Track',
  },
];

function BlurOverlay({
  children: bottom,
  overlay: top,
  maxHeight,
}: {
  children: React.ReactNode;
  maxHeight?: number;
  overlay: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-visible">
      <div aria-hidden={true} className="blur">
        <div
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            maxHeight,
          }}>
          {bottom}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">{top}</div>
    </div>
  );
}

export default function ProjectsMarketingSkillsTracksProjects() {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-24 py-24 lg:gap-y-32 lg:py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            description={
              <FormattedMessage
                defaultMessage="We have a large bank of {projectCount}+ projects organized in 3 structured ways to help you achieve your objectives."
                description="Subtitle of the 'Build towards your goals' marketing section on Projects home page"
                id="khoims"
                values={{
                  projectCount: 50,
                }}
              />
            }
            heading={
              <FormattedMessage
                defaultMessage="Build towards your goals"
                description="Heading of the 'Build towards your goals' marketing section on Projects home page"
                id="UelR8r"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="Wide variety of projects"
                description="Title of the 'Build towards your goals' marketing section on Projects home page"
                id="y0zT5M"
              />
            }
          />
        </div>
        <Section>
          <div className="space-y-12">
            <MarketingSectionItemHeader
              description={
                <FormattedMessage
                  defaultMessage="Find projects and curated resources to advance your skills all the way from beginner to senior engineer. Train a well-rounded skillset including full stack and AI skills."
                  description="Subtitle of the 'Skill tree' marketing section on Projects home page"
                  id="s5GdUb"
                  values={{
                    projectCount: 50,
                  }}
                />
              }
              heading={
                <FormattedMessage
                  defaultMessage="Use our Skills Tree to train a holistic front end skill set"
                  description="Heading of the 'Skill tree' marketing section on Projects home page"
                  id="T7+/5t"
                />
              }
              title={
                <FormattedMessage
                  defaultMessage="You're here to learn skills"
                  description="Title of the 'Skill tree' marketing section on Projects home page"
                  id="6vsplp"
                />
              }
            />
            <div className="flex justify-center">
              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-4">
                  <Text weight="bold">Foundational skills</Text>
                  <div className="px-4">
                    <ProjectsSkillTree tree={foundationalSkillTree} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Text weight="bold">Intermediate skills</Text>
                  <BlurOverlay
                    overlay={
                      <div className="flex flex-col items-center gap-4">
                        <Button
                          icon={RiArrowRightLine}
                          label={intl.formatMessage(
                            {
                              defaultMessage:
                                'Explore {skillCount}+ more skills',
                              description:
                                "Label of 'Skill tree' view all button in Projects home page",
                              id: 'Sl00sj',
                            },
                            {
                              skillCount: 20,
                            },
                          )}
                          size="md"
                          variant="tertiary"
                        />
                        <div className="flex gap-4">
                          {skills.map(({ icon: Icon, key }) => (
                            <Icon key={key} className="h-8 w-8" />
                          ))}
                        </div>
                      </div>
                    }>
                    <div className="px-4">
                      <ProjectsSkillTree
                        disabled={true}
                        tree={intermediateSkillTree}
                      />
                    </div>
                  </BlurOverlay>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <div className="flex flex-col gap-y-8">
            <MarketingSectionItemHeader
              description={
                <FormattedMessage
                  defaultMessage="Impress recruiters with entire component libraries or design systems build from scratch. Our component tracks cover components from various use cases and industries."
                  description="Subtitle of the 'Component tracks' marketing section on Projects home page"
                  id="mae10q"
                  values={{
                    projectCount: 50,
                  }}
                />
              }
              heading={
                <FormattedMessage
                  defaultMessage="Build entire design systems or component libraries with our Component Tracks"
                  description="Heading of the 'Component tracks' marketing section on Projects home page"
                  id="FUjO3W"
                />
              }
              title={
                <FormattedMessage
                  defaultMessage="You're here for portfolio or side projects"
                  description="Title of the 'Component tracks' marketing section on Projects home page"
                  id="Jyrm8/"
                />
              }
            />
            <ProjectsMarketingComponentTrackAccordion>
              {tracks.map((track) => (
                <ProjectsMarketingComponentTrackAccordionItem
                  key={track.key}
                  track={track}
                />
              ))}
            </ProjectsMarketingComponentTrackAccordion>
            <BlurOverlay
              overlay={
                <div className="flex flex-col items-center gap-4">
                  <Button
                    icon={RiArrowRightLine}
                    label={intl.formatMessage(
                      {
                        defaultMessage:
                          'View all {trackCount} component tracks',
                        description:
                          "Label of 'Component tracks' view all button in Projects home page",
                        id: 'OfeY0a',
                      },
                      {
                        trackCount: 6,
                      },
                    )}
                    size="md"
                    variant="tertiary"
                  />
                  <div className="flex gap-4">
                    {skills.map(({ icon: Icon, key }) => (
                      <Icon key={key} className="h-8 w-8" />
                    ))}
                  </div>
                </div>
              }>
              <ProjectsMarketingComponentTrackAccordion
                className="-mt-4"
                disabled={true}>
                {hiddenTracks.map((track) => (
                  <ProjectsMarketingComponentTrackAccordionItem
                    key={track.key}
                    track={track}
                  />
                ))}
              </ProjectsMarketingComponentTrackAccordion>
            </BlurOverlay>
          </div>
        </Section>
        <Section>
          <div className="flex flex-col gap-y-8 pb-12">
            <MarketingSectionItemHeader
              description={
                <FormattedMessage
                  defaultMessage="Search a keyword or sort by popularity, difficulty or skills"
                  description="Subtitle of the 'Projects' marketing section on Projects home page"
                  id="lWZZ9l"
                />
              }
              heading={
                <FormattedMessage
                  defaultMessage="Find any project you can dream of"
                  description="Heading of the 'Projects' marketing section on Projects home page"
                  id="NGGXSc"
                />
              }
              title={
                <FormattedMessage
                  defaultMessage="You're here to just build!"
                  description="Title of the 'Projects' marketing section on Projects home page"
                  id="LjXg3C"
                />
              }
            />
            <ProjectsProjectGridListWithFilters projects={projects} />
            <BlurOverlay
              maxHeight={256}
              overlay={
                <div className="flex justify-center">
                  <Button
                    icon={RiArrowRightLine}
                    label={intl.formatMessage(
                      {
                        defaultMessage: 'Explore {projectCount}+ projects',
                        description:
                          "Label of 'Projects' view all button in Projects home page",
                        id: 'sLFGSE',
                      },
                      {
                        projectCount: 200,
                      },
                    )}
                    size="md"
                    variant="tertiary"
                  />
                </div>
              }>
              <ProjectsProjectGridList projects={hiddenProjects} />
            </BlurOverlay>
          </div>
        </Section>
      </Container>
    </div>
  );
}
