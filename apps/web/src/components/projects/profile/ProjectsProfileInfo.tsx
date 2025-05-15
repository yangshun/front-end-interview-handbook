import type { Profile, ProjectsProfile } from '@prisma/client';
import { RiPencilFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileBio from '~/components/projects/profile/info/ProjectsProfileBio';
import ProjectsProfileMotivation from '~/components/projects/profile/info/ProjectsProfileMotivation';
import ProjectsProfileSkillsList from '~/components/projects/profile/info/ProjectsProfileSkillsList';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import ProjectsProfileDisplayNameLink from '../users/ProjectsProfileDisplayNameLink';
import ProjectsProfileSocialLinks from './info/ProjectsProfileSocialLinks';
import ProjectsProfileUsernameBadge from './info/ProjectsProfileUsernameBadge';

type Props = Readonly<{
  isViewingOwnProfile: boolean;
  userProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
}>;

export default function ProjectsProfileInfo({
  isViewingOwnProfile,
  userProfile,
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
    <div className="flex flex-col gap-8">
      <div className="flex gap-3 md:gap-6">
        <div className="hidden md:contents">
          <ProjectsProfileAvatar
            points={projectsProfile.points}
            size="3xl"
            userProfile={userProfile}
          />
        </div>
        <div className="contents md:hidden">
          <ProjectsProfileAvatar
            className="pt-4"
            points={projectsProfile.points}
            size="xl"
            userProfile={userProfile}
          />
        </div>

        <div className="flex grow flex-col gap-6 md:flex-row md:justify-between">
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
          {isViewingOwnProfile && editProfileButton}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {userProfile.bio && <ProjectsProfileBio bio={userProfile.bio} />}
        {projectsProfile.motivations &&
          projectsProfile.motivations.length > 0 && (
            <ProjectsProfileMotivation
              motivations={projectsProfile.motivations}
            />
          )}
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
              defaultMessage: 'Familiar with these skills / tools / frameworks',
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
  );
}
