import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseCategory(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2].replace(/\.mdx$/, '');
}

function parseSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[3].replace(/\.mdx$/, '');
}

export const InterviewsLearningListDocument = defineDocumentType(() => ({
  computedFields: {
    category: {
      description: 'Type of list: study plan / focus area / company',
      options: ['study-plan', 'focus-area', 'company'],
      resolve: (doc) => parseCategory(doc._raw.sourceFilePath),
      type: 'enum',
    },
    href: {
      description: 'Link to learning list page',
      resolve: (doc) => {
        const category = parseCategory(doc._raw.sourceFilePath);

        switch (category) {
          case 'company': {
            return `/interviews/company/${parseSlug(
              doc._raw.sourceFilePath,
            )}/questions-guides`;
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
    questionsAlgo: {
      description: 'List of algo questions',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
    questionsJavaScript: {
      description: 'List of JavaScript questions',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
    questionsQuiz: {
      description: 'List of quiz questions',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
    questionsSystemDesign: {
      description: 'List of system design questions',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
    questionsUserInterface: {
      description: 'List of user interface questions',
      of: { type: 'string' },
      required: false,
      type: 'list',
    },
    ranking: { default: 999, required: false, type: 'number' },
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
  },
  filePathPattern: 'interviews/learning-list/**/*.mdx',
  name: 'InterviewsLearningList',
}));
