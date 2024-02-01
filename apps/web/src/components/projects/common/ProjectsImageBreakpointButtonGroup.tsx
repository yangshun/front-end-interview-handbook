import { RiComputerLine, RiSmartphoneLine, RiTabletLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';

import type { ProjectsChallengeSubmissionDeploymentScreenshotDevice } from '../submissions/types';

type Props = Readonly<{
  device: ProjectsChallengeSubmissionDeploymentScreenshotDevice;
  setDevice: (
    device: ProjectsChallengeSubmissionDeploymentScreenshotDevice,
  ) => void;
}>;

export default function ProjectsImageBreakpointButtonGroup({
  device,
  setDevice,
}: Props) {
  const intl = useIntl();

  const devices = [
    {
      icon: RiComputerLine,
      label: intl.formatMessage({
        defaultMessage: 'Desktop',
        description: 'Responsive breakpoint category',
        id: 'ZIM+0x',
      }),
      value: 'desktop',
    },
    {
      icon: RiTabletLine,
      label: intl.formatMessage({
        defaultMessage: 'Tablet',
        description: 'Responsive breakpoint category',
        id: '4KwvEP',
      }),
      value: 'tablet',
    },
    {
      icon: RiSmartphoneLine,
      label: intl.formatMessage({
        defaultMessage: 'Mobile',
        description: 'Responsive breakpoint category',
        id: 'ohDwTa',
      }),
      value: 'mobile',
    },
  ] as const;

  return (
    <div className="flex gap-2">
      {devices.map(({ icon, label, value }) => (
        <FilterButton
          key={value}
          icon={icon}
          isLabelHidden={true}
          label={label}
          purpose="tab"
          selected={device === value}
          tooltip={label}
          onClick={() => {
            setDevice(value);
          }}
        />
      ))}
    </div>
  );
}
