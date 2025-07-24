'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';

import ProjectForm from '~/components/project/ProjectForm';

import type { ProjectFormValues, ProjectTransformed } from '~/types';

type Props = Readonly<{
  data: ProjectTransformed;
}>;

export default function ProjectEditPage({ data }: Props) {
  const router = useRouter();
  const editMutation = trpc.project.edit.useMutation();
  const deleteMutation = trpc.project.delete.useMutation();

  const onEdit = (formData: ProjectFormValues) => {
    editMutation.mutate(
      { data: formData, projectId: data.id },
      {
        onError() {
          toast.error('Something went wrong! Try again');
        },
        onSuccess() {
          toast.success('Project edited successfully!');
          router.push('/');
          // To get the latest project data
          router.refresh();
        },
      },
    );
  };

  const onDelete = () => {
    deleteMutation.mutate(
      { projectId: data.id },
      {
        onError() {
          toast.error('Something went wrong! Try again');
        },
        onSuccess() {
          toast.success('Project deleted successfully!');
          router.push('/');
        },
      },
    );
  };

  return (
    <ProjectForm
      data={data}
      isDeleting={deleteMutation.isLoading}
      isDisabled={editMutation.isLoading}
      isSaving={editMutation.isLoading}
      mode="edit"
      onDelete={onDelete}
      onSubmit={onEdit}
    />
  );
}
