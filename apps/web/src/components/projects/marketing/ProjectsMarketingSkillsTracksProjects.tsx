import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import MarketingSectionHeader from '~/components/common/marketing/MarketingSectionHeader';
import MarketingSectionItemHeader from '~/components/common/marketing/MarketingSectionItemHeader';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogo from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import type { ProjectsChallengeItem } from '~/components/projects/details/types';
import ProjectsChallengeGridList from '~/components/projects/lists/ProjectsChallengeGridList';
import ProjectsChallengeGridListWithFilters from '~/components/projects/lists/ProjectsChallengeGridListWithFilters';
import ProjectsMarketingComponentTrackAccordion from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordion';
import ProjectsMarketingComponentTrackAccordionItem from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordionItem';
import ProjectsSkillTree from '~/components/projects/skills/ProjectsSkillTree';
import {
  foundationalSkillTree,
  intermediateSkillTree,
} from '~/components/projects/skills/ProjectsSkillTreeData';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeRadialGlowBackground } from '~/components/ui/theme';

import type { ProjectsTrack } from '../tracks/ProjectsTracksData';

const skills = [
  {
    icon: HTML5LogoMonochrome,
    key: 'html',
  },
  { icon: JavaScriptLogo, key: 'javascript' },
  { icon: ReactLogo, key: 'react' },
];

type Props = Readonly<{
  featuredChallenges: ReadonlyArray<ProjectsChallengeItem>;
  hiddenTracks: ReadonlyArray<ProjectsTrack>;
  projectTracks: ReadonlyArray<ProjectsTrack>;
}>;

export default function ProjectsMarketingSkillsTracksProjects({
  featuredChallenges,
  hiddenTracks,
  projectTracks,
}: Props) {
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
                    align="bottom"
                    overlay={
                      <div className="flex flex-col items-center gap-4">
                        <Button
                          href="/projects/skill-tree"
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
                  defaultMessage="Impress recruiters with entire component libraries or design systems built from scratch. Our component tracks cover components from various use cases and industries."
                  description="Subtitle of the 'Component tracks' marketing section on Projects home page"
                  id="4tgadO"
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
              {projectTracks.map((projectTrack) => (
                <ProjectsMarketingComponentTrackAccordionItem
                  key={projectTrack.metadata.slug}
                  track={projectTrack}
                />
              ))}
            </ProjectsMarketingComponentTrackAccordion>
            <BlurOverlay
              align="bottom"
              overlay={
                <div className="flex flex-col items-center gap-4">
                  <Button
                    href="/projects/tracks"
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
                    key={track.metadata.slug}
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
            <ProjectsChallengeGridListWithFilters
              challenges={featuredChallenges}
            />
            <BlurOverlay
              align="bottom"
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
              <ProjectsChallengeGridList challenges={featuredChallenges} />
            </BlurOverlay>
          </div>
        </Section>
      </Container>
    </div>
  );
}
