import type { Metadata } from 'next';

import ProjectsRootLayout from '~/components/projects/common/layout/ProjectsRootLayout';
import ProjectsOnboardingContextProvider from '~/components/projects/onboarding/ProjectsOnboardingContext';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  children: React.ReactElement;
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  // Must also declare in this projects-specific layout file to
  // override the metadata set by the top-level layout file otherwise
  // the template field is using the top-level layout file.
  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        'Tackle real-world front end projects designed by ex-FAANG engineers. Elevate your skills, build your portfolio, and connect with an active community.',
      description: 'Description of Projects page',
      id: 'Dt7sc8',
    }),
    locale,
    pathname: '/projects',
    title: intl.formatMessage({
      defaultMessage: 'Build front end real-world projects',
      description: 'Title of Projects page',
      id: 'Gqq8RF',
    }),
  });
}

export default async function Layout({ children }: Props) {
  return (
    <ProjectsRootLayout>
      <ProjectsOnboardingContextProvider>
        {children}
      </ProjectsOnboardingContextProvider>
    </ProjectsRootLayout>
  );
}
