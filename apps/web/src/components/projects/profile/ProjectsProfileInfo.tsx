import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiPencilFill,
  RiStarSmileFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileBio from '~/components/projects/profile/info/ProjectsProfileBio';
import ProjectsProfileMotivation from '~/components/projects/profile/info/ProjectsProfileMotivation';
import ProjectsProfileSkillsList from '~/components/projects/profile/info/ProjectsProfileSkillsList';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsProfileDisplayNameLink from '../users/ProjectsProfileDisplayNameLink';

import type { Profile, ProjectsProfile } from '@prisma/client';

type Props = Readonly<{
  isViewingOwnProfile: boolean;
  userProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
}>;

export default function ProjectsProfileInfo({
  userProfile,
  isViewingOwnProfile,
}: Props) {
  const intl = useIntl();
  const { projectsProfile } = userProfile;

  const avatarProfile = {
    // TODO(projects): Use projects profile.
    ...userProfile,
    points: projectsProfile.points,
  };

  return (
    <>
      <Section>
        <div className="gap-6 items-center md:flex hidden">
          <ProjectsProfileAvatar profile={avatarProfile} size="3xl" />
          <div className="flex gap-3 flex-col">
            <div className="flex gap-2 items-center">
              <Text size="body1" weight="medium">
                <ProjectsProfileDisplayNameLink profile={userProfile} />
              </Text>
              {/* TODO(projects): Add actual premium logic */}
              <Badge
                icon={RiStarSmileFill}
                label={intl.formatMessage({
                  defaultMessage: 'Premium',
                  description: 'Premium content',
                  id: 'gIeLON',
                })}
                size="md"
                variant="special"
              />
              {userProfile.githubUsername && (
                <a href={userProfile.githubUsername} target="_blank">
                  <span className="sr-only">Github</span>
                  <RiGithubFill aria-hidden="true" className="h-5 w-5" />
                </a>
              )}
              {userProfile.linkedInUsername && (
                <a href={userProfile.linkedInUsername} target="_blank">
                  <span className="sr-only">LinkedIn</span>
                  <RiLinkedinBoxFill aria-hidden="true" className="h-5 w-5" />
                </a>
              )}
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="Joined on {date}"
                  description="Projects profile created date"
                  id="IO/eOZ"
                  values={{
                    date: new Date(
                      projectsProfile.createdAt,
                    ).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }),
                  }}
                />
              </Text>
            </div>
            <UserProfileInformationRow profile={userProfile} />
            <ProjectsUserReputation points={projectsProfile.points} />
          </div>
        </div>
        <div className="md:hidden flex flex-col">
          <div className="flex gap-8 items-center">
            <ProjectsProfileAvatar profile={avatarProfile} size="3xl" />
            <div className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center flex-wrap">
                <Text size="body1" weight="medium">
                  <ProjectsProfileDisplayNameLink profile={userProfile} />
                </Text>
                <div className="flex items-center gap-2">
                  {/* TODO(projects): Add actual premium logic */}
                  <Chip
                    icon={RiStarSmileFill}
                    isLabelHidden={true}
                    label="Premium"
                    size="sm"
                    variant="special"
                  />
                  {userProfile.githubUsername && (
                    <a href={userProfile.githubUsername} target="_blank">
                      <span className="sr-only">Github</span>
                      <RiGithubFill aria-hidden="true" className="h-5 w-5" />
                    </a>
                  )}
                  {userProfile.linkedInUsername && (
                    <a href={userProfile.linkedInUsername} target="_blank">
                      <span className="sr-only">LinkedIn</span>
                      <RiLinkedinBoxFill
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </a>
                  )}
                </div>
              </div>
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="Joined on {date}"
                  description="Projects profile created date"
                  id="IO/eOZ"
                  values={{
                    date: new Date(
                      projectsProfile.createdAt,
                    ).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }),
                  }}
                />
              </Text>
              <ProjectsUserReputation points={1650} />
            </div>
          </div>
          <Divider className="mt-8 mb-6" />
          <div className="flex flex-col gap-8">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Profile"
                description="Title of Projects Profile page"
                id="JQT5KD"
              />
            </Heading>
            <UserProfileInformationRow profile={userProfile} />
          </div>
        </div>
      </Section>
      <div className="flex justify-between md:flex-row flex-col gap-8">
        <div className="md:w-2/5 w-full gap-8 flex flex-col">
          {userProfile.bio && <ProjectsProfileBio bio={userProfile.bio} />}
          {(projectsProfile.primaryMotivation ||
            projectsProfile.secondaryMotivation) && (
            <ProjectsProfileMotivation
              primaryMotivation={projectsProfile.primaryMotivation}
              secondaryMotivation={projectsProfile.secondaryMotivation}
            />
          )}
        </div>
        <div className="md:w-2/5 w-full gap-8 flex flex-col">
          {projectsProfile.skillsProficient.length > 0 && (
            <ProjectsProfileSkillsList
              heading={intl.formatMessage({
                defaultMessage: 'Proficient skills',
                description:
                  'Projects profile tech stack proficient section title',
                id: 'WyHdb2',
              })}
              skills={projectsProfile.skillsProficient}
              tooltipMessage={intl.formatMessage({
                defaultMessage:
                  'Familiar with these skills / tools / frameworks',
                description:
                  'Projects profile tech stack proficient section title',
                id: '2yhoAr',
              })}
            />
          )}
          {projectsProfile.skillsToGrow.length > 0 && (
            <ProjectsProfileSkillsList
              heading={intl.formatMessage({
                defaultMessage: 'Hoping to grow in',
                description:
                  'Projects profile tech stack I am hoping to grow section title',
                id: 'M1iUIY',
              })}
              skills={projectsProfile.skillsToGrow}
              tooltipMessage={intl.formatMessage({
                defaultMessage: 'Hoping to grow in skills / tools / frameworks',
                description:
                  'Projects profile tech stack I am hoping to grow section title',
                id: 'P3mHDw',
              })}
            />
          )}
        </div>
      </div>
      {isViewingOwnProfile && (
        <div className="md:hidden block">
          <Button
            href="/projects/profile/edit"
            icon={RiPencilFill}
            label={intl.formatMessage({
              defaultMessage: 'Edit profile',
              description: 'Label for edit projects profile button',
              id: '4s0s2J',
            })}
            variant="secondary"
          />
        </div>
      )}
    </>
  );
}
