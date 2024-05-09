import { RiComputerLine, RiSmartphoneLine, RiTabletLine } from 'react-icons/ri';

export type ProjectsImageBreakpointCategory = 'desktop' | 'mobile' | 'tablet';

export const ProjectsImageBreakpointDimensions: Record<
  ProjectsImageBreakpointCategory,
  Readonly<{
    grid: {
      columnGap: number;
      columns: number;
      containerWidth: number;
      sidePadding: number;
    };
    height: number;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    width: number;
  }>
> = {
  // These dimensions have to be same as the images exported from Figma.
  desktop: {
    grid: {
      columnGap: 32,
      columns: 12,
      containerWidth: 1280,
      sidePadding: 32,
    },
    height: 768,
    icon: RiComputerLine,
    width: 1440,
  },
  mobile: {
    grid: {
      columnGap: 16,
      columns: 4,
      containerWidth: 375,
      sidePadding: 16,
    },
    height: 812,
    icon: RiSmartphoneLine,
    width: 375,
  },
  tablet: {
    grid: {
      columnGap: 32,
      columns: 6,
      containerWidth: 768,
      sidePadding: 32,
    },
    height: 1024,
    icon: RiTabletLine,
    width: 768,
  },
};
