import type { Metadata } from 'next';

import ProjectsSkillTreePage from '~/components/projects/skills/ProjectsSkillTreePage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects/skills',
    title: intl.formatMessage({
      defaultMessage: 'Skills roadmap | Projects',
      description: 'Title of Projects skills roadmap page',
      id: 'NzvDd2',
    }),
  });
}

export default async function Page() {
  return <ProjectsSkillTreePage />;
}
