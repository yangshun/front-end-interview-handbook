'use client';

import { ProductThemeScript } from '~/components/global/product-theme/ProductThemeScript';

import useProjectsRedirectToOnboardingIfNecessary from '../../hooks/useProjectsRedirectToOnboardingIfNecessary';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default function ProjectsRootLayout({ children }: Props) {
  useProjectsRedirectToOnboardingIfNecessary();

  return (
    <>
      <ProductThemeScript theme="projects" />
      {children}
    </>
  );
}
