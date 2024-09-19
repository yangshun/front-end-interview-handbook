'use client';

import { useRouter } from 'next/navigation';

import { projectSchema } from '~/schema';

import ProjectsProductsToAdvertiseInput from './ProjectProductToAdvertiseInput';

import type { ProjectFormValues, ProjectTransformed } from '~/types';

import { Button, TagsInput, Textarea, TextInput } from '@mantine/core';
import { createFormContext, zodResolver } from '@mantine/form';

type BaseProps = Readonly<{
  data?: ProjectTransformed;
  isDisabled: boolean;
  isSaving: boolean;
  onSubmit: (data: ProjectFormValues) => void;
}>;

type Props =
  | (BaseProps &
      Readonly<{
        isDeleting: boolean;
        mode: 'edit';
        onDelete: () => void;
      }>)
  | (BaseProps &
      Readonly<{
        mode: 'create';
      }>);

const [FormProvider, useFormContext, useForm] =
  createFormContext<ProjectFormValues>();

export const useProjectFormContext = useFormContext;

export default function ProjectForm({
  data,
  onSubmit,
  isSaving,
  isDisabled,
  ...props
}: Props) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      keywords: data?.keywords ?? [],
      name: data?.name ?? '',
      postFilteringPrompt: data?.postFilteringPrompt ?? '',
      productsToAdvertise:
        props.mode === 'edit'
          ? data?.productsToAdvertise ?? [
              {
                description: '',
                url: '',
              },
            ]
          : [
              {
                description: '',
                url: '',
              },
            ],
      subreddits: data?.subreddits ?? [],
    },
    mode: 'uncontrolled',
    validate: zodResolver(projectSchema),
  });

  return (
    <FormProvider form={form}>
      <form
        className="mb-6 flex w-full flex-col gap-4 lg:w-2/3"
        onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          key={form.key('name')}
          label="Name"
          placeholder="Project name"
          required={true}
          {...form.getInputProps('name')}
        />
        <TagsInput
          key={form.key('keywords')}
          description="Filters posts by keywords in a case-insensitive and substring match manner. Posts are included if they contain any of the keywords."
          label="Keywords"
          placeholder="Enter keyword"
          required={true}
          {...form.getInputProps('keywords')}
        />
        <TagsInput
          key={form.key('subreddits')}
          description="Subreddits to fetched post from"
          label="Subreddits"
          placeholder="Enter subreddits"
          required={true}
          {...form.getInputProps('subreddits')}
        />
        <Textarea
          autosize={true}
          className="flex-1"
          description="AI prompt to filter posts in the second pass of posts filtering"
          label="Posts filter prompt"
          minRows={1}
          placeholder="Prompt"
          required={true}
          {...form.getInputProps('postFilteringPrompt')}
        />
        <ProjectsProductsToAdvertiseInput />

        <div className="flex justify-between">
          {props.mode === 'edit' && (
            <Button
              color="red"
              disabled={isDisabled}
              loading={props.isDeleting}
              size="md"
              onClick={() => {
                props.onDelete();
              }}>
              Delete
            </Button>
          )}
          <div className="flex flex-1 justify-end gap-2">
            <Button color="gray" size="md" onClick={() => router.push('/')}>
              Cancel
            </Button>
            <Button
              disabled={isDisabled}
              loading={isSaving}
              size="md"
              type="submit">
              {props.mode === 'create' ? 'Submit' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
