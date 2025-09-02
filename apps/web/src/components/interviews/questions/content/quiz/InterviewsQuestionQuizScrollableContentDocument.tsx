import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

function parseSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

function parseLocale(sourceFilePath: string) {
  return path.basename(sourceFilePath).split('.')[0];
}

export const InterviewsQuestionQuizScrollableContentDocument =
  defineDocumentType(() => ({
    computedFields: {
      locale: {
        description: 'Locale',
        resolve: (doc) => parseLocale(doc._raw.sourceFilePath),
        type: 'string',
      },
      slug: {
        description: 'Unique identifier of the list',
        resolve: (doc) => parseSlug(doc._raw.sourceFilePath),
        type: 'string',
      },
    },
    contentType: 'mdx',
    filePathPattern: 'interviews/quiz-scroll-mode/**/*.mdx',
    name: 'InterviewsQuestionQuizScrollableContent',
  }));
