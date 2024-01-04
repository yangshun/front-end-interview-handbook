import { RiDeviceLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsAssetProvidedCard from './ProjectsAssetProvidedCard';

export default function ProjectsAssetProvidedJpeg() {
  const intl = useIntl();

  return (
    <ProjectsAssetProvidedCard
      icon={RiDeviceLine}
      label={intl.formatMessage({
        defaultMessage: 'JPEG design files for mobile & desktop layouts',
        description:
          'Label for JPEG card in Assets Provided section of Projects project page',
        id: 'izBHrw',
      })}
    />
  );
}
