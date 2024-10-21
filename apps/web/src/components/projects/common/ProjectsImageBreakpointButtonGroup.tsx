import { useIntl } from '~/components/intl';
import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '~/components/projects/common/ProjectsImageBreakpoints';
import FilterButton from '~/components/ui/FilterButton/FilterButton';

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
      icon: ProjectsImageBreakpointDimensions.desktop.icon,
      label: intl.formatMessage(
        {
          defaultMessage: 'Desktop ({width}px x {height}px)',
          description: 'Responsive breakpoint category',
          id: '0tjrX1',
        },
        {
          height: ProjectsImageBreakpointDimensions.desktop.height,
          width: ProjectsImageBreakpointDimensions.desktop.width,
        },
      ),
      value: 'desktop',
    },
    {
      icon: ProjectsImageBreakpointDimensions.tablet.icon,
      label: intl.formatMessage(
        {
          defaultMessage: 'Tablet ({width}px x {height}px)',
          description: 'Responsive breakpoint category',
          id: 'aadNm4',
        },
        {
          height: ProjectsImageBreakpointDimensions.tablet.height,
          width: ProjectsImageBreakpointDimensions.tablet.width,
        },
      ),
      value: 'tablet',
    },
    {
      icon: ProjectsImageBreakpointDimensions.mobile.icon,
      label: intl.formatMessage(
        {
          defaultMessage: 'Mobile ({width}px x {height}px)',
          description: 'Responsive breakpoint category',
          id: 'jwZwsD',
        },
        {
          height: ProjectsImageBreakpointDimensions.mobile.height,
          width: ProjectsImageBreakpointDimensions.mobile.width,
        },
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
