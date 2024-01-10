import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

import {
  projectAccessOptions,
  projectDifficultyOptions,
  projectTrackOptions,
} from '../details/types';

function parseProjectSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2];
}

export const ProjectsChallengeMetadataDocument = defineDocumentType(() => ({
  computedFields: {
    assetsHref: {
      description: 'Link to projects assets step contents',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/assets`,
      type: 'string',
    },
    completionHref: {
      description: 'Link to projects completion step contents',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/completion`,
      type: 'string',
    },
    downloadDesignFileHref: {
      description: 'Link to download design files',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/download/design`,
      type: 'string',
    },
    downloadStarterFilesHref: {
      description: 'Link to download starter files',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/download/starter`,
      type: 'string',
    },
    href: {
      description: 'Link to project details page, also the brief page',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}`,
      type: 'string',
    },
    resourcesHref: {
      description: 'Link to projects resources step contents',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/resources`,
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the project',
      resolve: (doc) => parseProjectSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
    submitHref: {
      description: 'Link to submit project',
      resolve: (doc) =>
        `/projects/p/${parseProjectSlug(doc._raw.sourceFilePath)}/submit`,
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    access: {
      options: projectAccessOptions,
      required: true,
      type: 'enum',
    },
    description: {
      description: 'Short description of the project',
      required: true,
      type: 'string',
    },
    difficulty: {
      options: projectDifficultyOptions,
      required: true,
      type: 'enum',
    },
    imageUrl: {
      description: 'Cover image for the project',
      required: true,
      type: 'string',
    },
    points: {
      description: 'Reputation gained by completing the project',
      required: true,
      type: 'number',
    },
    title: {
      description: 'Title of the project',
      required: true,
      type: 'string',
    },
    track: {
      // Unfortunately there's no easy way to make this rely on all the available slugs in the track model.
      // One way is references but they are quite underwhelming at the moment so we're not using them.
      options: projectTrackOptions,
      required: true,
      type: 'enum',
    },
  },
  filePathPattern: 'projects/challenges/*/*.mdx',
  name: 'ProjectsChallengeMetadata',
}));
