import type React from 'react';
import {
  RiCloudLine,
  RiFile2Line,
  RiFileCodeLine,
  RiImageLine,
  RiPaletteLine,
} from 'react-icons/ri';
import { RxFigmaLogo } from 'react-icons/rx';
import { useIntl } from 'react-intl';

import type { ProjectsChallengeResource } from '../types';

export default function useProjectsChallengeProvidedResourcesOptions() {
  const intl = useIntl();

  const resources: Record<
    ProjectsChallengeResource,
    Readonly<{
      icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
      id: ProjectsChallengeResource;
      label: string;
    }>
  > = {
    api: {
      icon: RiCloudLine,
      id: 'api',
      label: intl.formatMessage({
        defaultMessage: 'API specifications or sample data',
        description: 'Provided resource for project',
        id: 'Ob2cWZ',
      }),
    },
    'design-files': {
      icon: RxFigmaLogo,
      id: 'design-files',
      label: intl.formatMessage({
        defaultMessage: 'JPEG design files for mobile & desktop layouts',
        description: 'Provided resource for project',
        id: 'ueUG6Q',
      }),
    },
    'image-assets': {
      icon: RiImageLine,
      id: 'image-assets',
      label: intl.formatMessage({
        defaultMessage: 'Optimized image assets',
        description: 'Provided resource for project',
        id: 'tOPOx+',
      }),
    },
    readme: {
      icon: RiFile2Line,
      id: 'readme',
      label: intl.formatMessage({
        defaultMessage: 'README file to help you get started',
        description: 'Provided resource for project',
        id: 'pCZPGj',
      }),
    },
    'starter-code': {
      icon: RiFileCodeLine,
      id: 'starter-code',
      label: intl.formatMessage({
        defaultMessage: 'Starter code with content copy',
        description: 'Provided resource for project',
        id: 'F8wNUD',
      }),
    },
    'style-guide': {
      icon: RiPaletteLine,
      id: 'style-guide',
      label: intl.formatMessage({
        defaultMessage: 'Style guide for fonts, colors, etc.',
        description: 'Provided resource for project',
        id: 'vAyAVU',
      }),
    },
  };

  return resources;
}
