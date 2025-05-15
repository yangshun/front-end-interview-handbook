'use client';

import { ActionIcon, Button, Card, Menu, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  RiDeleteBinLine,
  RiEyeLine,
  RiMoreLine,
  RiPencilLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

type Props = Readonly<{
  isAdminRole: boolean;
}>;

export default function ProjectsPage({ isAdminRole }: Props) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.project.getAll.useQuery();
  const deleteMutation = trpc.project.delete.useMutation();
  const onDelete = (id: string) => {
    deleteMutation.mutate(
      { projectId: id },
      {
        onError() {
          toast.error('Something went wrong! Try again');
        },
        onSuccess() {
          utils.project.getAll.invalidate();
          toast.success('Project deleted successfully!');
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Title order={2}>Projects</Title>
        {isAdminRole && (
          <Button component={Link} href="/projects/create" size="md">
            Add
          </Button>
        )}
      </div>
      <div className="grid w-full items-start gap-2 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <Text>Loading</Text>
        ) : data?.length === 0 ? (
          <Text>No projects added yet!</Text>
        ) : (
          data?.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col gap-6"
              padding="sm"
              shadow="sm"
              withBorder={true}>
              <Text fw={500} size="lg">
                {project.name}
              </Text>

              <div className="flex flex-col gap-2">
                <Text>
                  {project.productsToAdvertise?.length || 0} products to
                  advertise
                </Text>
                <Text>{project.keywords.length} keywords</Text>
                <Text>{project.subreddits.length} subreddit</Text>
              </div>
              <Link
                className="absolute inset-0 "
                href={`/projects/${project.slug}`}
              />

              <Menu position="bottom-end" shadow="sm">
                <Menu.Target>
                  <div
                    className="absolute right-1 top-1"
                    onClick={(e) => e.preventDefault()}>
                    <ActionIcon variant="subtle">
                      <RiMoreLine className="size-4 " />
                    </ActionIcon>
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<RiEyeLine />}
                    onClick={() =>
                      router.push(`/projects/${project.slug}/detail`)
                    }>
                    View
                  </Menu.Item>
                  {isAdminRole && (
                    <>
                      <Menu.Item
                        leftSection={<RiPencilLine />}
                        onClick={() =>
                          router.push(`/projects/${project.slug}/edit`)
                        }>
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<RiDeleteBinLine />}
                        onClick={() => onDelete(project.id)}>
                        Delete
                      </Menu.Item>
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
