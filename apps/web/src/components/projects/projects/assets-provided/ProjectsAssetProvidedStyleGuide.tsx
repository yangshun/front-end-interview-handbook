import { RiBardLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsAssetProvidedCard from './ProjectsAssetProvidedCard';

export default function ProjectsAssetProvidedStyleGuide() {
  const intl = useIntl();

  return (
    <ProjectsAssetProvidedCard
      icon={RiBardLine}
      label={intl.formatMessage({
        defaultMessage: 'Style guide for fonts, colors, etc.',
        description:
          'Label for Style Guide card in Assets Provided section of Projects project page',
        id: 'LFg5Tg',
      })}
    />
  );
}
