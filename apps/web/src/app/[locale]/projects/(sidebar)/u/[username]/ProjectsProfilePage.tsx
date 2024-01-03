'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsProfileInfo from '~/components/projects/profile/ProjectsProfileInfo';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import type { ProjectsUserProfile } from '~/components/projects/profile/types';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';

type Props = Readonly<{
  profile: ProjectsUserProfile;
}>;

export default function ProjectsProfilePage({ profile }: Props) {
  return (
    <Container className="md:pt-16 md:pb-32 pt-6 pb-8">
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
    </Container>
  );
}
