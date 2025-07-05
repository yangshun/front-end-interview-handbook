'use client';

import {
  Button,
  Container,
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
      subredditKeywords: data?.subredditKeywords ?? [
        { keywords: [], subreddits: [] },
      ],
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
    <Container size="lg">
      <FormProvider form={form}>
        <form
          className="mb-6 flex w-full flex-col gap-4"
          onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            key={form.key('name')}
            label="Name"
            placeholder="Project name"
            required={true}
            {...form.getInputProps('name')}
          />

          <div>
            <label className="mb-1 block font-semibold">
              Keyword/Subreddit Groups
            </label>
            <div className="mb-2 text-xs text-gray-500">
              Each group allows you to specify a set of keywords and a set of
              subreddits. Posts will be filtered if they match any keyword in
              any of the selected subreddits for that group.
            </div>
            {form.values.subredditKeywords?.map((group, idx) => {
              // Create a stable key based on content + position to avoid using pure index
              const contentKey = `${group.keywords.join('-')}-${group.subreddits.join('-')}-${idx}`;

              return (
                <div key={contentKey} className="mb-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-2">
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                      <TagsInput
                        key={form.key(`subredditKeywords.${idx}.keywords`)}
                        description="Posts are included if they contain any of these keywords (case-insensitive, substring match)."
                        label="Keywords"
                        placeholder="Enter keywords"
                        required={true}
                        {...form.getInputProps(
                          `subredditKeywords.${idx}.keywords`,
                        )}
                      />
                      <MultiSelect
                        key={form.key(`subredditKeywords.${idx}.subreddits`)}
                        data={subreddits ?? []}
                        description="Subreddits to fetch posts from for these keywords"
                        label="Subreddits"
                        placeholder="Enter subreddits"
                        required={true}
                        {...form.getInputProps(
                          `subredditKeywords.${idx}.subreddits`,
                        )}
                        rightSection={
                          isFetchingSubreddits ? <Loader size={16} /> : null
                        }
                        searchable={true}
                        onSearchChange={onSubredditSearch}
                      />
                    </div>
                    <Button
                      className="w-full sm:w-auto"
                      color="red"
                      disabled={form.values.subredditKeywords.length === 1}
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        form.removeListItem('subredditKeywords', idx)
                      }>
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button
              variant="light"
              onClick={() =>
                form.insertListItem('subredditKeywords', {
                  keywords: [],
                  subreddits: [],
                })
              }>
              Add Group
            </Button>
          </div>

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
                  if (
                    !confirm('Are you sure you want to delete this project?')
                  ) {
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
    </Container>
  );
}
