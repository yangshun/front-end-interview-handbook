'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';

import ProjectForm from '~/components/project/ProjectForm';

import type { ProjectFormValues } from '~/types';

export default function ProjectCreatePage() {
  const router = useRouter();
  const createMutation = trpc.project.create.useMutation();

  const onCreate = (formData: ProjectFormValues) => {
    createMutation.mutate(
      { data: formData },
      {
        onError() {
          toast.error('Something went wrong! Try again');
        },
        onSuccess() {
          toast.success('Project created successfully!');
          router.push('/');
        },
      },
    );
  };

  return (
    <ProjectForm
      isDisabled={createMutation.isLoading}
      isSaving={createMutation.isLoading}
      mode="create"
      onSubmit={onCreate}
    />
  );
}
