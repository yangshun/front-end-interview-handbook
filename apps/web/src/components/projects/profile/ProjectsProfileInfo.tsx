import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiPencilFill,
  RiStarSmileFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsProfileBio from '~/components/projects/profile/info/ProjectsProfileBio';
import ProjectsProfileMotivation from '~/components/projects/profile/info/ProjectsProfileMotivation';
import ProjectsProfileTechList from '~/components/projects/profile/info/ProjectsProfileTechList';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserJobTitle from '~/components/projects/users/ProjectsUserJobTitle';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import ProjectsUserYearsOfExperience from '~/components/projects/users/ProjectsUserYearsOfExperience';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextFaintColor } from '~/components/ui/theme';

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

  const userFirstName = userProfile?.name?.split(' ')[0];

  const proficientSkills = ['React', 'HTML', 'CSS', 'JavaScript'];
  const growSkills = ['Next.js', 'Vercel'];

  return (
    <>
      <Section>
        <div className="gap-6 items-center md:flex hidden">
          <ProjectsProfileAvatar
            level={11}
            profile={userProfile}
            progress={30}
            size="3xl"
          />
          <div className="flex gap-3 flex-col">
            <div className="flex gap-2 items-center">
              <Text size="body1" weight="medium">
                {userProfile.name}
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
                <a href={userProfile.githubUsername}>
                  <span className="sr-only">Github</span>
                  <RiGithubFill
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  />
                </a>
              )}
              {userProfile.linkedInUsername && (
                <a href={userProfile.linkedInUsername}>
                  <span className="sr-only">LinkedIn</span>
                  <RiLinkedinBoxFill
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  />
                </a>
              )}
              <Text className={themeTextFaintColor} size="body2">
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
            <div className="flex gap-8 items-center">
              {userProfile.title && (
                <ProjectsUserJobTitle jobTitle={userProfile.title} />
              )}

              {/* TODO(projects): Remove the hardcoded YOE */}
              <ProjectsUserYearsOfExperience yearsOfExperience={2} />
            </div>
            <ProjectsUserReputation points={1650} />
          </div>
        </div>
        <div className="md:hidden flex flex-col">
          <div className="flex gap-8 items-center">
            <ProjectsProfileAvatar
              level={11}
              profile={userProfile}
              progress={30}
              size="3xl"
            />
            <div className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center flex-wrap">
                <Text size="body1" weight="medium">
                  {userProfile.name}
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
                    <a href={userProfile.githubUsername}>
                      <span className="sr-only">Github</span>
                      <RiGithubFill
                        aria-hidden="true"
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  )}
                  {userProfile.linkedInUsername && (
                    <a href={userProfile.linkedInUsername}>
                      <span className="sr-only">LinkedIn</span>
                      <RiLinkedinBoxFill
                        aria-hidden="true"
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  )}
                </div>
              </div>
              <Text className={themeTextFaintColor} size="body2">
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
              {isViewingOwnProfile ? (
                <FormattedMessage
                  defaultMessage="My Profile"
                  description="Title of Projects Profile page"
                  id="JotoOX"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Profile"
                  description="Title of Projects Profile page"
                  id="JQT5KD"
                />
              )}
            </Heading>
            <div className="flex gap-8 items-center flex-wrap">
              {userProfile.title && (
                <ProjectsUserJobTitle jobTitle={userProfile.title} />
              )}

              {/* TODO(projects): Remove the hardcoded YOE */}
              <ProjectsUserYearsOfExperience yearsOfExperience={2} />
            </div>
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
          <ProjectsProfileTechList
            heading={
              isViewingOwnProfile
                ? intl.formatMessage({
                    defaultMessage: 'Tech stack I am proficient in',
                    description:
                      'Projects profile tech stack proficient section title',
                    id: 'wQsSoq',
                  })
                : intl.formatMessage(
                    {
                      defaultMessage: 'Tech stack {username} is proficient in',
                      description:
                        'Projects profile tech stack proficient section title',
                      id: '3sCoap',
                    },
                    { username: userFirstName },
                  )
            }
            skills={proficientSkills}
            tooltipMessage={
              isViewingOwnProfile
                ? intl.formatMessage({
                    defaultMessage:
                      'The skills / tools / frameworks I am already familiar in',
                    description:
                      'Projects profile tech stack proficient section title',
                    id: 'UYvCz8',
                  })
                : intl.formatMessage(
                    {
                      defaultMessage:
                        'The skills / tools / frameworks {username} is already familiar in',
                      description:
                        'Projects profile tech stack proficient section title',
                      id: 'f7oS+z',
                    },
                    { username: userFirstName },
                  )
            }
          />
          <ProjectsProfileTechList
            heading={
              isViewingOwnProfile
                ? intl.formatMessage({
                    defaultMessage: 'Tech stack I am hoping to grow in',
                    description:
                      'Projects profile tech stack I am hoping to grow section title',
                    id: 'Vg4mOg',
                  })
                : intl.formatMessage(
                    {
                      defaultMessage:
                        'Tech stack {username} is hoping to grow in',
                      description:
                        'Projects profile tech stack I am hoping to grow section title',
                      id: 'pABUkn',
                    },
                    { username: userFirstName },
                  )
            }
            skills={growSkills}
            tooltipMessage={
              isViewingOwnProfile
                ? intl.formatMessage({
                    defaultMessage:
                      'The skills / tools / frameworks I am hoping to grow',
                    description:
                      'Projects profile tech stack I am hoping to grow section title',
                    id: 'B+SjAW',
                  })
                : intl.formatMessage(
                    {
                      defaultMessage:
                        'The skills / tools / frameworks {username} is hoping to grow',
                      description:
                        'Projects profile tech stack I am hoping to grow section title',
                      id: 'by2veu',
                    },
                    { username: userFirstName },
                  )
            }
          />
        </div>
      </div>
      {isViewingOwnProfile && (
        <div className="md:hidden block">
          <Button
            href="/projects/profile/edit"
            icon={RiPencilFill}
            label={intl.formatMessage({
              defaultMessage: 'Edit Profile',
              description: 'Label for edit projects profile button',
              id: 'Ad544L',
            })}
            variant="secondary"
          />
        </div>
      )}
    </>
  );
}
