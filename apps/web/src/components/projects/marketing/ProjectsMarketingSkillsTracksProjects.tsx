import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import HTML5LogoMonochrome from '~/components/icons/HTML5LogoMonochrome';
import JavaScriptLogo from '~/components/icons/JavaScriptLogoMonochrome';
import ReactLogo from '~/components/icons/ReactLogo';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import MarketingSectionItemHeader from '~/components/marketing/MarketingSectionItemHeader';
import ProjectsChallengeGridList from '~/components/projects/challenges/lists/ProjectsChallengeGridList';
import ProjectsChallengeGridListWithFilters from '~/components/projects/challenges/lists/ProjectsChallengeGridListWithFilters';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsTrackAccordion from '~/components/projects/tracks/ProjectsTrackAccordion';
import ProjectsTrackAccordionItem from '~/components/projects/tracks/ProjectsTrackAccordionItem';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeRadialGlowBackground } from '~/components/ui/theme';

import useProfileWithProjectsProfile from '../common/useProfileWithProjectsProfile';
import type { ProjectsTrackItem } from '../tracks/ProjectsTracksData';

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
  hiddenTracks: ReadonlyArray<ProjectsTrackItem>;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsMarketingSkillsTracksProjects({
  featuredChallenges,
  hiddenTracks,
  projectTracks,
}: Props) {
  const intl = useIntl();
  const { profile } = useProfileWithProjectsProfile();

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
            <ProjectsTrackAccordion>
              {projectTracks.map((projectTrack) => (
                <ProjectsTrackAccordionItem
                  key={projectTrack.metadata.slug}
                  track={projectTrack}
                  viewerIsPremium={profile?.projectsProfile?.premium ?? false}
                />
              ))}
            </ProjectsTrackAccordion>
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
                      <Icon key={key} className="size-8" />
                    ))}
                  </div>
                </div>
              }>
              <ProjectsTrackAccordion className="-mt-4" disabled={true}>
                {hiddenTracks.map((track) => (
                  <ProjectsTrackAccordionItem
                    key={track.metadata.slug}
                    track={track}
                    viewerIsPremium={profile?.projectsProfile?.premium ?? false}
                  />
                ))}
              </ProjectsTrackAccordion>
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
