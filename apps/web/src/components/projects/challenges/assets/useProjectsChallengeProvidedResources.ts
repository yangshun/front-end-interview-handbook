import {
  RiBardLine,
  RiDeviceLine,
  RiFile2Line,
  RiFileCodeLine,
  RiFolderImageLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

export default function useProjectsChallengeProvidedResources() {
  const intl = useIntl();

  return [
    {
      icon: RiDeviceLine,
      id: 'design-files',
      label: intl.formatMessage({
        defaultMessage: 'JPEG design files for mobile & desktop layouts',
        description: 'Provided resource for project',
        id: 'ueUG6Q',
      }),
    },
    {
      icon: RiBardLine,
      id: 'style-guide',
      label: intl.formatMessage({
        defaultMessage: 'Style guide for fonts, colors, etc.',
        description: 'Provided resource for project',
        id: 'vAyAVU',
      }),
    },
    {
      icon: RiFolderImageLine,
      id: 'image-assets',
      label: intl.formatMessage({
        defaultMessage: 'Optimized image assets',
        description: 'Provided resource for project',
        id: 'tOPOx+',
      }),
    },
    {
      icon: RiFile2Line,
      id: 'readme',
      label: intl.formatMessage({
        defaultMessage: 'README file to help you get started',
        description: 'Provided resource for project',
        id: 'pCZPGj',
      }),
    },
    {
      icon: RiFileCodeLine,
      id: 'html',
      label: intl.formatMessage({
        defaultMessage: 'HTML file with pre-written content',
        description: 'Provided resource for project',
        id: 'OoBbFR',
      }),
    },
  ];
}
