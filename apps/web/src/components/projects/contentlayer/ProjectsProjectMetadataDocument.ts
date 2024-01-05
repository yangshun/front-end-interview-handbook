import { defineDocumentType } from 'contentlayer/source-files';

import {
  projectAccessOptions,
  projectDifficultyOptions,
} from '../details/types';

export const ProjectsProjectMetadataDocument = defineDocumentType(() => ({
  computedFields: {
    assetsHref: {
      resolve: (doc) => `/projects/p/${doc.slug}/assets`,
      type: 'string',
    },
    completionHref: {
      resolve: (doc) => `/projects/p/${doc.slug}/completion`,
      type: 'string',
    },
    href: {
      resolve: (doc) => `/projects/p/${doc.slug}`,
      type: 'string',
    },
    resourcesHref: {
      resolve: (doc) => `/projects/p/${doc.slug}/resources`,
      type: 'string',
    },
    submitHref: {
      resolve: (doc) => `/projects/p/${doc.slug}/submit`,
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
    points: {
      description: 'Reputation gained by completing the project',
      required: true,
      type: 'number',
    },
    slug: {
      description: 'Unique identifier of the project',
      required: true,
      type: 'string',
    },
    title: {
      description: 'Title of the project',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'projects/**/*.mdx',
  name: 'ProjectMetadata',
}));
