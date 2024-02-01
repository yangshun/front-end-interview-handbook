export type ProjectsImageBreakpointCategory = 'desktop' | 'mobile' | 'tablet';

export const ProjectsImageBreakpointDimensions: Record<
  ProjectsImageBreakpointCategory,
  Readonly<{ height: number; width: number }>
> = {
  desktop: {
    height: 1080,
    width: 1440,
  },
  mobile: {
    height: 1080,
    width: 375,
  },
  tablet: {
    height: 1080,
    width: 768,
  },
};
