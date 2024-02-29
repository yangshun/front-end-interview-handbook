import { RiComputerLine, RiSmartphoneLine, RiTabletLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '~/components/projects/common/ProjectsImageBreakpoints';

type Props = Readonly<{
  breakpoint: ProjectsImageBreakpointCategory;
  setBreakpoint: (device: ProjectsImageBreakpointCategory) => void;
}>;

export default function ProjectsImageBreakpointButtonGroup({
  breakpoint,
  setBreakpoint,
}: Props) {
  const intl = useIntl();

  const tabletDimension = ProjectsImageBreakpointDimensions.tablet;
  const mobileDimension = ProjectsImageBreakpointDimensions.mobile;

  const breakpoints = [
    {
      icon: RiComputerLine,
      label: intl.formatMessage(
        {
          defaultMessage: 'Desktop (>={width}px)',
          description: 'Responsive breakpoint category',
          id: 'MkmUuv',
        },
        { width: tabletDimension.width },
      ),
      value: 'desktop',
    },
    {
      icon: RiTabletLine,
      label: intl.formatMessage(
        {
          defaultMessage: 'Tablet ({minWidth}px-{maxWidth}px)',
          description: 'Responsive breakpoint category',
          id: 'aXu9RL',
        },
        { maxWidth: tabletDimension.width, minWidth: mobileDimension.width },
      ),
      value: 'tablet',
    },
    {
      icon: RiSmartphoneLine,
      label: intl.formatMessage(
        {
          defaultMessage: 'Mobile (<={width}px)',
          description: 'Responsive breakpoint category',
          id: 'jfkK0C',
        },
        { width: mobileDimension.width },
      ),
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
