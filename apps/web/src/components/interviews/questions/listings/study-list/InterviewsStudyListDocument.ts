import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseCategory(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2].replace(/\.mdx$/, '');
}

function parseSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[3].replace(/\.mdx$/, '');
}

const Schedule = {
  frequency: {
    options: ['weekly', 'daily'],
    type: 'enum',
  },
  hours: {
    type: 'number', // Define hours as a number
  },
};

export const InterviewsStudyListDocument = defineDocumentType(() => ({
  computedFields: {
    category: {
      description: 'Type of list: study plan / focus area / company',
      options: ['study-plan', 'focus-area', 'company'],
      resolve: (doc) => parseCategory(doc._raw.sourceFilePath),
      type: 'enum',
    },
    href: {
      description: 'Link to study list page',
      resolve: (doc) => {
        if (doc.customHref) {
          return doc.customHref;
        }

        const category = parseCategory(doc._raw.sourceFilePath);
        const slug = parseSlug(doc._raw.sourceFilePath);

        switch (category) {
          case 'company': {
            return `/interviews/company/${slug}/questions-guides`;
          }
          case 'focus-area': {
            return `/interviews/focus-areas/${slug}`;
          }
          case 'study-plan': {
            return `/interviews/study-plans/${slug}`;
          }
        }
      },
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the list',
      resolve: (doc) => parseSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    customHref: {
      description: 'Link to study list page',
      required: false,
      type: 'string',
    },
    description: {
      description: 'Description of the list',
      required: true,
      type: 'string',
    },
    logoUrl: {
      description: 'Path to list logo',
      required: false,
      type: 'string',
    },
    longName: {
      description: 'Longer name of the list',
      required: true,
      type: 'string',
    },
    name: {
      description: 'Name of the list',
      required: true,
      type: 'string',
    },
    questionHashes: {
      description: 'List of question slugs prefixed with format',
      of: { type: 'string' },
      required: true,
      type: 'list',
    },
    ranking: { default: 999, required: false, type: 'number' },
    schedule: {
      of: Schedule,
      required: false,
      type: 'json',
    },
    seoDescription: {
      description: 'SEO description',
      required: true,
      type: 'string',
    },
    seoTitle: {
      description: 'SEO title',
      required: true,
      type: 'string',
    },
    shortDescription: {
      description: 'Short description of the list',
      required: true,
      type: 'string',
    },
    socialTitle: {
      description: 'Social sharing title',
      required: false,
      type: 'string',
    },
    topics: {
      default: [],
      description: 'List of topics',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
  },
  filePathPattern: 'interviews/study-list/**/*.mdx',
  name: 'InterviewsStudyList',
}));
