import clsx from 'clsx';
import { notFound } from 'next/navigation';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsNavbar from '~/components/common/ProjectsNavbar';
import Container from '~/components/ui/Container';
import MobilePostModal from '~/components/ui/MobilePostModal';

import { getUser } from '~/app/lib/auth';
import prisma from '~/server/prisma';

type Props = Readonly<{
  children: React.ReactNode;
  detail: React.ReactNode;
  params: {
    projectSlug: string;
  };
}>;

export default async function Layout({ children, detail, params }: Props) {
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

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Left Panel - Posts List (always visible) */}
        <div className="w-full overflow-hidden border-gray-200 md:w-2/5 md:border-r">
          <Container className={clsx('h-full', 'p-4')}>{children}</Container>
        </div>

        {/* Right Panel - Desktop only */}
        <div className="hidden overflow-hidden p-4 md:block md:w-3/5">
          {detail}
        </div>
      </div>

      {/* Mobile Modal - Only shows on mobile when viewing a post */}
      <MobilePostModal>{detail}</MobilePostModal>
    </div>
  );
}
