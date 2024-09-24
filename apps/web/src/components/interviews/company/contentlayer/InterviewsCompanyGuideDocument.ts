import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseCompanySlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2].replace(/\.mdx$/, '');
}

export const InterviewsCompanyGuideDocument = defineDocumentType(() => ({
  computedFields: {
    href: {
      description: 'Link to company guide page',
      resolve: (doc) =>
        `/interviews/company/${parseCompanySlug(
          doc._raw.sourceFilePath,
        )}/questions-guides`,
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the company',
      resolve: (doc) => parseCompanySlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    logoUrl: {
      description: 'Path to company logo',
      required: true,
      type: 'string',
    },
    name: {
      description: 'Name of the company',
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
  },
  filePathPattern: 'interviews/company/*.mdx',
  name: 'InterviewsCompanyGuide',
}));
