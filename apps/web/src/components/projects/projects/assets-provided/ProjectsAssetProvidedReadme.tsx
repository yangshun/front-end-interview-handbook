import { RiFile2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsAssetProvidedCard from './ProjectsAssetProvidedCard';

export default function ProjectsAssetProvidedReadme() {
  const intl = useIntl();

  return (
    <ProjectsAssetProvidedCard
      icon={RiFile2Line}
      label={intl.formatMessage({
        defaultMessage: 'README file to help you get started',
        description:
          'Label for README card in Assets Provided section of Projects project page',
        id: '/ncyOd',
      })}
    />
  );
}
