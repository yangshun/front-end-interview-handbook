'use client';

import { useEffect } from 'react';

import AuthGoogleOneTap from '~/components/auth/AuthGoogleOneTap';
import AuthOneClickSignup from '~/components/auth/AuthOneClickSignUp';
import { ProductThemeScript } from '~/components/global/product-theme/ProductThemeScript';
import { useProductMenuUnseenIndicator } from '~/components/global/product-theme/useProductMenuUnseenIndicator';

import useProjectsLevelUpToaster from './useProjectsLevelUpToaster';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default function ProjectsRootLayout({ children }: Props) {
  useProjectsLevelUpToaster();

  const [, setProductMenuUnseenIndicator] = useProductMenuUnseenIndicator();

  useEffect(() => {
    setProductMenuUnseenIndicator(false);
  }, [setProductMenuUnseenIndicator]);

  return (
    <>
      <ProductThemeScript theme="projects" />
      <AuthOneClickSignup />
      <AuthGoogleOneTap showOnMobileOnly={true} />
      {children}
    </>
  );
}
