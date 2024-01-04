import { RiFileCodeLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsAssetProvidedCard from './ProjectsAssetProvidedCard';

export default function ProjectsAssetProvidedHtml() {
  const intl = useIntl();

  return (
    <ProjectsAssetProvidedCard
      icon={RiFileCodeLine}
      label={intl.formatMessage({
        defaultMessage: 'HTML file with pre-written content',
        description:
          'Label for HTML File card in Assets Provided section of Projects project page',
        id: 'Q8TmuY',
      })}
    />
  );
}
