import { RiComputerLine, RiSmartphoneLine, RiTabletLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';

import type { ProjectsImageBreakpointCategory } from './ProjectsImageBreakpoints';

type Props = Readonly<{
  breakpoint: ProjectsImageBreakpointCategory;
  setBreakpoint: (device: ProjectsImageBreakpointCategory) => void;
}>;

export default function ProjectsImageBreakpointButtonGroup({
  breakpoint,
  setBreakpoint,
}: Props) {
  const intl = useIntl();

  const breakpoints = [
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
      {breakpoints.map(({ icon, label, value }) => (
        <FilterButton
          key={value}
          icon={icon}
          isLabelHidden={true}
          label={label}
          purpose="tab"
          selected={breakpoint === value}
          tooltip={label}
          onClick={() => {
            setBreakpoint(value);
          }}
        />
      ))}
    </div>
  );
}
