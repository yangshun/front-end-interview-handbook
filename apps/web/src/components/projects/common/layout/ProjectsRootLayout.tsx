'use client';

import { ProductThemeScript } from '~/components/global/product-theme/ProductThemeScript';

import ProjectsRedirectToOnboardingIfNecessary from './ProjectsRedirectToOnboardingIfNecessary';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default function ProjectsRootLayout({ children }: Props) {
  return (
    <>
      <ProductThemeScript theme="projects" />
      {children}
      <ProjectsRedirectToOnboardingIfNecessary />
    </>
  );
}
