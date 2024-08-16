'use client';

import { useRouter } from 'next/navigation';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import { Select } from '@mantine/core';

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
