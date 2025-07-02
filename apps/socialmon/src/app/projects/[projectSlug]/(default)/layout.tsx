import clsx from 'clsx';
import { notFound } from 'next/navigation';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsNavbar from '~/components/common/ProjectsNavbar';
import Container from '~/components/ui/Container';

import { getUser } from '~/app/lib/auth';
import prisma from '~/server/prisma';

type Props = Readonly<{
  children: React.ReactNode;
  params: {
    projectSlug: string;
  };
}>;

export default async function Layout({ children, params }: Props) {
  await redirectToLoginPageIfNotLoggedIn('/');

  const user = await getUser();

  const { projectSlug } = params;
  const project = await prisma.project.findUnique({
    where: {
      slug: projectSlug,
    },
  });

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ProjectsNavbar user={user} />
      <Container className={clsx('flex-1', 'p-4', 'flex')}>
        {children}
      </Container>
    </div>
  );
}
