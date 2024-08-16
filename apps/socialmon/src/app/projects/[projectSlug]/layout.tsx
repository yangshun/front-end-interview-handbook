import clsx from 'clsx';
import { notFound } from 'next/navigation';

import ProjectsNavbar from '~/components/common/ProjectsNavbar';
import Container from '~/components/ui/Container';

import { getUser } from '~/app/lib/auth';
import { NAVBAR_HEIGHT } from '~/constants';
import prisma from '~/server/prisma';

type Props = Readonly<{
  children: React.ReactNode;
  params: {
    projectSlug: string;
  };
}>;

export default async function Layout({ children, params }: Props) {
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
    <div className="flex h-screen flex-col">
      <ProjectsNavbar user={user} />
      <Container
        className={clsx('flex-1', 'p-4', 'flex')}
        style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
        {children}
      </Container>
    </div>
  );
}
