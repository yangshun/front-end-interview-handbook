'use client';

import useProjectsRedirectToOnboardingIfNecessary from '../hooks/useProjectsRedirectToOnboardingIfNecessary';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default function ProjectsRootLayout({ children }: Props) {
  useProjectsRedirectToOnboardingIfNecessary();

  return (
    <>
      <style id="theme-variables">
        {`:root{${Object.entries({
          dark: '#2FBC78',
          darker: '#165737',
          darkest: '#092417',
          default: '#36D387',
          light: '#3FF59D',
          lighter: '#7EFFC1',
          lightest: '#C9FFE5',
        })
          .map(([shade, hex]) => `--brand-${shade}: ${hex};`)
          .join('')}}`}
      </style>
      {children ?? null}
    </>
  );
}
