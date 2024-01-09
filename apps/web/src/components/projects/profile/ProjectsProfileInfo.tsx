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
import type { ProjectsUserProfile } from '~/components/projects/profile/types';
import ProjectsUserJobTitle from '~/components/projects/users/ProjectsUserJobTitle';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import ProjectsUserYearsOfExperience from '~/components/projects/users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '~/components/projects/users/UserAvatarWithLevel';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextFaintColor } from '~/components/ui/theme';

type Props = Readonly<{
  isMyProfile: boolean;
  profile: ProjectsUserProfile;
}>;

export default function ProjectsProfileInfo({ profile, isMyProfile }: Props) {
  const intl = useIntl();
  const projectsProfile = profile.projectsProfile[0];

  const userFirstName = profile?.name?.split(' ')[0];

  const proficientSkills = [
    'React',
    'HTML',
    'CSS',
    'JS',
    'React',
    'HTML',
    'CSS',
    'React',
    'HTML',
    'CSS',
    'JS',
    'React',
    'HTML',
    'CSS',
  ];
  const growSkills = ['NextJs', 'Vercel'];

  return (
    <>
      <Section>
        <div className="gap-6 items-center md:flex hidden">
          <UserAvatarWithLevel
            level={11}
            profile={profile}
            progress={30}
            size="3xl"
          />
          <div className="flex gap-3 flex-col">
            <div className="flex gap-2 items-center">
              <Text size="body1" weight="medium">
                {profile.name}
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
              {profile.githubUsername && (
                <Anchor href={profile.githubUsername} variant="muted">
                  <span className="sr-only">Github</span>
                  <RiGithubFill
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  />
                </Anchor>
              )}
              {profile.linkedInUsername && (
                <Anchor href={profile.linkedInUsername} variant="muted">
                  <span className="sr-only">LinkedIn</span>
                  <RiLinkedinBoxFill
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  />
                </Anchor>
              )}
              <Text className={themeTextFaintColor} size="body2">
                <FormattedMessage
                  defaultMessage="Joined on {date}"
                  description="Projects profile created date"
                  id="IO/eOZ"
                  values={{
                    date: new Date(
                      projectsProfile?.createdAt,
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
              {profile.title && (
                <ProjectsUserJobTitle jobTitle={profile.title} />
              )}

              {/* TODO(projects): Remove the hardcoded YOE */}
              <ProjectsUserYearsOfExperience yearsOfExperience={2} />
            </div>
            <ProjectsUserReputation points={1650} />
          </div>
        </div>
        <div className="md:hidden flex flex-col">
          <div className="flex gap-8 items-center">
            <UserAvatarWithLevel
              level={11}
              profile={profile}
              progress={30}
              size="3xl"
            />
            <div className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center flex-wrap">
                <Text size="body1" weight="medium">
                  {profile.name}
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
                  {profile.githubUsername && (
                    <Anchor href={profile.githubUsername} variant="muted">
                      <span className="sr-only">Github</span>
                      <RiGithubFill
                        aria-hidden="true"
                        className="h-[18px] w-[18px]"
                      />
                    </Anchor>
                  )}
                  {profile.linkedInUsername && (
                    <Anchor href={profile.linkedInUsername} variant="muted">
                      <span className="sr-only">LinkedIn</span>
                      <RiLinkedinBoxFill
                        aria-hidden="true"
                        className="h-[18px] w-[18px]"
                      />
                    </Anchor>
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
                      projectsProfile?.createdAt,
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
              {isMyProfile ? (
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
              {profile.title && (
                <ProjectsUserJobTitle jobTitle={profile.title} />
              )}

              {/* TODO(projects): Remove the hardcoded YOE */}
              <ProjectsUserYearsOfExperience yearsOfExperience={2} />
            </div>
          </div>
        </div>
      </Section>

      <div className="flex justify-between md:flex-row flex-col gap-8">
        <div className="md:w-2/5 w-full gap-8 flex flex-col">
          {profile.bio && <ProjectsProfileBio bio={profile.bio} />}
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
              isMyProfile
                ? intl.formatMessage({
                    defaultMessage: 'Tech stack I proficient in',
                    description:
                      'Projects profile tech stack proficient section title',
                    id: '9SQdvi',
                  })
                : intl.formatMessage(
                    {
                      defaultMessage: 'Tech stack {username} proficient in',
                      description:
                        'Projects profile tech stack proficient section title',
                      id: 'aIn0YC',
                    },
                    { username: userFirstName },
                  )
            }
            skills={proficientSkills}
            tooltipMessage={
              isMyProfile
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
              isMyProfile
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
              isMyProfile
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
      {isMyProfile && (
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
