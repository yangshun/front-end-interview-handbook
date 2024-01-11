import ProjectsChallengeHeaderLayout from '~/components/projects/details/header/ProjectsChallengeHeaderLayout';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug } = params;

  const { challenge } = await readProjectsChallengeItem(slug, locale);

  return (
    <ProjectsChallengeHeaderLayout challenge={challenge}>
      {children}
    </ProjectsChallengeHeaderLayout>
  );
}
