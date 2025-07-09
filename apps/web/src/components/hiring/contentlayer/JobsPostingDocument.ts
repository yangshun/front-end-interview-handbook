import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

function parseJobSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2].replace(/\.mdx$/, '');
}

export const JobsPostingDocument = defineDocumentType(() => ({
  computedFields: {
    href: {
      description: 'Link to job details page',
      resolve: (doc) => `/jobs/${parseJobSlug(doc._raw.sourceFilePath)}`,
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the job',
      resolve: (doc) => parseJobSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'markdown',
  fields: {
    applyHref: {
      description: 'Link to apply to the job',
      required: true,
      type: 'string',
    },
    department: {
      description: 'Department the job is in',
      required: true,
      type: 'string',
    },
    employmentType: {
      description: 'Type of employment',
      options: ['FULL_TIME', 'PART_TIME', 'INTERN', 'CONTRACTOR'],
      required: true,
      type: 'enum',
    },
    hideFromLocations: {
      description: 'Locations the job should not be shown',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
    locationRequirements: {
      description: 'Locations the job should be shown to',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
    minimumMonthsOfExperience: {
      description: 'Minimum months of experience',
      required: false,
      type: 'number',
    },
    payRange: {
      description: 'Pay range of the job',
      required: true,
      type: 'string',
    },
    title: {
      description: 'Title of the job',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'jobs/*/*.mdx',
  name: 'JobsPosting',
}));
