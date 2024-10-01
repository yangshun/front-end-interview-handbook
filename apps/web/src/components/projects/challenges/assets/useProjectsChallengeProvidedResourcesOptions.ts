import type React from 'react';
import {
  RiCloudLine,
  RiFile2Line,
  RiFileCodeLine,
  RiImageLine,
  RiPaletteLine,
} from 'react-icons/ri';
import { RxFigmaLogo } from 'react-icons/rx';

import { useIntl } from '~/components/intl';

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
        defaultMessage: 'API specifications and sample data',
        description: 'Provided resource for project',
        id: 'BHjWCo',
      }),
    },
    'design-files': {
      icon: RxFigmaLogo,
      id: 'design-files',
      label: intl.formatMessage({
        defaultMessage: 'Design files for desktop, tablet and mobile',
        description: 'Provided resource for project',
        id: 'mRneIU',
      }),
    },
    'image-assets': {
      icon: RiImageLine,
      id: 'image-assets',
      label: intl.formatMessage({
        defaultMessage: 'High resolution image assets',
        description: 'Provided resource for project',
        id: 'G11qgw',
      }),
    },
    readme: {
      icon: RiFile2Line,
      id: 'readme',
      label: intl.formatMessage({
        defaultMessage: 'README file',
        description: 'Provided resource for project',
        id: 'QaaZVv',
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
        defaultMessage: 'Style guide for typography, colors and spacing',
        description: 'Provided resource for project',
        id: 'WHJSVt',
      }),
    },
  };

  return resources;
}
