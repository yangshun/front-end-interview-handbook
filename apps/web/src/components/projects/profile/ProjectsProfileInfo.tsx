import { RiPencilFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileBio from '~/components/projects/profile/info/ProjectsProfileBio';
import ProjectsProfileMotivation from '~/components/projects/profile/info/ProjectsProfileMotivation';
import ProjectsProfileSkillsList from '~/components/projects/profile/info/ProjectsProfileSkillsList';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Button from '~/components/ui/Button';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsProfileSocialLinks from './info/ProjectsProfileSocialLinks';
import ProjectsProfileUsernameBadge from './info/ProjectsProfileUsernameBadge';
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

  const editProfileButton = (
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
  );

  return (
    <>
      <Section>
        <div className="hidden justify-between md:flex">
          <div className="flex items-center gap-6">
            <ProjectsProfileAvatar
              points={projectsProfile.points}
              size="3xl"
              userProfile={userProfile}
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <Text size="body1" weight="medium">
                  <ProjectsProfileDisplayNameLink userProfile={userProfile} />
                </Text>
                <ProjectsProfileUsernameBadge
                  premium={projectsProfile.premium}
                  username={userProfile.username}
                />
              </div>
              <UserProfileInformationRow userProfile={userProfile} />
              <div className="flex items-center gap-3">
                <ProjectsUserReputation
                  points={projectsProfile.points}
                  size="body2"
                />
                <ProjectsProfileSocialLinks userProfile={userProfile} />
              </div>
            </div>
          </div>
          {isViewingOwnProfile && editProfileButton}
        </div>
        <div className="flex flex-col gap-6 md:hidden">
          <div className="flex items-center gap-8">
            <ProjectsProfileAvatar
              points={projectsProfile.points}
              size="3xl"
              userProfile={userProfile}
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-4">
                  <Text size="body1" weight="medium">
                    <ProjectsProfileDisplayNameLink userProfile={userProfile} />
                  </Text>
                  <ProjectsProfileUsernameBadge
                    premium={projectsProfile.premium}
                    username={userProfile.username}
                  />
                </div>
                <UserProfileInformationRow userProfile={userProfile} />
                <div className="flex items-center gap-3">
                  <ProjectsUserReputation
                    points={projectsProfile.points}
                    size="body2"
                  />
                  <ProjectsProfileSocialLinks userProfile={userProfile} />
                </div>
              </div>
            </div>
          </div>
          {isViewingOwnProfile && (
            <div className="grid justify-items-end">{editProfileButton}</div>
          )}
        </div>
      </Section>
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-2/5">
          {userProfile.bio && <ProjectsProfileBio bio={userProfile.bio} />}
          {projectsProfile.motivations &&
            projectsProfile.motivations.length > 0 && (
              <ProjectsProfileMotivation
                motivations={projectsProfile.motivations}
              />
            )}
        </div>
        <div className="flex w-full flex-col gap-8 md:w-2/5">
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
    </>
  );
}
