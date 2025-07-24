'use client';

import { Select } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

export default function SelectProductDropdown() {
  const router = useRouter();
  const { data } = trpc.project.getAll.useQuery();
  const projectSlug = useCurrentProjectSlug();

  return (
    <Select
      checkIconPosition="right"
      data={data?.map((project) => ({
        label: project.name,
        value: project.slug,
      }))}
      placeholder="Select project"
      value={projectSlug}
      onChange={(value) => router.push(`/projects/${value}`)}
    />
  );
}
