'use client';

import useProjectsRedirectToOnboardingIfNecessary from '../hooks/useProjectsRedirectToOnboardingIfNecessary';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default function ProjectsRootLayout({ children }: Props) {
  useProjectsRedirectToOnboardingIfNecessary();

  return children ?? null;
}
