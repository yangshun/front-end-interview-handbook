import type { Metadata } from 'next/types';

import ProjectsOnboardingReasonPage from '~/components/projects/onboarding/ProjectsOnboardingReasonPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Tell us your motivations so that we can tailor your experience',
      description: 'Description of projects onboarding motivations page',
      id: 'lD4azu',
    }),
    locale,
    pathname: '/projects/onboarding',
    title: intl.formatMessage({
      defaultMessage:
        'Your motivations | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of projects onboarding motivations page',
      id: 'pKAIU6',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default function Page() {
  return <ProjectsOnboardingReasonPage />;
}
