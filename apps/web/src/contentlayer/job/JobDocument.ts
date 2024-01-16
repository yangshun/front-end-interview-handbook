import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseJobSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2].replace(/\.mdx$/, '');
}

export const JobDocument = defineDocumentType(() => ({
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
  contentType: 'mdx',
  fields: {
    apply_href: {
      description: 'Link to apply to the job',
      required: true,
      type: 'string',
    },
    department: {
      description: 'Department the job is in',
      required: true,
      type: 'string',
    },
    inParticularLocale: {
      description: 'Locale the job should be shown in',
      required: false,
      type: 'string',
    },
    job_type: {
      description: 'Type of the job',
      required: true,
      type: 'string',
    },
    notInParticularLocale: {
      description: 'Locale the job should not be shown in',
      required: false,
      type: 'string',
    },
    pay_range: {
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
  name: 'JobDocument',
}));
