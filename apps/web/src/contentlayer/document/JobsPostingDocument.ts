import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseJobSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2].replace(/\.mdx$/, '');
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
    inParticularLocale: {
      description: 'Locales the job should be shown in',
      required: false,
      type: 'string',
    },
    minimumMonthsOfExperience: {
      description: 'Minimum months of experience',
      required: false,
      type: 'number',
    },
    notInParticularLocale: {
      description: 'Locale the job should not be shown in',
      required: false,
      type: 'string',
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
