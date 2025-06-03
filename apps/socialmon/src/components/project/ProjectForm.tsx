'use client';

import {
  Button,
  Loader,
  MultiSelect,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { createFormContext, zodResolver } from '@mantine/form';
import { debounce } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { trpc } from '~/hooks/trpc';

import { projectSchema } from '~/schema';
import type { ProjectFormValues, ProjectTransformed } from '~/types';

import ProjectsProductsToAdvertiseInput from './ProjectProductToAdvertiseInput';

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
  isDisabled,
  isSaving,
  onSubmit,
  ...props
}: Props) {
  const router = useRouter();
  const [subredditSuggestion, setSubredditSuggestion] = useState('');
  const form = useForm({
    initialValues: {
      keywords: data?.keywords ?? [],
      name: data?.name ?? '',
      postFilteringPrompt: data?.postFilteringPrompt ?? '',
      productsToAdvertise:
        props.mode === 'edit'
          ? (data?.productsToAdvertise ?? [
              {
                description: '',
                url: '',
              },
            ])
          : [
              {
                description: '',
                url: '',
              },
            ],
      subredditKeywords: data?.subredditKeywords
        ? data.subredditKeywords.map((g) => ({ ...g, id: uuidv4() }))
        : [{ id: uuidv4(), keywords: [], subreddits: [] }],
      subreddits: data?.subreddits ?? [],
    },
    mode: 'uncontrolled',
    validate: zodResolver(projectSchema),
  });

  const { data: subreddits, isFetching: isFetchingSubreddits } =
    trpc.project.searchSubreddits.useQuery(
      {
        q: subredditSuggestion,
      },
      {
        enabled: !!subredditSuggestion,
        onError: (error) => {
          toast.error(
            error.message || 'Something went wrong. Try again later.',
          );
        },
      },
    );

  const onSubredditSearch = useRef(
    debounce((q) => setSubredditSuggestion(q), 500),
  ).current;

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
        {/* --- Keyword/Subreddit Groups Section --- */}
        <div>
          <label className="mb-1 block font-semibold">
            Keyword/Subreddit Groups
          </label>
          <div className="mb-2 text-xs text-gray-500">
            Each group allows you to specify a set of keywords and a set of
            subreddits. Posts will be filtered if they match any keyword in any
            of the selected subreddits for that group.
          </div>
          {form.values.subredditKeywords?.map((group, idx) => (
            <div key={group.id} className="mb-2 flex items-end gap-2">
              <div className="flex flex-1 gap-2">
                <TagsInput
                  key={form.key(`subredditKeywords.${idx}.keywords`)}
                  description="Posts are included if they contain any of these keywords (case-insensitive, substring match)."
                  label="Keywords"
                  placeholder="Enter keywords"
                  required={true}
                  {...form.getInputProps(`subredditKeywords.${idx}.keywords`)}
                />
                <MultiSelect
                  key={form.key(`subredditKeywords.${idx}.subreddits`)}
                  data={subreddits ?? []}
                  description="Subreddits to fetch posts from for these keywords"
                  label="Subreddits"
                  placeholder="Enter subreddits"
                  required={true}
                  {...form.getInputProps(`subredditKeywords.${idx}.subreddits`)}
                  rightSection={
                    isFetchingSubreddits ? <Loader size={16} /> : null
                  }
                  searchable={true}
                  onSearchChange={onSubredditSearch}
                />
              </div>
              <Button
                className="flex-shrink-0"
                color="red"
                disabled={form.values.subredditKeywords.length === 1}
                variant="outline"
                onClick={() => form.removeListItem('subredditKeywords', idx)}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="light"
            onClick={() =>
              form.insertListItem('subredditKeywords', {
                id: uuidv4(),
                keywords: [],
                subreddits: [],
              })
            }>
            Add Group
          </Button>
        </div>
        {/* Legacy fields for backward compatibility */}
        <TagsInput
          key={form.key('keywords')}
          description="(Legacy) Filters posts by keywords in a case-insensitive and substring match manner. Posts are included if they contain any of the keywords."
          label="Keywords"
          placeholder="Enter keyword"
          required={true}
          {...form.getInputProps('keywords')}
        />
        <MultiSelect
          key={form.key('subreddits')}
          description="(Legacy) Subreddits to fetched post from"
          label="Subreddits"
          placeholder="Enter subreddits"
          required={true}
          {...form.getInputProps('subreddits')}
          data={subreddits ?? []}
          rightSection={isFetchingSubreddits ? <Loader size={16} /> : null}
          searchable={true}
          onSearchChange={onSubredditSearch}
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
                if (!confirm('Are you sure you want to delete this project?')) {
                  return;
                }

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
