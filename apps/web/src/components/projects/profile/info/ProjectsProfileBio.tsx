import { useIntl } from '~/components/intl';
import ProjectsProfileInfoSectionLayout from '~/components/projects/profile/info/ProjectsProfileInfoSectionLayout';
import Text from '~/components/ui/Text';

export default function ProjectsProfileBio({ bio }: { bio: string }) {
  const intl = useIntl();

  return (
    <ProjectsProfileInfoSectionLayout
      heading={intl.formatMessage({
        defaultMessage: 'Bio',
        description: 'Project profile bio section title',
        id: 'q9Y+cd',
      })}>
      <Text color="secondary" size="body2">
        {bio}
      </Text>
    </ProjectsProfileInfoSectionLayout>
  );
}
