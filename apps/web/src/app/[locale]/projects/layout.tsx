import { redirect } from 'next/navigation';

import ProjectsRootLayout from '~/components/projects/common/layout/ProjectsRootLayout';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default async function Layout({ children }: Props) {
  // TODO(projects): Remove this check when launching.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    redirect('/');
  }

  return <ProjectsRootLayout>{children}</ProjectsRootLayout>;
}
