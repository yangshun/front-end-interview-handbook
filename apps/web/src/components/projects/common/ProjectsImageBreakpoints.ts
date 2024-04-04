export type ProjectsImageBreakpointCategory = 'desktop' | 'mobile' | 'tablet';

export const ProjectsImageBreakpointDimensions: Record<
  ProjectsImageBreakpointCategory,
  Readonly<{ height: number; width: number }>
> = {
  // These dimensions have to be same as the images exported from Figma.
  desktop: {
    height: 1024,
    width: 1440,
  },
  mobile: {
    height: 812,
    width: 375,
  },
  tablet: {
    height: 1024,
    width: 768,
  },
};
