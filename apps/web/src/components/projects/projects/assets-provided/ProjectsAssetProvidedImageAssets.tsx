import { RiFolderImageLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsAssetProvidedCard from './ProjectsAssetProvidedCard';

export default function ProjectsAssetProvidedImageAssets() {
  const intl = useIntl();

  return (
    <ProjectsAssetProvidedCard
      icon={RiFolderImageLine}
      label={intl.formatMessage({
        defaultMessage: 'Optimized image assets',
        description:
          'Label for Image Assets card in Assets Provided section of Projects project page',
        id: '4q3pJW',
      })}
    />
  );
}
