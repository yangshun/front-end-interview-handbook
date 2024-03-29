'use client';

import { useEffect } from 'react';

import useProjectsRedirectToOnboardingIfNecessary from '../hooks/useProjectsRedirectToOnboardingIfNecessary';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default function ProjectsRootLayout({ children }: Props) {
  useProjectsRedirectToOnboardingIfNecessary();

  useEffect(() => {
    document.body.dataset.theme = 'projects';

    return () => {
      delete document.body.dataset.theme;
    };
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try { document.body.dataset.theme = 'projects'; } catch (_) { }`,
        }}
        id="product-theme"
      />
      {children}
    </>
  );
}
