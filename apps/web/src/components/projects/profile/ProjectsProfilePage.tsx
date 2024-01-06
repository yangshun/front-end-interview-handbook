'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsProfileInfo from '~/components/projects/profile/ProjectsProfileInfo';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import type { ProjectsUserProfile } from '~/components/projects/profile/types';
import Heading from '~/components/ui/Heading';

type Props = Readonly<{
  profile: ProjectsUserProfile;
}>;

export default function ProjectsProfilePage({ profile }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading className="md:block hidden" level="heading5">
        <FormattedMessage
          defaultMessage="My Profile"
          description="Title of Projects Profile page"
          id="JotoOX"
        />
      </Heading>
      <ProjectsProfileInfo profile={profile} />
      <ProjectsProfileStats />
    </div>
  );
}
